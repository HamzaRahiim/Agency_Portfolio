"use client";

import { SectionHeader } from "@/components/servicePage/SectionHeader";
import MetaAdsPlans from "@/components/plans/MetaAdsPlans";
import ShopifyPlans from "@/components/plans/ShopifyPlans";

export default function PlansPageClient() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <SectionHeader
        badge="PRICING PLANS"
        title="Choose Your"
        titleHighlight="Perfect Plan"
        description="Select the plan that best fits your business needs. All plans include expert support and proven strategies."
      />
      
      {/* Meta Ads Plans */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <MetaAdsPlans />
      </div>

      {/* Shopify Plans */}
      <div className="mt-16 sm:mt-20 lg:mt-24">
        <ShopifyPlans />
      </div>
    </div>
  );
}

