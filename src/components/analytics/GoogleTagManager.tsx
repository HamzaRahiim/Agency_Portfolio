"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface GoogleTagManagerProps {
  gtmId: string;
}

/**
 * Google Tag Manager Component
 * 
 * Handles GTM initialization and SPA route change tracking for Next.js App Router.
 * This ensures page views are tracked correctly when users navigate between pages
 * without full page reloads (Single Page Application behavior).
 */
export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes (SPA navigation)
  useEffect(() => {
    // Wait for dataLayer to be initialized
    if (typeof window !== "undefined") {
      // Initialize dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || [];
      
      // Small delay to ensure GTM is loaded
      const trackPageView = () => {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "page_view",
            page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
            page_title: document.title,
            page_location: window.location.href,
          });
        }
      };

      // Track immediately and also after a short delay to ensure GTM is ready
      trackPageView();
      const timeoutId = setTimeout(trackPageView, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, searchParams]);

  if (!gtmId) {
    console.warn("Google Tag Manager ID is not configured. Please set NEXT_PUBLIC_GTM_ID environment variable.");
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

