import Link from 'next/link';
import EmptyStateIllustration from '@/components/illustrations/EmptyStateIllustration';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <EmptyStateIllustration className="w-48 h-48 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-brand-text mb-3" style={{ fontFamily: 'var(--font-sora)' }}>
          Oops! This page ran away 🏃
        </h1>
        <p className="text-brand-text-secondary text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-jobvue-primary">Go Home</Link>
          <Link href="/jobs" className="btn-jobvue-secondary">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
}
