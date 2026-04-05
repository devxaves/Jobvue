"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Bot } from "lucide-react";
import FreelanceIllustration from "@/components/illustrations/FreelanceIllustration";
import InterviewIllustration from "@/components/illustrations/InterviewIllustration";

export default function LandingFeatures() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4" style={{ fontFamily: "var(--font-sora)" }}>
            Two Superpowers in{" "}
            <span className="text-gradient-blue">One Platform</span>
          </h2>
          <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
            Whether you&apos;re looking for work or preparing for interviews,
            JobVue AI has you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 — Jobs */}
          <motion.div
            className="clay-card flex flex-col items-center text-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
              <Briefcase className="w-7 h-7 text-brand-blue-bright" />
            </div>
            <h3
              className="text-xl font-bold mb-3 text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Find & Post Local Jobs
            </h3>
            <p className="text-brand-text-secondary mb-6 leading-relaxed">
              Hyperlocal freelance and part-time gigs for students and city
              folk. No corporate jargon. Real work. Real pay. Real connections.
            </p>
            <FreelanceIllustration className="w-48 h-36 mb-6" />
            <Link href="/jobs" className="btn-jobvue-primary text-sm">
              Explore Jobs
            </Link>
          </motion.div>

          {/* Card 2 — IntervueAI */}
          <motion.div
            className="clay-card-purple flex flex-col items-center text-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
              <Bot className="w-7 h-7 text-brand-purple" />
            </div>
            <h3
              className="text-xl font-bold mb-3 text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Ace Your Next Interview
            </h3>
            <p className="text-brand-text-secondary mb-6 leading-relaxed">
              Practice with AI. Get real-time feedback. Build confidence before
              the big day. Your personal interview coach, available 24/7.
            </p>
            <InterviewIllustration className="w-48 h-36 mb-6" />
            <Link
              href="/intervue-ai"
              className="inline-flex items-center justify-center gap-2 bg-brand-purple text-white font-bold rounded-2xl px-6 py-3 border-2 border-purple-800 cursor-pointer transition-all duration-200 hover:bg-purple-700"
              style={{ boxShadow: "4px 4px 0px #5B21B6" }}
            >
              Start Practicing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
