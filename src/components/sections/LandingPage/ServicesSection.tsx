"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { Service, ServicesData } from "@/types/services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Fetch services data from API route
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/services`);

        if (!response.ok) {
          throw new Error("Failed to fetch services data");
        }

        const data: ServicesData = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || services.length === 0) return;

    const ctx = gsap.context(() => {
      // Creative header section animations
      if (headerRef.current) {
        // Badge animation - Enhanced scale up with rotation and bounce
        const badge = headerRef.current.querySelector('[data-badge]');
        if (badge) {
          // Set initial HIDDEN state
          gsap.set(badge, {
            opacity: 0,
            scale: 0,
            rotation: -360,
            y: -50,
            x: -20,
            transformOrigin: "center center",
            willChange: "transform, opacity"
          });

          // Animate to visible
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

        // Title animation - only animate the individual words WITHOUT affecting visibility
        const titleContainer = headerRef.current.querySelector('[data-title]');
        const titleTextElement = headerRef.current.querySelector('[data-title-text]');
        const titleSpan = headerRef.current.querySelector('[data-title-span]');

        if (titleContainer && titleTextElement && titleSpan) {
          // Get the original text content BEFORE modifying
          const mainText = titleTextElement.textContent || "The Leaders in Full";
          const spanText = titleSpan.textContent || "Ecommerce Solutions";

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
                start: "top 80%",
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

          // Continuous gradient flow animation (subtle)
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

        // Description animation - Enhanced line-by-line fade with typewriter feel
        const description = headerRef.current.querySelector('[data-description]');
        if (description) {
          const text = description.textContent || "";
          const lines = text.split(". ").filter(line => line.length > 0);

          if (lines.length > 1) {
            // Wrap each line in a span for animation
            description.innerHTML = lines
              .map((line, i) => {
                return `<span class="block line-${i}" style="opacity: 1;">${line}${i < lines.length - 1 ? ". " : ""}</span>`;
              })
              .join("");

            // Get line elements
            const lineElements = description.querySelectorAll('[class^="line-"]');

            // Set initial animation state with 3D effect
            gsap.set(lineElements, {
              opacity: 0,
              x: -80,
              rotationY: -25,
              z: -100,
              willChange: "transform, opacity",
            });

            // Animate to visible with enhanced stagger
            gsap.to(lineElements, {
              opacity: 1,
              x: 0,
              rotationY: 0,
              z: 0,
              duration: 1,
              stagger: {
                each: 0.2,
                from: "start",
              },
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          } else {
            // Single line fallback
            gsap.set(description, { opacity: 1 });
            gsap.fromTo(
              description,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: headerRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

      }

      // Animate service cards - Physics-based throw animation
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        // Physics-based throw animation - Cards thrown from different directions
        cards.forEach((card, index) => {
          if (!card) return;

          // Determine throw direction based on card position in grid
          const isLeftSide = index % 3 === 0;
          const isRightSide = index % 3 === 2;
          const isCenter = index % 3 === 1;

          // Calculate throw trajectory with physics
          let throwX = 0;
          let throwY = -500; // Start from above viewport
          let throwAngle = 0;
          let rotation = 0;
          let rotationY = 0;

          if (isLeftSide) {
            // Throw from right side with leftward angle
            throwX = 1200;
            throwAngle = -40;
            rotation = -1440; // Multiple spins
            rotationY = -90;
          } else if (isRightSide) {
            // Throw from left side with rightward angle
            throwX = -1200;
            throwAngle = 40;
            rotation = 1440;
            rotationY = 90;
          } else {
            // Center cards throw from top with variation
            throwX = (Math.random() - 0.5) * 800;
            throwAngle = -55 + (Math.random() - 0.5) * 30;
            rotation = (Math.random() - 0.5) * 1800;
            rotationY = (Math.random() - 0.5) * 180;
          }

          // Set initial throw position (off-screen)
          gsap.set(card, {
            opacity: 0,
            x: throwX,
            y: throwY,
            scale: 0.15,
            rotation: rotation,
            rotationY: rotationY,
            rotationX: throwAngle,
            transformOrigin: "center center",
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            z: -1000,
          });

          // Create physics-based throw animation timeline
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          // Phase 1: Throw with physics (parabolic trajectory)
          timeline.to(card, {
            opacity: 1,
            x: 0,
            y: 40, // Slight overshoot for bounce
            scale: 1.2,
            rotation: rotation * 0.15, // Slow down rotation
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 1.6,
            ease: "power2.out", // Physics-like deceleration
          });

          // Phase 2: Bounce and settle
          timeline.to(card, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(2.5)", // Strong bounce effect
          });

          // Phase 3: Slight wobble for physics realism
          timeline.to(card, {
            rotation: (Math.random() - 0.5) * 10,
            x: (Math.random() - 0.5) * 15,
            duration: 0.4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          });

          // Phase 4: Final settle
          timeline.to(card, {
            rotation: 0,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        // Enhanced hover animations for each card
        cards.forEach((card, index) => {
          if (!card) return;

          const cardContent = card.querySelector('[data-card-content]') as HTMLElement;
          const cardOverlay = card.querySelector('[data-card-overlay]') as HTMLElement;
          const cardGlow = card.querySelector('[data-card-glow]') as HTMLElement;

          card.addEventListener("mouseenter", () => {
            // Enhanced card lift with 3D tilt
            gsap.to(card, {
              y: -16,
              scale: 1.03,
              rotationY: 5,
              rotationX: -2,
              z: 50,
              duration: 0.6,
              ease: "power3.out",
            });

            // Content slide up with bounce
            if (cardContent) {
              gsap.to(cardContent, {
                y: -10,
                duration: 0.5,
                ease: "back.out(1.4)",
              });
            }

            // Overlay reveal with smooth slide
            if (cardOverlay) {
              gsap.to(cardOverlay, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
              });
            }

            // Enhanced glow effect with pulse
            if (cardGlow) {
              gsap.to(cardGlow, {
                opacity: 0.2,
                scale: 1.15,
                duration: 0.6,
                ease: "power2.out",
              });

              // Pulse animation
              gsap.to(cardGlow, {
                opacity: 0.15,
                scale: 1.1,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
            }

            // Enhanced icon rotation with scale bounce
            const iconContainer = card.querySelector('[data-icon-container]') as HTMLElement;
            if (iconContainer) {
              gsap.to(iconContainer, {
                rotation: 360,
                scale: 1.15,
                duration: 0.8,
                ease: "back.out(1.7)",
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            // Kill any ongoing animations
            gsap.killTweensOf(card);
            if (cardContent) gsap.killTweensOf(cardContent);
            if (cardOverlay) gsap.killTweensOf(cardOverlay);
            if (cardGlow) gsap.killTweensOf(cardGlow);

            const iconContainer = card.querySelector('[data-icon-container]') as HTMLElement;
            if (iconContainer) gsap.killTweensOf(iconContainer);

            // Reset card with smooth animation
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.5,
              ease: "power3.out",
            });

            // Reset content
            if (cardContent) {
              gsap.to(cardContent, {
                y: 0,
                duration: 0.4,
                ease: "power3.out",
              });
            }

            // Hide overlay
            if (cardOverlay) {
              gsap.to(cardOverlay, {
                y: "100%",
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
              });
            }

            // Reset glow (kill pulse first)
            if (cardGlow) {
              gsap.killTweensOf(cardGlow);
              gsap.to(cardGlow, {
                opacity: 0,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
              });
            }

            // Reset icon
            if (iconContainer) {
              gsap.to(iconContainer, {
                rotation: 0,
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
              });
            }
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading, services.length]);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
        {/* Subtle decorative dots - kept to the sides for both themes */}
        {/* Light mode dots */}
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
        {/* Dark mode dots */}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headerRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-16 sm:pb-20 lg:pb-24">
          {/* Left: Title */}
          <div>
            <div className="mb-4">
              <span
                data-badge
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm"
              >
                Service Ecosystem
              </span>
            </div>
            <h2
              data-title
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight"
            >
              <span data-title-text>The Leaders in Full</span>{" "}
              <span
                data-title-span
                className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%]"
                style={{ backgroundPosition: "200% 0" }}
              >
                Ecommerce Solutions
              </span>
            </h2>
          </div>

          {/* Right: Description - Aligned horizontally with heading */}
          <div className="flex items-center">
            <p
              data-description
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              To thrive in an ever-changing marketplace, you need a team of
              experts and a unified growth strategy. Discover how our services
              can elevate your brand to new heights.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                href={service.href}
                className="group relative rounded-2xl lg:rounded-3xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden h-auto sm:h-[220px] lg:h-[240px]"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
                data-card
              >
                {/* Animated Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Accent Border on Hover */}
                <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-accent/30 transition-all duration-500" />

                {/* Main Content - Horizontal Layout: Icon Left, Title Right */}
                <div data-card-content className="relative z-10 h-full flex items-center gap-4 sm:gap-5 p-5 sm:p-6">
                  {/* Left: Icon with Continuous Circular Animation */}
                  <div className="shrink-0">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                      {/* Icon Background with Gradient */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />

                      {/* Icon Container with Circular Animation */}
                      <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/60 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl group-hover:border-primary/40 group-hover:shadow-lg transition-all duration-500">
                        {/* Icon with GSAP rotation */}
                        <div data-icon-container className="h-6 sm:h-8 lg:h-10 w-6 sm:w-8 lg:w-10 flex items-center justify-center">
                          <span className="block">{service.icon}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Title + mobile description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground sm:hidden line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Paper Unfold Effect - Slides up from bottom on hover with blur effect */}
                <div data-card-overlay className="absolute inset-x-0 bottom-0 bg-card/80 backdrop-blur-md border-t-2 border-border/60 rounded-b-2xl lg:rounded-b-3xl transform translate-y-full opacity-0 shadow-2xl z-20 p-5 sm:p-6">
                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Know More Button */}
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 group-hover:bg-primary/20 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <span className="text-sm sm:text-base font-semibold text-primary">
                        Know More
                      </span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-300 group-hover:translate-x-1"
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
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div data-card-glow className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} opacity-0 rounded-2xl lg:rounded-3xl blur-xl -z-10`} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}