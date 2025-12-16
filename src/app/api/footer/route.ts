import { NextResponse } from "next/server";
import { getFooterData } from "@/lib/services/LandingPage/footerService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getFooterData();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch footer data" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
