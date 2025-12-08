"use client";

import { useEffect, useRef } from "react";

const stores = [
  {
    id: 1,
    sales: "$868",
    units: "40 Units",
    current: "721 Current",
    productSales: "19.99K USD",
    period: "Last 30 days",
    increase: "68% increase",
    previousIncrease: "1096% increase from Last year",
    time: "9:54",
  },
  {
    id: 2,
    sales: "$0.00",
    units: "0 Units",
    current: "1970 Current",
    productSales: "50.38K USD",
    period: "Last 12 months",
    increase: "43% increase",
    previousIncrease: "from Previous period",
    time: "2:38",
  },
  {
    id: 3,
    sales: "$868",
    units: "40 Units",
    current: "721 Current",
    productSales: "19.99K USD",
    period: "Last 30 days",
    increase: "68% increase",
    previousIncrease: "1096% increase from Last year",
    time: "9:54",
  },
  {
    id: 4,
    sales: "$14",
    units: "1 Unit",
    current: "5819 Current",
    productSales: "9.1K USD",
    period: "This month",
    increase: "39% increase",
    previousIncrease: "775% increase from Last year",
    time: "2:38",
  },
  {
    id: 5,
    sales: "$1,250",
    units: "55 Units",
    current: "1,200 Current",
    productSales: "45.5K USD",
    period: "Last 30 days",
    increase: "125% increase",
    previousIncrease: "890% increase from Last year",
    time: "10:15",
  },
];

export default function SuccessfulStoresSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust speed (lower = slower)
    let interval: NodeJS.Timeout | null = null;
    let isPaused = false;

    const autoScroll = () => {
      if (isPaused) return;
      
      scrollAmount += scrollSpeed;
      scrollContainer.scrollLeft = scrollAmount;

      // Reset scroll when reaching the end
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
    };

    const startScrolling = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(autoScroll, 16); // ~60fps
    };

    const stopScrolling = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      isPaused = true;
    };

    const resumeScrolling = () => {
      isPaused = false;
      startScrolling();
    };

    startScrolling();

    // Pause on hover
    scrollContainer.addEventListener("mouseenter", stopScrolling);
    scrollContainer.addEventListener("mouseleave", resumeScrolling);

    return () => {
      if (interval) clearInterval(interval);
      scrollContainer.removeEventListener("mouseenter", stopScrolling);
      scrollContainer.removeEventListener("mouseleave", resumeScrolling);
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Our Successful Stores
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-primary font-semibold">
            Experience in Making Businesses Grow.
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex gap-6 sm:gap-8 min-w-max px-4">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Phone Mockup */}
                  <div className="bg-background rounded-xl border-2 border-border p-4 shadow-inner">
                    {/* Phone Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground">
                        {store.time}
                      </span>
                      <div className="text-xs font-semibold text-foreground">
                        amazon seller
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Sales today so far
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {store.sales}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Units today so far
                        </p>
                        <p className="text-base font-semibold text-foreground">
                          {store.units}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Current</p>
                        <p className="text-base font-semibold text-foreground">
                          {store.current}
                        </p>
                      </div>
                    </div>

                    {/* Product Sales */}
                    <div className="mb-4 pb-4 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">Product sales</p>
                      <p className="text-base font-bold text-foreground">
                        {store.productSales}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {store.period}
                      </p>
                      <p className="text-xs text-emerald-500 font-semibold mt-1">
                        {store.increase}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {store.previousIncrease}
                      </p>
                    </div>

                    {/* Graph Placeholder */}
                    <div className="mb-4 h-24 bg-muted rounded flex items-end justify-between p-2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 rounded-t ${
                            store.id === 3
                              ? "bg-gradient-to-t from-orange-400 to-yellow-400"
                              : "bg-muted-foreground/30"
                          }`}
                          style={{
                            height: `${Math.random() * 60 + 30}%`,
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></div>
                        <span>Add a Product</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></div>
                        <span>Quick Start Guide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></div>
                        <span>Manage Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

