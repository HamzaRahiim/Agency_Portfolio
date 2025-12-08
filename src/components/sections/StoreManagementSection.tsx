"use client";

import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Product Research & Listings",
  },
  {
    number: "02",
    title: "Inventory Management",
  },
  {
    number: "03",
    title: "Order Processing & Returns",
  },
  {
    number: "04",
    title: "Order Tracking",
  },
  {
    number: "05",
    title: "Customer Service & Reviews",
  },
  {
    number: "06",
    title: "Grow & Scale Your Amazon Store",
  },
];

export default function StoreManagementSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pb-16 sm:pb-20 lg:pb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight max-w-5xl text-center w-full">
            Your One-Stop Solution for Full-Scale Store Management.{" "}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Done-For-You
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12 sm:pb-16 lg:pb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl lg:rounded-3xl border border-border/60 bg-muted/30 backdrop-blur-sm p-6 sm:p-8 overflow-hidden cursor-pointer"
            >
              {/* Left Side Hover Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1/2 bg-gradient-to-r from-primary to-primary/80 transition-all duration-700 ease-out rounded-l-2xl lg:rounded-l-3xl z-0" />

              {/* Right Side Hover Effect */}
              <div className="absolute right-0 top-0 bottom-0 w-0 group-hover:w-1/2 bg-gradient-to-l from-accent to-accent/80 transition-all duration-700 ease-out rounded-r-2xl lg:rounded-r-3xl z-0" />

              {/* Center Merge Effect - Appears when both sides meet */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0 group-hover:w-full -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 z-0 rounded-2xl lg:rounded-3xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Number Circle */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-lg">
                    {service.number}
                  </div>

                  {/* Title */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-500 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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

