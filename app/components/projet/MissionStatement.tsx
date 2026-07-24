"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Projet } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MissionStatement({
  mission,
}: {
  mission: Projet["mission"];
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="px-6 py-24 md:px-40"
    >
      {/* Bandeau numéroté cyan + ombre décalée */}
      <div className="relative inline-block">
        <span
          aria-hidden
          className="absolute inset-0 bg-accent/30"
          style={{ transform: "translate(0.5rem, 0.5rem) skewX(-12deg)" }}
        />
        <span className="relative block -skew-x-12 bg-accent px-6 py-2">
          <span className="block skew-x-12 font-display text-sm font-black italic tracking-wider text-[#0a1a2b]">
            01 / MISSION_STATEMENT
          </span>
        </span>
      </div>

      {/* Gros titre italique */}
      <h2 className="mt-10 max-w-4xl font-display text-4xl font-black italic uppercase leading-[1.05] tracking-tight text-[#dbe4f2] md:text-6xl">
        {mission.heading}
      </h2>

      {/* Panneau description à bord gauche cyan */}
      <div className="relative mt-12 max-w-xl">
        <span
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 bg-accent/20"
        />
        <p className="relative border-l-2 border-accent bg-panel/40 px-6 py-5 font-mono text-[13px] italic leading-relaxed text-muted">
          {mission.body}
        </p>
      </div>
    </motion.section>
  );
}
