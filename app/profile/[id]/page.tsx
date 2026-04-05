import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { connectToDB } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      city: true,
      tagline: true,
      bio: true,
      skills: true,
      createdAt: true,
    },
  });

  if (!user) notFound();

  await connectToDB();
  const postedJobs = await Job.countDocuments({ posterId: user.id });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-blue-bright mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>

      <div className="clay-card-soft">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue-bright to-brand-purple flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="flex-1">
            <h1
              className="text-2xl font-bold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {user.name}
            </h1>
            <p className="text-sm text-brand-text-secondary">{user.email}</p>
            {user.city && (
              <p className="text-sm text-brand-text-secondary mt-1 inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {user.city}
              </p>
            )}
          </div>
        </div>

        {user.tagline && (
          <p className="mt-5 text-brand-blue-dark font-semibold">
            {user.tagline}
          </p>
        )}

        {user.bio && (
          <p className="mt-3 text-brand-text-secondary leading-relaxed">
            {user.bio}
          </p>
        )}

        {user.skills?.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-semibold text-brand-text mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue-bright text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-brand-border text-sm text-brand-text-secondary">
          <p>
            Posted jobs:{" "}
            <span className="font-semibold text-brand-text">{postedJobs}</span>
          </p>
          <p className="mt-1">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
