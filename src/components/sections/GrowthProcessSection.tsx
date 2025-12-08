"use client";

const processSteps = [
  {
    number: "1",
    title: "Deep Market Research",
    description:
      "We analyze market trends, competitor strategies, and customer behavior to identify profitable niches and products.",
    icon: "🔍",
  },
  {
    number: "2",
    title: "Strategic Design & Optimization",
    description:
      "From store setup to listing optimization, we craft a high-converting presence tailored for your target audience.",
    icon: "⚡",
  },
  {
    number: "3",
    title: "Scale & Automated Growth",
    description:
      "We implement advanced marketing funnels, automation tools, and continuous optimization to ensure sustainable growth.",
    icon: "🚀",
  },
];

const dataCards = [
  {
    tier: "MINI",
    amount: "$1,500",
    graphColor: "from-blue-500 to-blue-400",
    badgeBg: "bg-primary",
  },
  {
    tier: "STANDARD",
    amount: "$3,000",
    graphColor: "from-accent to-yellow-400",
    badgeBg: "bg-accent",
  },
  {
    tier: "PREMIUM",
    amount: "$5,000",
    graphColor: "from-primary via-accent to-primary",
    badgeBg: "bg-gradient-to-r from-primary to-accent",
  },
];

export default function GrowthProcessSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
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
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Background Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 rounded-3xl border border-white/10 backdrop-blur-sm"></div>

            {/* Gears - Blue & Yellow Theme */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Large Blue Gear */}
              <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 shadow-2xl opacity-90 animate-spin-slow z-20">
                <div className="absolute inset-3 border-4 border-blue-400/40 rounded-full"></div>
                <div className="absolute inset-6 border-2 border-blue-300/30 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl sm:text-2xl">DATA</span>
                </div>
              </div>

              {/* Medium Yellow Gear */}
              <div className="absolute right-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-yellow-500 via-accent to-yellow-600 shadow-xl opacity-85 animate-spin-slow-reverse z-30">
                <div className="absolute inset-2 border-3 border-yellow-400/40 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-lg sm:text-xl">AI</span>
                </div>
              </div>

              {/* Small Blue Gear */}
              <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg opacity-80 animate-spin-slow z-10">
                <div className="absolute inset-2 border-2 border-blue-300/40 rounded-full"></div>
              </div>
            </div>

            {/* Data Cards Stack - Right Side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3 sm:space-y-4 z-40">
              {dataCards.map((card, index) => (
                <div
                  key={index}
                  className="relative bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:z-50 border border-white/20"
                  style={{
                    width: "180px",
                    maxWidth: "100%",
                    transform: `rotate(${index === 0 ? "-8deg" : index === 1 ? "4deg" : "-3deg"}) translateX(${index * 8}px)`,
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
          </div>

          {/* Right: Process Steps */}
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="mb-8 sm:mb-10">
              <div className="inline-block mb-4">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70 bg-white/10 px-4 py-2 rounded-full">
                  Our Growth Process
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                A Proven Path to{" "}
                <span className="bg-gradient-to-r from-blue-400 via-accent to-blue-400 bg-clip-text text-transparent">
                  Ecommerce Success
                </span>
              </h2>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Connecting Line with Gradient */}
              <div className="absolute left-6 sm:left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30 hidden sm:block"></div>

              <div className="space-y-8 sm:space-y-10">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex gap-4 sm:gap-6 group"
                  >
                    {/* Number Circle with Icon */}
                    <div className="shrink-0 relative">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xl transition-all duration-500 group-hover:scale-110 ${index === 0
                          ? "bg-primary"
                          : index === 1
                            ? "bg-accent"
                            : "bg-primary"
                          }`}
                      >
                        {index === 0 ? (
                          <span className="text-2xl">{step.icon}</span>
                        ) : (
                          <span className="text-2xl">{step.icon}</span>
                        )}
                      </div>
                      {/* Pulse Effect */}
                      <div
                        className={`absolute inset-0 rounded-full ${index === 0 ? "bg-primary" : index === 1 ? "bg-accent" : "bg-primary"
                          } opacity-20 animate-ping`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
