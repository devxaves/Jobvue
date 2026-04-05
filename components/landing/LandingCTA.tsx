"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingCTA({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="py-20 px-4 bg-white">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          {isLoggedIn
            ? "Ready to Explore?"
            : "Join JobVue AI Today — It's Free"}
        </h2>
        <p className="text-brand-text-secondary text-lg mb-8 max-w-xl mx-auto">
          {isLoggedIn
            ? "Browse local jobs, practice interviews, and build your career."
            : "Create your free account and start finding hyperlocal opportunities or practicing interviews with AI."}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {isLoggedIn ? (
            <>
              <Link href="/jobs" className="btn-jobvue-primary text-base">
                Browse Jobs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/intervue-ai"
                className="btn-jobvue-secondary text-base"
              >
                Start Interview Practice
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-up" className="btn-jobvue-primary text-base">
                Create My Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/sign-in" className="btn-jobvue-secondary text-base">
                I Already Have an Account
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
