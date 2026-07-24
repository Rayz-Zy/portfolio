"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProjetMedia } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MediaShowcase({
  media,
  index,
}: {
  media: ProjetMedia;
  index: number;
}) {
  const reduce = useReducedMotion();
  const imageRight = index % 2 === 1;

  // Bloc image : image si dispo, sinon panneau HUD sombre bordé.
  const imageBlock = (
    <div className="relative">
      <span
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 bg-accent/15"
      />
      <div
        aria-hidden
        style={{ backgroundImage: `url(${media.image})` }}
        className="relative aspect-video w-full border border-accent/40 bg-panel bg-cover bg-center"
      />
    </div>
  );

  // Panneau texte + stats.
  const textBlock = (
    <div>
      <p className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-accent">
        <span aria-hidden className="inline-block h-2.5 w-2.5 bg-accent" />
        {media.label}
      </p>
      <p className="mt-4 max-w-sm font-mono text-sm italic leading-relaxed text-muted">
        {media.caption}
      </p>
      <div className="relative mt-6 max-w-sm">
        <span
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 bg-accent/20"
        />
        <dl className="relative flex flex-col gap-3 bg-panel/60 px-6 py-5">
          {media.stats.map((s) => (
            <div key={s.key} className="flex justify-between font-mono text-xs">
              <dt className="tracking-wider text-muted">{s.key}:</dt>
              <dd className="font-bold tracking-wider text-accent">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-28 md:px-40"
    >
      {imageRight ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </motion.section>
  );
}
