"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { prisma } from "@/lib/prisma";
import { feedbackSchema } from "@/constants";

// Helper function to get or create a badge
async function getOrCreateBadge(
  badgeName: string,
  imageUrl: string = "/badges/default.png"
) {
  try {
    let badge = await prisma.badge.findUnique({
      where: { name: badgeName },
    });

    if (!badge) {
      badge = await prisma.badge.create({
        data: {
          name: badgeName,
          imageUrl,
          description: getBadgeDescription(badgeName),
        },
      });
    }

    return badge.id;
  } catch (error) {
    console.error(`Error getting or creating badge ${badgeName}:`, error);
    return null;
  }
}

// Helper function to get badge descriptions
function getBadgeDescription(badgeName: string): string {
  const descriptions: { [key: string]: string } = {
    "First Interview": "Completed your first mock interview",
    "10 Tokens": "Earned 10 tokens",
    "50 Tokens": "Earned 50 tokens",
    "7-Day Streak": "7-day practice streak",
  };
  return descriptions[badgeName] || badgeName;
}

// Helper function to safely award badge
async function awardBadge(userId: string, badgeName: string) {
  try {
    const badgeId = await getOrCreateBadge(badgeName);

    if (!badgeId) {
      console.warn(`Could not create badge ${badgeName}`);
      return;
    }

    await prisma.userBadge.upsert({
      where: { userId_badgeId: { userId, badgeId } },
      update: {},
      create: { userId, badgeId },
    });

    console.log(`✅ Badge awarded: ${badgeName}`);
  } catch (error) {
    console.error(`Error awarding badge ${badgeName}:`, error);
  }
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.5-flash-lite", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided. Use EXACT category names:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem Solving**: Ability to analyze problems and propose solutions.
        - **Cultural Fit**: Alignment with company values and job role.
        - **Confidence and Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedbackData = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
    };

    let feedback;

    if (feedbackId) {
      // Update existing feedback
      feedback = await prisma.feedback.update({
        where: { id: feedbackId },
        data: feedbackData,
      });
    } else {
      // Create new feedback
      feedback = await prisma.feedback.create({
        data: feedbackData,
      });
    }

    // BADGE LOGIC - Award badges safely
    try {
      const interviewCount = await prisma.interview.count({
        where: { userId },
      });
      const tokenObj = await prisma.token.findUnique({ where: { userId } });
      const tokens = tokenObj?.amount ?? 0;

      // 1. First Interview badge
      if (interviewCount === 1 && tokens >= 10) {
        await awardBadge(userId, "First Interview");
      }

      // 2. 10 tokens badge
      if (tokens >= 10) {
        await awardBadge(userId, "10 Tokens");
      }

      // 3. 50 tokens badge
      if (tokens >= 50) {
        await awardBadge(userId, "50 Tokens");
      }

      // 4. 7-day streak badge
      const streakObj = await prisma.streak.findUnique({ where: { userId } });
      const streak = streakObj?.count ?? 0;
      if (streak >= 7) {
        await awardBadge(userId, "7-Day Streak");
      }
    } catch (badgeError) {
      console.error("Error awarding badges:", badgeError);
      // Don't fail the entire feedback creation if badges fail - they're secondary
    }

    return { success: true, feedbackId: feedback.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const interview = await prisma.interview.findUnique({
      where: { id },
    });

    return interview as Interview | null;
  } catch (error) {
    console.error("Error getting interview:", error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        interviewId_userId: {
          interviewId,
          userId,
        },
      },
    });

    if (!feedback) return null;

    const parsedCategoryScores = (() => {
      const raw = feedback.categoryScores;
      if (Array.isArray(raw)) return raw;
      if (typeof raw === "string") {
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    })();

    return {
      ...feedback,
      categoryScores: parsedCategoryScores as any,
      createdAt: feedback.createdAt.toISOString(),
    } as Feedback;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        finalized: true,
        userId: {
          not: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return interviews.map((interview) => ({
      ...interview,
      createdAt: interview.createdAt.toISOString(),
    })) as Interview[];
  } catch (error) {
    console.error("Error getting latest interviews:", error);
    return null;
  }
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return interviews.map((interview) => ({
      ...interview,
      createdAt: interview.createdAt.toISOString(),
    })) as Interview[];
  } catch (error) {
    console.error("Error getting user interviews:", error);
    return null;
  }
}
