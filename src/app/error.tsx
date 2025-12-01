/**
 * Global Error Boundary
 * 
 * This file is automatically used by Next.js App Router to catch and display errors
 * that occur in your application. It catches:
 * - Runtime errors in Server Components
 * - Errors during rendering
 * - Errors in nested routes
 * 
 * Next.js automatically wraps your app with this error boundary.
 * 
 * Note: This is a Client Component because it uses 'use client' directive
 * and handles user interactions (like resetting the error).
 */

"use client";

import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to error reporting service (e.g., Sentry, LogRocket)
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
            <div className="flex flex-col items-center gap-4 text-center">
                {/* Error Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    <svg
                        className="h-8 w-8 text-destructive"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-foreground">Something went wrong!</h1>
                    <p className="text-muted-foreground">
                        {error.message || "An unexpected error occurred"}
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                {/* Reset Button */}
                <button
                    onClick={reset}
                    className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}

