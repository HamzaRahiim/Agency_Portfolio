import type { Metadata } from "next";
import PlansPageClient from "@/components/plans/PlansPageClient";

export const metadata: Metadata = {
  title: "Pricing Plans - Meta Ads & Shopify Services",
  description: "Choose the perfect plan for your business. Fast Line Agency offers flexible pricing plans for Meta Ads management and Shopify store development services.",
  keywords: [
    "Meta Ads Pricing",
    "Shopify Development Pricing",
    "Meta Ads Plans",
    "Shopify Plans",
    "Ecommerce Agency Pricing",
    "Fast Line Agency Pricing",
  ],
  openGraph: {
    title: "Pricing Plans - Meta Ads & Shopify Services | Fast Line Agency",
    description: "Choose the perfect plan for your business. Flexible pricing plans for Meta Ads management and Shopify store development.",
    url: "https://fastlineagency.com/plans",
    siteName: "Fast Line Agency",
    images: [
      {
        url: "https://fastlineagency.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fast Line Agency Pricing Plans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://fastlineagency.com/plans",
  },
};

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-background">
      <PlansPageClient />
    </main>
  );
}
