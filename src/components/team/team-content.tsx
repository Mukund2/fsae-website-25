"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Lead {
  name: string;
  role: string;
  description?: string;
  linkedin?: string;
  image?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const executiveBoard: Lead[] = [
  {
    name: "Hiren Patel",
    role: "Chief Engineer",
    image: "/images/team/leads/hiren-patel.jpg",
    linkedin: "https://www.linkedin.com/in/hirenspatel1",
    description: "Hiren Patel is a first-year Mechanical Engineering Masters student who joined the team during SR-13 as an intern. He completed his undergraduate Mechanical Engineering program here at SJSU. During SR-15 he was a chassis designer and helped manufacture the wiring harness. During SR-16 he worked as a Systems Integration member ensuring all aspects of the vehicle worked together. Due to his knowledge and skill level, Hiren was asked to step up during completion as a Project Manager ensuring the team made it through all technical inspections and dynamic events. After serving in multiple design roles, Hiren is this year\u2019s Chief Engineer and looks forward to striving for a podium finish at this year\u2019s competition.",
  },
  {
    name: "Will Kittinger",
    role: "President",
    image: "/images/team/leads/will-kittinger.jpg",
    linkedin: "https://www.linkedin.com/in/william-kittinger/",
    description: "Will Kittinger is a fifth year Management Information Systems major who began with Spartan Racing as a Business Team intern during SR-15. He quickly expanded his role, contributing to both business operations and mechanical subteams such as Suspension and Final Drive during SR-16. He developed the foundation of the Cost Report while leading sponsor outreach efforts. Will now serves as President and Business Lead for SR-17, where he is focused on guiding the team forward. His goal is to bring home a first place finish at competition next June.",
  },
  {
    name: "Ally Almiranez",
    role: "Treasurer",
    image: "/images/team/leads/ally-almiranez.jpg",
    linkedin: "https://www.linkedin.com/in/ally-almiranez",
    description: "Ally Almiranez is a second-year Marketing major who joined the team during SR-16. Since then, she has supported the team by sending gifts to top-tier sponsors, managing the club\u2019s website, and assisting with logistics for the team\u2019s largest annual competition. This year, she\u2019s excited to be our Treasurer and looks forward to what the year will bring!",
  },
  {
    name: "Angel Lopez",
    role: "Project Manager",
    image: "/images/team/leads/angel-lopez.jpg",
    linkedin: "https://www.linkedin.com/in/angel-lopez200",
    description: "Angel Lopez is a third-year Mechanical Engineering student who joined the team during SR-15 as an Aerodynamic and Final Drive intern. During SR-16, he served as both an Aerodynamics Designer and a Differential Carrier Designer. This year Angel has taken role as Project Manager for SR-17 and looks forward in guiding the team through new challenges and achievements.",
  },
  {
    name: "Aidan Garcia",
    role: "Safety Officer",
    image: "/images/team/leads/aidan-garcia.jpg",
    linkedin: "https://www.linkedin.com/in/aidan-garcia-000b1832a/",
    description: "Aidan Garcia is an Interdisciplinary Engineering student in his 5th year who joined Spartan Racing during SR-15 as an intern for the powertrain team. After a few short months, he was named as one of SR-16\u2019s battery pack designers. After an intense design season, Aidan was able to finish manufacturing the first of 2 accumulators 2 weeks ahead of schedule. This allowed for more testing and validation than initially anticipated which contributed to its reliability that was a key part in the team placing 1st in endurance.",
  },
];

