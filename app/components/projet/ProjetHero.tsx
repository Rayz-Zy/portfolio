"use client";

import { motion, useReducedMotion } from "motion/react";
import HudButton from "../ui/HudButton";
import type { Projet } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

// Icône flèche retour réutilisée dans le bouton.
function BackArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export default function ProjetHero({ projet }: { projet: Projet }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden px-6 py-10 md:px-40">
      {/* Fond HUD : image si dispo, sinon dégradé sombre. Bords fondus. */}
      <div
        aria-hidden
        style={{
          backgroundImage: `url(${projet.heroBackground})`,
          maskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
        }}
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-25"
      />

      {/* En-tête : bouton retour + codename */}
      <div className="flex items-center justify-between gap-4">
        <HudButton href="/#projects" label="RETURN_TO_BASE" icon={<BackArrow />} />
        <p className="hidden font-mono text-xs tracking-[0.2em] text-muted sm:block">
          PROJECT_ID: {projet.codename.replace(/\s+/g, "_")}
        </p>
      </div>

      {/* Bloc titre centré verticalement */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <p className="font-mono text-sm tracking-[0.3em] text-accent">
          INITIATING_SEQUENCE
        </p>
        <h1
          className="hud-glitch mt-6 font-display text-[clamp(2.5rem,10vw,6rem)] font-black italic leading-[0.9] tracking-tight text-[#dbe4f2]"
          style={{ textShadow: "4px 5px 0 var(--title-shadow)" }}
        >
          {projet.title}
        </h1>
        <p className="mt-8 font-mono text-xs tracking-[0.25em] text-muted">
          {projet.codename} — VER_1.0_STABLE
        </p>
      </motion.div>

      {/* Indice de scroll */}
      <p className="text-center font-mono text-xs tracking-[0.3em] text-accent/70">
        SCROLL_TO_INITIATE
      </p>
    </section>
  );
}
