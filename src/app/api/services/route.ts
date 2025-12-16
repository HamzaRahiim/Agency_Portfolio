import { NextResponse } from "next/server";
import { getServices } from "@/lib/services/LandingPage/servicesService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getServices();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching services:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch services" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
