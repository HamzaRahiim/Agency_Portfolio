import { NextResponse } from "next/server";
import { getSuccessfulStores } from "@/lib/services/LandingPage/successfulStoresService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getSuccessfulStores();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching successful stores:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch successful stores" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
