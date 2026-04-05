'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold text-brand-text mb-3" style={{ fontFamily: 'var(--font-sora)' }}>
          Something broke on our end
        </h1>
        <p className="text-brand-text-secondary text-lg mb-8">
          We&apos;re fixing it! In the meantime, try refreshing the page.
        </p>
        <button onClick={reset} className="btn-jobvue-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
