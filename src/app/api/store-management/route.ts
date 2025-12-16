import { NextResponse } from "next/server";
import { getStoreManagement } from "@/lib/services/LandingPage/storeManagementService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getStoreManagement();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching store management:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch store management" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
