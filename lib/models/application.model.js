"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApplicationSchema = new mongoose_1.Schema({
    jobId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
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
var Application = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.Application) || (0, mongoose_1.model)("Application", ApplicationSchema);
exports.default = Application;
