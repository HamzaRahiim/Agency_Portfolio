"use client";

import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Store, SuccessfulStoresData } from "@/types/successfulStores";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SuccessfulStoresSection() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch successful stores data from API route
  useEffect(() => {
    const fetchSuccessfulStores = async () => {
      try {
        const response = await fetch("/api/successful-stores");

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

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || stores.length === 0) return;

    // Store original HTML for cleanup
    let originalTitleHTML = "";
    let originalSpanHTML = "";

    // Store event listeners for cleanup
    const eventListeners: Array<{ element: HTMLElement; event: string; handler: () => void }> = [];

    const ctx = gsap.context(() => {
      // Badge animation
      if (headerRef.current) {
        const badge = headerRef.current.querySelector('[data-badge]');
        if (badge) {
          gsap.set(badge, {
            opacity: 0,
            scale: 0,
            rotation: -360,
            y: -50,
            x: -20,
            transformOrigin: "center center",
            willChange: "transform, opacity"
          });

          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            x: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          });
        }

        // Description text animation
        const description = headerRef.current.querySelector('[data-description]');
        if (description) {
          gsap.set(description, {
            opacity: 0,
            y: 30,
            willChange: "transform, opacity",
          });

          gsap.to(description, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        // Title animation
        const titleContainer = headerRef.current.querySelector("[data-title]");
        const titleTextElement =
          headerRef.current.querySelector("[data-title-text]");
        const titleSpan =
          headerRef.current.querySelector("[data-title-span]");

        if (titleContainer && titleTextElement && titleSpan) {
          // Store original HTML before we replace it with animated spans
          originalTitleHTML = titleTextElement.innerHTML;
          originalSpanHTML = titleSpan.innerHTML;

          const mainText = titleTextElement.textContent || "Our";
          const spanText = titleSpan.textContent || "Successful Stores";

          const mainWords = mainText.split(" ").filter(w => w.length > 0);
          const spanWords = spanText.split(" ").filter(w => w.length > 0);

          if (mainWords.length > 0) {
            const animatedMainHTML = mainWords
              .map((word, i) => {
                return `<span class="inline-block mr-2 word-${i}">${word}</span>`;
              })
              .join(" ");
            titleTextElement.innerHTML = animatedMainHTML;
          }

          if (spanWords.length > 0) {
            const animatedSpanHTML = spanWords
              .map((word, i) => {
                return `<span class="inline-block mr-2 span-word-${i}">${word}</span>`;
              })
              .join(" ");
            titleSpan.innerHTML = animatedSpanHTML;
          }

          const mainWordElements = titleTextElement.querySelectorAll('[class^="word-"]');
          if (mainWordElements.length > 0) {
            gsap.set(mainWordElements, {
              opacity: 0,
              y: 120,
              rotationX: -90,
              scale: 0.6,
              transformOrigin: "50% 50%",
              z: -200,
              willChange: "transform, opacity",
            });

            gsap.to(mainWordElements, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              z: 0,
              duration: 1.2,
              stagger: {
                each: 0.1,
                from: "start",
                ease: "power2.out",
              },
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }

          gsap.set(titleSpan, {
            backgroundPosition: "200% 0",
            filter: "blur(15px)",
            willChange: "background-position, filter",
          });

          gsap.to(titleSpan, {
            backgroundPosition: "0% 0",
            filter: "blur(0px)",
            duration: 2.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.to(titleSpan, {
            backgroundPosition: "100% 0",
            duration: 4,
            ease: "none",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          const spanWordElements = titleSpan.querySelectorAll('[class^="span-word-"]');
          if (spanWordElements.length > 0) {
            gsap.set(spanWordElements, {
              opacity: 0,
              scale: 0.3,
              y: 50,
              rotationY: -45,
              willChange: "transform, opacity",
            });

            gsap.to(spanWordElements, {
              opacity: 1,
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.8,
              stagger: {
                each: 0.12,
                from: "start",
              },
              ease: "elastic.out(1, 0.6)",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }
        }
      }

      // Phone frames animations
      if (carouselRef.current) {
        const phoneFrames = carouselRef.current.querySelectorAll('[data-phone-frame]');
        phoneFrames.forEach((frame, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const frameElement = frame as HTMLElement;
          gsap.set(frameElement, {
            opacity: 0,
            y: 150,
            rotationY: direction * 60,
            rotationX: -20,
            scale: 0.7,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          gsap.to(frameElement, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: frameElement,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          // Enhanced hover effect with 3D tilt
          const handleMouseEnter = () => {
            gsap.to(frameElement, {
              y: -15,
              rotationY: direction * 8,
              rotationX: 5,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(frameElement, {
              y: 0,
              rotationY: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          };

          frameElement.addEventListener("mouseenter", handleMouseEnter);
          frameElement.addEventListener("mouseleave", handleMouseLeave);
          eventListeners.push(
            { element: frameElement, event: "mouseenter", handler: handleMouseEnter },
            { element: frameElement, event: "mouseleave", handler: handleMouseLeave }
          );

          // Animate phone screen content
          const screenContent = frameElement.querySelector('[data-screen-content]');
          if (screenContent) {
            gsap.set(screenContent, {
              opacity: 0,
              y: 30,
              willChange: "transform, opacity",
            });

            gsap.to(screenContent, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.3 + index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: frameElement,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => {
      // Remove all event listeners first to prevent React unmount conflicts
      eventListeners.forEach(({ element, event, handler }) => {
        try {
          if (element && element.isConnected) {
            element.removeEventListener(event, handler);
          }
        } catch (e) {
          // Ignore errors
        }
      });

      // Kill all ScrollTrigger instances first to prevent removeChild errors
      if (typeof window !== "undefined" && ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => {
          try {
            trigger.kill();
          } catch {
            // Ignore if already killed
          }
        });
      }

      // Restore original heading HTML if elements still exist
      try {
        if (headerRef.current && headerRef.current.isConnected) {
          const titleTextElement =
            headerRef.current.querySelector(
              "[data-title-text]",
            ) as HTMLElement | null;
          const titleSpan = headerRef.current.querySelector(
            "[data-title-span]",
          ) as HTMLElement | null;

          if (
            titleTextElement &&
            originalTitleHTML &&
            titleTextElement.isConnected
          ) {
            titleTextElement.innerHTML = originalTitleHTML;
          }
          if (titleSpan && originalSpanHTML && titleSpan.isConnected) {
            titleSpan.innerHTML = originalSpanHTML;
          }
        }
      } catch {
        // Elements already removed – safe to ignore
      }

      // Revert GSAP context safely
      try {
        ctx.revert();
      } catch {
        // Context may already be reverted – ignore
      }
    };
  }, [isLoading, stores.length]);

  return (
    <section ref={sectionRef} id="successful-stores" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background">
      <div key="successful-stores-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <span data-badge className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
                Success Stories
              </span>
            </div>
            <h2 data-title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
              <span data-title-text>Our</span>{" "}
              <span data-title-span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
                Successful Stories
              </span>
            </h2>
            <p data-description className="text-base sm:text-lg text-muted-foreground">
              Experience in Making Businesses Grow.
            </p>
          </div>

          {/* Carousel Container */}
          <div ref={carouselRef} className="relative pt-12 sm:pt-16 lg:pt-20">
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
                        <div
                          data-phone-frame
                          className="relative w-[280px] sm:w-[320px] bg-gray-900 dark:bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border-2 border-gray-700 dark:border-gray-600"
                          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
                        >
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
                            <div data-screen-content className="p-4 h-full">
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
                                    Total Sales
                                  </p>
                                  <p className="text-lg font-bold text-foreground">
                                    {store.sales}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Total Orders
                                  </p>
                                  <p className="text-base font-semibold text-foreground">
                                    {store.units}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Conversion / Sessions</p>
                                  <p className="text-base font-semibold text-foreground">
                                    {store.current}
                                  </p>
                                </div>
                              </div>

                              {/* Performance Metrics */}
                              <div className="mb-4 pb-4 border-b border-border">
                                <p className="text-xs text-muted-foreground mb-1">Period</p>
                                <p className="text-xs font-medium text-foreground mb-2">
                                  {store.period}
                                </p>
                                <p className={`text-xs font-semibold mt-1 ${store.increase.includes('↗')
                                    ? 'text-emerald-500'
                                    : store.increase.includes('↘')
                                      ? 'text-red-500'
                                      : 'text-blue-500'
                                  }`}>
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
      </div>
    </section>
  );
}

