"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Bot, ShieldCheck, Zap } from "lucide-react";

export default function LandingAiHighlight() {
  return (
    <section className="px-4 -mt-8 mb-2">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="max-w-6xl mx-auto rounded-[24px] border-2 border-brand-blue-dark bg-white px-5 py-5 md:px-8 md:py-6"
        style={{ boxShadow: "6px 6px 0px #1E3A8A" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue-bright text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              INDIA-FIRST AI INTERVIEW ENGINE
            </div>

            <h3
              className="text-xl md:text-2xl font-bold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              IntervueAI — built to be India’s best interview practice AI
            </h3>

            <p className="text-brand-text-secondary mt-2 max-w-3xl">
              Designed for Indian students and job seekers with role-specific
              questions, realistic mock rounds, and actionable feedback to help
              you clear interviews faster.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { icon: Bot, label: "Role-aware questions" },
                { icon: Zap, label: "Instant AI feedback" },
                { icon: ShieldCheck, label: "Trusted by learners" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-bg rounded-full border border-brand-border text-xs text-brand-text-secondary"
                >
                  <item.icon className="w-3.5 h-3.5 text-brand-blue-bright" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/intervue-ai"
              className="btn-jobvue-primary text-sm md:text-base whitespace-nowrap"
            >
              Try IntervueAI Now →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
