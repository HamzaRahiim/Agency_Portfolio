import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/services/LandingPage/testimonialsService";

export async function GET() {
  try {
    const data = await getTestimonials();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
