"use client";

import { motion } from "framer-motion";
import { UserCircle, Search, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    emoji: "🧑‍💼",
    title: "Create Your Profile",
    desc: "Tell us your skills, availability & location",
    color: "bg-blue-100 text-brand-blue-bright",
  },
  {
    icon: Search,
    emoji: "🔍",
    title: "Browse or Get Matched",
    desc: "Find hyperlocal gigs or let jobs find you",
    color: "bg-purple-100 text-brand-purple",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    title: "Apply & Connect",
    desc: "One-click apply using your saved profile info",
    color: "bg-green-100 text-brand-green",
  },
];

export default function LandingHowItWorks() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4" style={{ fontFamily: "var(--font-sora)" }}>
            How JobVue AI Works{" "}
            <span className="text-gradient-blue">For You</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-brand-border -translate-y-12" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="clay-card-soft flex flex-col items-center text-center relative z-10 bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Step number */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-blue-bright text-white text-sm font-bold rounded-full flex items-center justify-center"
                style={{ boxShadow: "3px 3px 0 #1E3A8A" }}
              >
                {i + 1}
              </div>

              <div
                className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-4 mt-4`}
              >
                <step.icon className="w-7 h-7" />
              </div>

              <div className="text-2xl mb-2">{step.emoji}</div>

              <h3
                className="text-lg font-bold text-brand-text mb-2"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {step.title}
              </h3>
              <p className="text-brand-text-secondary text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
