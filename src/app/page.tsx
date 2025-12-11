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
      <HeroSection />
      <TrustBadgesSection />
      <ServicesSection />
      <StoreManagementSection />
      <GrowthProcessSection />
      <TestimonialsSection />
      <SuccessfulStoresSection />
      <CaseStudiesSection />
    </>
  );
}