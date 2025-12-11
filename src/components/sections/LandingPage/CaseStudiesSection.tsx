"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { CaseStudy, CaseStudiesData } from "@/types/caseStudies";

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch case studies data from API route
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/case-studies`);

        if (!response.ok) {
          throw new Error("Failed to fetch case studies data");
        }

        const data: CaseStudiesData = await response.json();
        setCaseStudies(data.caseStudies);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
              Case Studies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
            Real Results from{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            See how we've helped companies achieve remarkable growth and success.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative pt-6 sm:pt-8 lg:pt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }) as any,
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-4 lg:-ml-6">
              {isLoading ? (
                <CarouselItem className="pl-2 sm:pl-4 lg:pl-6 basis-full">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Loading...</div>
                  </div>
                </CarouselItem>
              ) : (
                caseStudies.map((image) => (
                <CarouselItem
                  key={image.id}
                  className="pl-2 sm:pl-4 lg:pl-6 basis-full sm:basis-1/2 lg:basis-1/2"
                >
                  <div className="relative w-full h-auto rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border bg-card">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority={image.id === 1}
                    />
                  </div>
                </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious
              variant="outline"
              className="left-0 -translate-x-4 sm:-translate-x-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card/95 dark:bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-xl hover:bg-card hover:border-primary hover:shadow-2xl transition-all duration-300 !text-primary hover:!text-primary [&>svg]:!text-primary [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-[2.5]"
            />
            <CarouselNext
              variant="outline"
              className="right-0 translate-x-4 sm:translate-x-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card/95 dark:bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-xl hover:bg-card hover:border-primary hover:shadow-2xl transition-all duration-300 !text-primary hover:!text-primary [&>svg]:!text-primary [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-[2.5]"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

