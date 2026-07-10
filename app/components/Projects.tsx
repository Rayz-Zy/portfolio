"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

// Données factices : remplace par tes vrais projets (titre, tags, description, lien).
const PROJECTS = [
  {
    title: "PROJECT ALPHA",
    tags: ["HTML", "CSS"],
    description:
      "A high-performance HTML rendering engine build for Three Fiber. Immersive and sharp digital site",
    href: "#",
  },
  {
    title: "VELVET UI",
    tags: ["HTML", "CSS"],
    description:
      "A high-performance HTML rendering engine build for Three Fiber. Immersive and sharp digital site",
    href: "#",
  },
  {
    title: "PROJECT ALPHA",
    tags: ["HTML", "CSS"],
    description:
      "A high-performance HTML rendering engine build for Three Fiber. Immersive and sharp digital site",
    href: "#",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Ligne de séparation qui s'estompe vers la droite (comme sur le design).
function Divider() {
  return <div className="h-px w-full bg-linear-to-r from-white/15 to-transparent" />;
}

// Bouton parallélogramme cyan + ombre décalée (même recette que VIEW DATA).
function VoirPlus({ href }: { href: string }) {
  return (
    <a href={href} className="group relative inline-block shrink-0">
      <span
        aria-hidden
        className="absolute inset-0 bg-accent/30"
        style={{ transform: "translate(0.4rem, 0.4rem) skewX(-12deg)" }}
      />
      <span className="relative block -skew-x-12 bg-accent px-6 py-3 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
        <span className="block skew-x-12 font-display text-xs font-bold italic tracking-wider text-[#0a1a2b]">
          VOIR PLUS
        </span>
      </span>
    </a>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="min-h-dvh px-6 py-24 md:pl-40 md:pr-72">
      {/* En-tête : bandeau MES PROJETS + flèche */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative inline-block"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-accent/30"
          style={{ transform: "translate(0.5rem, 0.5rem) skewX(-12deg)" }}
        />
        <span className="relative block -skew-x-12 bg-linear-to-r from-accent-soft to-accent px-8 py-3">
          <span className="flex skew-x-12 items-center gap-5 font-display text-5xl font-black italic tracking-tighter text-[#0a1a2b]">
            MES PROJETS
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7 17 17" />
              <path d="M17 9 17 17 9 17" />
            </svg>
          </span>
        </span>
      </motion.div>

      {/* Liste des projets */}
      <motion.div
        variants={reduce ? undefined : list}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 flex flex-col"
      >
        {PROJECTS.map((p, i) => (
          <motion.div key={i} variants={reduce ? undefined : row}>
            <Divider />
            <div className="flex items-center justify-between gap-8 py-10">
              <div>
                <p className="font-mono text-sm font-bold tracking-[0.15em] text-accent">
                  {p.tags.join("  //  ")}
                </p>
                <h3 className="mt-2 font-display text-5xl font-extrabold italic leading-none text-[#6c7686] md:text-6xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md font-mono text-[13px] italic leading-relaxed text-muted">
                  {p.description}
                </p>
              </div>
              <VoirPlus href={p.href} />
            </div>
          </motion.div>
        ))}
        <Divider />
      </motion.div>
    </section>
  );
}
