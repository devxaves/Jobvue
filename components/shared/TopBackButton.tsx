"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TopBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/intervue-ai");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-blue-bright text-sm transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}
