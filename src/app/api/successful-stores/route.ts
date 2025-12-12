import { NextResponse } from "next/server";
import { getSuccessfulStores } from "@/lib/services/LandingPage/successfulStoresService";

export async function GET() {
  try {
    const data = await getSuccessfulStores();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching successful stores:", error);
    return NextResponse.json(
      { error: "Failed to fetch successful stores" },
      { status: 500 }
    );
  }
}
