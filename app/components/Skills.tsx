"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
} from "react-icons/si";
import SectionTitle from "./SectionTitle";

// Données factices : remplace par tes vraies compétences.
// Les logos viennent de react-icons/si (Simple Icons) : cherche le tien sur
// https://react-icons.github.io/react-icons/icons/si/ et importe-le ci-dessus.
type Skill = {
  label: string;
  title: string;
  description: string;
  icon: IconType;
};

const SKILLS: Skill[] = [
  {
    label: "FRONT-END CORE",
    title: "REACT",
    description: "Extensive experience building complex state-driven applications",
    icon: SiReact,
  },
  {
    label: "FRAMEWORK",
    title: "NEXT.JS",
    description: "Server components, routing and rendering for production apps",
    icon: SiNextdotjs,
  },
  {
    label: "FRAMEWORK",
    title: "ANGULAR",
    description: "Component architecture and reactive patterns at scale",
    icon: SiAngular,
  },
  {
    label: "LANGAGE",
    title: "TYPESCRIPT",
    description: "Type-safe codebases with strong tooling and maintainability",
    icon: SiTypescript,
  },
  {
    label: "STATE MANAGEMENT",
    title: "REDUX",
    description: "Predictable state containers for large front-end applications",
    icon: SiRedux,
  },
  {
    label: "STYLING",
    title: "TAILWIND CSS",
    description: "Rapid, consistent UI with a utility-first design system",
    icon: SiTailwindcss,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="min-h-dvh px-6 py-24 md:pl-40 md:pr-72">
      <SectionTitle>Compétences</SectionTitle>

      <motion.div
        variants={reduce ? undefined : grid}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2 xl:grid-cols-3"
      >
        {SKILLS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              variants={reduce ? undefined : card}
              className="relative pl-6"
            >
              {/* Barre d'accent cyan à gauche */}
              <span
                aria-hidden
                className="absolute inset-y-1 left-0 w-[3px] bg-linear-to-b from-accent-soft to-accent"
              />
              {/* Logo de la compétence */}
              <Icon aria-hidden className="h-10 w-10 text-accent" />
              <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">
                {s.label}
              </p>
              <h3 className="mt-3 font-display text-4xl font-extrabold italic leading-[0.95] text-[#dbe4f2]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-muted">
                {s.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
