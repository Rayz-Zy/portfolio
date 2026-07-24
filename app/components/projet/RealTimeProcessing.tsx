"use client";

import { motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import { LuRocket } from "react-icons/lu";
import HudButton from "../ui/HudButton";
import type { Projet } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RealTimeProcessing({
  processing,
}: {
  processing: Projet["processing"];
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-40"
    >
      {/* Visuel large (fallback panneau HUD) */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute inset-0 translate-x-3 translate-y-3 bg-accent/15"
        />
        <div
          aria-hidden
          className="relative aspect-video w-full border border-accent/40 bg-panel bg-cover bg-center"
        />
      </div>

      {/* Texte + boutons */}
      <div className="flex flex-col items-start gap-6">
        <div className="relative inline-block">
          <span
            aria-hidden
            className="absolute inset-0 bg-accent/30"
            style={{ transform: "translate(0.4rem, 0.4rem) skewX(-12deg)" }}
          />
          <span className="relative block -skew-x-12 bg-accent px-6 py-2">
            <span className="block skew-x-12 font-display text-sm font-black italic tracking-wider text-[#0a1a2b]">
              REAL-TIME_PROCESSING
            </span>
          </span>
        </div>

        <p className="max-w-sm font-mono text-sm italic leading-relaxed text-muted">
          {processing.body}
        </p>

        <div className="flex flex-col gap-4">
          {processing.github && (
            <HudButton
              href={processing.github}
              label="GITHUB_REPOSITORY"
              external
              icon={<FiArrowUpRight className="h-4 w-4" />}
            />
          )}
          {processing.demo && (
            <HudButton
              href={processing.demo}
              label="LIVE_DEMO_DEPLOY"
              external
              icon={<LuRocket className="h-4 w-4" />}
            />
          )}
        </div>
      </div>
    </motion.section>
  );
}
