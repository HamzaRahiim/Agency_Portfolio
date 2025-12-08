import HeroSection from "@/components/sections/HeroSection";
import TrustBadgesSection from "@/components/sections/TrustBadgesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StoreManagementSection from "@/components/sections/StoreManagementSection";
import GrowthProcessSection from "@/components/sections/GrowthProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SuccessfulStoresSection from "@/components/sections/SuccessfulStoresSection";

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
    </>
  );
}