"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Store, SuccessfulStoresData } from "@/types/successfulStores";

export default function SuccessfulStoresSection() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch successful stores data from API route
  useEffect(() => {
    const fetchSuccessfulStores = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/successful-stores`);

        if (!response.ok) {
          throw new Error("Failed to fetch successful stores data");
        }

        const data: SuccessfulStoresData = await response.json();
        setStores(data.stores);
      } catch (error) {
        console.error("Error fetching successful stores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuccessfulStores();
  }, []);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Successful Stores
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Experience in Making Businesses Grow.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative pt-12 sm:pt-16 lg:pt-20">
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
            <CarouselContent className="-ml-4 sm:-ml-6 lg:-ml-8">
              {isLoading ? (
                <CarouselItem className="pl-4 sm:pl-6 lg:pl-8 basis-full">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Loading...</div>
                  </div>
                </CarouselItem>
              ) : (
                stores.map((store) => (
                <CarouselItem
                  key={store.id}
                  className="pl-4 sm:pl-6 lg:pl-8 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="w-full flex justify-center">
                    {/* Phone Frame */}
                    <div className="relative w-[280px] sm:w-[320px] bg-gray-900 dark:bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border-2 border-gray-700 dark:border-gray-600">
                      {/* Phone Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 dark:bg-gray-900 rounded-b-2xl z-10 border-x-2 border-gray-700 dark:border-gray-600"></div>

                      {/* Phone Screen */}
                      <div className="bg-background rounded-[2rem] overflow-hidden min-h-[600px] sm:min-h-[650px]">
                        {/* Phone Status Bar */}
                        <div className="bg-background px-4 pt-8 pb-2 flex items-center justify-between text-xs font-medium text-foreground border-b border-border">
                          <span>{store.time}</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 border border-foreground rounded-sm"></div>
                            <div className="w-1 h-1 rounded-full bg-foreground"></div>
                          </div>
                        </div>

                        {/* Screen Content */}
                        <div className="p-4 h-full">
                          {/* App Header */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                            <div className="text-sm font-semibold text-foreground">
                              amazon seller
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-3 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Sales today so far
                              </p>
                              <p className="text-lg font-bold text-foreground">
                                {store.sales}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Units today so far
                              </p>
                              <p className="text-base font-semibold text-foreground">
                                {store.units}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Current</p>
                              <p className="text-base font-semibold text-foreground">
                                {store.current}
                              </p>
                            </div>
                          </div>

                          {/* Product Sales */}
                          <div className="mb-4 pb-4 border-b border-border">
                            <p className="text-xs text-muted-foreground mb-1">Product sales</p>
                            <p className="text-base font-bold text-foreground">
                              {store.productSales}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {store.period}
                            </p>
                            <p className="text-xs text-emerald-500 font-semibold mt-1">
                              {store.increase}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {store.previousIncrease}
                            </p>
                          </div>

                          {/* Graph Placeholder */}
                          <div className="mb-4 h-28 bg-muted rounded flex items-end justify-between p-2">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-8 rounded-t ${store.id === 3
                                  ? "bg-gradient-to-t from-orange-400 to-yellow-400"
                                  : "bg-muted-foreground/30"
                                  }`}
                                style={{
                                  height: `${Math.random() * 60 + 30}%`,
                                }}
                              ></div>
                            ))}
                          </div>

                          {/* Menu Items */}
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></div>
                              <span>Add a Product</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></div>
                              <span>Quick Start Guide</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></div>
                              <span>Manage Orders</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

