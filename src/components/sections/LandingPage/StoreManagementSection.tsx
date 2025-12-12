"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { StoreManagementService, StoreManagementData } from "@/types/storeManagement";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StoreManagementSection() {
  const [services, setServices] = useState<StoreManagementService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch store management data from API route
  useEffect(() => {
    const fetchStoreManagement = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/store-management`);

        if (!response.ok) {
          throw new Error("Failed to fetch store management data");
        }

        const data: StoreManagementData = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching store management:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreManagement();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || services.length === 0) return;

    const ctx = gsap.context(() => {
      // Title animation - Same as ServicesSection
      if (headerRef.current) {
        const titleContainer = headerRef.current.querySelector('[data-title]');
        const titleTextElement = headerRef.current.querySelector('[data-title-text]');
        const titleSpan = headerRef.current.querySelector('[data-title-span]');

        if (titleContainer && titleTextElement && titleSpan) {
          // Get the original text content BEFORE modifying
          const mainText = titleTextElement.textContent || "Your One-Stop Solution for Full-Scale Store Management.";
          const spanText = titleSpan.textContent || "Done-For-You";

          // Split into words
          const mainWords = mainText.split(" ").filter(w => w.length > 0);
          const spanWords = spanText.split(" ").filter(w => w.length > 0);

          // Wrap main title words in spans for animation
          if (mainWords.length > 0) {
            const animatedMainHTML = mainWords
              .map((word, i) => {
                return `<span class="inline-block mr-2 word-${i}">${word}</span>`;
              })
              .join(" ");

            // Update with wrapped words
            titleTextElement.innerHTML = animatedMainHTML;
          }

          // Wrap span words in spans for animation
          if (spanWords.length > 0) {
            const animatedSpanHTML = spanWords
              .map((word, i) => {
                return `<span class="inline-block mr-2 span-word-${i}">${word}</span>`;
              })
              .join(" ");

            // Update with wrapped words
            titleSpan.innerHTML = animatedSpanHTML;
          }

          // Animate main words - Enhanced 3D cascade effect
          const mainWordElements = titleTextElement.querySelectorAll('[class^="word-"]');
          if (mainWordElements.length > 0) {
            // Set initial animation state with 3D transforms
            gsap.set(mainWordElements, {
              opacity: 0,
              y: 120,
              rotationX: -90,
              scale: 0.6,
              transformOrigin: "50% 50%",
              z: -200,
              willChange: "transform, opacity",
            });

            // Animate to visible with enhanced 3D effect
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
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }

          // Animate span gradient background - Smooth flowing gradient effect
          gsap.set(titleSpan, {
            backgroundPosition: "200% 0",
            filter: "blur(15px)",
            willChange: "background-position, filter",
          });

          const gradientTween = gsap.to(titleSpan, {
            backgroundPosition: "0% 0",
            filter: "blur(0px)",
            duration: 2.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              // Start continuous gradient flow after initial animation
              gsap.to(titleSpan, {
                backgroundPosition: "100% 0",
                duration: 4,
                ease: "none",
                repeat: -1,
                yoyo: true,
              });
            },
          });

          // Animate span words - Enhanced elastic bounce effect
          const spanWordElements = titleSpan.querySelectorAll('[class^="span-word-"]');
          if (spanWordElements.length > 0) {
            // Set initial state for span words
            gsap.set(spanWordElements, {
              opacity: 0,
              scale: 0.3,
              y: 50,
              rotationY: -45,
              willChange: "transform, opacity",
            });

            // Animate to visible with elastic bounce
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

      // Cards animation - Scroll-pinned with smooth cards sliding in from left/right
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        // Calculate total scroll distance (80vh per card for smoother experience)
        const scrollDistance = cards.length * 80;

        // Create master timeline for all cards
        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}vh`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.8, // Smoother scrubbing
          },
        });

        // Animate each card sliding in from left or right
        cards.forEach((card, index) => {
          if (!card) return;

          // Determine direction: alternate between left and right
          const isLeft = index % 2 === 0;
          const startX = isLeft ? -window.innerWidth - 500 : window.innerWidth + 500;

          // Set initial position off-screen
          gsap.set(card, {
            x: startX,
            opacity: 0,
            scale: 0.5,
            rotationY: isLeft ? -50 : 50,
            z: -600,
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
          });

          // Add card animation to master timeline with smooth stagger
          const cardStart = (index / cards.length) * 0.85; // Start at 85% of timeline
          const cardDuration = (1 / cards.length) * 0.3; // Each card takes 30% of its slot

          masterTimeline.to(
            card,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: cardDuration,
              ease: "power2.out", // Smoother easing
            },
            cardStart
          );
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isLoading, services.length]);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
        {/* Subtle side dots for both themes */}
        {/* Light mode */}
        <div
          className="absolute inset-y-0 -left-20 sm:-left-10 w-56 pointer-events-none dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(30,64,175,0.22) 1.6px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="absolute inset-y-0 -right-20 sm:-right-10 w-56 pointer-events-none dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(251,191,36,0.22) 1.6px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* Dark mode */}
        <div
          className="absolute inset-y-0 -left-20 sm:-left-10 w-56 pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(96,165,250,0.22) 1.6px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="absolute inset-y-0 -right-20 sm:-right-10 w-56 pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(251,191,36,0.24) 1.6px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center justify-center pb-16 sm:pb-20 lg:pb-24">
          <h2
            data-title
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight max-w-5xl text-center w-full"
          >
            <span data-title-text>Your One-Stop Solution for Full-Scale Store Management.</span>{" "}
            <span
              data-title-span
              className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%]"
              style={{ backgroundPosition: "200% 0" }}
            >
              Done-For-You
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        ) : (
          <div className="flex justify-center pb-12 sm:pb-16 lg:pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6 w-full max-w-6xl">
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="group relative rounded-2xl lg:rounded-3xl border border-border/60 bg-muted/30 backdrop-blur-sm p-4 sm:p-5 lg:p-6 cursor-pointer h-full flex flex-col min-h-[140px] sm:min-h-[160px]"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Left Side Hover Effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1/2 group-active:w-1/2 bg-gradient-to-r from-primary to-primary/80 transition-all duration-700 ease-out rounded-l-2xl lg:rounded-l-3xl z-0 overflow-hidden" />

                  {/* Right Side Hover Effect */}
                  <div className="absolute right-0 top-0 bottom-0 w-0 group-hover:w-1/2 group-active:w-1/2 bg-gradient-to-l from-accent to-accent/80 transition-all duration-700 ease-out rounded-r-2xl lg:rounded-r-3xl z-0 overflow-hidden" />

                  {/* Center Merge Effect - Appears when both sides meet */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0 group-hover:w-full group-active:w-full -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-300 z-0 rounded-2xl lg:rounded-3xl overflow-hidden" />

                  {/* Number Circle - Positioned on left border (half outside, half inside) */}
                  <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl group-hover:bg-accent group-active:bg-accent group-hover:text-accent-foreground group-active:text-accent-foreground transition-all duration-500 shadow-lg z-20 border-2 border-border">
                    {service.number}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 pl-12 sm:pl-14 flex-1 flex flex-col">
                    {/* Title */}
                    <div className="flex-1 flex items-center">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground group-hover:text-white group-active:text-white transition-colors duration-500 leading-tight line-clamp-3">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ring"
            style={{
              background: 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, var(--primary-hover), var(--accent-hover), var(--primary-hover))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))';
            }}
          >
            Get Started
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

