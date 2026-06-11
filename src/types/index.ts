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
  /** Optional corner label, e.g. "Last Combustion Car" or "Current Car". */
  badge?: string;
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
  invertOnLight?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
