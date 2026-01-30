"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";

interface HeroService {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  slug: string;
  icon: string;
  gradient: string;
}

export default function HeroSection() {
  const [services, setServices] = useState<HeroService[]>([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/hero-services");
        const data = await response.json();
        setServices(data.services);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load services:", error);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Auto-rotate services
  useEffect(() => {
    if (services.length === 0) return;

    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % services.length);
        setFadeOut(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [services]);

  if (isLoading || services.length === 0) {
    return <div className="h-[80vh] bg-slate-900" />;
  }

  const currentService = services[currentServiceIndex];

  return (
    <section id="home" className="relative overflow-hidden pt-20 min-h-[80vh]">
      {/* Background Video */}
      <div
        className="relative w-full overflow-hidden min-h-[80vh]"
        style={{
          background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for text readability */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Service Carousel Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="container mx-auto w-full max-w-7xl">
            <div
              className={`max-w-4xl transition-all duration-500 ${fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            >
              {/* Service Badge with Icon */}
              <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg animate-fade-up">
                <span className="text-xl sm:text-2xl">
                  <BsStars color="yellow" />
                </span>
                <span>Our Services</span>
              </div>

              {/* Service Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-2 drop-shadow-lg animate-fade-in-scale">
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {currentService.title}
                </span>
              </h1>

              {/* Service Subtitle / Promotional Line */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl leading-relaxed mb-5 drop-shadow-md font-light animate-fade-up">
                {currentService.subtitle}
              </p>

              {/* CTA Button */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8">
                <Link
                  href={currentService.href}
                  className="group relative inline-flex items-center justify-center rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  style={{
                    background: 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(251, 146, 60, 0.9), rgba(59, 130, 246, 0.9))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))';
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white/20" />

                  {/* Button content */}
                  <span className="relative flex items-center gap-2 whitespace-nowrap">
                    {currentService.cta}
                    <svg
                      className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Service Indicators - Dots */}
              <div className="flex gap-2 sm:gap-3">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFadeOut(true);
                      setTimeout(() => {
                        setCurrentServiceIndex(idx);
                        setFadeOut(false);
                      }, 300);
                    }}
                    className={`rounded-full transition-all duration-300 ${idx === currentServiceIndex
                      ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white"
                      : "w-2 h-2 sm:h-2.5 bg-white/40 hover:bg-white/60"
                      }`}
                    aria-label={`Go to service ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
