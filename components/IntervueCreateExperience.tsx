"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Mic,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import InterviewForm from "@/components/InterviewForm";

interface IntervueCreateExperienceProps {
  userId: string;
}

export default function IntervueCreateExperience({
  userId,
}: IntervueCreateExperienceProps) {
  const [showForm, setShowForm] = useState(false);
  const formSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (showForm && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showForm]);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden clay-card-soft !p-6 md:!p-10">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-brand-blue-bright/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-brand-purple/10 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-brand-border mb-4">
              <Bot className="w-4 h-4 text-brand-blue-bright" />
              <span className="text-sm font-semibold text-brand-blue-bright">
                IntervueAI Studio
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-brand-text leading-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Practice smarter with
              <span className="text-gradient-blue">
                {" "}
                AI-powered interview simulations
              </span>
            </h1>

            <p className="text-brand-text-secondary mt-4 text-base md:text-lg">
              Pick your role, experience level, and stack. IntervueAI generates
              tailored questions, runs a realistic mock round, and gives
              structured feedback to level up your confidence.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                className="btn-jobvue-primary"
              >
                <Sparkles className="w-4 h-4" />
                {showForm ? "Hide Interview Form" : "Start Interview Setup"}
              </button>
              <a href="#past-interviews" className="btn-jobvue-secondary">
                <ArrowRight className="w-4 h-4" />
                View Past Interviews
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: Mic,
                  title: "Voice + Prompt",
                  desc: "Natural mock interview flow",
                },
                {
                  icon: Brain,
                  title: "Role Aware",
                  desc: "Questions fit your stack",
                },
                {
                  icon: CheckCircle2,
                  title: "Actionable",
                  desc: "Detailed improvement feedback",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-brand-border px-4 py-3"
                >
                  <item.icon className="w-5 h-5 text-brand-blue-bright mb-2" />
                  <p className="text-sm font-semibold text-brand-text">
                    {item.title}
                  </p>
                  <p className="text-xs text-brand-text-secondary">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="clay-card !p-3">
              <Image
                src="/robot.png"
                alt="IntervueAI assistant"
                width={520}
                height={360}
                className="w-full h-auto rounded-2xl object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border-2 border-brand-border rounded-xl px-3 py-2 shadow-sm">
              <p className="text-xs text-brand-text-secondary">
                Live AI readiness
              </p>
              <p className="text-sm font-semibold text-brand-blue-bright">
                Configured & waiting for you
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence initial={false}>
        {showForm && (
          <motion.section
            ref={formSectionRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div>
              <h2
                className="text-2xl font-bold text-brand-text"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Create Your Interview
              </h2>
              <p className="text-brand-text-secondary mt-1">
                Fill these details once and generate a custom interview
                instantly.
              </p>
            </div>
            <InterviewForm userId={userId} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
