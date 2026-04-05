import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/auth.action';
import Navbar from '@/components/shared/Navbar';

export default async function JobsLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar user={user} />
      <main className="pt-20 pb-16">
        {children}
      </main>
    </div>
  );
}
