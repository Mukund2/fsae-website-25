export interface Car {
  slug: string;
  name: string;
  years: string;
  image?: string;
  motor?: string;
  power?: string;
  torque?: string;
  battery?: string;
  description?: string;
}

export interface CarSpec {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
}

export interface Subteam {
  name: string;
  abbreviation: string;
  description: string;
  image: string;
  icon?: string;
  members?: TeamMember[];
}

export interface Sponsor {
  name: string;
  tier: "title" | "platinum" | "gold" | "silver" | "bronze" | "partner";
  logo?: string;
  url?: string;
  description?: string;
}

export interface CompetitionResult {
  year: number;
  competition: string;
  location: string;
  overallPlace?: number;
  events: EventResult[];
  car?: string;
}

export interface EventResult {
  name: string;
  place: number;
  score?: number;
}

export interface TimelineEvent {
  year: number | string;
  title: string;
  description: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
