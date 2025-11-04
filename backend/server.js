import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// load env from backend/.env regardless of CWD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// ✅ load env first
dotenv.config();

// Mongoose diagnostics and safer defaults
mongoose.set("strictQuery", true);
// Fail faster on disconnected DB instead of buffering too long
mongoose.set("bufferTimeoutMS", 5000);

function redactMongoUri(uri = "") {
  try {
    if (!uri) return "";
    const m = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^:]*)(?::([^@]*))?@(.*)$/);
    if (m) {
      const [, proto, user, _pass, rest] = m;
      const u = user ? encodeURIComponent(decodeURIComponent(user)) : "";
      return `${proto}${u}${u ? ':***' : ''}@${rest}`;
    }
    return uri;
  } catch (_) {
    return uri;
  }
}

// Wrap mongoose.connect to inject diagnostics and options without touching call sites
const __origConnect = mongoose.connect.bind(mongoose);
mongoose.connect = (uri, opts) => {
  try {
    console.log("[mongo] connecting to:", redactMongoUri(uri || ""));
    mongoose.connection.removeAllListeners("connected");
    mongoose.connection.removeAllListeners("disconnected");
    mongoose.connection.removeAllListeners("error");
    mongoose.connection.on("connected", () => console.log("[mongo] connected"));
    mongoose.connection.on("disconnected", () => console.log("[mongo] disconnected"));
    mongoose.connection.on("error", (err) => console.error("[mongo] error:", err?.message || err));
  } catch {}
  const finalOpts = { serverSelectionTimeoutMS: 20000, family: 4, ...(opts || {}) };
  return __origConnect(uri, finalOpts);
};

// routes
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
// serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// certificates route
app.use("/api/certificates", certificateRoutes);
// resume route
app.use("/api/resume", resumeRoutes);
// generic uploads route
app.use("/api/uploads", uploadRoutes);

// health endpoint for quick diagnostics
app.get("/api/health", (_req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting", "unauthorized", "unknown"];
  const state = states[mongoose.connection.readyState] || "unknown";
  res.json({ ok: true, dbState: state, node: process.version, pid: process.pid, host: os.hostname() });
});

// ✅ Auth Middleware
export function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// test route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running 🚀");
});

// main routes
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// db connect
const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ mongodb connected"))
  .catch((err) => console.log("❌ mongodb error:", err));

// start server
app.listen(PORT, () => {
  console.log(`✅ server running on http://localhost:${PORT}`);
});
