"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string; // The part that gets gradient treatment
  description?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  className = "",
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const titleSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    let originalTitleHTML = "";
    let originalSpanHTML = "";

    // Check if section is already in view and trigger animation immediately if needed
    const checkIfInView = () => {
      if (!headerRef.current) return false;
      const rect = headerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Check if element is already past the trigger point (top 85% of viewport)
      return rect.top < windowHeight * 0.85;
    };

    // Store ScrollTrigger references for this instance only
    const scrollTriggers: ScrollTrigger[] = [];
    
    // Check immediately if already in view (for desktop/larger screens)
    const isAlreadyInView = checkIfInView();

    const ctx = gsap.context(() => {
      // Badge animation
      if (badge) {
        const badgeEl = headerRef.current?.querySelector('[data-badge]');
        if (badgeEl) {
          gsap.set(badgeEl, {
            opacity: 0,
            scale: 0,
            rotation: -360,
            y: -50,
            x: -20,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          const badgeTween = gsap.to(badgeEl, {
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
              toggleActions: isAlreadyInView ? "play none none reverse" : "play none none none",
              once: false,
              refreshPriority: -1,
            },
          });
          
          // If already in view, trigger immediately
          if (isAlreadyInView) {
            badgeTween.play(0);
          }

          // Store the ScrollTrigger reference
          const badgeTrigger = badgeTween.scrollTrigger;
          if (badgeTrigger) {
            scrollTriggers.push(badgeTrigger);
          }
        }
      }

      // Title animation
      if (titleTextRef.current && titleSpanRef.current) {
        originalTitleHTML = titleTextRef.current.innerHTML;
        originalSpanHTML = titleSpanRef.current.innerHTML;

        // Wrap title words in spans
        const mainText = titleTextRef.current.textContent || title;
        const spanText = titleSpanRef.current.textContent || titleHighlight || "";

        const mainWords = mainText.split(" ").filter((w) => w.length > 0);
        const spanWords = spanText.split(" ").filter((w) => w.length > 0);

        if (mainWords.length > 0) {
          const animatedMainHTML = mainWords
            .map((word, i) => `<span class="inline-block mr-2 word-${i}">${word}</span>`)
            .join(" ");
          titleTextRef.current.innerHTML = animatedMainHTML;
        }

        if (spanWords.length > 0) {
          const animatedSpanHTML = spanWords
            .map((word, i) => `<span class="inline-block mr-2 span-word-${i}">${word}</span>`)
            .join(" ");
          titleSpanRef.current.innerHTML = animatedSpanHTML;
        }

        // Animate main words
        const mainWordElements = titleTextRef.current.querySelectorAll('[class^="word-"]');
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

          const mainWordsTween = gsap.to(mainWordElements, {
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
              toggleActions: isAlreadyInView ? "play none none reverse" : "play none none none",
              once: false,
              refreshPriority: -1,
            },
          });
          
          // If already in view, trigger immediately
          if (isAlreadyInView) {
            mainWordsTween.play(0);
          }

          // Store the ScrollTrigger reference
          const mainWordsTrigger = mainWordsTween.scrollTrigger;
          if (mainWordsTrigger) {
            scrollTriggers.push(mainWordsTrigger);
          }
        }

        // Animate span words FIRST (no blur on words)
        // IMPORTANT: Animate words BEFORE applying blur to parent
        const spanWordElements = titleSpanRef.current.querySelectorAll('[class^="span-word-"]');
        if (spanWordElements.length > 0) {
          // Explicitly remove any blur from word spans immediately
          spanWordElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.filter = "none";
            htmlEl.style.willChange = "transform, opacity";
            htmlEl.style.isolation = "isolate";
            htmlEl.style.position = "relative";
            htmlEl.style.zIndex = "10";
          });

          gsap.set(spanWordElements, {
            opacity: 0,
            scale: 0.3,
            y: 50,
            rotationY: -45,
            willChange: "transform, opacity",
            filter: "none",
            clearProps: "filter",
          });

          const spanWordsTween = gsap.to(spanWordElements, {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0,
            filter: "none",
            clearProps: "filter",
            duration: 0.8,
            stagger: {
              each: 0.12,
              from: "start",
            },
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: isAlreadyInView ? "play none none reverse" : "play none none none",
              once: false,
              refreshPriority: -1,
              onEnter: () => {
                // Ensure word spans have no blur when entering viewport
                spanWordElements.forEach((el) => {
                  const htmlEl = el as HTMLElement;
                  htmlEl.style.filter = "none";
                  gsap.set(htmlEl, { filter: "none", clearProps: "filter" });
                });
              },
            },
            onComplete: () => {
              // Final cleanup - ensure no blur on words
              spanWordElements.forEach((el) => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.filter = "none";
                gsap.set(htmlEl, { filter: "none", clearProps: "filter" });
              });
            },
          });
          
          // If already in view, trigger immediately
          if (isAlreadyInView) {
            spanWordsTween.play(0);
          }

          // Store the ScrollTrigger reference
          const spanWordsTrigger = spanWordsTween.scrollTrigger;
          if (spanWordsTrigger) {
            scrollTriggers.push(spanWordsTrigger);
          }
        }

        // Animate span gradient background - apply blur ONLY after words are animated
        // Use backdrop-filter or separate the blur from affecting children
        // We'll animate the background position but keep blur minimal/removed
        gsap.set(titleSpanRef.current, {
          backgroundPosition: "200% 0",
          filter: "blur(0px)", // Start with no blur to not affect children
          willChange: "background-position",
        });

        // Animate gradient background position WITHOUT blur to avoid affecting children
        const gradientTween = gsap.to(titleSpanRef.current, {
          backgroundPosition: "0% 0",
          filter: "none", // No blur to avoid affecting word spans
          duration: 2.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: isAlreadyInView ? "play none none reverse" : "play none none none",
            once: false,
            refreshPriority: -1,
            onEnter: () => {
              // Ensure no blur on parent or children
              if (titleSpanRef.current) {
                gsap.set(titleSpanRef.current, {
                  filter: "none",
                });
                titleSpanRef.current.style.filter = "none";
              }
              // Also ensure word spans have no blur
              const wordSpans = titleSpanRef.current?.querySelectorAll('[class^="span-word-"]');
              if (wordSpans && wordSpans.length > 0) {
                wordSpans.forEach((el) => {
                  const htmlEl = el as HTMLElement;
                  htmlEl.style.filter = "none";
                  gsap.set(htmlEl, { filter: "none", clearProps: "filter" });
                });
              }
            },
          },
          onComplete: () => {
            // Ensure blur is completely removed
            if (titleSpanRef.current) {
              gsap.set(titleSpanRef.current, {
                filter: "none",
              });
              titleSpanRef.current.style.filter = "none";
              
              // Start continuous gradient flow after initial animation
              gsap.to(titleSpanRef.current, {
                backgroundPosition: "100% 0",
                duration: 4,
                ease: "none",
                repeat: -1,
                yoyo: true,
              });
            }
          },
        });
        
        // If already in view, trigger immediately
        if (isAlreadyInView) {
          gradientTween.play(0);
        }

        // Store the ScrollTrigger reference for gradient animation
        const gradientTrigger = gradientTween.scrollTrigger;
        if (gradientTrigger) {
          scrollTriggers.push(gradientTrigger);
        }

        // If already in view, remove blur immediately as fallback
        if (checkIfInView() && titleSpanRef.current) {
          setTimeout(() => {
            if (titleSpanRef.current) {
              gsap.set(titleSpanRef.current, {
                filter: "none",
                clearProps: "filter",
              });
              titleSpanRef.current.style.filter = "none";
            }
            const wordSpans = titleSpanRef.current?.querySelectorAll('[class^="span-word-"]');
            if (wordSpans && wordSpans.length > 0) {
              wordSpans.forEach((el) => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.filter = "none";
                gsap.set(htmlEl, {
                  filter: "none",
                  clearProps: "filter",
                });
              });
            }
          }, 50);
        }
      }

      // Description animation
      if (description) {
        const descEl = headerRef.current?.querySelector('[data-description]');
        if (descEl) {
          gsap.set(descEl, {
            opacity: 0,
            y: 30,
            willChange: "transform, opacity",
          });

          const descTween = gsap.to(descEl, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: isAlreadyInView ? "play none none reverse" : "play none none none",
              once: false,
              refreshPriority: -1,
            },
          });
          
          // If already in view, trigger immediately
          if (isAlreadyInView) {
            descTween.play(0);
          }

          // Store the ScrollTrigger reference
          const descTrigger = descTween.scrollTrigger;
          if (descTrigger) {
            scrollTriggers.push(descTrigger);
          }
        }
      }
    }, headerRef);

    // Refresh ScrollTrigger after a short delay to ensure all triggers are properly initialized
    // This is especially important on desktop where multiple sections might be visible
    setTimeout(() => {
      if (typeof window !== "undefined" && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 100);

    return () => {
      // Kill only the ScrollTriggers created by THIS instance
      scrollTriggers.forEach((trigger) => {
        try {
          if (trigger) {
            trigger.kill();
          }
        } catch (e) {
          // Ignore errors
        }
      });

      // Restore original HTML
      try {
        if (headerRef.current && headerRef.current.isConnected) {
          if (titleTextRef.current && originalTitleHTML && titleTextRef.current.isConnected) {
            titleTextRef.current.innerHTML = originalTitleHTML;
          }
          if (titleSpanRef.current && originalSpanHTML && titleSpanRef.current.isConnected) {
            titleSpanRef.current.innerHTML = originalSpanHTML;
          }
        }
      } catch (e) {
        // Ignore errors
      }

      // Revert GSAP context (this will also clean up any remaining ScrollTriggers in this context)
      try {
        ctx.revert();
      } catch (e) {
        // Ignore errors
      }
    };
  }, [badge, title, titleHighlight, description]);

  return (
    <div ref={headerRef} className={`text-center mb-12 sm:mb-16 w-full ${className}`}>
      {badge && (
        <div className="inline-block mb-4">
          <span
            data-badge
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm"
          >
            {badge}
          </span>
        </div>
      )}
      <h2
        data-title
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4 leading-tight"
      >
        {titleHighlight ? (
          <>
            <span ref={titleTextRef} data-title-text>
              {title}
            </span>{" "}
            <span
              ref={titleSpanRef}
              data-title-span
              className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%]"
              style={{ 
                backgroundPosition: "200% 0", 
                filter: "blur(0px)",
                isolation: "isolate",
                position: "relative",
                zIndex: 1
              }}
            >
              {titleHighlight}
            </span>
          </>
        ) : (
          <span ref={titleTextRef} data-title-text>
            {title}
          </span>
        )}
      </h2>
      {description && (
        <div className="flex justify-center w-full">
          <p data-description className="text-base sm:text-lg text-muted-foreground max-w-2xl text-center px-4">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

