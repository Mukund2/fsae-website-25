import type { TeamMember, Subteam } from "@/types";

export const team: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Team Captain",
    image: "/images/team/alex-chen.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Priya Patel",
    role: "Vice Captain",
    image: "/images/team/priya-patel.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Marcus Johnson",
    role: "Chief Engineer",
    image: "/images/team/marcus-johnson.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Sarah Kim",
    role: "Technical Director",
    image: "/images/team/sarah-kim.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "David Rodriguez",
    role: "Business Director",
    image: "/images/team/david-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Emily Nakamura",
    role: "Operations Manager",
    image: "/images/team/emily-nakamura.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "James Liu",
    role: "Safety Officer",
    image: "/images/team/james-liu.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Dr. Raymond Yee",
    role: "Faculty Advisor",
    image: "/images/team/raymond-yee.jpg",
    linkedin: "https://linkedin.com/in/",
  },
];

export const subteams: Subteam[] = [
  {
    name: "Aerodynamics",
    abbreviation: "AERO",
    description:
      "Design, manufacture, validate — we design and create the carbon fiber airfoils that push the car to the next level, from the front wing to the drag reduction system.",
    image: "/images/flickr/aero.jpg",
  },
  {
    name: "Powertrain",
    abbreviation: "PWR",
    description:
      "Motor, inverter, final drive. We build the drivetrain that puts power to the ground — from cell selection to gear ratio optimization.",
    image: "/images/flickr/powertrain.jpg",
  },
  {
    name: "Chassis",
    abbreviation: "CHAS",
    description:
      "The backbone of every car. We design and weld the steel tube space frame that everything bolts to, balancing stiffness with weight.",
    image: "/images/flickr/chassis.jpg",
  },
  {
    name: "Suspension",
    abbreviation: "SUSP",
    description:
      "Uprights, A-arms, steering, brakes — we tune the contact patch. Every tenth on track starts with suspension geometry.",
    image: "/images/flickr/suspension.jpg",
  },
  {
    name: "Electronics",
    abbreviation: "ELEC",
    description:
      "Responsible for designing and installing all analog and digital circuits in the car so that the electronics can work and output data properly.",
    image: "/images/flickr/electronics.jpg",
  },
  {
    name: "Software",
    abbreviation: "SOFT",
    description:
      "Program the electronic components so they behave properly in different states. Also responsible for data collection and logging.",
    image: "/images/flickr/software.jpg",
  },
  {
    name: "Business",
    abbreviation: "BIZ",
    description:
      "Handle data analytics, marketing, public relations, finances, and logistics for the team.",
    image: "/images/flickr/business.jpg",
  },
  {
    name: "Research & Development",
    abbreviation: "R&D",
    description:
      "With a focus on multi-year projects and manufacturing an experimental in-hubs powertrain, R&D is focused on developing and optimizing the future of Spartan Racing.",
    image: "/images/flickr/rnd.jpg",
  },
];
