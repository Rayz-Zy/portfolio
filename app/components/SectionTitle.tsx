"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Titre de section : bandeau parallélogramme cyan + ombre décalée + flèche.
// Réutilisé par toutes les sections pour un rendu identique.
// `compact` réduit le bandeau : nécessaire quand deux titres se partagent la
// largeur (page projet), où la taille pleine déborderait de sa colonne.
export default function SectionTitle({
  children,
  arrow = true,
  compact = false,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative inline-block"
    >
      {/* Ombre décalée */}
      <span
        aria-hidden
        className="absolute inset-0 bg-accent/30"
        style={{ transform: "translate(0.5rem, 0.5rem) skewX(-12deg)" }}
      />
      {/* Corps cyan */}
      <span
        className={`relative block -skew-x-12 bg-linear-to-r from-accent-soft to-accent ${
          compact ? "px-6 py-2.5" : "px-8 py-3"
        }`}
      >
        <span
          className={`flex skew-x-12 items-center font-display font-black italic uppercase tracking-tighter text-[#0a1a2b] ${
            compact ? "gap-3 text-3xl lg:text-4xl" : "gap-5 text-5xl"
          }`}
        >
          {children}
          {arrow && (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className={compact ? "h-6 w-6" : "h-8 w-8"}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7 17 17" />
              <path d="M17 9 17 17 9 17" />
            </svg>
          )}
        </span>
      </span>
    </motion.div>
  );
}
