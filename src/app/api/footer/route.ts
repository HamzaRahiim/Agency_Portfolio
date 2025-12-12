import { NextResponse } from "next/server";
import { getFooterData } from "@/lib/services/LandingPage/footerService";

export async function GET() {
  try {
    const data = await getFooterData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer data" },
      { status: 500 }
    );
  }
}
