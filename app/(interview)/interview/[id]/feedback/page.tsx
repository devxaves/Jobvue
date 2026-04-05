import { redirect } from "next/navigation";
import FeedbackClient from "@/components/FeedbackClient";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  if (!feedback) {
    redirect(`/interview/${id}`);
  }

  return (
    <FeedbackClient
      userId={user.id}
      interviewId={id}
      interviewRole={interview.role}
      feedback={feedback}
    />
  );
};

export default Feedback;
