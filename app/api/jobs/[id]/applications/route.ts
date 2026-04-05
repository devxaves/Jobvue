import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import Job from '@/lib/models/job.model';
import Application from '@/lib/models/application.model';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/actions/auth.action';

// GET /api/jobs/[id]/applications — Get applications (poster only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: jobId } = await params;
    const job = await Job.findById(jobId).lean();

    if (!job || job.posterId !== user.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';

    const query: any = { jobId };
    if (status) query.status = status;

    const applications = await Application.find(query).sort({ createdAt: -1 }).lean();

    const applicantIds = [...new Set(applications.map((app: any) => app.applicantId))];
    const applicants = await prisma.user.findMany({
      where: { id: { in: applicantIds } },
      select: { id: true, name: true, email: true, profileURL: true, city: true, resumeURL: true },
    });
    const applicantMap = applicants.reduce((acc: any, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    const enrichedApplications = applications.map((app: any) => ({
      ...app,
      id: app._id.toString(),
      _id: undefined,
      applicant: applicantMap[app.applicantId] || null,
    }));

    return NextResponse.json(enrichedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
