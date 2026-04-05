"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  ArrowRight,
  X,
  SlidersHorizontal,
  Bot,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EmptyStateIllustration from "@/components/illustrations/EmptyStateIllustration";

dayjs.extend(relativeTime);

const quickFilters = [
  "All",
  "Freelance",
  "Part-time",
  "Gig",
  "Design",
  "Tech",
  "Content",
  "Other",
];

const jobTypeColors: Record<string, string> = {
  freelance: "badge-freelance",
  parttime: "badge-parttime",
  gig: "badge-gig",
  internship: "badge-internship",
  volunteer: "badge-volunteer",
};

interface Job {
  id: string;
  title: string;
  description: string;
  jobType: string;
  category: string;
  city: string | null;
  payMin: number | null;
  payMax: number | null;
  payType: string;
  skills: string[];
  isUrgent: boolean;
  createdAt: string;
  deadline: string | null;
  workMode: string;
  poster: {
    id: string;
    name: string;
    profileURL: string | null;
    city: string | null;
  };
  _count: { applications: number };
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [showBanner, setShowBanner] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (activeFilter !== "All") {
        const filterMap: Record<string, { key: string; value: string }> = {
          Freelance: { key: "type", value: "freelance" },
          "Part-time": { key: "type", value: "parttime" },
          Gig: { key: "type", value: "gig" },
          Design: { key: "category", value: "Design" },
          Tech: { key: "category", value: "Tech & Development" },
          Content: { key: "category", value: "Content & Writing" },
        };
        const f = filterMap[activeFilter];
        if (f) params.set(f.key, f.value);
      }
      params.set("page", page.toString());

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [search, activeFilter, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    // Load saved state from localStorage
    const dismissed = localStorage.getItem("jobvue-banner-dismissed");
    if (dismissed) setShowBanner(false);
  }, []);

  const toggleSave = async (jobId: string) => {
    try {
      const res = await fetch("/api/jobs/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      const data = await res.json();
      setSavedJobIds((prev) => {
        const next = new Set(prev);
        if (data.saved) next.add(jobId);
        else next.delete(jobId);
        return next;
      });
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("jobvue-banner-dismissed", "true");
  };

  const formatPay = (job: Job) => {
    if (job.payType === "negotiable") return "Negotiable";
    if (job.payMin && job.payMax)
      return `₹${job.payMin.toLocaleString()} – ₹${job.payMax.toLocaleString()}`;
    if (job.payMin) return `From ₹${job.payMin.toLocaleString()}`;
    if (job.payMax) return `Up to ₹${job.payMax.toLocaleString()}`;
    return "Negotiable";
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-brand-text mb-2"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Discover Jobs 🔥
        </h1>
        <p className="text-brand-text-secondary">
          Find hyperlocal opportunities that match your skills.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-secondary" />
        <input
          type="text"
          placeholder="Search jobs, skills, keywords..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border-2 border-brand-border text-brand-text placeholder:text-brand-text-secondary focus:border-brand-blue-bright focus:outline-none focus:ring-2 focus:ring-brand-blue-bright/20 transition-all"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickFilters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setActiveFilter(f);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeFilter === f
                ? "bg-brand-blue-bright text-white border-brand-blue-dark shadow-md"
                : "bg-white text-brand-text-secondary border-brand-border hover:border-brand-blue-bright hover:text-brand-blue-bright"
            }`}
            style={{ fontFamily: "var(--font-space)" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* IntervueAI Banner */}
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl bg-gradient-to-r from-brand-blue-bright to-brand-purple p-5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-white flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">
                💡 Preparing for an interview?
              </p>
              <p className="text-blue-100 text-xs">
                Practice with IntervueAI and ace your next one.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/intervue-ai"
              className="flex-shrink-0 px-4 py-2 bg-white text-brand-blue-bright text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Go to IntervueAI
            </Link>
            <button
              onClick={dismissBanner}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Job Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-64 rounded-[20px]" />
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="job-card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue-bright to-brand-purple flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {job.poster.name?.charAt(0)?.toUpperCase() || "J"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-text">
                        {job.poster.name}
                      </p>
                      {job.poster.city && (
                        <p className="text-xs text-brand-text-secondary flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.poster.city}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSave(job.id);
                    }}
                    className="p-2 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    {savedJobIds.has(job.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-brand-blue-bright" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-brand-text-secondary" />
                    )}
                  </button>
                </div>

                <h3
                  className="text-lg font-bold text-brand-text mb-2"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {job.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={
                      jobTypeColors[job.jobType] ||
                      "badge-pill bg-gray-100 text-gray-600"
                    }
                  >
                    {job.jobType}
                  </span>
                  {job.isUrgent && (
                    <span className="badge-urgent">🔥 URGENT</span>
                  )}
                  <span className="badge-pill bg-blue-50 text-brand-blue-bright">
                    {job.workMode}
                  </span>
                </div>

                <p className="text-sm text-brand-text-secondary line-clamp-2 mb-3">
                  {job.description.replace(/<[^>]*>/g, "").slice(0, 120)}...
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {job.skills.slice(0, 3).map((skill, si) => (
                    <span
                      key={si}
                      className="px-2 py-0.5 bg-brand-bg rounded-lg text-xs font-medium text-brand-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-0.5 text-xs text-brand-text-secondary">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-bold text-brand-green">
                      {formatPay(job)}
                    </span>
                    <span className="text-brand-text-secondary flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {dayjs(job.createdAt).fromNow()}
                    </span>
                  </div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-4 py-2 bg-brand-blue-bright text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    View
                  </Link>
                </div>

                {job._count.applications > 0 && (
                  <p className="text-xs text-brand-text-secondary mt-2">
                    {job._count.applications} applied
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    page === p
                      ? "bg-brand-blue-bright text-white shadow-md"
                      : "bg-white text-brand-text-secondary border border-brand-border hover:border-brand-blue-bright"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <EmptyStateIllustration className="w-48 h-48 mb-6" />
          <h3
            className="text-xl font-bold text-brand-text mb-2"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            No jobs found
          </h3>
          <p className="text-brand-text-secondary mb-6">
            Try adjusting your filters or search term.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="btn-jobvue-secondary text-sm"
            >
              Clear Filters
            </button>
            <Link href="/jobs/post" className="btn-jobvue-primary text-sm">
              Post a Job
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
