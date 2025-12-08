"use client";


export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[500px] sm:min-h-[600px] flex items-center overflow-hidden pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        {/* Video Overlay - Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Video - Fully Responsive */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          {/* Mobile-optimized video for better performance */}
          <source src="/hero-video-mbl.mp4" type="video/mp4" media="(max-width: 768px)" />
          {/* Desktop video */}
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Done-for-you ecommerce & marketing agency
          </div> */}

          {/* Headline */}
          {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Launch & Grow Your{" "}
            <span className="text-accent">Online Business</span> With Expert
            Support
          </h1> */}

          {/* Description */}
          {/* <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-8">
            We help new entrepreneurs build profitable stores on Amazon,
            Shopify, Etsy & eBay — and manage all your digital marketing.
            From first product upload to consistent sales, our team handles
            everything for you.
          </p> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
              }}
            >
              Start Your Store Today
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
            </Link> */}
            {/* <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
            >
              View Our Services
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
