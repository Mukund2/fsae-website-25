import type { Sponsor } from "@/types";

// ═══════════════════════════════════════════════════════════════════════
// HOW TO EDIT: Sponsors  (shows on: /sponsors page)
//
// IMPORTANT: The scrolling logo strip on the HOMEPAGE is a SEPARATE list in
//   src/components/home/sponsor-strip.tsx — update BOTH when adding/removing.
//
// ADD one  → copy a { ... } block below, paste it under the right tier
//            comment, edit the values.
// REMOVE one → delete its block.   EDIT one → change its values.
//
// Fields:
//   name — sponsor name (required)
//   tier — one of: "title" | "platinum" | "gold" | "silver" | "bronze" |
//          "partner" (required — controls which section it appears in)
//   url  — website link (optional — omit if none)
//   logo — image path e.g. "/images/sponsors/xxx.png" or ".svg"
//          (optional — OMIT to show the name as plain text instead)
//
// Full walkthrough: docs/EDITING-GUIDE.md
// ═══════════════════════════════════════════════════════════════════════
export const sponsors: Sponsor[] = [
  // Title ($30,000+)
  {
    name: "Cadence",
    tier: "title",
    url: "https://www.cadence.com",
    logo: "/images/sponsors/cadence.png",
  },
  {
    name: "Military Fasteners",
    tier: "title",
    url: "https://www.militaryfasteners.com",
    logo: "/images/sponsors/military-fasteners.png",
  },
  {
    name: "Altium",
    tier: "title",
    url: "https://www.altium.com",
    logo: "/images/sponsors/altium.svg",
  },
  {
    name: "Siemens",
    tier: "title",
    url: "https://www.siemens.com",
    logo: "/images/sponsors/siemens.png",
  },
  {
    name: "Ansys",
    tier: "title",
    url: "https://www.ansys.com",
    logo: "/images/sponsors/ansys.png",
  },
  {
    name: "Toray",
    tier: "title",
    url: "https://www.toray.com",
    logo: "/images/sponsors/toray.png",
  },
  {
    name: "Bergman",
    tier: "title",
    logo: "/images/sponsors/bergman.svg",
  },
  {
    name: "Don Beal",
    tier: "title",
    logo: "/images/sponsors/don-beal.svg",
  },
  {
    name: "Roku",
    tier: "platinum",
    url: "https://www.roku.com",
    logo: "/images/sponsors/roku.png",
  },

  // Platinum ($20,000+)
  {
    name: "Motec USA",
    tier: "platinum",
    url: "https://www.motec.com.au",
    logo: "/images/sponsors/motec.png",
  },
  {
    name: "Levy",
    tier: "platinum",
    url: "https://www.levyrestaurants.com",
    logo: "/images/sponsors/levy.png",
  },
  {
    name: "BayView Plastics",
    tier: "platinum",
    logo: "/images/sponsors/bayview-plastics.svg",
  },
  {
    name: "Phoenix Contact",
    tier: "platinum",
    url: "https://www.phoenixcontact.com",
    logo: "/images/sponsors/phoenix-contact.png",
  },

  // Gold ($10,000+)
  {
    name: "Vi-grade",
    tier: "gold",
    url: "https://www.vi-grade.com",
    logo: "/images/sponsors/vi-grade.png",
  },
  {
    name: "Cisco",
    tier: "gold",
    url: "https://www.cisco.com",
    logo: "/images/sponsors/cisco.png",
  },
  {
    name: "Rapid Harness",
    tier: "gold",
    url: "https://www.rapidharness.com",
    logo: "/images/sponsors/rapid-harness.png",
  },
  {
    name: "SFR SCCA",
    tier: "gold",
    url: "https://www.sfrscca.org",
    logo: "/images/sponsors/sfr-scca.png",
  },
  {
    name: "Candy Store Foundation",
    tier: "gold",
  },
  {
    name: "Lucid Motors",
    tier: "gold",
    url: "https://www.lucidmotors.com",
    logo: "/images/sponsors/lucid-motors.png",
  },
  {
    name: "Marin Design Works",
    tier: "gold",
  },
  {
    name: "Curvilinear Components",
    tier: "gold",
    url: "https://oneoffparts.com",
  },

  // Silver ($5,000+)
  {
    name: "Mountz Torque",
    tier: "silver",
    url: "https://www.mountztorque.com",
    logo: "/images/sponsors/mountz-torque.png",
  },
  {
    name: "Evonik",
    tier: "silver",
    url: "https://www.evonik.com",
    logo: "/images/sponsors/evonik.png",
  },
  {
    name: "Futek",
    tier: "silver",
    url: "https://www.futek.com",
    logo: "/images/sponsors/futek.svg",
  },
  {
    name: "About Energy",
    tier: "silver",
    url: "https://www.aboutenergy.io",
    logo: "/images/sponsors/about-energy.png",
  },
  {
    name: "Rivian Volkswagen Group",
    tier: "silver",
    url: "https://www.rivian.com",
    logo: "/images/sponsors/rivian-vw.png",
  },

  // Bronze ($2,500+)
  {
    name: "Star One Credit Union",
    tier: "bronze",
    url: "https://www.starone.org",
    logo: "/images/sponsors/star-one.svg",
  },
  {
    name: "Airtech",
    tier: "bronze",
    url: "https://www.airtechintl.com",
    logo: "/images/sponsors/airtech.png",
  },
  {
    name: "Sabalcore",
    tier: "bronze",
    url: "https://www.sabalcore.com",
    logo: "/images/sponsors/sabalcore.png",
  },
  {
    name: "LCL Machining",
    tier: "bronze",
    logo: "/images/sponsors/lcl-machining.svg",
  },
  {
    name: "Amex Plating",
    tier: "bronze",
    url: "https://amexplating.com",
    logo: "/images/sponsors/amex-plating.png",
  },

  // Partner (Under $2,500)
  {
    name: "Rexco",
    tier: "partner",
    url: "https://www.rfrexco.com",
    logo: "/images/sponsors/rexco.svg",
  },
  {
    name: "Chemtrend",
    tier: "partner",
    url: "https://www.chemtrend.com",
    logo: "/images/sponsors/chemtrend.png",
  },
  {
    name: "SMC",
    tier: "partner",
    url: "https://www.smcusa.com",
    logo: "/images/sponsors/smc.png",
  },
  {
    name: "Dremel",
    tier: "partner",
    url: "https://www.dremel.com",
    logo: "/images/sponsors/dremel.png",
    invertOnLight: true,
  },
  {
    name: "FibreGlast",
    tier: "partner",
    url: "https://www.fibreglast.com",
    logo: "/images/sponsors/fibreglast.svg",
  },
  {
    name: "XRP",
    tier: "partner",
    url: "https://www.xrp.com",
    logo: "/images/sponsors/xrp.png",
  },
  {
    name: "Matter Hackers",
    tier: "partner",
    url: "https://www.matterhackers.com",
    logo: "/images/sponsors/matter-hackers.png",
  },
  {
    name: "Bender",
    tier: "partner",
    url: "https://www.benderinc.com",
    logo: "/images/sponsors/bender.svg",
  },
  {
    name: "VectorNav",
    tier: "partner",
    url: "https://www.vectornav.com",
    logo: "/images/sponsors/vectornav.svg",
  },
  {
    name: "Glenrock Builders",
    tier: "partner",
    logo: "/images/sponsors/glenrock.svg",
  },
  {
    name: "Bojo Tools",
    tier: "partner",
    url: "https://www.bojotools.com",
    logo: "/images/sponsors/bojo-tools.png",
  },
  {
    name: "Garner Heat Treat",
    tier: "partner",
    logo: "/images/sponsors/garnerheat.svg",
  },
  {
    name: "Bay Technology Mfg",
    tier: "partner",
    logo: "/images/sponsors/bay-technology.svg",
  },
  {
    name: "Shining 3D",
    tier: "partner",
    url: "https://www.shining3d.com",
    logo: "/images/sponsors/shining-3d.png",
  },
  {
    name: "TE Connectivity",
    tier: "platinum",
    url: "https://www.te.com",
    logo: "/images/sponsors/te-connectivity.svg",
  },
  {
    name: "Prismatic Powders",
    tier: "partner",
    url: "https://www.prismaticpowders.com",
    logo: "/images/sponsors/prismatic-powders.png",
  },
  {
    name: "Valence Precision",
    tier: "silver",
    url: "https://valenceprecision.com",
  },
];
