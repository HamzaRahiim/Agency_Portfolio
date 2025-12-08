"use client";

import Link from "next/link";

const services = [
  {
    title: "Amazon Wholesale FBA",
    description: "Complete Amazon FBA wholesale solutions for scaling your business with proven strategies and expert support.",
    icon: "📦",
    href: "/services/amazon-wholesale",
    gradient: "from-blue-600 to-blue-500",
  },
  {
    title: "TikTok Shop Automation",
    description: "Automate your TikTok Shop operations for maximum efficiency and reach millions of potential customers.",
    icon: "🎵",
    href: "/services/tiktok-automation",
    gradient: "from-blue-500 to-yellow-400",
  },
  {
    title: "Shopify Dropshipping",
    description: "Full-service Shopify dropshipping store setup and management to launch and scale your online business.",
    icon: "🛍️",
    href: "/services/shopify-dropshipping",
    gradient: "from-yellow-400 to-blue-500",
  },
  {
    title: "Walmart Automation",
    description: "End-to-end Walmart marketplace automation services to streamline operations and boost sales.",
    icon: "🏪",
    href: "/services/walmart-automation",
    gradient: "from-blue-700 to-blue-500",
  },
  {
    title: "Amazon Private Label",
    description: "Build and scale your own private label brand on Amazon with comprehensive branding and marketing support.",
    icon: "🏷️",
    href: "/services/amazon-private-label",
    gradient: "from-yellow-500 to-yellow-400",
  },
  {
    title: "Proxy Marketing",
    description: "Strategic marketing solutions to boost your online presence and drive targeted traffic to your stores.",
    icon: "📊",
    href: "/services/proxy-marketing",
    gradient: "from-blue-500 to-blue-600",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 lg:mb-24">
          {/* Left: Title */}
          <div>
            <div className="mb-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-4 py-2 rounded-full inline-block">
                Service Ecosystem
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight">
              The Leaders in Full{" "}
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Ecommerce Solutions
              </span>
            </h2>
          </div>

          {/* Right: Description - Aligned horizontally with heading */}
          <div className="flex items-center">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              To thrive in an ever-changing marketplace, you need a team of
              experts and a unified growth strategy. Discover how our services
              can elevate your brand to new heights.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative rounded-2xl lg:rounded-3xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden h-[200px] sm:h-[220px] lg:h-[240px]"
            >
              {/* Animated Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Accent Border on Hover */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-accent/30 transition-all duration-500" />

              {/* Main Content - Horizontal Layout: Icon Left, Title Right */}
              <div className="relative z-10 h-full flex items-center gap-4 sm:gap-5 p-5 sm:p-6 group-hover:-translate-y-3 transition-transform duration-500">
                {/* Left: Icon with Continuous Circular Animation */}
                <div className="shrink-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                    {/* Icon Background with Gradient */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />

                    {/* Icon Container with Circular Animation */}
                    <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/60 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl group-hover:border-primary/40 group-hover:shadow-lg transition-all duration-500">
                      {/* Icon with continuous circular rotation */}
                      <div className="h-6 sm:h-8 lg:h-10 w-6 sm:w-8 lg:w-10 flex items-center justify-center">
                        <div className="animate-spin-slow">
                          <span className="block">{service.icon}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Paper Unfold Effect - Slides up from bottom on hover with blur effect */}
              <div className="absolute inset-x-0 bottom-0 bg-card/80 backdrop-blur-md border-t-2 border-border/60 rounded-b-2xl lg:rounded-b-3xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 shadow-2xl z-20 p-5 sm:p-6">
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
              <div className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl lg:rounded-3xl blur-xl -z-10 transition-opacity duration-500`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

