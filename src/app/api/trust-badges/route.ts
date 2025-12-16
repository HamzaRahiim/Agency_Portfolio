import { NextResponse } from "next/server";
import { getTrustBadges } from "@/lib/services/LandingPage/trustBadgesService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getTrustBadges();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching trust badges:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch trust badges" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
