/**
 * Get the base URL for API calls
 * Uses relative URLs for same-origin requests (Next.js API routes)
 * Only uses NEXT_PUBLIC_BASE_URL if explicitly set (for external APIs)
 */
export function getApiUrl(path: string): string {
  // If NEXT_PUBLIC_BASE_URL is set, use it (for external APIs or specific deployments)
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
  }
  
  // For same-origin requests (Next.js API routes), use relative URLs
  // This works correctly in both development and production
  return path;
}

