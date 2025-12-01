/**
 * Global Loading UI
 * 
 * This file is automatically used by Next.js App Router to show a loading state
 * while pages are being loaded. It's shown during:
 * - Route transitions
 * - Data fetching in Server Components
 * - When Suspense boundaries are triggered
 * 
 * Next.js automatically wraps your pages with this component during loading states.
 */

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
                {/* Spinner */}
                <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
                    <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-primary opacity-20"></div>
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-medium text-foreground">Loading...</p>
                    <p className="text-sm text-muted-foreground">Please wait</p>
                </div>

                {/* Loading Dots Animation */}
                <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                </div>
            </div>
        </div>
    );
}

