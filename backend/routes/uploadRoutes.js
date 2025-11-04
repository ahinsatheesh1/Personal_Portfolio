import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { authMiddleware } from "../server.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projDir = path.join(__dirname, "..", "uploads", "projects");
const profileDir = path.join(__dirname, "..", "uploads", "profile");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    fs.mkdirSync(projDir, { recursive: true });
    cb(null, projDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname) || ".png";
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${Date.now()}_${safeBase}${ext}`);
  },
});

const imageFilter = (_req, file, cb) => {
  const ok = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jpg",
  ];
  if (ok.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

const upload = multer({ storage, fileFilter: imageFilter });

// Storage for single profile image; we always save as profile.<ext>
const profileStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    fs.mkdirSync(profileDir, { recursive: true });
    cb(null, profileDir);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname) || ".png";
    // Ensure only one profile.* exists: delete older extensions
    try {
      const files = fs.readdirSync(profileDir).filter((f) => f.startsWith("profile."));
      for (const f of files) {
        try { fs.unlinkSync(path.join(profileDir, f)); } catch {}
      }
    } catch {}
    cb(null, `profile${ext}`);
  },
});
const uploadProfile = multer({ storage: profileStorage, fileFilter: imageFilter });

// POST /api/uploads/projects  (admin only)
router.post("/projects", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const fileUrl = `/uploads/projects/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

// GET /api/uploads/profile -> { url: string|null }
router.get("/profile", async (_req, res) => {
  try {
    fs.mkdirSync(profileDir, { recursive: true });
    const files = fs.readdirSync(profileDir).filter((f) => f.startsWith("profile."));
    if (!files.length) return res.json({ url: null });
    return res.json({ url: `/uploads/profile/${files[0]}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/uploads/profile (admin) -> upload/replace profile image
router.post("/profile", authMiddleware, uploadProfile.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const fileUrl = `/uploads/profile/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/uploads/profile (admin) -> remove existing profile image
router.delete("/profile", authMiddleware, async (_req, res) => {
  try {
    let removed = false;
    try {
      const files = fs.readdirSync(profileDir).filter((f) => f.startsWith("profile."));
      for (const f of files) {
        fs.unlinkSync(path.join(profileDir, f));
        removed = true;
      }
    } catch {}
    res.json({ success: true, removed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
