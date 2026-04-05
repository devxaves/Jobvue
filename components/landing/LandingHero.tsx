"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import FloatingShapes from "@/components/shared/FloatingShapes";

const floatingBadges = [
  { text: "📍 Kolkata", delay: 0.5, x: -20, y: 0 },
  { text: "💼 Design", delay: 0.8, x: 20, y: -10 },
  { text: "🤖 AI Mock Interview", delay: 1.1, x: 0, y: 10 },
];

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background blobs */}
      {/* Background blobs & Floating Shapes */}
      <FloatingShapes />
      <div className="absolute inset-0 blob-gradient pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue-bright/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left — Text */}
          <motion.div
            className="flex flex-col gap-6 max-w-xl lg:max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="leading-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Your City. Your Work.{" "}
              <span className="text-gradient-blue">Your Future.</span>
            </h1>

            <p className="text-lg md:text-xl text-brand-text-secondary leading-relaxed">
              JobVue AI connects local students and freelancers with real
              opportunities nearby — and helps you ace every interview with
              AI-powered practice.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/jobs" className="btn-jobvue-primary text-base">
                Find Jobs Near You →
              </Link>
              <Link
                href="/intervue-ai"
                className="btn-jobvue-secondary text-base"
              >
                Practice Interviews →
              </Link>
            </div>

            <p className="text-sm text-brand-text-secondary mt-2">
              Trusted by{" "}
              <span className="font-semibold text-brand-blue-bright">
                2,000+
              </span>{" "}
              students across Indian cities
            </p>

            {/* Floating badge chips */}
            <div className="flex flex-wrap gap-3 mt-2">
              {floatingBadges.map((badge, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: badge.delay, duration: 0.4 }}
                  className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-brand-border text-sm font-medium text-brand-text shadow-sm"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  {badge.text}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right — Illustration */}
          <motion.div
            className="flex-shrink-0 w-full max-w-md lg:max-w-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroIllustration className="w-full h-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
