
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
    default: "My App - Best Next.js App",
    template: "%s | My App", // Page titles will be "About | My App"
  },
  description: "Professional Next.js application with best practices",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",

  // Open Graph (Social media previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myapp.com",
    title: "My App",
    description: "Professional Next.js application",
    siteName: "My App",
    images: [
      {
        url: "https://myapp.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My App Preview",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "My App",
    description: "Professional Next.js application",
    images: ["https://myapp.com/twitter-image.jpg"],
    creator: "@yourusername",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Verification (Google Search Console, etc.)
  verification: {
    google: "your-google-verification-code",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
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

          {/* Lead Capture Modal - Shows after 30 seconds */}
          <LeadCaptureModal />

          {/* Optional: Toast Notifications */}
          {/* <Toaster /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}