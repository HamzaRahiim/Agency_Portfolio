import { NextResponse } from "next/server";
import { getCaseStudies } from "@/lib/services/LandingPage/caseStudiesService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getCaseStudies();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch case studies" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
