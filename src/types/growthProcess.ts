export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  animation: "pulse" | "bounce";
}

export interface DataCard {
  tier: string;
  amount: string;
  graphColor: string;
  badgeBg: string;
}

export interface GrowthProcessData {
  processSteps: ProcessStep[];
  dataCards: DataCard[];
}

