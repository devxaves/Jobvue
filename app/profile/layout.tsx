import { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar user={user} />
      <main className="pt-20 pb-12">{children}</main>
    </div>
  );
}
