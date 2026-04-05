import { prisma } from "@/lib/prisma";
import { connectToDB } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";
import Application from "@/lib/models/application.model";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Briefcase,
  Share2,
  Flag,
  ArrowLeft,
  Calendar,
  Users,
  Eye,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const jobTypeLabels: Record<string, string> = {
  freelance: "Freelance",
  parttime: "Part-time",
  gig: "Quick Gig",
  internship: "Internship",
  volunteer: "Volunteer",
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  await connectToDB();

  const mongoJob = await Job.findOneAndUpdate(
    { _id: id },
    { $inc: { views: 1 } },
    { returnDocument: "after" }
  ).lean();

  if (!mongoJob) notFound();

  const poster = await prisma.user.findUnique({
    where: { id: mongoJob.posterId },
    select: {
      id: true,
      name: true,
      profileURL: true,
      city: true,
      tagline: true,
      createdAt: true,
    },
  });

  const applicationsCount = await Application.countDocuments({
    jobId: mongoJob._id,
  });

  const job = {
    ...mongoJob,
    id: mongoJob._id.toString(),
    poster,
    _count: { applications: applicationsCount },
  };

  if (!job.poster) notFound();

  // Check if already applied
  let hasApplied = false;
  if (user) {
    const application = await Application.findOne({
      jobId: job.id,
      applicantId: user.id,
    }).lean();
    hasApplied = !!application;
  }

  const isOwnJob = user?.id === job.posterId;
  const isExpired = job.deadline && new Date(job.deadline) < new Date();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Back link */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-blue-bright mb-6 text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel */}
        <div className="flex-1">
          <div className="clay-card-soft">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                {job.isUrgent && (
                  <span className="badge-urgent mb-2 inline-block">
                    🔥 URGENT
                  </span>
                )}
                <h1
                  className="text-2xl md:text-3xl font-bold text-brand-text"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {job.title}
                </h1>
              </div>
            </div>

            {/* Poster info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-brand-bg rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue-bright to-brand-purple flex items-center justify-center text-white font-bold">
                {job.poster.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-brand-text">
                  {job.poster.name}
                </p>
                <p className="text-sm text-brand-text-secondary">
                  Member since {dayjs(job.poster.createdAt).format("MMM YYYY")}
                  {job.poster.city && ` · 📍 ${job.poster.city}`}
                </p>
              </div>
              <Link
                href={`/profile/${job.poster.id}`}
                className="ml-auto text-sm text-brand-blue-bright hover:underline"
              >
                View Profile
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span
                className={`badge-pill ${job.jobType === "freelance" ? "bg-purple-100 text-purple-700" : job.jobType === "parttime" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
              >
                {jobTypeLabels[job.jobType] || job.jobType}
              </span>
              <span className="badge-pill bg-gray-100 text-gray-600">
                {job.category}
              </span>
              <span className="badge-pill bg-blue-50 text-brand-blue-bright">
                {job.workMode}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3
                className="text-lg font-bold text-brand-text mb-3"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Description
              </h3>
              <div
                className="prose prose-sm max-w-none text-brand-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div className="mb-6">
                <h3
                  className="text-lg font-bold text-brand-text mb-3"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-brand-text-secondary text-sm"
                    >
                      <span className="mt-1 w-1.5 h-1.5 bg-brand-blue-bright rounded-full flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {job.skills.length > 0 && (
              <div className="mb-6">
                <h3
                  className="text-lg font-bold text-brand-text mb-3"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-brand-bg rounded-xl text-sm font-medium text-brand-text-secondary border border-brand-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Working hours */}
            {/* Location */}
            {(job.address || job.city) && (
              <div className="mb-6">
                <h3
                  className="text-lg font-bold text-brand-text mb-2"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Location
                </h3>
                <p className="text-brand-text-secondary text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {[job.address, job.city].filter(Boolean).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel (Sticky) */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="clay-card">
              {/* Pay */}
              <div className="mb-4">
                <p className="text-sm text-brand-text-secondary mb-1">
                  Compensation
                </p>
                <p
                  className="text-2xl font-bold text-brand-green"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {job.payType === "negotiable"
                    ? "Negotiable"
                    : `₹${(job.payMin || 0).toLocaleString()}${job.payMax ? ` – ₹${job.payMax.toLocaleString()}` : ""}`}
                </p>
                <p className="text-xs text-brand-text-secondary capitalize">
                  {job.payType}
                </p>
              </div>

              {/* Meta */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-brand-text-secondary">
                  <MapPin className="w-4 h-4" />{" "}
                  {job.workMode === "remote"
                    ? "Remote"
                    : job.city || "Location TBD"}
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-text-secondary">
                  <Clock className="w-4 h-4" /> Posted{" "}
                  {dayjs(job.createdAt).fromNow()}
                </div>
                {job.deadline && (
                  <div
                    className={`flex items-center gap-2 text-sm ${isExpired ? "text-red-500" : "text-brand-text-secondary"}`}
                  >
                    <Calendar className="w-4 h-4" />
                    {isExpired
                      ? "Deadline passed"
                      : `Deadline: ${dayjs(job.deadline).format("MMM D, YYYY")}`}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-brand-text-secondary">
                  <Users className="w-4 h-4" /> {job._count.applications}{" "}
                  applied
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-text-secondary">
                  <Eye className="w-4 h-4" /> {job.views} views
                </div>
              </div>

              {/* Actions */}
              {isOwnJob ? (
                <Link
                  href="/jobs/manage"
                  className="btn-jobvue-secondary w-full text-center block"
                >
                  Manage This Job
                </Link>
              ) : hasApplied ? (
                <div className="w-full text-center py-3 bg-green-50 text-brand-green font-bold rounded-2xl border-2 border-green-200">
                  ✓ Applied
                </div>
              ) : isExpired ? (
                <div className="w-full text-center py-3 bg-red-50 text-red-500 font-bold rounded-2xl border-2 border-red-200">
                  Applications Closed
                </div>
              ) : (
                <Link
                  href={`/jobs/${job.id}/apply`}
                  className="btn-jobvue-primary w-full text-center block"
                >
                  Apply Now
                </Link>
              )}

              {/* Share */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-brand-text-secondary border border-brand-border rounded-xl hover:bg-blue-50 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-brand-text-secondary border border-brand-border rounded-xl hover:bg-red-50 transition-colors">
                  <Flag className="w-4 h-4" /> Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
