import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid credentials (email mismatch)" });
  }

  const isMatch = await bcrypt.compare(password, ADMIN_PASS_HASH);
  console.log("Password match result:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials (password mismatch)" });
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
