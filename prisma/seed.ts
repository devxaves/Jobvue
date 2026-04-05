import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import Job from "../lib/models/job.model";
import Application from "../lib/models/application.model";
import SavedJob from "../lib/models/savedJob.model";

const prisma = new PrismaClient();
const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  console.log("🌱 Seeding JobVue AI database...");

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is required to seed the database.");
  }

  console.log("🔗 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: "jobvue" });

  // Clear Mongo Collections
  await Job.deleteMany({});
  await Application.deleteMany({});
  await SavedJob.deleteMany({});

  // ---------- DEMO USERS ----------
  const demoPassword = await bcrypt.hash("demo1234", 10);
  const posterPassword = await bcrypt.hash("poster1234", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@jobvue.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@jobvue.com",
      password: demoPassword,
      accountType: "both",
      city: "Kolkata",
      bio: "Full-stack developer and open source enthusiast. Looking for freelance gigs in web development.",
      tagline: "🚀 Building cool stuff with code",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Tailwind CSS",
        "PostgreSQL",
      ],
      languages: ["English", "Hindi", "Bengali"],
      isAvailable: true,
      education: JSON.stringify([
        {
          institution: "IIT Kharagpur",
          degree: "B.Tech CSE",
          year: "2025",
          cgpa: "8.9",
        },
      ]),
      socialLinks: JSON.stringify({
        linkedin: "https://linkedin.com/in/demo-user",
        github: "https://github.com/demo-user",
        portfolio: "https://demo-user.dev",
      }),
    },
  });
  console.log(`✅ Demo user created...`);

  const posterUser = await prisma.user.upsert({
    where: { email: "poster@jobvue.com" },
    update: {},
    create: {
      name: "Startup Founder",
      email: "poster@jobvue.com",
      password: posterPassword,
      accountType: "poster",
      city: "Bangalore",
      bio: "Building the next unicorn",
      tagline: "💼 Hiring at TechStart.io",
      skills: ["Product Management", "UX Design", "Leadership"],
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "priya@jobvue.com" },
    update: {},
    create: {
      name: "Priya Nair",
      email: "priya@jobvue.com",
      password: demoPassword,
      accountType: "both",
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: "rahul@jobvue.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul@jobvue.com",
      password: demoPassword,
      accountType: "seeker",
    },
  });

  // ---------- DEMO JOBS (MONGODB) ----------
  const reqObj = {
    posterId: posterUser.id,
    title: "React.js Frontend Developer — Build a SaaS Dashboard",
    description:
      "<p>We are building a <strong>SaaS analytics dashboard</strong> and need a skilled React developer.</p>",
    jobType: "freelance",
    category: "Tech & Development",
    skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    requirements: ["2+ years React experience", "Strong TypeScript skills"],
    payType: "fixed",
    payMin: 25000,
    payMax: 40000,
    isUrgent: true,
    status: "open",
    tags: ["react", "frontend", "saas"],
  };

  const job1 = await Job.create(reqObj);

  const job2 = await Job.create({
    posterId: posterUser.id,
    title: "Logo & Brand Identity Designer for EdTech Startup",
    description:
      "<p>We need a creative designer to craft our <strong>complete brand identity</strong>.</p>",
    jobType: "freelance",
    category: "UI/UX Design",
    skills: ["Logo Design", "Branding", "Figma", "Adobe Illustrator"],
    requirements: ["Portfolio with brand work"],
    payType: "fixed",
    payMin: 8000,
    payMax: 15000,
    status: "open",
  });

  const job3 = await Job.create({
    posterId: user3.id,
    title: "Social Media Manager — Instagram & LinkedIn",
    description:
      "<p>Manage our social media presence and grow our audience.</p>",
    jobType: "parttime",
    category: "Digital Marketing",
    skills: ["Social Media", "Content Creation", "Canva", "Analytics"],
    payType: "monthly",
    payMin: 8000,
    payMax: 12000,
    city: "Kolkata",
    status: "open",
  });

  console.log(`✅ MongoDB demo jobs created`);

  // ---------- DEMO APPLICATIONS (MONGODB) ----------
  await Application.create([
    {
      jobId: job1._id,
      applicantId: demoUser.id,
      coverNote: "I have 2+ years of React experience.",
      expectedPay: 35000,
      status: "shortlisted",
    },
    {
      jobId: job2._id,
      applicantId: user3.id,
      coverNote: "Brand identity is my specialty!",
      expectedPay: 12000,
      status: "pending",
    },
    {
      jobId: job1._id,
      applicantId: user4.id,
      coverNote: "I have experience building React components.",
      expectedPay: 20000,
      status: "pending",
    },
  ]);

  // Update job applicant count
  await Job.findByIdAndUpdate(job1._id, { $inc: { applicantsCount: 2 } });
  await Job.findByIdAndUpdate(job2._id, { $inc: { applicantsCount: 1 } });

  console.log(`✅ MongoDB demo applications created`);

  // ---------- SAVED JOBS (MONGODB) ----------
  await SavedJob.create([
    { userId: demoUser.id, jobId: job2._id },
    { userId: user4.id, jobId: job1._id },
  ]);
  console.log(`✅ MongoDB saved jobs created`);

  // ---------- DEMO INTERVIEW (PRISMA) ----------
  const interview = await prisma.interview.create({
    data: {
      role: "Frontend Developer",
      level: "mid",
      type: "technical",
      techstack: ["React", "TypeScript", "CSS"],
      questions: [
        "What is the virtual DOM in React?",
        "Explain the difference between useMemo and useCallback.",
      ],
      finalized: true,
      userId: demoUser.id,
    },
  });

  await prisma.feedback.create({
    data: {
      interviewId: interview.id,
      userId: demoUser.id,
      totalScore: 78,
      categoryScores: JSON.stringify([
        { name: "Technical Knowledge", score: 80 },
      ]),
      strengths: ["Strong React fundamentals"],
      areasForImprovement: ["Needs deeper CSS architecture knowledge"],
      finalAssessment: "Good overall performance.",
    },
  });

  console.log("\n🎉 Seeding complete! Demo credentials:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📧 demo@jobvue.com  / 🔑 demo1234");
  console.log("📧 poster@jobvue.com / 🔑 poster1234");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await mongoose.disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    await mongoose.disconnect();
    process.exit(1);
  });
