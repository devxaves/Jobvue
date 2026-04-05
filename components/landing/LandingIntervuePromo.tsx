"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import InterviewIllustration from "@/components/illustrations/InterviewIllustration";

export default function LandingIntervuePromo() {
  return (
    <section className="py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto rounded-[28px] bg-brand-blue-dark overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
          <div className="flex-1">
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Don&apos;t Walk Into That Interview Unprepared.
            </h2>
            <p className="text-blue-200 text-lg mb-6 leading-relaxed">
              Practice with our AI interviewer, get scored, improve — repeat.
              Your personal interview coach, available 24/7.
            </p>
            <Link
              href="/intervue-ai"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue-dark font-bold rounded-2xl px-6 py-3 border-2 border-blue-300 cursor-pointer transition-all duration-200 hover:bg-blue-50"
              style={{ boxShadow: "4px 4px 0px rgba(255,255,255,0.2)" }}
            >
              Try IntervueAI Free →
            </Link>
          </div>

          <div className="flex-shrink-0 w-48 md:w-64">
            <InterviewIllustration className="w-full h-auto" light />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
