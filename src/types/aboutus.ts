export interface Hero {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  ceoImage?: string;
  ceoName?: string;
  ceoRole?: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Mission {
  title: string;
  description: string;
  values: Value[];
}

export interface StorySection {
  year: string;
  title: string;
  description: string;
}

export interface Story {
  title: string;
  sections: StorySection[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
}

export interface Team {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface Stats {
  title: string;
  items: Stat[];
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface Approach {
  title: string;
  subtitle: string;
  steps: ApproachStep[];
}

export interface CTA {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface AboutUsData {
  hero: Hero;
  mission: Mission;
  story: Story;
  team: Team;
  stats: Stats;
  approach: Approach;
  cta: CTA;
}
