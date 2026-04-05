'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, Hourglass } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import EmptyStateIllustration from '@/components/illustrations/EmptyStateIllustration';

dayjs.extend(relativeTime);

const statusStyles: Record<string, { icon: any; label: string; bgClass: string; textClass: string }> = {
  pending: { icon: Clock, label: 'Pending', bgClass: 'bg-yellow-50', textClass: 'text-yellow-600' },
  shortlisted: { icon: CheckCircle2, label: 'Shortlisted', bgClass: 'bg-green-50', textClass: 'text-green-600' },
  rejected: { icon: XCircle, label: 'Rejected', bgClass: 'bg-red-50', textClass: 'text-red-500' },
  hired: { icon: CheckCircle2, label: 'Hired!', bgClass: 'bg-blue-50', textClass: 'text-brand-blue-bright' },
};

interface Application {
  id: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    jobType: string;
    poster: { name: string };
  };
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/applications');
        if (res.ok) {
          const data = await res.json();
          setApplications(data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-text mb-8" style={{ fontFamily: 'var(--font-sora)' }}>My Applications</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-20 rounded-[20px]" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-brand-text mb-2" style={{ fontFamily: 'var(--font-sora)' }}>My Applications</h1>
      <p className="text-brand-text-secondary mb-8">{applications.length} application{applications.length !== 1 ? 's' : ''} submitted</p>

      {applications.length === 0 ? (
        <div className="text-center py-16">
          <EmptyStateIllustration className="w-48 h-48 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-brand-text mb-2" style={{ fontFamily: 'var(--font-sora)' }}>No applications yet</h3>
          <p className="text-brand-text-secondary mb-6">Browse jobs and send your first application!</p>
          <Link href="/jobs" className="btn-jobvue-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, i) => {
            const s = statusStyles[app.status] || statusStyles.pending;
            const StatusIcon = s.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="clay-card-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <Link href={`/jobs/${app.job?.id}`} className="font-bold text-brand-text hover:text-brand-blue-bright transition-colors" style={{ fontFamily: 'var(--font-sora)' }}>
                    {app.job?.title || 'Job Listing'}
                  </Link>
                  <p className="text-sm text-brand-text-secondary">
                    By {app.job?.poster?.name || 'Unknown'} · Applied {dayjs(app.createdAt).fromNow()}
                  </p>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold ${s.bgClass} ${s.textClass}`}>
                  <StatusIcon className="w-4 h-4" />
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
