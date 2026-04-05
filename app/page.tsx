import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getCurrentUser } from "@/lib/actions/auth.action";
import LandingHero from "@/components/landing/LandingHero";
import LandingAiHighlight from "@/components/landing/LandingAiHighlight";
import LandingStats from "@/components/landing/LandingStats";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingIntervuePromo from "@/components/landing/LandingIntervuePromo";
import LandingCTA from "@/components/landing/LandingCTA";

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar user={user} />

      <main>
        <LandingHero />
        <LandingAiHighlight />
        <LandingStats />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingIntervuePromo />
        <LandingCTA isLoggedIn={!!user} />
      </main>

      <Footer />
    </div>
  );
}
