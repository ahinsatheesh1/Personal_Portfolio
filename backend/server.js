import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";

// ✅ load env first
dotenv.config();

// routes
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// certificates route
app.use("/api/certificates", certificateRoutes);

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
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ mongodb connected"))
  .catch((err) => console.log("❌ mongodb error:", err));

// start server
app.listen(PORT, () => {
  console.log(`✅ server running on http://localhost:${PORT}`);
});
