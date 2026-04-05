import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import SavedJob from '@/lib/models/savedJob.model';
import Job from '@/lib/models/job.model';
import Application from '@/lib/models/application.model';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/actions/auth.action';

// GET /api/jobs/saved — Get saved jobs
export async function GET() {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const savedJobs = await SavedJob.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    const jobIds = savedJobs.map((s: any) => s.jobId);
    
    const mongoJobs = await Job.find({ _id: { $in: jobIds } }).lean();

    const posterIds = [...new Set(mongoJobs.map((j: any) => j.posterId))];
    const posters = await prisma.user.findMany({
      where: { id: { in: posterIds } },
      select: { id: true, name: true, profileURL: true },
    });
    const posterMap = posters.reduce((acc: any, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    const applicationsCount = await Application.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      { $group: { _id: "$jobId", count: { $sum: 1 } } }
    ]);
    const countsMap = applicationsCount.reduce((acc: any, curr) => {
      acc[curr._id.toString()] = curr.count;
      return acc;
    }, {});

    const jobs = mongoJobs.map((j: any) => ({
      ...j,
      id: j._id.toString(),
      _id: undefined,
      poster: posterMap[j.posterId] || null,
      _count: { applications: countsMap[j._id.toString()] || 0 }
    }));

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch saved jobs' }, { status: 500 });
  }
}

// POST /api/jobs/saved — Toggle save/unsave
export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { jobId } = await request.json();

    const existing = await SavedJob.findOne({ userId: user.id, jobId });

    if (existing) {
      await SavedJob.findByIdAndDelete(existing._id);
      return NextResponse.json({ saved: false });
    } else {
      await SavedJob.create({ userId: user.id, jobId });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error('Error toggling saved job:', error);
    return NextResponse.json({ error: 'Failed to save job' }, { status: 500 });
  }
}
