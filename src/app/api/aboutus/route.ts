import { NextResponse } from "next/server";
import { getAboutUs } from "@/lib/services/LandingPage/aboutusService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getAboutUs();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch about us data" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
