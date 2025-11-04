import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS; // optional plaintext
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH; // bcrypt hash (preferred)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emailNorm = (email || "").trim();
  const passNorm = (password || "").trim();

  if (!ADMIN_EMAIL) {
    return res.status(500).json({ error: "ADMIN_EMAIL not configured" });
  }

  if (emailNorm !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid credentials (email mismatch)" });
  }

  // Prefer bcrypt hash; allow plaintext ADMIN_PASS for convenience if set
  if (ADMIN_PASS) {
    if (passNorm !== ADMIN_PASS) {
      return res.status(401).json({ error: "Invalid credentials (password mismatch)" });
    }
  } else if (ADMIN_PASS_HASH) {
    const isMatch = await bcrypt.compare(passNorm, ADMIN_PASS_HASH);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials (password mismatch)" });
    }
  } else {
    return res.status(500).json({ error: "ADMIN_PASS or ADMIN_PASS_HASH not configured" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ success: true, token });
});

router.get("/debug", (req, res) => {
  res.json({
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASS_HASH: process.env.ADMIN_PASS_HASH,
    JWT_SECRET: process.env.JWT_SECRET
  });
});

export default router;
