import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Navbar from "@/components/shared/Navbar";
import TopBackButton from "@/components/shared/TopBackButton";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar user={user} />

      <div className="root-layout">
        {/* Top Back Button */}
        <div className="-mb-8">
          <TopBackButton />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
