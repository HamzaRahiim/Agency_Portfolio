import { NextResponse } from "next/server";
import { getHeaderData } from "@/lib/services/LandingPage/headerService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getHeaderData();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching header data:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch header data" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
