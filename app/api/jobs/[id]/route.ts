import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";
import Application from "@/lib/models/application.model";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth.action";

// GET /api/jobs/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    const mongoJob = await Job.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { returnDocument: "after" }
    ).lean();

    if (!mongoJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const poster = await prisma.user.findUnique({
      where: { id: mongoJob.posterId },
      select: {
        id: true,
        name: true,
        profileURL: true,
        city: true,
        tagline: true,
        createdAt: true,
      },
    });

    const applicationsCount = await Application.countDocuments({ jobId: id });

    const job = {
      ...mongoJob,
      id: mongoJob._id.toString(),
      _id: undefined,
      poster,
      _count: { applications: applicationsCount },
    };

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
}

// PUT /api/jobs/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await Job.findById(id);
    if (!existing || existing.posterId !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const body = await request.json();
    const updatePayload = { ...body };

    if (typeof body.isClosed === "boolean") {
      updatePayload.status = body.isClosed ? "closed" : "open";
      delete updatePayload.isClosed;
    }

    const job = await Job.findByIdAndUpdate(id, updatePayload, {
      returnDocument: "after",
    });

    return NextResponse.json({ ...job.toObject(), id: job._id.toString() });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await Job.findById(id);
    if (!existing || existing.posterId !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await Job.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
