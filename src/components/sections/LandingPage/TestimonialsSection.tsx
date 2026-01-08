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
import type { Testimonial, TestimonialsData } from "@/types/testimonials";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch testimonials data from API route
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials data");
        }

        const data: TestimonialsData = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || testimonials.length === 0) return;

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
          // Store original HTML before we inject animated spans
          originalTitleHTML = titleTextElement.innerHTML;
          originalSpanHTML = titleSpan.innerHTML;

          const mainText =
            titleTextElement.textContent || "See What People Say About";
          const spanText = titleSpan.textContent || "Fast Line";

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

      // Testimonial cards animations
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('[data-testimonial-card]');
        cards.forEach((card, index) => {
          const direction = index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0;
          const cardElement = card as HTMLElement;
          gsap.set(cardElement, {
            opacity: 0,
            y: 100,
            rotationY: direction * 30,
            scale: 0.8,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          gsap.to(cardElement, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: cardElement,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          // Enhanced hover effect with GSAP
          const handleMouseEnter = () => {
            gsap.to(cardElement, {
              y: -10,
              scale: 1.02,
              rotationY: direction * 5,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(cardElement, {
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          cardElement.addEventListener("mouseenter", handleMouseEnter);
          cardElement.addEventListener("mouseleave", handleMouseLeave);
          eventListeners.push(
            { element: cardElement, event: "mouseenter", handler: handleMouseEnter },
            { element: cardElement, event: "mouseleave", handler: handleMouseLeave }
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
  }, [isLoading, testimonials.length]);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div key="testimonials-content">
        {/* Split Background: Top Half - Dark */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Split Background: Bottom Half - White */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center pb-12 sm:pb-16">
          <div className="inline-block mb-4">
            <span data-badge className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
              Testimonials
            </span>
          </div>
          <h2 data-title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
            <span data-title-text>See What People Say About</span>{" "}
            <span data-title-span className="bg-gradient-to-r from-blue-400 via-accent to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              Fast Line
            </span>
          </h2>
          <p data-description className="text-base sm:text-lg text-white/80">
            Trusted by hundreds of e-commerce businesses worldwide
          </p>
        </div>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative">
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
                testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 sm:pl-6 lg:pl-8 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div 
                      data-testimonial-card
                      className="group w-full bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border-2 border-transparent hover:border-primary/20 relative overflow-hidden"
                      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
                    >
                      {/* Decorative Gradient Overlay on Hover */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-5">
                        {/* Avatar with Gradient Border */}
                        <div className="shrink-0 relative">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {testimonial.initials}
                          </div>
                        </div>

                        {/* Name & Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate group-hover:text-primary transition-colors duration-300">
                              {testimonial.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <span>{testimonial.reviewCount}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-3 h-3 text-primary"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{testimonial.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rating & Time */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-accent group-hover:scale-110 transition-transform duration-300"
                              style={{ transitionDelay: `${i * 50}ms` }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 font-medium">
                          {testimonial.timeAgo}
                        </span>
                      </div>

                      {/* Testimonial Content */}
                      <div className="mb-5">
                        <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                          {testimonial.title}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Date with Icon */}
                      <div className="pt-5 border-t border-gray-200 group-hover:border-primary/30 transition-colors duration-300">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>

                      {/* Quote Icon Decoration */}
                      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <svg
                          className="w-16 h-16 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
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
