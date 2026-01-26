"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { AboutUsData } from "@/types/aboutus";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "@/components/providers/ModalProvider";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  // Fetch about us data from API route
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch("/api/aboutus");

        if (!response.ok) {
          throw new Error("Failed to fetch about us data");
        }

        const data: AboutUsData = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || isLoading || !aboutData) return;

    let originalTitleHTML = "";
    let originalSpanHTML = "";

    const ctx = gsap.context(() => {
      // Hero section animations
      if (heroRef.current) {
        const badge = heroRef.current.querySelector('[data-badge]');
        if (badge) {
          gsap.set(badge, {
            opacity: 0,
            scale: 0,
            y: -30,
            willChange: "transform, opacity",
          });

          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }

        const titleTextElement = heroRef.current.querySelector('[data-title-text]') as HTMLElement;
        const titleSpan = heroRef.current.querySelector('[data-title-span]') as HTMLElement;

        if (titleTextElement && titleSpan) {
          originalTitleHTML = titleTextElement.innerHTML;
          originalSpanHTML = titleSpan.innerHTML;

          const mainText = titleTextElement.textContent || "";
          const spanText = titleSpan.textContent || "";

          const mainWords = mainText.split(" ").filter(w => w.length > 0);
          const spanWords = spanText.split(" ").filter(w => w.length > 0);

          if (mainWords.length > 0) {
            const animatedMainHTML = mainWords
              .map((word, i) => `<span class="inline-block mr-2 word-${i}">${word}</span>`)
              .join(" ");
            titleTextElement.innerHTML = animatedMainHTML;
          }

          if (spanWords.length > 0) {
            const animatedSpanHTML = spanWords
              .map((word, i) => `<span class="inline-block mr-2 span-word-${i}">${word}</span>`)
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
              willChange: "transform, opacity",
            });

            gsap.to(mainWordElements, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1.2,
              stagger: { each: 0.1, from: "start", ease: "power2.out" },
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 85%",
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
              trigger: heroRef.current,
              start: "top 85%",
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
              stagger: { each: 0.12, from: "start" },
              ease: "elastic.out(1, 0.6)",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }
        }

        const description = heroRef.current.querySelector('[data-description]');
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
            delay: 0.3,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      // Mission values animations
      if (missionRef.current) {
        const valueCards = missionRef.current.querySelectorAll('[data-value-card]');
        valueCards.forEach((card, index) => {
          gsap.set(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            willChange: "transform, opacity",
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Story sections animations
      if (storyRef.current) {
        const storySections = storyRef.current.querySelectorAll('[data-story-section]');
        storySections.forEach((section, index) => {
          gsap.set(section, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            willChange: "transform, opacity",
          });

          gsap.to(section, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Team members animations
      if (teamRef.current) {
        const teamCards = teamRef.current.querySelectorAll('[data-team-card]');
        teamCards.forEach((card, index) => {
          gsap.set(card, {
            opacity: 0,
            y: 50,
            rotationY: -15,
            willChange: "transform, opacity",
          });

          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Stats animations
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('[data-stat-card]');
        statCards.forEach((card, index) => {
          gsap.set(card, {
            opacity: 0,
            scale: 0.8,
            y: 30,
            willChange: "transform, opacity",
          });

          gsap.to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Approach steps animations
      if (approachRef.current) {
        const steps = approachRef.current.querySelectorAll('[data-approach-step]');
        steps.forEach((step, index) => {
          const icon = step.querySelector('[data-step-icon]');
          const content = step.querySelector('[data-step-content]');

          if (icon) {
            gsap.set(icon, {
              opacity: 0,
              scale: 0,
              rotation: -180,
              willChange: "transform, opacity",
            });

            gsap.to(icon, {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(2)",
              delay: index * 0.15,
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
              x: -30,
              willChange: "transform, opacity",
            });

            gsap.to(content, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: index * 0.15 + 0.2,
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      }

      // CTA section animations
      if (ctaRef.current) {
        const ctaContent = ctaRef.current.querySelector('[data-cta-content]');
        if (ctaContent) {
          gsap.set(ctaContent, {
            opacity: 0,
            y: 30,
            willChange: "transform, opacity",
          });

          gsap.to(ctaContent, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      }
    }, sectionRef);

    return () => {
      // Cleanup
      if (heroRef.current) {
        const titleTextElement = heroRef.current.querySelector('[data-title-text]') as HTMLElement;
        const titleSpan = heroRef.current.querySelector('[data-title-span]') as HTMLElement;

        if (titleTextElement && originalTitleHTML) {
          titleTextElement.innerHTML = originalTitleHTML;
        }
        if (titleSpan && originalSpanHTML) {
          titleSpan.innerHTML = originalSpanHTML;
        }
      }

      if (typeof window !== "undefined" && ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => {
          try {
            trigger.kill();
          } catch {
            // Ignore if already killed
          }
        });
      }

      try {
        ctx.revert();
      } catch {
        // Ignore if context already reverted
      }
    };
  }, [isLoading, aboutData]);

  if (isLoading || !aboutData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <main ref={sectionRef} className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Text Content - Centered */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="mb-6">
                <span
                  data-badge
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm"
                >
                  {aboutData.hero.badge}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span data-title-text>{aboutData.hero.title}</span>{" "}
                <span
                  data-title-span
                  className="bg-gradient-to-r from-blue-400 via-accent to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                >
                  {aboutData.hero.titleHighlight}
                </span>
              </h1>
              <p
                data-description
                className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-4xl mx-auto"
              >
                {aboutData.hero.subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                {aboutData.hero.description}
              </p>
            </div>

            {/* CEO Picture Area */}
            {aboutData.hero.ceoImage && (
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                  <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <img
                        src={aboutData.hero.ceoImage}
                        alt={aboutData.hero.ceoName || "CEO"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex flex-col items-center justify-center text-white">
                                <div class="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
                                  ${(aboutData.hero.ceoName || 'CEO').split(' ').map((n: string) => n[0]).join('')}
                                </div>
                                ${aboutData.hero.ceoName ? `<div class="text-xl sm:text-2xl font-bold">${aboutData.hero.ceoName}</div>` : ''}
                                ${aboutData.hero.ceoRole ? `<div class="text-sm sm:text-base text-white/80 mt-1">${aboutData.hero.ceoRole}</div>` : ''}
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                  {aboutData.hero.ceoName && (
                    <div className="mt-6 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-white">{aboutData.hero.ceoName}</div>
                      {aboutData.hero.ceoRole && (
                        <div className="text-sm sm:text-base text-white/80 mt-1">{aboutData.hero.ceoRole}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="relative py-16 sm:py-20 lg:py-24 bg-background">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {aboutData.mission.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {aboutData.mission.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {aboutData.mission.values.map((value, index) => (
              <div
                key={index}
                data-value-card
                className="group relative rounded-2xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 p-6 sm:p-8 transition-all duration-500"
              >
                <div className="text-4xl sm:text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="relative py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {aboutData.story.title}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
            {aboutData.story.sections.map((section, index) => (
              <div
                key={index}
                data-story-section
                className="relative pl-8 sm:pl-12 border-l-2 border-primary/30"
              >
                <div className="absolute -left-3 sm:-left-4 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white" />
                </div>
                <div className="text-sm sm:text-base font-bold text-primary mb-2">{section.year}</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {section.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {aboutData.stats.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {aboutData.stats.items.map((stat, index) => (
              <div
                key={index}
                data-stat-card
                className="group relative rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:border-primary/60 hover:bg-white/20 p-6 sm:p-8 text-center transition-all duration-500"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{stat.label}</h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {aboutData.team.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {aboutData.team.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {aboutData.team.members.map((member, index) => (
              <div
                key={index}
                data-team-card
                className="group relative rounded-2xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 p-6 sm:p-8 transition-all duration-500"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="text-sm sm:text-base font-semibold text-primary mb-3">{member.role}</div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((exp, expIndex) => (
                    <span
                      key={expIndex}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section ref={approachRef} className="relative py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {aboutData.approach.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {aboutData.approach.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            {aboutData.approach.steps.map((step, index) => (
              <div
                key={index}
                data-approach-step
                className="relative flex gap-6 sm:gap-8 group"
              >
                <div className="shrink-0 relative">
                  <div
                    data-step-icon
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-xl ${
                      index % 2 === 0 ? "bg-primary" : "bg-accent"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div
                    className={`absolute inset-0 rounded-full ${
                      index % 2 === 0 ? "bg-primary" : "bg-accent"
                    } opacity-20 animate-ping`}
                  />
                </div>
                <div data-step-content className="flex-1 pt-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            data-cta-content
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {aboutData.cta.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              {aboutData.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openModal}
                className="group inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                style={{ backgroundColor: 'var(--primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                }}
              >
                {aboutData.cta.primaryButton}
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
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
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
              >
                {aboutData.cta.secondaryButton}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
