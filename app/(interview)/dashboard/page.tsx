import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { Bot, Sparkles, Users, BookOpen } from "lucide-react";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-6 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full w-fit border border-brand-border">
              <Bot className="w-4 h-4 text-brand-blue-bright" />
              <span
                className="text-sm font-medium text-brand-blue-bright"
                style={{ fontFamily: "var(--font-space)" }}
              >
                IntervueAI — Powered by Google Gemini
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Master Your Next{" "}
              <span className="text-gradient-blue">Tech Interview</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-text-secondary max-w-lg">
              AI-powered mock interviews, personalized feedback, and
              comprehensive preparation tools.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/intervue-ai" className="btn-jobvue-primary">
                <Sparkles className="w-4 h-4" />
                Start AI Interview
              </Link>
              <Link href="/peer-interview" className="btn-jobvue-secondary">
                <Users className="w-4 h-4" />
                Peer Interview
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border hover:border-brand-blue-bright text-brand-text-secondary hover:text-brand-blue-bright rounded-xl transition-all text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                Practice Quiz
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border hover:border-brand-blue-bright text-brand-text-secondary hover:text-brand-blue-bright rounded-xl transition-all text-sm font-medium"
              >
                <Users className="w-4 h-4" />
                Community
              </Link>
              <Link
                href="https://intervuexai-resume.streamlit.app/"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-brand-border hover:border-brand-blue-bright text-brand-text-secondary hover:text-brand-blue-bright rounded-xl transition-all text-sm font-medium"
              >
                📄 Resume Analyzer
              </Link>
            </div>
          </div>

          <div className="relative lg:max-w-md xl:max-w-lg">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue-bright/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl"></div>

            <div className="relative clay-card-soft !p-2">
              <Image
                src="/robot.png"
                alt="AI Interview Assistant"
                width={400}
                height={400}
                className="rounded-xl"
              />

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-md p-3 border-2 border-brand-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-brand-text">
                    AI Assistant Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              value: "10K+",
              label: "Practice Questions",
              color: "text-brand-blue-bright",
            },
            { value: "95%", label: "Success Rate", color: "text-brand-purple" },
            {
              value: "50+",
              label: "Tech Roles",
              color: "text-brand-blue-bright",
            },
            {
              value: "24/7",
              label: "AI Availability",
              color: "text-brand-green",
            },
          ].map((stat, i) => (
            <div key={i} className="clay-card-soft text-center">
              <div
                className={`text-2xl md:text-3xl font-bold ${stat.color}`}
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-brand-text-secondary mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Interviews Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold text-brand-text"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Your Recent Interviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPastInterviews ? (
            userInterviews?.slice(0, 3).map((interview) => (
              <div key={interview.id} className="clay-card-soft">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full clay-card-soft text-center py-8">
              <div className="w-16 h-16 mx-auto bg-brand-bg rounded-full flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-brand-text-secondary" />
              </div>
              <h3
                className="text-lg font-medium text-brand-text mb-2"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                No interviews yet
              </h3>
              <p className="text-brand-text-secondary mb-4">
                Start practicing to track your progress
              </p>
              <Link href="/intervue-ai" className="btn-jobvue-primary">
                Start Your First Interview
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Available Interviews Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2
          className="text-2xl font-bold text-brand-text mb-6"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Recommended Interviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasUpcomingInterviews ? (
            allInterview?.slice(0, 3).map((interview) => (
              <div key={interview.id} className="clay-card-soft">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-brand-text-secondary">
                No interviews available at the moment
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 rounded-[32px] mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold text-center text-brand-text mb-12"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Why Choose <span className="text-gradient-blue">IntervueAI</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Instant Feedback",
                desc: "Get real-time analysis of your answers with AI-powered feedback.",
                color: "bg-blue-100 text-brand-blue-bright",
              },
              {
                icon: Bot,
                title: "Personalized Practice",
                desc: "Customized questions based on your target role and skill level.",
                color: "bg-purple-100 text-brand-purple",
              },
              {
                icon: Users,
                title: "Peer Interviews",
                desc: "Practice with other users and get feedback from the community.",
                color: "bg-green-100 text-brand-green",
              },
            ].map((feature, i) => (
              <div key={i} className="clay-card-soft">
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-xl font-semibold text-brand-text mb-2"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-brand-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
