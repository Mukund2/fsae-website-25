import type { Car } from "@/types";

/**
 * The full Spartan Racing car lineage, newest → oldest.
 *
 * Photos are from the team's "Website Car Photos" archive (every car SR-0 → SR-16
 * plus the electric SRE line). Specs and years are team-documented. Race narratives
 * are only attached to cars where the result is documented; undocumented cars
 * intentionally show specs + photo without invented results.
 */
// ═══════════════════════════════════════════════════════════════════════
// HOW TO EDIT: The Cars lineage  (shows on: /cars page)
//
// ADD one  → copy a { ... } block below, paste it at the TOP of the array
//            (newest car goes first), edit the values.
// REMOVE one → delete its block.   EDIT one → change its values.
//
// Fields:
//   slug        — unique id, kebab-case e.g. "sr-18" (required)
//   name        — display name e.g. "SR-18" (required)
//   years       — e.g. "2027-2026"; the FIRST year shows as the big year on
//                 the card. Use "" if unknown. (required, may be "")
//   image       — path e.g. "/images/history/cars/sr-18.jpg" (required)
//   motor       — spec chip (optional — omit to hide the chip)
//   power       — spec chip (optional — omit to hide the chip)
//   torque      — spec chip (optional — omit to hide the chip)
//   battery     — spec chip (optional — omit to hide the chip)
//   description — race results / story (optional — leave OUT if you have no
//                 documented results; do NOT invent results)
//   badge       — small corner label e.g. "Current Car" (optional)
//
// Full walkthrough: docs/EDITING-GUIDE.md
// ═══════════════════════════════════════════════════════════════════════
export const cars: Car[] = [
  {
    slug: "sr-17",
    name: "SR-17",
    years: "2026",
    badge: "Current Car",
    image: "/images/history/cars/sr-17.jpg",
    description:
      "The latest iteration of our electric race car, SR-17, continues the legacy of Spartan Racing Electric.",
  },
  {
    slug: "sr-16",
    name: "SR-16",
    years: "2025-2024",
    motor: "Emrax 228",
    torque: "162 ft-lbs",
    battery: "8.3 kWh",
    image: "/images/history/cars/sr-16.jpg",
    description:
      "We competed in the Michigan FSAE competition with our improved car, SR-16. We placed 1st in Endurance, 5th in Autocross, and 2nd Overall. We also received the James Crook Unofficial Best Aero Vehicle award.",
  },
  {
    slug: "sr-15",
    name: "SR-15",
    years: "2024-2023",
    motor: "Emrax 228",
    torque: "162 ft-lbs",
    battery: "7.6 kWh",
    image: "/images/history/cars/sr-15.jpg",
    description:
      "With full focus on our electric race car, SR-15 competed in SoCal Shootout FSAE twice placing 1st EV each time. At Michigan FSAE: 1st Cummins Innovation Award, 2nd Cost Report, 3rd Endurance, 4th Design, 5th Overall.",
  },
  {
    slug: "sr-14",
    name: "SR-14",
    years: "2023-2022",
    motor: "Emrax 228",
    torque: "162 ft-lbs",
    battery: "7.6 kWh",
    image: "/images/history/cars/sr-14.jpg",
  },
  {
    slug: "sr-13",
    name: "SR-13",
    years: "2022-2021",
    badge: "Last Combustion Car",
    motor: "Triumph Daytona 675R",
    power: "95 HP",
    torque: "56 ft-lbs",
    image: "/images/history/cars/sr-13.jpg",
    description:
      "After over a decade of podium finishes, we retired our internal combustion platform with SR-13 as our last. Our Honda F4i and Triumph 675 platforms left us a wealth of knowledge, but we looked forward to a greener future.",
  },
  {
    slug: "sre-6",
    name: "SRE-6",
    years: "2022-2021",
    motor: "Emrax 228",
    torque: "162 ft-lbs",
    battery: "7.6 kWh",
    image: "/images/history/cars/sre-6.jpg",
  },
  {
    slug: "sr-12b",
    name: "SR-12B",
    years: "2021-2019",
    motor: "Triumph Daytona 675",
    power: "95 HP",
    torque: "162 ft-lbs",
    image: "/images/history/cars/sr-12.jpg",
  },
  {
    slug: "sre-5",
    name: "SRE-5",
    years: "2021-2019",
    motor: "Emrax 228",
    torque: "162 ft-lbs",
    battery: "8.1 kWh",
    image: "/images/history/cars/sre-5.jpg",
    description:
      "During the pandemic, Spartan Racing Electric manufactured the first ever running SRE race car. SRE-5 competed at Michigan FSAE placing 1st in Endurance and 2nd Overall.",
  },
  {
    slug: "sr-11",
    name: "SR-11",
    years: "2019-2018",
    motor: "Triumph Street Triple",
    power: "85 HP",
    torque: "54 ft-lbs",
    image: "/images/history/cars/sr-11.jpg",
  },
  {
    slug: "sre-4",
    name: "SRE-4",
    years: "2019-2018",
    motor: "Emrax 228",
    torque: "162 ft-lbs",
    battery: "7.2 kWh",
    image: "/images/history/cars/sre-4.jpg",
  },
  {
    slug: "sr-10",
    name: "SR-10",
    years: "2018-2017",
    motor: "Triumph Street Triple",
    power: "85 HP",
    torque: "54 ft-lbs",
    image: "/images/history/cars/sr-10.jpg",
  },
  {
    slug: "sre-3",
    name: "SRE-3",
    years: "2018-2017",
    motor: "Electric",
    image: "/images/history/cars/sre-3.jpg",
  },
  {
    slug: "sr-9",
    name: "SR-9",
    years: "2017-2016",
    motor: "Honda CBR600 F4i",
    power: "73 HP",
    torque: "37 ft-lbs",
    image: "/images/history/cars/sr-9.jpg",
  },
  {
    slug: "sre-2",
    name: "SRE-2",
    years: "2017-2016",
    motor: "Electric",
    image: "/images/history/cars/sre-2.jpg",
  },
  {
    slug: "sr-8",
    name: "SR-8",
    years: "2016-2015",
    motor: "Honda CBR600 F4i",
    power: "73 HP",
    torque: "37 ft-lbs",
    image: "/images/history/cars/sr-8.jpg",
  },
  {
    slug: "sr-7",
    name: "SR-7",
    years: "2015-2014",
    motor: "Honda CBR600 F4i",
    power: "73 HP",
    torque: "37 ft-lbs",
    image: "/images/history/cars/sr-7.jpg",
    description: "Placed 1st in the 2015 FSAE Competition with SR-7.",
  },
  {
    slug: "sr-6",
    name: "SR-6",
    years: "2014-2013",
    motor: "Honda CBR600 F4i",
    power: "80 HP",
    torque: "45 ft-lbs",
    image: "/images/history/cars/sr-6.jpg",
  },
  {
    slug: "sr-5",
    name: "SR-5",
    years: "2013-2012",
    motor: "Honda CBR600 F4i",
    power: "76 HP",
    torque: "45 ft-lbs",
    image: "/images/history/cars/sr-5.jpg",
  },
  {
    slug: "sr-4",
    name: "SR-4",
    years: "2012-2011",
    motor: "Honda CBR600 F4i",
    power: "82 HP",
    torque: "45 ft-lbs",
    image: "/images/history/cars/sr-4.jpg",
  },
  {
    slug: "sr-3",
    name: "SR-3",
    years: "2011-2010",
    motor: "Honda CBR600 F4i",
    power: "75 HP",
    torque: "40 ft-lbs",
    image: "/images/history/cars/sr-3.jpg",
  },
  {
    slug: "sr-2",
    name: "SR-2",
    years: "2010-2009",
    motor: "Honda CBR600 F4i",
    power: "75 HP",
    torque: "37 ft-lbs",
    image: "/images/history/cars/sr-2.jpg",
  },
  {
    slug: "sr-1",
    name: "SR-1",
    years: "2009-2008",
    motor: "Honda CBR600 F4i",
    power: "73 HP",
    torque: "36 ft-lbs",
    image: "/images/history/cars/sr-1.jpg",
    description:
      "A group of motivated engineering students revived Spartan Racing by creating SR-1. Won Rookie of the Year. Since then, the team has annually designed, manufactured, and competed.",
  },
  {
    slug: "sr-0",
    name: "SR-0",
    years: "1992",
    image: "/images/history/cars/sr-0.jpg",
    description:
      "Spartan Racing's first car, SR-0, was a senior project developed by students. After SR-0, the team remained inactive until it was revived in 2008.",
  },
];
