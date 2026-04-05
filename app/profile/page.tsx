import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
  Star,
  User,
} from "lucide-react";

import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { prisma } from "@/lib/prisma";
import { connectToDB } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";
import Application from "@/lib/models/application.model";

function parseJsonField(value: unknown): any {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

export default async function ProfilePage() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) redirect("/sign-in");

  await connectToDB();

  const [
    user,
    token,
    streak,
    userBadges,
    interviewList,
    interviewsCount,
    postedJobsCount,
    appliedJobsCount,
    postedJobs,
    recentApplications,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        phone: true,
        bio: true,
        tagline: true,
        skills: true,
        languages: true,
        education: true,
        accountType: true,
        isAvailable: true,
        availableFrom: true,
        createdAt: true,
      },
    }),
    prisma.token.findUnique({ where: { userId: sessionUser.id } }),
    prisma.streak.findUnique({ where: { userId: sessionUser.id } }),
    prisma.userBadge.findMany({
      where: { userId: sessionUser.id },
      include: { badge: true },
      orderBy: { awardedAt: "desc" },
      take: 6,
    }),
    getInterviewsByUserId(sessionUser.id),
    prisma.interview.count({ where: { userId: sessionUser.id } }),
    Job.countDocuments({ posterId: sessionUser.id }),
    Application.countDocuments({ applicantId: sessionUser.id }),
    Job.find({ posterId: sessionUser.id })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
    Application.find({ applicantId: sessionUser.id })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
  ]);

  if (!user) redirect("/sign-in");

  const education = parseJsonField(user.education);
  const college = Array.isArray(education)
    ? education[0]?.institution
    : education?.institution;

  const jobIds = recentApplications.map((app: any) => app.jobId);
  const jobsFromApplications = await Job.find({ _id: { $in: jobIds } })
    .select({ title: 1, city: 1, jobType: 1, payMin: 1, payMax: 1 })
    .lean();

  const appliedJobMap = jobsFromApplications.reduce(
    (acc: Record<string, any>, curr: any) => {
      acc[curr._id.toString()] = curr;
      return acc;
    },
    {}
  );

  const profileCompletenessFields = [
    user.name,
    user.email,
    user.city,
    user.phone,
    user.bio,
    user.tagline,
    user.skills?.length ? "skills" : null,
    college,
  ];

  const profileCompleteness = Math.round(
    (profileCompletenessFields.filter(Boolean).length /
      profileCompletenessFields.length) *
      100
  );

  const recentInterviews = interviewList?.slice(0, 6) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8 space-y-8">
      <section className="clay-card-soft !p-6 md:!p-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue-bright to-brand-purple text-white flex items-center justify-center text-2xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h1
                className="text-3xl font-bold text-brand-text"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {user.name}
              </h1>
              <p className="text-brand-text-secondary">{user.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-brand-text-secondary">
                {user.city && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {user.city}
                  </span>
                )}
                {college && (
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" /> {college}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 capitalize">
                  <User className="w-4 h-4" /> {user.accountType || "seeker"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 min-w-[220px]">
            <div className="flex items-center justify-between text-sm text-brand-text-secondary">
              <span>Profile completeness</span>
              <span className="font-semibold text-brand-text">
                {profileCompleteness}%
              </span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5">
              <div
                className="h-2.5 bg-gradient-to-r from-brand-blue-bright to-brand-purple rounded-full"
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <p className="text-xs text-brand-text-secondary">
              {user.isAvailable
                ? "Available for opportunities"
                : "Marked as unavailable"}
              {user.availableFrom
                ? ` • From ${new Date(user.availableFrom).toLocaleDateString()}`
                : ""}
            </p>
          </div>
        </div>

        {(user.tagline || user.bio) && (
          <div className="mt-6 border-t border-brand-border pt-5 space-y-2">
            {user.tagline && (
              <p className="text-brand-blue-dark font-semibold">
                {user.tagline}
              </p>
            )}
            {user.bio && (
              <p className="text-brand-text-secondary leading-relaxed">
                {user.bio}
              </p>
            )}
          </div>
        )}
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Tokens", value: token?.amount || 0, icon: Star },
          {
            label: "Streak",
            value: `${streak?.count || 0} days`,
            icon: Calendar,
          },
          { label: "Interviews", value: interviewsCount, icon: Sparkles },
          { label: "Jobs Posted", value: postedJobsCount, icon: Briefcase },
          { label: "Jobs Applied", value: appliedJobsCount, icon: FileText },
          { label: "Badges", value: userBadges.length, icon: Award },
        ].map((item) => (
          <div key={item.label} className="clay-card-soft text-center">
            <item.icon className="w-5 h-5 text-brand-blue-bright mx-auto mb-2" />
            <p className="text-xs text-brand-text-secondary">{item.label}</p>
            <p
              className="text-lg font-bold text-brand-text mt-1"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="clay-card-soft">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-bold text-brand-text"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Recent Interviews
              </h2>
              <Link href="/dashboard" className="btn-jobvue-secondary text-sm">
                View all
              </Link>
            </div>

            {recentInterviews.length > 0 ? (
              <div className="space-y-3">
                {recentInterviews.map((interview) => (
                  <Link
                    key={interview.id}
                    href={`/interview/${interview.id}`}
                    className="flex items-center justify-between gap-3 bg-white border border-brand-border rounded-2xl px-4 py-3 hover:border-brand-blue-bright transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-brand-text capitalize">
                        {interview.role} interview
                      </p>
                      <p className="text-xs text-brand-text-secondary mt-0.5">
                        {interview.type} •{" "}
                        {new Date(interview.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue-bright border border-blue-200 capitalize">
                      {interview.level}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-brand-text-secondary">
                No interviews found yet.
              </p>
            )}
          </div>

          <div className="clay-card-soft">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-bold text-brand-text"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Jobs Activity
              </h2>
              <div className="flex gap-2">
                <Link
                  href="/jobs/manage"
                  className="btn-jobvue-secondary text-sm"
                >
                  Manage
                </Link>
                <Link
                  href="/jobs/applications"
                  className="btn-jobvue-primary text-sm"
                >
                  Applications
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-brand-border rounded-2xl p-4">
                <h3 className="font-semibold text-brand-text mb-3">
                  Recently Posted
                </h3>
                {postedJobs.length > 0 ? (
                  <div className="space-y-2">
                    {postedJobs.map((job: any) => (
                      <Link
                        key={job._id.toString()}
                        href={`/jobs/${job._id.toString()}`}
                        className="block text-sm text-brand-text-secondary hover:text-brand-blue-bright"
                      >
                        • {job.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-brand-text-secondary">
                    No posted jobs yet.
                  </p>
                )}
              </div>

              <div className="bg-white border border-brand-border rounded-2xl p-4">
                <h3 className="font-semibold text-brand-text mb-3">
                  Recently Applied
                </h3>
                {recentApplications.length > 0 ? (
                  <div className="space-y-2">
                    {recentApplications.map((app: any) => {
                      const job = appliedJobMap[app.jobId.toString()];
                      return (
                        <p
                          key={app._id.toString()}
                          className="text-sm text-brand-text-secondary"
                        >
                          • {job?.title || "Job"}{" "}
                          <span className="text-xs">({app.status})</span>
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-brand-text-secondary">
                    No applications yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="clay-card-soft">
            <h2
              className="text-xl font-bold text-brand-text mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Skills & Languages
            </h2>

            <div>
              <p className="text-xs uppercase tracking-wide text-brand-text-secondary mb-2">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {user.skills?.length ? (
                  user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue-bright text-xs border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-brand-text-secondary">
                    No skills added yet.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-brand-text-secondary mb-2">
                Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {user.languages?.length ? (
                  user.languages.map((language) => (
                    <span
                      key={language}
                      className="px-3 py-1 rounded-full bg-purple-50 text-brand-purple text-xs border border-purple-200"
                    >
                      {language}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-brand-text-secondary">
                    No languages added yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="clay-card-soft">
            <h2
              className="text-xl font-bold text-brand-text mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Badges & Milestones
            </h2>

            {userBadges.length > 0 ? (
              <div className="space-y-3">
                {userBadges.map((userBadge) => (
                  <div
                    key={userBadge.id}
                    className="bg-white border border-brand-border rounded-2xl p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-brand-blue-bright flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-text text-sm">
                          {userBadge.badge.name}
                        </p>
                        <p className="text-xs text-brand-text-secondary mt-0.5">
                          {userBadge.badge.description}
                        </p>
                        <p className="text-[11px] text-brand-text-secondary mt-1 inline-flex items-center gap-1">
                          <Clock3 className="w-3 h-3" />
                          {new Date(userBadge.awardedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-text-secondary">
                No badges yet. Keep practicing interviews to earn milestones.
              </p>
            )}
          </div>

          <div className="clay-card-soft">
            <h2
              className="text-xl font-bold text-brand-text mb-3"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/intervue-ai"
                className="w-full inline-flex items-center justify-center gap-2 btn-jobvue-primary text-sm"
              >
                <Sparkles className="w-4 h-4" /> Start Interview
              </Link>
              <Link
                href="/jobs/post"
                className="w-full inline-flex items-center justify-center gap-2 btn-jobvue-secondary text-sm"
              >
                <Briefcase className="w-4 h-4" /> Post a Job
              </Link>
              <Link
                href="/jobs"
                className="w-full inline-flex items-center justify-center gap-2 bg-white border border-brand-border rounded-2xl py-2.5 text-sm text-brand-text-secondary hover:text-brand-blue-bright hover:border-brand-blue-bright transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" /> Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
