import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/auth.action";

// GET /api/profile — Get current user's full profile
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        profileURL: true,
        resumeURL: true,
        resumeFileName: true,
        accountType: true,
        city: true,
        phone: true,
        bio: true,
        tagline: true,
        skills: true,
        languages: true,
        education: true,
        socialLinks: true,
        workPreferences: true,
        isAvailable: true,
        availableFrom: true,
        createdAt: true,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/profile — Update profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    // Whitelist allowed fields
    const allowedFields = [
      "name",
      "profileURL",
      "resumeURL",
      "resumeFileName",
      "accountType",
      "city",
      "phone",
      "bio",
      "tagline",
      "skills",
      "languages",
      "education",
      "socialLinks",
      "workPreferences",
      "isAvailable",
      "availableFrom",
    ];

    const data: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
