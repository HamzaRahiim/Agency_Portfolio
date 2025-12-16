import { NextResponse } from "next/server";

/**
 * CORS headers for API routes
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * Helper to add CORS headers to NextResponse
 */
export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export function corsOptions() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

