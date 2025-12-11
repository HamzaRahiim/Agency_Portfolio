export interface TrustBadge {
  number: string;
  label: string;
  icon: string;
  animation: "pulse" | "bounce" | "spin" | "spin-slow";
}

export interface TrustBadgesData {
  trustBadges: TrustBadge[];
}

