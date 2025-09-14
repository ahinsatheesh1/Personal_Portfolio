import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    link: { type: String }, // certificate URL
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
