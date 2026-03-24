import type { FAQ } from "@/types";

export const faqs: FAQ[] = [
  // General
  {
    question: "What is Formula SAE?",
    answer:
      "Formula SAE (FSAE) is an international collegiate engineering competition organized by SAE International. Student teams design, build, and race small open-wheel race cars, evaluated on engineering design, cost analysis, business presentation, and dynamic performance events including acceleration, skidpad, autocross, and endurance.",
    category: "General",
  },
  {
    question: "What is SJSU Spartan Racing?",
    answer:
      "SJSU Spartan Racing is San José State University's Formula SAE team, founded in 1991. We are a student-run organization that designs, manufactures, and races an electric formula-style race car each year. Our team of over 100 members spans multiple engineering disciplines and business functions.",
    category: "General",
  },
  {
    question: "Where is the team based?",
    answer:
      "Our workshop is located in the Charles W. Davidson College of Engineering at San José State University. We have a dedicated fabrication and assembly space equipped with machining tools, welding stations, composites layup areas, and electronics workbenches.",
    category: "General",
  },
  {
    question: "How is the team funded?",
    answer:
      "We are funded through a combination of corporate sponsorships, university support from the College of Engineering, fundraising events, and team membership dues. Sponsorships are our primary source of funding, providing both financial support and in-kind donations of materials, software, and services.",
    category: "General",
  },

  // Membership
  {
    question: "Who can join the team?",
    answer:
      "Any currently enrolled SJSU student can join regardless of major, year, or prior experience. While many members study engineering, we welcome students from business, design, communications, and other fields. No prior automotive or racing experience is required — we provide training for all skill levels.",
    category: "Membership",
  },
  {
    question: "When and how do I join?",
    answer:
      "We recruit new members primarily at the start of each fall semester during our general meetings and the SJSU Student Organization Fair. However, you can express interest at any time by attending our weekly general meetings or reaching out through our social media channels. Check our Instagram for the latest meeting times and locations.",
    category: "Membership",
  },
  {
    question: "What is the time commitment?",
    answer:
      "The typical time commitment is 8-12 hours per week, though this varies by role and the time of year. The weeks leading up to competition (typically March through May) require more intensive work. We understand that academics come first and work with members to balance their schedules.",
    category: "Membership",
  },
  {
    question: "Do I need to pay dues?",
    answer:
      "There is a modest semesterly membership fee that helps cover consumable materials and operational costs. The exact amount is announced at the start of each semester. Financial assistance is available — no one is turned away due to inability to pay.",
    category: "Membership",
  },

  // Technical
  {
    question: "Why did the team switch to electric?",
    answer:
      "We transitioned to electric power in 2022 to align with the evolving automotive industry and give our members hands-on experience with technologies they will encounter in their engineering careers. Electric powertrains also offer precise torque control, enabling advanced features like torque vectoring that improve vehicle dynamics.",
    category: "Technical",
  },
  {
    question: "What software tools does the team use?",
    answer:
      "We use SolidWorks for 3D CAD design, Ansys for FEA and CFD simulation, Altium Designer for PCB design, MATLAB/Simulink for controls and vehicle dynamics modeling, and various programming tools for embedded systems development. All software licenses are provided through our sponsors.",
    category: "Technical",
  },
  {
    question: "What skills will I learn on the team?",
    answer:
      "Members gain hands-on experience in mechanical design, manufacturing (welding, machining, composites), electrical systems, embedded programming, project management, and professional communication. You will also develop teamwork, problem-solving, and leadership skills that are highly valued by employers.",
    category: "Technical",
  },

  // Competition
  {
    question: "What competitions do you attend?",
    answer:
      "We primarily compete at FSAE Michigan, the largest Formula SAE competition held annually in Brooklyn, Michigan. We also attend Formula Hybrid + Electric at New Hampshire Motor Speedway. Competition season typically runs from May through June.",
    category: "Competition",
  },
  {
    question: "What events are judged at competition?",
    answer:
      "FSAE competitions include static events (Engineering Design, Cost & Manufacturing Analysis, Business Presentation) and dynamic events (Acceleration, Skidpad, Autocross, Endurance, and Efficiency). The overall score is a weighted combination of all events, with Endurance carrying the most points.",
    category: "Competition",
  },
  {
    question: "Can I attend competition even if I am not a driver?",
    answer:
      "Absolutely. Only 2-4 members serve as drivers, but the entire team travels to competition. Members are needed for technical inspections, car setup, pit crew operations, static event presentations, data analysis, and logistics. Competition is a team-wide effort and one of the most rewarding experiences of the year.",
    category: "Competition",
  },
];
