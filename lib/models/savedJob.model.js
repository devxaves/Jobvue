"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SavedJobSchema = new mongoose_1.Schema({
    // Reference to Postgres User ID:
    userId: { type: String, required: true },
    jobId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
}, { timestamps: true });
// Prevent duplicate saves
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });
var SavedJob = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.SavedJob) || (0, mongoose_1.model)("SavedJob", SavedJobSchema);
exports.default = SavedJob;
