"use client";

import { useEffect, useState } from "react";
import type { Service, ServicesData } from "@/types/services";
import { ServiceHero } from "@/components/servicePage/ServiceHero";
import { ServiceProblemSolution } from "@/components/servicePage/ServiceProblemSolution";
import { ServiceDeliverables } from "@/components/servicePage/ServiceDeliverables";
import { ServiceProcess } from "@/components/servicePage/ServiceProcess";
import { ServiceCaseHighlights } from "@/components/servicePage/ServiceCaseHighlights";
import { ServiceFAQ } from "@/components/servicePage/ServiceFAQ";

interface ServicePageClientProps {
  slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchService = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/services`);

        if (!res.ok) {
          throw new Error(`Failed to load services: ${res.status}`);
        }

        const data = (await res.json()) as ServicesData;

        if (!data || !Array.isArray(data.services)) {
          throw new Error("Services data is not in the expected format.");
        }

        const found = data.services.find((item) => item.slug === slug) ?? null;
        
        // Only update state if component is still mounted
        if (isMounted) {
          setService(found);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("ServicePageClient: error loading service", err);
        if (isMounted) {
          setError("Something went wrong while loading this service.");
          setIsLoading(false);
        }
      }
    };

    fetchService();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-muted-foreground">
        Loading service details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-muted-foreground text-sm">
          Please try refreshing the page or navigating back to the services list.
        </p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Service not found</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find the service you&apos;re looking for. It might have been moved or renamed.
        </p>
      </div>
    );
  }

  return (
    <>
      <ServiceHero service={service} />
      <ServiceProblemSolution service={service} />
      <ServiceDeliverables service={service} />
      <ServiceProcess service={service} />
      <ServiceCaseHighlights service={service} />
      <ServiceFAQ service={service} />
      {/* Placeholder anchor for hero CTA */}
      <section id="service-contact" className="pb-20" />
    </>
  );
}


