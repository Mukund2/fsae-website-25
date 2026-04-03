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
      "We design parts on the car that create downforce and reduce drag, such as the front and rear wings, canards, and side pods.",
    image: "/images/cars/car-1.jpg",
  },
  {
    name: "Powertrain",
    abbreviation: "PWR",
    description:
      "We design the systems that make the car move, such as the electric motor, accumulator (battery), and final drive.",
    image: "/images/flickr/driver-day-3.jpg",
  },
  {
    name: "Chassis",
    abbreviation: "CHAS",
    description:
      "We design and create a rigid skeleton for the car so that other subteams can mount parts onto it and so that the car can handle well.",
    image: "/images/flickr/driver-day-5.jpg",
  },
  {
    name: "Suspension",
    abbreviation: "SUSP",
    description:
      "We design everything that controls the kinematics of the vehicle, such as the brakes, steering, and suspension.",
    image: "/images/cars/car-2.jpg",
  },
  {
    name: "Electronics",
    abbreviation: "ELEC",
    description:
      "We are responsible for designing and installing all analog and digital circuits in the car so that the electronics can work and output data properly.",
    image: "/images/cars/car-3.jpg",
  },
  {
    name: "Software",
    abbreviation: "SOFT",
    description:
      "We program the electronic components so they behave properly in different states. We are also responsible for data collection and logging.",
    image: "/images/flickr/comp-action-2.jpg",
  },
  {
    name: "Business",
    abbreviation: "BIZ",
    description:
      "We handle data analytics, marketing, public relations, finances, and logistics for the team.",
    image: "/images/flickr/comp-action-3.jpg",
  },
  {
    name: "Research & Development",
    abbreviation: "R&D",
    description:
      "With a focus on multi-year projects and manufacturing an experimental in-hubs powertrain, R&D is focused on developing and optimizing the future of Spartan Racing.",
    image: "/images/team/team-group.jpg",
  },
];
