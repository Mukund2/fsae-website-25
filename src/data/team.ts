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
    name: "Chassis",
    description:
      "Designs and fabricates the vehicle frame, impact attenuator, and structural components. Responsible for torsional rigidity, crashworthiness, and driver ergonomics using steel spaceframe and carbon fiber composite construction.",
    icon: "Box",
  },
  {
    name: "Powertrain",
    description:
      "Develops the electric drivetrain including motor selection, accumulator design, battery management system, inverter integration, and cooling systems. Optimizes power delivery and energy efficiency for competition events.",
    icon: "Zap",
  },
  {
    name: "Suspension",
    description:
      "Engineers the suspension geometry, uprights, hubs, and steering system. Performs vehicle dynamics simulation, tire modeling, and on-track tuning to maximize grip and driver confidence through corners.",
    icon: "Settings",
  },
  {
    name: "Aerodynamics",
    description:
      "Designs and manufactures the aerodynamics package including front wing, rear wing, undertray, and sidepods. Uses CFD simulation and wind tunnel testing to generate downforce while minimizing drag.",
    icon: "Wind",
  },
  {
    name: "Electronics",
    description:
      "Develops the vehicle's electrical systems including wiring harness, dashboard, data acquisition, telemetry, and control algorithms. Manages the tractive system controller and driver interface systems.",
    icon: "Cpu",
  },
  {
    name: "Business",
    description:
      "Handles sponsorship acquisition, marketing, social media, graphic design, and the business presentation event. Manages the team's brand and external communications with sponsors and the university.",
    icon: "Briefcase",
  },
  {
    name: "Operations",
    description:
      "Coordinates logistics, event planning, travel, shop management, inventory, and safety compliance. Ensures the team runs smoothly and meets all competition deadlines and requirements.",
    icon: "ClipboardList",
  },
];
