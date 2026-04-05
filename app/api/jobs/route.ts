import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";
import Application from "@/lib/models/application.model";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth.action";

// GET /api/jobs — List jobs with filtering
export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const mine = searchParams.get("mine") === "true";
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";
    const city = searchParams.get("city") || "";
    const payMin = searchParams.get("payMin")
      ? parseInt(searchParams.get("payMin")!)
      : undefined;
    const payMax = searchParams.get("payMax")
      ? parseInt(searchParams.get("payMax")!)
      : undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const query: any = {};

    if (mine) {
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      query.posterId = user.id;

      if (status) {
        query.status = status;
      }
    } else {
      query.status = status || "open";
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { skills: { $in: [new RegExp(search, "i")] } },
      ];
    }
    if (type) query.jobType = type;
    if (category) query.category = category;
    if (city) query.city = { $regex: city, $options: "i" };
    if (payMin !== undefined) query.payMax = { $gte: payMin }; // Jobs that pay up to this
    if (payMax !== undefined) query.payMin = { $lte: payMax }; // Jobs that pay at least this

    const [mongoJobs, total] = await Promise.all([
      Job.find(query)
        .sort({ isUrgent: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(query),
    ]);

    // Fetch relational data from Prisma and Application collections
    const posterIds = [...new Set(mongoJobs.map((j: any) => j.posterId))];
    const jobIds = mongoJobs.map((j: any) => j._id);

    const posters = await prisma.user.findMany({
      where: { id: { in: posterIds } },
      select: { id: true, name: true, profileURL: true, city: true },
    });

    // Create poster map for quick lookup
    const posterMap = posters.reduce((acc: any, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    // Count applications for each job
    const applicationsCount = await Application.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      { $group: { _id: "$jobId", count: { $sum: 1 } } },
    ]);
    const countsMap = applicationsCount.reduce((acc: any, curr) => {
      acc[curr._id.toString()] = curr.count;
      return acc;
    }, {});

    const jobs = mongoJobs.map((j: any) => ({
      ...j,
      id: j._id.toString(),
      _id: undefined,
      status: j.status || "open",
      isClosed: j.status === "closed",
      isDraft: j.status === "paused",
      poster: posterMap[j.posterId] || null,
      _count: { applications: countsMap[j._id.toString()] || 0 },
    }));

    return NextResponse.json({
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST /api/jobs — Create a new job
export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const activeCount = await Job.countDocuments({
      posterId: user.id,
      status: "open",
    });
    if (activeCount >= 5) {
      return NextResponse.json(
        { error: "Maximum 5 active job postings allowed" },
        { status: 429 }
      );
    }

    const job = await Job.create({
      title: body.title,
      description: body.description,
      jobType: body.jobType,
      category: body.category,
      skills: body.skills || [],
      requirements: body.requirements || [],
      workMode: body.workMode || "remote",
      address: body.address || null,
      city: body.city || null,
      payType: body.payType || "negotiable",
      payMin: body.payMin ? parseInt(body.payMin) : null,
      payMax: body.payMax ? parseInt(body.payMax) : null,
      positions: body.positions ? parseInt(body.positions) : 1,
      isUrgent: body.isUrgent || false,
      deadline: body.deadline ? new Date(body.deadline) : null,
      tags: body.tags || [],
      posterId: user.id,
      status: body.isDraft ? "paused" : "open",
    });

    const jobResponse = {
      ...job.toObject(),
      id: job._id.toString(),
      _id: undefined,
    };
    return NextResponse.json(jobResponse, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
