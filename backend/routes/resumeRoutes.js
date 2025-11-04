import express from "express";
import Resume from "../models/Resume.js";
import { authMiddleware } from "../server.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Setup multer storage for resume uploads (PDFs)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resumeDir = path.join(__dirname, "..", "uploads", "resumes");
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    fs.mkdirSync(resumeDir, { recursive: true });
    cb(null, resumeDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname) || ".pdf";
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${Date.now()}_${safeBase}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const isPdf = file.mimetype === "application/pdf" || /\.pdf$/i.test(file.originalname || "");
  if (isPdf) cb(null, true);
  else cb(new Error("Only PDF files are allowed"));
};

const upload = multer({ storage, fileFilter });

// Get current resume config
router.get("/", async (_req, res) => {
  try {
    const doc = await Resume.findOne();
    if (!doc) return res.json({ url: null });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Set/update resume URL (admin only)
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });
    const updated = await Resume.findOneAndUpdate(
      {},
      { url },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Upload resume file (admin only) -> updates stored URL
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    // Build URL as served by express static: /uploads/resumes/<filename>
    const fileUrl = `/uploads/resumes/${req.file.filename}`;
    const updated = await Resume.findOneAndUpdate(
      {},
      { url: fileUrl },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ url: updated.url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
