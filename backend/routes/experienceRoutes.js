import express from "express";
import Experience from "../models/Experience.js";
import { authMiddleware } from "../server.js";

const router = express.Router();

// ✅ Public — get all experiences
router.get("/", async (_req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin only — add new experience
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newExp = await Experience.create(req.body);
    res.status(201).json(newExp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Admin only — update experience
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedExp) return res.status(404).json({ error: "Experience not found" });
    res.json(updatedExp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Admin only — delete experience
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Experience not found" });
    res.json({ success: true, message: "Experience deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
