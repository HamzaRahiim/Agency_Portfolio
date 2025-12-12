"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Store, Star, Globe, DollarSign, CheckCircle, RefreshCw, LucideIcon } from "lucide-react";
import type { TrustBadge, TrustBadgesData } from "@/types/trustBadges";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);

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

  // GSAP ScrollTrigger animation for section entrance
  useEffect(() => {
    if (!sectionRef.current || isLoading || trustBadges.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate section container
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate carousel cards with stagger
      if (carouselRef.current) {
        const cards = cardRefs.current.filter(Boolean);
        
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotationX: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading, trustBadges.length]);

  // Continuous horizontal scroll animation
  useEffect(() => {
    if (!carouselTrackRef.current || isLoading || trustBadges.length === 0) return;

    const track = carouselTrackRef.current;
    
    // Wait for layout to calculate proper widths
    const calculateAndAnimate = () => {
      const firstCard = track.querySelector('[data-card]') as HTMLElement;
      if (!firstCard || firstCard.offsetWidth === 0) {
        // Retry if cards aren't rendered yet
        setTimeout(calculateAndAnimate, 100);
        return;
      }

      // Get card width including gap
      const cardWidth = firstCard.offsetWidth;
      const gap = 16; // gap-4 = 16px
      const totalWidth = (cardWidth + gap) * trustBadges.length;

      // Reset position
      gsap.set(track, { x: 0 });

      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Create continuous scroll animation - smooth, never stops
      // Since we have duplicated items, when we scroll one full set,
      // we can reset to 0 and it will look seamless
      animationRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 50, // Slow, smooth motion (50 seconds to scroll one set)
        ease: "none", // Linear motion, no easing - continuous movement
        repeat: -1, // Infinite repeat
      });
    };

    // Start animation after a brief delay to ensure layout
    const timeoutId = setTimeout(calculateAndAnimate, 200);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isLoading, trustBadges.length]);

  // Intersection Observer to trigger CountUp animation
  useEffect(() => {
    if (isLoading || trustBadges.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, trustBadges.length]);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative pt-6 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-16 z-30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Continuous Scrolling Carousel */}
          <div className="relative overflow-hidden" ref={carouselRef}>
            <div
              ref={carouselTrackRef}
              className="flex gap-4 sm:gap-6 lg:gap-8"
              style={{ willChange: 'transform', width: 'max-content' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-12 min-w-full">
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              ) : (
                <>
                  {/* First set of items */}
                  {trustBadges.map((badge, index) => {
                      const targetValue = extractNumber(badge.number);
                      const shouldAnimate = !badge.number.includes("/"); // Don't animate "24/7"
                      const IconComponent = iconMap[badge.icon] || Store;

                    return (
                      <div
                        key={index}
                        data-card
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
                        className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
                      >
                        <div
                          className={`group relative w-full rounded-xl lg:rounded-2xl border-2 border-border bg-card shadow-lg backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 text-center cursor-pointer transition-all duration-300 ${activeCard === index
                            ? "border-primary shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
                            : "hover:border-primary hover:shadow-xl hover:shadow-primary/20 hover:bg-gradient-to-br hover:from-primary/5 hover:via-accent/5 hover:to-primary/5"
                            }`}
                            onClick={() => {
                              setActiveCard(activeCard === index ? null : index);
                              // GSAP animation on click
                              if (cardRefs.current[index]) {
                                gsap.to(cardRefs.current[index], {
                                  scale: activeCard === index ? 1 : 1.05,
                                  duration: 0.3,
                                  ease: "power2.out",
                                  yoyo: true,
                                  repeat: activeCard === index ? 0 : 1,
                                });
                              }
                            }}
                            onMouseEnter={() => {
                              if (cardRefs.current[index] && activeCard !== index) {
                                gsap.to(cardRefs.current[index], {
                                  scale: 1.03,
                                  y: -5,
                                  duration: 0.4,
                                  ease: "power2.out",
                                });
                              }
                            }}
                            onMouseLeave={() => {
                              setActiveCard(null);
                              if (cardRefs.current[index]) {
                                gsap.to(cardRefs.current[index], {
                                  scale: 1,
                                  y: 0,
                                  duration: 0.4,
                                  ease: "power2.out",
                                });
                              }
                            }}
                          >
                            {/* Icon */}
                            <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center mb-3 sm:mb-4">
                              <div
                                className="icon-wrapper text-primary origin-center"
                                onMouseEnter={(e) => {
                                  const target = e.currentTarget;
                                  // Kill any existing animations
                                  gsap.killTweensOf(target);

                                  if (badge.animation === "spin" || badge.animation === "spin-slow") {
                                    gsap.to(target, {
                                      rotation: 360,
                                      duration: badge.animation === "spin-slow" ? 2 : 1,
                                      ease: "none",
                                      repeat: -1,
                                    });
                                  } else if (badge.animation === "bounce") {
                                    gsap.to(target, {
                                      y: -10,
                                      duration: 0.5,
                                      ease: "power2.out",
                                      yoyo: true,
                                      repeat: -1,
                                    });
                                  } else if (badge.animation === "pulse") {
                                    gsap.to(target, {
                                      scale: 1.2,
                                      duration: 1,
                                      ease: "power2.inOut",
                                      yoyo: true,
                                      repeat: -1,
                                    });
                                  } else {
                                    // Default hover animation
                                    gsap.to(target, {
                                      scale: 1.15,
                                      rotation: 5,
                                      duration: 0.3,
                                      ease: "power2.out",
                                    });
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  const target = e.currentTarget;
                                  gsap.killTweensOf(target);
                                  gsap.to(target, {
                                    scale: 1,
                                    rotation: 0,
                                    y: 0,
                                    duration: 0.3,
                                    ease: "power2.out",
                                  });
                                }}
                              >
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
                      </div>
                    );
                  })}
                  {/* Duplicated items for seamless infinite scroll */}
                  {trustBadges.map((badge, index) => {
                    const targetValue = extractNumber(badge.number);
                    const shouldAnimate = !badge.number.includes("/");
                    const IconComponent = iconMap[badge.icon] || Store;

                    return (
                      <div
                        key={`duplicate-${index}`}
                        data-card
                        className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
                      >
                        <div
                          ref={(el) => {
                            cardRefs.current[trustBadges.length + index] = el;
                          }}
                          className={`group relative w-full rounded-xl lg:rounded-2xl border-2 border-border bg-card shadow-lg backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 text-center cursor-pointer transition-all duration-300 ${activeCard === trustBadges.length + index
                            ? "border-primary shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
                            : "hover:border-primary hover:shadow-xl hover:shadow-primary/20 hover:bg-gradient-to-br hover:from-primary/5 hover:via-accent/5 hover:to-primary/5"
                            }`}
                          onClick={() => {
                            setActiveCard(activeCard === trustBadges.length + index ? null : trustBadges.length + index);
                            if (cardRefs.current[trustBadges.length + index]) {
                              gsap.to(cardRefs.current[trustBadges.length + index], {
                                scale: activeCard === trustBadges.length + index ? 1 : 1.05,
                                duration: 0.3,
                                ease: "power2.out",
                                yoyo: true,
                                repeat: activeCard === trustBadges.length + index ? 0 : 1,
                              });
                            }
                          }}
                          onMouseEnter={() => {
                            if (cardRefs.current[trustBadges.length + index] && activeCard !== trustBadges.length + index) {
                              gsap.to(cardRefs.current[trustBadges.length + index], {
                                scale: 1.03,
                                y: -5,
                                duration: 0.4,
                                ease: "power2.out",
                              });
                            }
                          }}
                          onMouseLeave={() => {
                            setActiveCard(null);
                            if (cardRefs.current[trustBadges.length + index]) {
                              gsap.to(cardRefs.current[trustBadges.length + index], {
                                scale: 1,
                                y: 0,
                                duration: 0.4,
                                ease: "power2.out",
                              });
                            }
                          }}
                        >
                          {/* Icon */}
                          <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center mb-3 sm:mb-4">
                            <div
                              className="icon-wrapper text-primary origin-center"
                              onMouseEnter={(e) => {
                                const target = e.currentTarget;
                                gsap.killTweensOf(target);
                                
                                if (badge.animation === "spin" || badge.animation === "spin-slow") {
                                  gsap.to(target, {
                                    rotation: 360,
                                    duration: badge.animation === "spin-slow" ? 2 : 1,
                                    ease: "none",
                                    repeat: -1,
                                  });
                                } else if (badge.animation === "bounce") {
                                  gsap.to(target, {
                                    y: -10,
                                    duration: 0.5,
                                    ease: "power2.out",
                                    yoyo: true,
                                    repeat: -1,
                                  });
                                } else if (badge.animation === "pulse") {
                                  gsap.to(target, {
                                    scale: 1.2,
                                    duration: 1,
                                    ease: "power2.inOut",
                                    yoyo: true,
                                    repeat: -1,
                                  });
                                } else {
                                  gsap.to(target, {
                                    scale: 1.15,
                                    rotation: 5,
                                    duration: 0.3,
                                    ease: "power2.out",
                                  });
                                }
                              }}
                              onMouseLeave={(e) => {
                                const target = e.currentTarget;
                                gsap.killTweensOf(target);
                                gsap.to(target, {
                                  scale: 1,
                                  rotation: 0,
                                  y: 0,
                                  duration: 0.3,
                                  ease: "power2.out",
                                });
                              }}
                            >
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
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


