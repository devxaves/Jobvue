"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from "lucide-react";
import Link from "next/link";
import SuccessIllustration from "@/components/illustrations/SuccessIllustration";

export default function ApplyJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    coverNote: "",
    relevantExperience: "",
    portfolioLink: "",
    expectedPay: "",
    isNegotiable: false,
    availability: "",
    questionsForPoster: "",
  });

  const update = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push(`/jobs/${jobId}`), 3000);
      } else {
        toast.error(data.error || "Failed to apply");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <SuccessIllustration className="w-48 h-48 mx-auto mb-6" />
          <h1
            className="text-3xl font-bold text-brand-text mb-3"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Application Submitted! 🎉
          </h1>
          <p className="text-brand-text-secondary text-lg mb-4">
            The poster will contact you soon. Good luck!
          </p>
          <p className="text-sm text-brand-text-secondary">
            Redirecting to job page...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Link
        href={`/jobs/${jobId}`}
        className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-blue-bright mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Job
      </Link>

      <h1
        className="text-2xl font-bold text-brand-text mb-2"
        style={{ fontFamily: "var(--font-sora)" }}
      >
        Apply for this Job
      </h1>
      <p className="text-brand-text-secondary mb-8">
        Complete the steps below to submit your application.
      </p>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s === step
                  ? "bg-brand-blue-bright text-white scale-110"
                  : s < step
                    ? "bg-brand-green text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {s < step ? "✓" : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 ${s < step ? "bg-brand-green" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="clay-card-soft"
      >
        {/* Step 1: Your Details (auto-filled) */}
        {step === 1 && (
          <div className="space-y-5">
            <h2
              className="text-lg font-bold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Your Details
            </h2>
            <p className="text-sm text-brand-text-secondary bg-blue-50 p-3 rounded-xl">
              ℹ️ You are applying with your signed-in account. Add a clear cover
              note to improve your chances.
            </p>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Why are you a good fit? *
              </label>
              <textarea
                value={form.coverNote}
                onChange={(e) => update("coverNote", e.target.value)}
                placeholder="Tell the poster why you're the right person..."
                rows={4}
                className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none resize-none"
              />
              <p className="text-xs text-brand-text-secondary mt-1">
                {form.coverNote.length}/500
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Relevant Experience
              </label>
              <textarea
                value={form.relevantExperience}
                onChange={(e) => update("relevantExperience", e.target.value)}
                placeholder="Describe past work relevant to this job..."
                rows={3}
                className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: For This Job */}
        {step === 2 && (
          <div className="space-y-5">
            <h2
              className="text-lg font-bold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Additional Info
            </h2>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Portfolio Link
              </label>
              <input
                type="url"
                value={form.portfolioLink}
                onChange={(e) => update("portfolioLink", e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                When can you start?
              </label>
              <input
                type="date"
                value={form.availability}
                onChange={(e) => update("availability", e.target.value)}
                className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Expected Pay (₹)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={form.expectedPay}
                  onChange={(e) => update("expectedPay", e.target.value)}
                  placeholder="Amount"
                  disabled={form.isNegotiable}
                  className="flex-1 px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none disabled:opacity-50"
                />
                <label className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isNegotiable}
                    onChange={(e) => update("isNegotiable", e.target.checked)}
                    className="rounded"
                  />
                  Negotiate
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">
                Questions for the poster?
              </label>
              <textarea
                value={form.questionsForPoster}
                onChange={(e) => update("questionsForPoster", e.target.value)}
                placeholder="Any questions you'd like to ask..."
                rows={2}
                className="w-full px-4 py-3 bg-brand-bg rounded-2xl border border-brand-border focus:border-brand-blue-bright outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-5">
            <h2
              className="text-lg font-bold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Review & Submit
            </h2>
            <div className="bg-brand-bg rounded-2xl p-5 space-y-3">
              {form.coverNote && (
                <div>
                  <p className="text-xs text-brand-text-secondary font-medium">
                    Cover Note
                  </p>
                  <p className="text-sm text-brand-text">{form.coverNote}</p>
                </div>
              )}
              {form.relevantExperience && (
                <div>
                  <p className="text-xs text-brand-text-secondary font-medium">
                    Experience
                  </p>
                  <p className="text-sm text-brand-text">
                    {form.relevantExperience}
                  </p>
                </div>
              )}
              {form.portfolioLink && (
                <div>
                  <p className="text-xs text-brand-text-secondary font-medium">
                    Portfolio
                  </p>
                  <a
                    href={form.portfolioLink}
                    className="text-sm text-brand-blue-bright hover:underline"
                  >
                    {form.portfolioLink}
                  </a>
                </div>
              )}
              {form.expectedPay && (
                <div>
                  <p className="text-xs text-brand-text-secondary font-medium">
                    Expected Pay
                  </p>
                  <p className="text-sm text-brand-green font-bold">
                    ₹{form.expectedPay}
                  </p>
                </div>
              )}
              {form.isNegotiable && (
                <p className="text-sm text-brand-text-secondary">
                  ✓ Open to negotiation
                </p>
              )}
            </div>
            <label className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl cursor-pointer">
              <CheckCircle2 className="w-5 h-5 text-brand-blue-bright mt-0.5 flex-shrink-0" />
              <span className="text-sm text-brand-text">
                I confirm all information is accurate and I want to submit this
                application.
              </span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-brand-border">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-jobvue-secondary text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="btn-jobvue-primary text-sm"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-jobvue-primary text-sm"
            >
              {submitting ? "Submitting..." : "Submit Application 🚀"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
