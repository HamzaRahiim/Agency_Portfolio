"use client";

import { Check, X, Sprout, Medal, Gem, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PlanFeature {
  name: string;
  starter: boolean | string;
  gold: boolean | string;
  platinum: boolean | string;
  hasInfo?: boolean;
}

const features: PlanFeature[] = [
  { name: "Action plan", starter: true, gold: true, platinum: true },
  { name: "Current campaign audit", starter: true, gold: true, platinum: true },
  { name: "Target audience research", starter: false, gold: true, platinum: true },
  { name: "Ad content creation", starter: false, gold: true, platinum: true },
  { name: "Campaign setup", starter: false, gold: true, platinum: true },
  { name: "Campaign optimization", starter: false, gold: true, platinum: true },
  { name: "Ads analytical report", starter: false, gold: false, platinum: true },
  { name: "Number of ads", starter: "1", gold: "3", platinum: "7" },
  { name: "Management (days)", starter: "1", gold: "7", platinum: "15" },
];

const plans = [
  {
    id: "starter",
    name: "Basic",
    icon: Sprout,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    popular: false,
  },
  {
    id: "gold",
    name: "Premium",
    icon: Medal,
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    popular: true,
  },
  {
    id: "platinum",
    name: "Standard",
    icon: Gem,
    color: "from-blue-400 to-cyan-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    popular: false,
  },
];

export default function MetaAdsPlans() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        // Sticky when table header reaches 80px from top (below header which is h-20 = 80px)
        setIsSticky(rect.top <= 80);
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Service Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5">
          Meta Ads <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Service</span>
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base mt-2">
          Professional Facebook & Instagram advertising solutions
        </p>
      </div>

      {/* Pricing Table */}
      <div ref={tableRef} className="w-full">
        {/* Sticky Header Row */}
        <div
          className={`grid grid-cols-4 gap-4 transition-all duration-300 ${isSticky
            ? "fixed top-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-md shadow-lg border-b border-border/60 py-3"
            : "relative pb-4"
            }`}
          style={
            isSticky
              ? {
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }
              : {}
          }
        >
          {/* Empty cell for feature names column */}
          <div className="hidden sm:block"></div>

          {/* Plan Headers - Simple Design */}
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className="relative flex flex-col items-center justify-center gap-2 py-2"
              >
                {plan.popular && (
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r ${plan.color} text-white px-2.5 py-0.5 text-[10px] font-bold rounded-full shadow-sm whitespace-nowrap`}>
                    MOST POPULAR
                  </div>
                )}
                <div className={`inline-flex items-center justify-center p-1.5 rounded-lg bg-gradient-to-br ${plan.color} text-white`}>
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  {plan.name}
                </h4>
              </div>
            );
          })}
        </div>

        {/* Features Table */}
        <div className={`mt-4 ${isSticky ? "pt-32" : ""}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 py-4 sm:py-5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors duration-200"
            >
              {/* Feature Name */}
              <div className="flex items-center gap-2 px-2 sm:px-4">
                <span className="text-sm sm:text-base font-medium text-foreground">
                  {feature.name}
                </span>
                {feature.hasInfo && (
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                )}
              </div>

              {/* Plan Values */}
              {plans.map((plan) => {
                const value =
                  plan.id === "starter"
                    ? feature.starter
                    : plan.id === "gold"
                      ? feature.gold
                      : feature.platinum;

                return (
                  <div
                    key={plan.id}
                    className="flex items-center justify-center px-2"
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/40" strokeWidth={2.5} />
                      )
                    ) : (
                      <span className="text-sm sm:text-base font-semibold text-primary">
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          All plans include expert support and proven strategies. Contact us for custom enterprise solutions.
        </p>
      </div>
    </div>
  );
}