const subteamLeads: Lead[] = [
  {
    name: "Damon Haberman",
    role: "Aerodynamics Lead",
    image: "/images/team/leads/damon-haberman.jpg",
    linkedin: "https://www.linkedin.com/in/damon-haberman",
    description: "Damon Haberman is a fourth-year Aerospace Engineering student who joined Spartan Racing during SR-13 and SRE-6 as a member of the aerodynamics team. Over his first three years, he focused on iterative aero design of the front wing and undertray, contributing to a 20% increase in downforce. Building on that experience, Damon redesigned the entire package from front to back in his fourth year, achieving a further 25% improvement in vehicle downforce. Now serving as Aerodynamics Lead for SR-17, he aims to refine the package into a reliable and durable system while expanding the team\u2019s understanding of its performance on track.",
  },
  {
    name: "Hayat Dlala",
    role: "Business Lead",
    image: "/images/team/leads/hayat-dlala.jpg",
    linkedin: "https://www.linkedin.com/in/hayat-dlala",
    description: "Hayat is a 2nd-year Finance major who joined Spartan Racing as an intern during the SR-17 season. She contributed across logistics, media, newsletters, and graphic design, before taking on responsibilities in project management and business operations. She currently serves as Business Lead, focused on building a sustainable and efficient business team capable of operating year-round and competing for 1st place.",
  },
  {
    name: "Emmett Miura",
    role: "Chassis Lead",
    image: "/images/team/leads/emmett-miura.jpg",
    linkedin: "https://www.linkedin.com/in/emmett-miura-6b0416284/",
    description: "Emmett Miura is a third-year Mechanical Engineering student who joined Spartan Racing during SR-15 as an intern. In his first season, he worked on the steering wheel, designed and machined jigs, and contributed to various suspension tasks. The following year, he designed the SR-16 steering system, and he now serves as SR-17\u2019s Chassis Lead and kinematics designer.",
  },
  {
    name: "William La Poll",
    role: "Electronics Lead",
    image: "/images/team/leads/william-la-poll.jpg",
    linkedin: "https://www.linkedin.com/in/william-la-poll-69428633b",
    description: "William La Poll is a third-year Electrical Engineering student who joined Spartan Racing during SR-15 as an intern supporting the wire harness. In SR-16 he contributed as a wire harness designer and co-designed the motherboard. This year he serves as Electronics Lead, focused on building a reliable and fast race car.",
  },
  {
    name: "Harleen Sandhu",
    role: "Software Lead",
    image: "/images/team/leads/harleen-sandhu.jpg",
    description: "Harleen Sandhu is a fourth-year Computer Science student who initially joined the team doing Torque Vectoring for the R&D team. The following year she joined the competition team during SR-16 as a designer for Controls designing a Power Limiting algorithm. After being on software for about a year and a half she is this year\u2019s software lead, looking forward to expanding on control systems this year.",
  },
  {
    name: "Nicholas Ng",
    role: "Suspension Lead",
    image: "/images/team/leads/nicholas-ng.jpg",
    linkedin: "https://www.linkedin.com/in/nicholasng762/",
    description: "Nicholas Ng is an Industrial & Systems Engineering student who joined Spartan Racing during SR-14 as a suspension intern. The following year, he designed the dampers and inboard suspension for SR-15. Last year he designed the kinematics and inboard suspension for SR-16. This year, as suspension lead, Nicholas wants to guide the next generation of Spartan Racing\u2019s suspension designers to master the basics of suspension design and vehicle tuning. He looks forward to creating an iconic car that builds on the success of SR-16.",
  },
  {
    name: "Aidan Garcia",
    role: "Powertrain Co-Lead",
    image: "/images/team/leads/aidan-garcia.jpg",
    linkedin: "https://www.linkedin.com/in/aidan-garcia-000b1832a/",
    description: "Aidan Garcia is an Interdisciplinary Engineering student in his 5th year who joined Spartan Racing during SR-15 as an intern for the powertrain team. After a few short months, he was named as one of SR-16\u2019s battery pack designers. After an intense design season, Aidan was able to finish manufacturing the first of 2 accumulators 2 weeks ahead of schedule. Now, as Powertrain Co-Lead, Aidan hopes to make the powertrain even more reliable while still enabling his designers to innovate and learn.",
  },
  {
    name: "Kevin Hong",
    role: "Powertrain Co-Lead",
    image: "/images/team/leads/kevin-hong.jpg",
    linkedin: "https://www.linkedin.com/in/kevinh0ng",
    description: "Kevin Hong is a third-year Mechanical Engineering student with a deep passion for bicycles and automobiles. Since the beginning of his college journey, Kevin has been a dedicated member of Spartan Racing, carving out a niche in materials & fatigue analysis. He played a key role in designing drivetrain components for both SR-15 & SR-16. With SR-17, Kevin embarks on a new chapter, leading the charge on innovative and sound engineering practices for the Powertrain subsystem.",
  },
  {
    name: "Shaun Gilmore",
    role: "Research & Development Lead",
    image: "/images/team/leads/shaun-gilmore.jpg",
    linkedin: "https://www.linkedin.com/in/shaun-gilmore-32g",
    description: "Shaun Gilmore is a fourth-year student pursuing an Applied Math degree who joined the team during SR-14 and SRE-7 as an R&D sensors designer. During SR-15, he assumed the role of controls designer for software, working on power limiting and launch control projects. After multiple design roles, Shaun is this year\u2019s R&D Lead, and believes the team will be taking a huge step forward in its in-hubs and torque vectoring development, with the mission of finally delivering a running 4WD in-hubs car.",
  },
];

function LeadCard({
  name,
  role,
  description,
  linkedin,
  image,
}: Lead) {
  const Tag = linkedin ? "a" : "div";
  const linkProps = linkedin
    ? { href: linkedin, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Tag {...linkProps} className="lead-card group relative block overflow-hidden border border-border bg-elevated cursor-pointer">
      {/* Photo area */}
      <div className="relative aspect-[3/4] w-full bg-surface">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <span className="font-display text-4xl uppercase tracking-tight text-muted/40">
              {getInitials(name)}
            </span>
          </div>
        )}

        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Name + role overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div>
            <p className="font-display text-lg uppercase tracking-tight text-white md:text-xl">{name}</p>
            <p className="mt-0.5 font-display text-xs text-white/70">{role}</p>
          </div>
        </div>

        {/* Hover description overlay */}
        {description && (
          <div className="lead-card-desc absolute inset-0 flex items-center bg-foreground/90 p-5 md:p-6 opacity-0 pointer-events-none">
            <div className="overflow-y-auto max-h-full">
              <p className="font-display text-sm uppercase tracking-tight text-gold">
                {name}
              </p>
              <p className="mt-1 font-display text-[10px] uppercase tracking-widest text-white/50">
                {role}
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-white/80">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Gold accent line at bottom */}
      <div className="lead-card-accent absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />
    </Tag>
  );
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".lead-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const index = Number(card.dataset.index ?? 0);
            requestAnimationFrame(() => {
              card.style.animationDelay = `${index * 0.08}s`;
              card.classList.add("revealed");
            });
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function ExecBoard() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="mt-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {executiveBoard.map((member, i) => (
          <div key={`exec-${member.name}`} data-index={i} className="lead-card-wrapper">
            <LeadCard {...member} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SubteamLeadsGrid() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="mt-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subteamLeads.map((member, i) => (
          <div key={`sub-${member.name}-${member.role}`} data-index={i} className="lead-card-wrapper">
            <LeadCard {...member} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamContent() {
  return (
    <>
      {/* Executive Board */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <h2 className="font-display font-bold uppercase italic text-3xl tracking-tight md:text-4xl">
          Executive Board
        </h2>
        <ExecBoard />
      </section>

      {/* Subteam Leads */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <h2 className="font-display font-bold uppercase italic text-3xl tracking-tight md:text-4xl">
          Subteam Leads
        </h2>
        <SubteamLeadsGrid />
      </section>
    </>
  );
}
