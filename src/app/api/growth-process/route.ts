import { NextResponse } from "next/server";
import { getGrowthProcess } from "@/lib/services/LandingPage/growthProcessService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getGrowthProcess();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching growth process:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch growth process" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
