/**
 * Custom 404 Not Found Page
 *
 * This file is automatically used by Next.js App Router when:
 * - A route doesn't exist
 * - You call `notFound()` function in a route
 *
 * Next.js automatically shows this page for unmatched routes.
 *
 * Note: This is different from error.tsx - it handles 404s specifically,
 * while error.tsx handles runtime errors.
 *
 * Note: This is a Client Component because it uses onClick handler.
 */

"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* 404 Display */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        </div>

        {/* Description */}
        <p className="max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Links */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
