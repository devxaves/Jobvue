"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var JobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobType: { type: String, required: true },
    category: { type: String, required: true },
    skills: [{ type: String }],
    requirements: [{ type: String }],
    workMode: { type: String, default: "remote" },
    city: { type: String },
    address: { type: String },
    payType: { type: String, default: "fixed" },
    payMin: { type: Number },
    payMax: { type: Number },
    exactPay: { type: Number },
    positions: { type: Number, default: 1 },
    isUrgent: { type: Boolean, default: false },
    tags: [{ type: String }],
    // Reference to Postgres User ID:
    posterId: { type: String, required: true },
    status: { type: String, enum: ["open", "closed", "paused"], default: "open" },
    applicantsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    deadline: { type: Date },
}, { timestamps: true });
var Job = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.Job) || (0, mongoose_1.model)("Job", JobSchema);
exports.default = Job;
