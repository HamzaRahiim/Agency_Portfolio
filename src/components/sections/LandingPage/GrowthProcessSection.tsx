"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Zap, Rocket, LucideIcon } from "lucide-react";
import type { ProcessStep, DataCard, GrowthProcessData } from "@/types/growthProcess";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Search,
  Zap,
  Rocket,
};

export default function GrowthProcessSection() {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [dataCards, setDataCards] = useState<DataCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Fetch growth process data from API route
  useEffect(() => {
    const fetchGrowthProcess = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/growth-process`);

        if (!response.ok) {
          throw new Error("Failed to fetch growth process data");
        }

        const data: GrowthProcessData = await response.json();
        setProcessSteps(data.processSteps);
        setDataCards(data.dataCards);
      } catch (error) {
        console.error("Error fetching growth process:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrowthProcess();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || processSteps.length === 0) return;

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

        // Title animation
        const titleContainer = headerRef.current.querySelector('[data-title]');
        const titleTextElement = headerRef.current.querySelector('[data-title-text]');
        const titleSpan = headerRef.current.querySelector('[data-title-span]');

        if (titleContainer && titleTextElement && titleSpan) {
          const mainText = titleTextElement.textContent || "A Proven Path to";
          const spanText = titleSpan.textContent || "Ecommerce Success";

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

      // Visual elements animations (gears and data cards)
      if (visualRef.current) {
        const gears = visualRef.current.querySelectorAll('[data-gear]');
        gears.forEach((gear, index) => {
          gsap.set(gear, {
            opacity: 0,
            scale: 0,
            rotation: index % 2 === 0 ? -180 : 180,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          gsap.to(gear, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        });

        const dataCards = visualRef.current.querySelectorAll('[data-card]');
        dataCards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          gsap.set(card, {
            opacity: 0,
            x: direction * 300,
            y: index * 50,
            rotation: direction * 45,
            scale: 0.5,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          gsap.to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5 + index * 0.15,
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Process steps animations
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll('[data-step]');
        const connectingLine = stepsRef.current.querySelector('[data-line]');

        if (connectingLine) {
          gsap.set(connectingLine, {
            scaleY: 0,
            transformOrigin: "top center",
            willChange: "transform",
          });

          gsap.to(connectingLine, {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        }

        steps.forEach((step, index) => {
          const iconCircle = step.querySelector('[data-step-icon]');
          const content = step.querySelector('[data-step-content]');

          if (iconCircle) {
            gsap.set(iconCircle, {
              opacity: 0,
              scale: 0,
              rotation: -180,
              transformOrigin: "center center",
              willChange: "transform, opacity",
            });

            gsap.to(iconCircle, {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(2)",
              delay: index * 0.2,
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }

          if (content) {
            gsap.set(content, {
              opacity: 0,
              x: -50,
              rotationY: -30,
              willChange: "transform, opacity",
            });

            gsap.to(content, {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 1,
              ease: "power2.out",
              delay: index * 0.2 + 0.3,
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, processSteps.length]);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Elements */}
          <div ref={visualRef} className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Background Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 rounded-3xl border border-white/10 backdrop-blur-sm"></div>

            {/* Gears - Blue & Yellow Theme */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Large Blue Gear */}
              <div data-gear className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 shadow-2xl opacity-90 animate-spin-slow z-20" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
                <div className="absolute inset-3 border-4 border-blue-400/40 rounded-full"></div>
                <div className="absolute inset-6 border-2 border-blue-300/30 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl sm:text-2xl">DATA</span>
                </div>
              </div>

              {/* Medium Yellow Gear */}
              <div data-gear className="absolute right-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-yellow-500 via-accent to-yellow-600 shadow-xl opacity-85 animate-spin-slow-reverse z-30" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
                <div className="absolute inset-2 border-3 border-yellow-400/40 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-lg sm:text-xl">AI</span>
                </div>
              </div>

              {/* Small Blue Gear */}
              <div data-gear className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg opacity-80 animate-spin-slow z-10" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
                <div className="absolute inset-2 border-2 border-blue-300/40 rounded-full"></div>
              </div>
            </div>

            {/* Data Cards Stack - Right Side */}
            {!isLoading && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3 sm:space-y-4 z-40">
                {dataCards.map((card, index) => (
                  <div
                    key={index}
                    data-card
                    className="relative bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:z-50 border border-white/20"
                    style={{
                      width: "180px",
                      maxWidth: "100%",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      willChange: "transform",
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">
                        {card.amount}
                      </div>
                    </div>

                    {/* Graph Line */}
                    <div className={`mb-3 h-10 bg-gradient-to-r ${card.graphColor} rounded-lg relative overflow-hidden`}>
                      {/* Animated Graph Pattern */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 200 40"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 0 35 Q 50 15, 100 25 T 200 20"
                          stroke={index === 0 ? "#1e40af" : index === 1 ? "#fbbf24" : "#1e40af"}
                          strokeWidth="2.5"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* Badge */}
                    <div className="flex justify-start">
                      <span
                        className={`${card.badgeBg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                      >
                        {card.tier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Process Steps */}
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div ref={headerRef} className="mb-8 sm:mb-10">
              <div className="inline-block mb-4">
                <span data-badge className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
                  Our Growth Process
                </span>
              </div>
              <h2 data-title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                <span data-title-text>A Proven Path to</span>{" "}
                <span data-title-span className="bg-gradient-to-r from-blue-400 via-accent to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                  Ecommerce Success
                </span>
              </h2>
            </div>

            {/* Process Steps */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            ) : (
              <div ref={stepsRef} className="relative">
                {/* Connecting Line with Gradient */}
                <div data-line className="absolute left-6 sm:left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30 hidden sm:block"></div>

                <div className="space-y-8 sm:space-y-10">
                  {processSteps.map((step, index) => {
                    const IconComponent = iconMap[step.icon] || Search;
                    return (
                      <div
                        key={index}
                        data-step
                        className="relative flex gap-4 sm:gap-6 group"
                        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                      >
                        {/* Number Circle with Icon */}
                        <div className="shrink-0 relative">
                          <div
                            data-step-icon
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xl transition-all duration-500 group-hover:scale-110 ${index === 0
                              ? "bg-primary"
                              : index === 1
                                ? "bg-accent"
                                : "bg-primary"
                              }`}
                            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform" }}
                          >
                            <IconComponent
                              className={`w-6 h-6 sm:w-7 sm:h-7 ${step.animation === "pulse" ? "animate-pulse" :
                                step.animation === "bounce" ? "animate-bounce" : ""
                                }`}
                              strokeWidth={2.5}
                            />
                          </div>
                          {/* Pulse Effect */}
                          <div
                            className={`absolute inset-0 rounded-full ${index === 0 ? "bg-primary" : index === 1 ? "bg-accent" : "bg-primary"
                              } opacity-20 animate-ping`}
                          ></div>
                        </div>

                        {/* Content */}
                        <div data-step-content className="flex-1 pt-1" style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform, opacity" }}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm sm:text-base font-semibold text-primary/80">
                              Step {step.number}
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                          </div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
