import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../server.js";

const router = express.Router();

// ✅ Public — get all projects
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin only — add new project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Admin only — update project
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Admin only — delete project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true, message: "Project deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
