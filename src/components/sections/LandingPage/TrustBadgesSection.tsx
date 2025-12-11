"use client";

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CountUp from "react-countup";
import { Store, Star, Globe, DollarSign, CheckCircle, RefreshCw, LucideIcon } from "lucide-react";
import type { TrustBadge, TrustBadgesData } from "@/types/trustBadges";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Store,
  Star,
  Globe,
  DollarSign,
  CheckCircle,
  RefreshCw,
};

// Helper function to extract numeric value from badge number string
function extractNumber(value: string): number {
  // Remove all non-numeric characters except decimal points
  const cleaned = value.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);

  // Handle "M" for millions
  if (value.includes("M") || value.includes("m")) {
    return num * 1000000;
  }

  // Handle "K" for thousands
  if (value.includes("K") || value.includes("k")) {
    return num * 1000;
  }

  return num || 0;
}

// Helper function to format the number back to display format
function formatNumber(value: string, animatedValue: number): string {
  if (value.includes("M") || value.includes("m")) {
    return `$${(animatedValue / 1000000).toFixed(0)}M+`;
  }
  if (value.includes("K") || value.includes("k")) {
    return `${(animatedValue / 1000).toFixed(0)}K+`;
  }
  if (value.includes("%")) {
    return `${Math.round(animatedValue)}%`;
  }
  if (value.includes("+")) {
    return `${Math.round(animatedValue)}+`;
  }
  if (value.includes("yrs") || value.includes("yr")) {
    return `${Math.round(animatedValue)}+ yrs`;
  }
  if (value.includes("/")) {
    // For "24/7", don't animate, return original
    return value;
  }
  return `${Math.round(animatedValue)}`;
}

export default function TrustBadgesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [trustBadges, setTrustBadges] = useState<TrustBadge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch trust badges data from API route
  useEffect(() => {
    const fetchTrustBadges = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/trust-badges`);

        if (!response.ok) {
          throw new Error("Failed to fetch trust badges data");
        }

        const data: TrustBadgesData = await response.json();
        setTrustBadges(data.trustBadges);
      } catch (error) {
        console.error("Error fetching trust badges:", error);
        // Fallback to default data if fetch fails

      } finally {
        setIsLoading(false);
      }
    };

    fetchTrustBadges();
  }, []);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative pt-6 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 z-30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carousel Container */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
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
                  trustBadges.map((badge, index) => {
                    const targetValue = extractNumber(badge.number);
                    const shouldAnimate = !badge.number.includes("/"); // Don't animate "24/7"
                    const IconComponent = iconMap[badge.icon] || Store;

                    return (
                      <CarouselItem
                        key={index}
                        className="pl-2 sm:pl-4 lg:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div
                          className={`group relative w-full rounded-xl lg:rounded-2xl border-2 border-border bg-card shadow-lg backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 text-center cursor-pointer transition-all duration-300 ${activeCard === index
                            ? "border-primary shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
                            : "hover:border-primary hover:shadow-xl hover:shadow-primary/20 hover:bg-gradient-to-br hover:from-primary/5 hover:via-accent/5 hover:to-primary/5"
                            }`}
                          onClick={() => setActiveCard(activeCard === index ? null : index)}
                          onMouseLeave={() => setActiveCard(null)}
                        >
                          {/* Icon */}
                          <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center mb-3 sm:mb-4">
                            <div className={`text-primary group-hover:scale-110 transition-transform duration-300 origin-center ${badge.animation === "pulse" ? "animate-pulse" :
                              badge.animation === "bounce" ? "animate-bounce" :
                                badge.animation === "spin" ? "animate-spin" :
                                  badge.animation === "spin-slow" ? "animate-spin-slow" : ""
                              }`}>
                              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" strokeWidth={2.5} />
                            </div>
                          </div>

                          {/* Number with Animation */}
                          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 sm:mb-3">
                            {shouldAnimate && isVisible ? (
                              <CountUp
                                start={0}
                                end={targetValue}
                                duration={2.5}
                                decimals={badge.number.includes("%") ? 0 : 0}
                                formattingFn={(value) =>
                                  formatNumber(badge.number, value)
                                }
                              />
                            ) : (
                              badge.number
                            )}
                          </div>

                          {/* Label */}
                          <div className="text-sm sm:text-base text-muted-foreground font-medium leading-tight">
                            {badge.label}
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })
                )}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300" />
              <CarouselNext className="right-0 translate-x-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300" />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}


