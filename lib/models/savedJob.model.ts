import { Schema, model, models } from "mongoose";

const SavedJobSchema = new Schema({
  // Reference to Postgres User ID:
  userId: { type: String, required: true },
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
}, { timestamps: true });

// Prevent duplicate saves
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const SavedJob = models?.SavedJob || model("SavedJob", SavedJobSchema);
export default SavedJob;
