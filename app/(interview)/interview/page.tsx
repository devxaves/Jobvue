import Link from "next/link";
import InterviewCard from "@/components/InterviewCard";
import IntervueCreateExperience from "@/components/IntervueCreateExperience";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

const Page = async () => {
  const user = await getCurrentUser();
  const interviews = await getInterviewsByUserId(user?.id!);
  const recentInterviews = interviews?.slice(0, 6) || [];

  return (
    <div className="space-y-12">
      <IntervueCreateExperience userId={user?.id!} />

      <section id="past-interviews" className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              className="text-2xl font-bold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Past Interviews
            </h2>
            <p className="text-brand-text-secondary mt-1">
              Review your recent sessions and jump back into feedback anytime.
            </p>
          </div>
          <Link href="/dashboard" className="btn-jobvue-secondary">
            Go to Dashboard
          </Link>
        </div>

        {recentInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentInterviews.map((interview) => (
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
            ))}
          </div>
        ) : (
          <div className="clay-card-soft text-center py-10">
            <h3
              className="text-lg font-semibold text-brand-text"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              No past interviews yet
            </h3>
            <p className="text-brand-text-secondary mt-2">
              Start your first mock interview and your history will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
