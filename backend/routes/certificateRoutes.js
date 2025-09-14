import express from "express";
import Certificate from "../models/Certificate.js";
import { authMiddleware } from "../server.js";

const router = express.Router();

// GET all certificates
router.get("/", async (_req, res) => {
  try {
    const certs = await Certificate.find().sort({ issueDate: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new certificate (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newCert = await Certificate.create(req.body);
    res.status(201).json(newCert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update certificate (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Certificate not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE certificate (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Certificate not found" });
    res.json({ success: true, message: "Certificate deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
