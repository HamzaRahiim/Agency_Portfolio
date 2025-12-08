"use client";

import { useEffect, useRef } from "react";

export default function TrustBadgesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const trustBadges = [
    {
      number: "500+",
      label: "Stores Launched",
      icon: "🏪",
    },
    {
      number: "5+ yrs",
      label: "Ecommerce Experience",
      icon: "⭐",
    },
    {
      number: "100+",
      label: "International Clients",
      icon: "🌍",
    },
    {
      number: "$50M+",
      label: "Revenue Generated",
      icon: "💰",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: "✅",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: "🔄",
    },
  ];

  // Duplicate badges for seamless infinite scroll
  const duplicatedBadges = [...trustBadges, ...trustBadges];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1.5; // Increased speed for visible scrolling
    let animationFrameId: number;
    let isPaused = false;

    const autoScroll = () => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }

      scrollAmount += scrollSpeed;
      scrollContainer.scrollLeft = scrollAmount;

      // Reset scroll when reaching halfway (seamless loop)
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    const startScrolling = () => {
      isPaused = false;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    const stopScrolling = () => {
      isPaused = true;
    };

    startScrolling();

    // Pause on hover
    scrollContainer.addEventListener("mouseenter", stopScrolling);
    scrollContainer.addEventListener("mouseleave", startScrolling);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", stopScrolling);
      scrollContainer.removeEventListener("mouseleave", startScrolling);
    };
  }, []);

  return (
    <>
      {/* Position cards to overlap with hero section - half on video, half below */}
      <div className="relative -mt-[180px] sm:-mt-[220px] lg:-mt-[260px] mb-16 sm:mb-20 lg:mb-24 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Horizontal Scrolling Container */}
          <div className="relative">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide px-12 sm:px-16"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-6 sm:gap-8 lg:gap-10 min-w-max py-4">
                {duplicatedBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="group shrink-0 w-[280px] sm:w-[320px] lg:w-[380px] rounded-2xl lg:rounded-3xl border-2 border-border bg-card shadow-lg backdrop-blur-sm px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 text-center hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center mb-4 sm:mb-5">
                      <div className="text-5xl sm:text-6xl lg:text-7xl group-hover:scale-105 transition-transform duration-300 origin-center">
                        {badge.icon}
                      </div>
                    </div>

                    {/* Number */}
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-2 sm:mb-3">
                      {badge.number}
                    </div>

                    {/* Label */}
                    <div className="text-base sm:text-lg text-muted-foreground font-medium leading-tight">
                      {badge.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


