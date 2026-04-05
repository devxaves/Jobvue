import { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  
  // Reference to Postgres User ID:
  applicantId: { type: String, required: true },
  
  coverNote: { type: String, required: true },
  relevantExperience: { type: String },
  portfolioLink: { type: String },
  resumeLink: { type: String },
  expectedPay: { type: Number },
  
  status: { 
    type: String, 
    enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"], 
    default: "pending" 
  },
}, { timestamps: true });

// Prevent duplicate applications for the same job by the same applicant
ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

const Application = models?.Application || model("Application", ApplicationSchema);
export default Application;
