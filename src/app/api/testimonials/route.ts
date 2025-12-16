import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/services/LandingPage/testimonialsService";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET() {
  try {
    const data = await getTestimonials();
    return withCors(NextResponse.json(data));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return withCors(
      NextResponse.json(
        { error: "Failed to fetch testimonials" },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return corsOptions();
}
