import HeroSection from "@/components/sections/LandingPage/HeroSection";
import TrustBadgesSection from "@/components/sections/LandingPage/TrustBadgesSection";
import ServicesSection from "@/components/sections/LandingPage/ServicesSection";
import StoreManagementSection from "@/components/sections/LandingPage/StoreManagementSection";
import GrowthProcessSection from "@/components/sections/LandingPage/GrowthProcessSection";
import TestimonialsSection from "@/components/sections/LandingPage/TestimonialsSection";
import SuccessfulStoresSection from "@/components/sections/LandingPage/SuccessfulStoresSection";
import CaseStudiesSection from "@/components/sections/LandingPage/CaseStudiesSection";

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