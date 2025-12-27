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
  title: "Fast Line Agency - Ecommerce Growth & Digital Marketing Agency",
  description: "Fast Line Agency helps ecommerce brands scale and succeed. We provide expert digital marketing services, store management, and growth strategies to maximize your online revenue and profitability.",
  keywords: [
    "Ecommerce Agency",
    "Digital Marketing Agency",
    "Ecommerce Growth",
    "Online Store Management",
    "Ecommerce Solutions",
    "Digital Marketing Services",
    "Ecommerce Consulting",
    "Online Business Growth",
    "Ecommerce Strategy",
    "Fast Line Agency",
  ],
  openGraph: {
    title: "Fast Line Agency - Ecommerce Growth & Digital Marketing Agency",
    description: "We help ecommerce brands scale and succeed with expert digital marketing services, store management, and growth strategies.",
    url: "https://fastlineagency.com/",
    siteName: "Fast Line Agency",
    images: [
      {
        url: "https://fastlineagency.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fast Line Agency - Ecommerce Growth Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Line Agency - Ecommerce Growth & Digital Marketing Agency",
    description: "We help ecommerce brands scale and succeed with expert digital marketing services and growth strategies.",
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