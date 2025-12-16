
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadCaptureModal from "@/components/ui/LeadCaptureModal";
// import { GoogleAnalytics } from '@next/third-parties/google';

// ============================================
// FONT CONFIGURATION
// ============================================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS variable for font
  display: "swap", // Better performance
});

// ============================================
// METADATA (SEO)
// ============================================
export const metadata: Metadata = {
  title: {
    default: "Fast Line Media - Ecommerce Automation & Store Management Agency",
    template: "%s | Fast Line Media",
  },
  description: "Fast Line Media helps brands scale and succeed on Amazon, Walmart, Shopify, and TikTok with AI-driven automation, expert marketing, and seamless store management. Maximize growth, efficiency, and profitability with our done-for-you ecommerce solutions.",
  keywords: [
    "Amazon FBA",
    "Amazon Wholesale",
    "Amazon Private Label",
    "TikTok Shop Automation",
    "Shopify Dropshipping",
    "Walmart Automation",
    "Ecommerce Automation",
    "Store Management",
    "Ecommerce Agency",
    "Online Store Setup",
    "Amazon Account Management",
    "Ecommerce Marketing",
    "Proxy Marketing",
    "Ecommerce Solutions",
    "Fast Line Media",
  ],
  authors: [{ name: "Fast Line Media" }],
  creator: "Fast Line Media",
  publisher: "Fast Line Media",

  // Open Graph (Social media previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastliine.netlify.app/",
    title: "Fast Line Media - Ecommerce Automation & Store Management Agency",
    description: "We help brands scale and succeed on Amazon, Walmart, Shopify, and TikTok with AI-driven automation, expert marketing, and seamless store management—maximizing growth, efficiency, and profitability.",
    siteName: "Fast Line Media",
    images: [
      {
        url: "https://fastliine.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fast Line Media - Ecommerce Automation Agency",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Fast Line Media - Ecommerce Automation & Store Management Agency",
    description: "We help brands scale and succeed on Amazon, Walmart, Shopify, and TikTok with AI-driven automation, expert marketing, and seamless store management.",
    images: ["https://fastliine.netlify.app/twitter-image.jpg"],
    creator: "@fastlinemedia",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (Google Search Console, etc.)
  verification: {
    // google: "your-google-verification-code", // Add when available
  },

  // Additional metadata
  metadataBase: new URL("https://fastliine.netlify.app/"),
  alternates: {
    canonical: "https://fastliine.netlify.app/",
  },
};

// ============================================
// ROOT LAYOUT
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <ModalProvider>
          <Header />

          {/* Main Content */}
          <main>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            {/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
          </main>

          {/* Global Footer */}
          <Footer />

            {/* Lead Capture Modal - Shows after 1 minute or when triggered from Header */}
          <LeadCaptureModal />

          {/* Optional: Toast Notifications */}
          {/* <Toaster /> */}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}