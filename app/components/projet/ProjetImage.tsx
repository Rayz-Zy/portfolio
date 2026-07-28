"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ProjetVisuel } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

// Deux dégradés combinés en "intersect" : les quatre bords de l'image se
// fondent dans le fond. Même recette que l'aperçu au survol de la home.
const MASQUE =
  "linear-gradient(to right, transparent, #000 18%, #000 82%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";

// Rangée autonome : un visuel et sa légende, sans texte de section. Sert aux
// visuels au-delà des deux premiers, qui n'ont pas de bloc de texte associé.
export default function ProjetImage({
  visuel,
  index,
}: {
  visuel: ProjetVisuel;
  index: number;
}) {
  const reduce = useReducedMotion();
  const aDroite = index % 2 === 0;

  // Marge négative + largeur augmentée d'autant : sans la seconde, l'image
  // glisse vers le bord et laisse un trou derrière elle.
  // `alt` vide : la légende à côté porte déjà l'information.
  const image = (
    <div
      style={{
        maskImage: MASQUE,
        maskComposite: "intersect",
        WebkitMaskImage: MASQUE,
        WebkitMaskComposite: "source-in",
      }}
      className={`relative aspect-video w-full bg-panel ${
        aDroite
          ? "md:-mr-40 md:w-[calc(100%+10rem)]"
          : "md:-ml-40 md:w-[calc(100%+10rem)]"
      }`}
    >
      <Image
        src={visuel.image}
        alt=""
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  const legende = (
    <div className="max-w-xs">
      <p className="font-mono text-sm font-bold tracking-widest text-accent">
        {visuel.title}
      </p>
      <p className="mt-4 font-sans text-lg leading-relaxed text-muted">
        {visuel.caption}
      </p>
    </div>
  );

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`grid grid-cols-1 items-center gap-10 overflow-hidden px-6 py-16 md:gap-16 md:px-40 ${
        aDroite
          ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
          : "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      }`}
    >
      {aDroite ? (
        <>
          {legende}
          {image}
        </>
      ) : (
        <>
          {image}
          {legende}
        </>
      )}
    </motion.section>
  );
}
