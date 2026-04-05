import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";
import Application from "@/lib/models/application.model";
import { getCurrentUser } from "@/lib/actions/auth.action";

// POST /api/jobs/[id]/apply — Submit application
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: jobId } = await params;
    const job = await Job.findById(jobId);

    if (!job)
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    if (job.status !== "open")
      return NextResponse.json(
        { error: "This job is no longer accepting applications" },
        { status: 400 }
      );
    if (job.posterId === user.id)
      return NextResponse.json(
        { error: "You cannot apply to your own job posting" },
        { status: 400 }
      );
    if (job.deadline && new Date(job.deadline) < new Date()) {
      return NextResponse.json(
        { error: "Application deadline has passed" },
        { status: 400 }
      );
    }

    // Check duplicate
    const existing = await Application.findOne({ jobId, applicantId: user.id });
    if (existing)
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 409 }
      );

    // In a real app we'd also check application limit if stored on the job, but for now we proceed

    const body = await request.json();
    if (!body.coverNote || !String(body.coverNote).trim()) {
      return NextResponse.json(
        { error: "Cover note is required" },
        { status: 400 }
      );
    }

    const application = await Application.create({
      jobId,
      applicantId: user.id,
      coverNote: String(body.coverNote).trim(),
      relevantExperience: body.relevantExperience || null,
      portfolioLink: body.portfolioLink || null,
      resumeLink: body.resumeUrl || null,
      expectedPay: body.expectedPay ? parseInt(body.expectedPay) : null,
    });

    // Increment applicantsCount
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

    return NextResponse.json(
      { ...application.toObject(), id: application._id.toString() },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 409 }
      );
    }
    console.error("Error applying to job:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
