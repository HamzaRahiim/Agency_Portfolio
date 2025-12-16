"use client";

import { useEffect, useState, useRef } from "react";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || caseStudies.length === 0) return;

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

          const mainText =
            titleTextElement.textContent || "Real Results from";
          const spanText = titleSpan.textContent || "Real Businesses";

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

      // Case study images animations
      if (carouselRef.current) {
        const caseStudyCards = carouselRef.current.querySelectorAll('[data-case-study]');
        caseStudyCards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const image = card.querySelector('img');
          
          // Card animation
          gsap.set(card, {
            opacity: 0,
            y: 100,
            rotationY: direction * 25,
            scale: 0.85,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          // Image reveal animation
          if (image) {
            gsap.set(image, {
              scale: 1.3,
              filter: "blur(10px)",
              willChange: "transform, filter",
            });

            gsap.to(image, {
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power2.out",
              delay: 0.2 + index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            });
          }

          // Enhanced hover effect
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              rotationY: direction * 3,
              duration: 0.4,
              ease: "power2.out",
            });
            if (image) {
              gsap.to(image, {
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out",
            });
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          };

          card.addEventListener("mouseenter", handleMouseEnter);
          card.addEventListener("mouseleave", handleMouseLeave);
          eventListeners.push(
            { element: card, event: "mouseenter", handler: handleMouseEnter },
            { element: card, event: "mouseleave", handler: handleMouseLeave }
          );
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
  }, [isLoading, caseStudies.length]);

  return (
    <section ref={sectionRef} className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-background">
      <div key="case-studies-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4">
            <span data-badge className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
              Case Studies
            </span>
          </div>
          <h2 data-title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
            <span data-title-text>Real Results from</span>{" "}
            <span data-title-span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
              Real Businesses
            </span>
          </h2>
          <p data-description className="text-base sm:text-lg text-muted-foreground">
            See how we've helped companies achieve remarkable growth and success.
          </p>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative pt-6 sm:pt-8 lg:pt-10">
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
                  <div 
                    data-case-study
                    className="relative w-full h-auto rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border bg-card"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority={image.id === 1}
                      style={{ willChange: "transform, filter" }}
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
      </div>
    </section>
  );
}

