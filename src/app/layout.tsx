
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
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo";
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
    default: "Fast Line Agency - Meta Ads & Shopify Store Management Services",
    template: "%s | Fast Line Agency",
  },
  description: "Fast Line Agency specializes in Meta Ads management and Shopify store development. We help ecommerce brands scale with expert Facebook & Instagram advertising and high-converting Shopify stores. Get professional Meta Ads campaigns and custom Shopify solutions.",
  keywords: [
    "Meta Ads Management",
    "Facebook Ads",
    "Instagram Ads",
    "Meta Advertising",
    "Shopify Development",
    "Shopify Store Setup",
    "Shopify Store Management",
    "Ecommerce Agency",
    "Facebook Marketing",
    "Instagram Marketing",
    "Social Media Advertising",
    "Shopify Theme Development",
    "Shopify Optimization",
    "Meta Ads Agency",
    "Shopify Agency",
    "Fast Line Agency",
    "Ecommerce Marketing",
    "Paid Social Advertising",
    "Shopify Store Design",
    "Meta Campaign Management",
  ],
  authors: [{ name: "Fast Line Agency" }],
  creator: "Fast Line Agency",
  publisher: "Fast Line Agency",

  // Open Graph (Social media previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastlineagency.com/",
    title: "Fast Line Agency - Meta Ads & Shopify Store Management Services",
    description: "Expert Meta Ads management and Shopify store development. We help ecommerce brands scale with professional Facebook & Instagram advertising and high-converting Shopify stores.",
    siteName: "Fast Line Agency",
    images: [
      {
        url: "https://fastlineagency.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fast Line Agency - Meta Ads & Shopify Services",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Fast Line Agency - Meta Ads & Shopify Store Management Services",
    description: "Expert Meta Ads management and Shopify store development. Scale your ecommerce brand with professional advertising and store solutions.",
    images: ["https://fastlineagency.com/twitter-image.jpg"],
    creator: "@fastlineagency",
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
    google: "hskl6o7fhJs7w1kSEnzqkjIh6NhNnsKQsuIME9PMdMQ",
  },

  // Additional metadata
  metadataBase: new URL("https://fastlineagency.com/"),
  alternates: {
    canonical: "https://fastlineagency.com/",
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
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
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