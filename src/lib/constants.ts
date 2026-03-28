export const SITE_NAME = "SJSU Spartan Racing";
export const SITE_DESCRIPTION = "San José State University Formula SAE Racing Team — Engineering excellence since 1991.";
export const SITE_URL = "https://sjsuformulasae.com";

export const COLORS = {
  gold: "#D4A843",
  blue: "#0055A2",
  base: "#FAFAF8",
  surface: "#F0F0EC",
  elevated: "#FFFFFF",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Cars", href: "/cars" },
  { label: "Leads", href: "/team" },
  { label: "History", href: "/history" },
  { label: "Racing", href: "/racing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sjsu_fsae/",
  linkedin: "https://www.linkedin.com/company/sjsu-spartan-racing/",
  flickr: "https://www.flickr.com/photos/sjsufsae/",
  youtube: "https://www.youtube.com/@SJSUSpartanRacing",
} as const;

export const STATS = [
  { value: 35, suffix: "+", label: "Years Active" },
  { value: 16, suffix: "", label: "Cars Built" },
  { value: 100, suffix: "+", label: "Team Members" },
  { value: 7, suffix: "", label: "Subteams" },
] as const;
