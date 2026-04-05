import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import Application from '@/lib/models/application.model';
import Job from '@/lib/models/job.model';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/actions/auth.action';

// GET /api/applications — My applications
export async function GET() {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const applications = await Application.find({ applicantId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    const jobIds = [...new Set(applications.map((app: any) => app.jobId))];
    const jobs = await Job.find({ _id: { $in: jobIds } }).lean();

    const posterIds = [...new Set(jobs.map((job: any) => job.posterId))];
    const posters = await prisma.user.findMany({
      where: { id: { in: posterIds } },
      select: { id: true, name: true },
    });
    const posterMap = posters.reduce((acc: any, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    const jobMap = jobs.reduce((acc: any, curr: any) => {
      acc[curr._id.toString()] = {
        ...curr,
        id: curr._id.toString(),
        _id: undefined,
        poster: posterMap[curr.posterId] || null,
      };
      return acc;
    }, {});

    const enrichedApplications = applications.map((app: any) => ({
      ...app,
      id: app._id.toString(),
      _id: undefined,
      job: jobMap[app.jobId.toString()] || null,
    }));

    return NextResponse.json(enrichedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
