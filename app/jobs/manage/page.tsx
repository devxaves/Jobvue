"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Eye, Users, Clock, XCircle, CheckCircle2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";
import EmptyStateIllustration from "@/components/illustrations/EmptyStateIllustration";

dayjs.extend(relativeTime);

interface Job {
  id: string;
  title: string;
  jobType: string;
  category: string;
  status: "open" | "paused" | "closed";
  views: number;
  createdAt: string;
  _count: { applications: number };
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await fetch("/api/jobs?mine=true");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleClose = async (jobId: string, isClosed: boolean) => {
    try {
      await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: isClosed ? "open" : "closed" }),
      });
      toast.success(isClosed ? "Job reactivated" : "Job closed");
      fetchMyJobs();
    } catch {
      toast.error("Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <h1
          className="text-3xl font-bold text-brand-text mb-8"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Manage Jobs
        </h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-[20px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-brand-text"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Manage Jobs
          </h1>
          <p className="text-brand-text-secondary mt-1">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
          </p>
        </div>
        <Link href="/jobs/post" className="btn-jobvue-primary text-sm">
          <Plus className="w-4 h-4" /> Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16">
          <EmptyStateIllustration className="w-48 h-48 mx-auto mb-6" />
          <h3
            className="text-xl font-bold text-brand-text mb-2"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            No jobs posted yet
          </h3>
          <p className="text-brand-text-secondary mb-6">
            Start posting to find the perfect talent.
          </p>
          <Link href="/jobs/post" className="btn-jobvue-primary">
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, i) => {
            const isClosed = job.status === "closed";
            const isDraft = job.status === "paused";

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`clay-card-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isClosed ? "opacity-60" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="font-bold text-brand-text truncate"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      {job.title}
                    </h3>
                    {isClosed && (
                      <span className="badge-pill bg-red-100 text-red-600 text-xs">
                        Closed
                      </span>
                    )}
                    {isDraft && (
                      <span className="badge-pill bg-yellow-100 text-yellow-700 text-xs">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-brand-text-secondary">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {job.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />{" "}
                      {job._count.applications} applied
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />{" "}
                      {dayjs(job.createdAt).fromNow()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-3 py-2 text-sm bg-brand-bg hover:bg-blue-100 text-brand-text-secondary rounded-xl transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => toggleClose(job.id, isClosed)}
                    className={`px-3 py-2 text-sm rounded-xl transition-colors ${isClosed ? "bg-green-50 hover:bg-green-100 text-brand-green" : "bg-red-50 hover:bg-red-100 text-red-500"}`}
                  >
                    {isClosed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
