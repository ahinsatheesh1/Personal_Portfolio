// models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    // Additional long-form details about the project
    about: String,
    githubLink: String,
    liveDemo: String,
    techStack: [String],
    thumbnail: String // ✅ new field
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
