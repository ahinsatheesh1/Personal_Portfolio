// models/Experience.js
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: String,
    techStack: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
