import type { Metadata } from "next";
import HeroSection from "@/components/sections/LandingPage/HeroSection";
import TrustBadgesSection from "@/components/sections/LandingPage/TrustBadgesSection";
import ServicesSection from "@/components/sections/LandingPage/ServicesSection";
import StoreManagementSection from "@/components/sections/LandingPage/StoreManagementSection";
import GrowthProcessSection from "@/components/sections/LandingPage/GrowthProcessSection";
import TestimonialsSection from "@/components/sections/LandingPage/TestimonialsSection";
import SuccessfulStoresSection from "@/components/sections/LandingPage/SuccessfulStoresSection";
import CaseStudiesSection from "@/components/sections/LandingPage/CaseStudiesSection";

export const metadata: Metadata = {
  title: "Fast Line Agency - Meta Ads & Shopify Store Management Services",
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
  ],
  openGraph: {
    title: "Fast Line Agency - Meta Ads & Shopify Store Management Services",
    description: "Expert Meta Ads management and Shopify store development. We help ecommerce brands scale with professional Facebook & Instagram advertising and high-converting Shopify stores.",
    url: "https://fastlineagency.com/",
    siteName: "Fast Line Agency",
    images: [
      {
        url: "https://fastlineagency.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fast Line Agency - Meta Ads & Shopify Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Line Agency - Meta Ads & Shopify Store Management Services",
    description: "Expert Meta Ads management and Shopify store development. Scale your ecommerce brand with professional advertising and store solutions.",
    images: ["https://fastlineagency.com/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://fastlineagency.com/",
  },
};

export default function Home() {
  return (
    <>
      <div key="hero-wrapper">
        <HeroSection />
      </div>
      <div key="trust-badges-wrapper">
        <TrustBadgesSection />
      </div>
      <div key="services-wrapper">
        <ServicesSection />
      </div>
      <div key="store-management-wrapper">
        <StoreManagementSection />
      </div>
      <div key="growth-process-wrapper">
        <GrowthProcessSection />
      </div>
      <div key="testimonials-wrapper">
        <TestimonialsSection />
      </div>
      <div key="successful-stores-wrapper">
        <SuccessfulStoresSection />
      </div>
      <div key="case-studies-wrapper">
        <CaseStudiesSection />
      </div>
    </>
  );
}