"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionTitle from "../SectionTitle";
import ProjetTexte from "./ProjetTexte";
import type { ProjetVisuel } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

// Deux dégradés combinés en "intersect" : les quatre bords de l'image se
// fondent dans le fond. Même recette que l'aperçu au survol de la home.
const MASQUE =
  "linear-gradient(to right, transparent, #000 18%, #000 82%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";

// Une section de texte et le visuel qui l'illustre, côte à côte. Le visuel est
// facultatif : sans lui le texte occupe toute la largeur.
export default function ProjetBloc({
  titre,
  body,
  points,
  visuel,
  imageADroite = true,
}: {
  titre: string;
  body: string;
  points?: string[];
  visuel?: ProjetVisuel;
  imageADroite?: boolean;
}) {
  const reduce = useReducedMotion();

  const texte = (
    <div className={imageADroite ? undefined : "md:order-2"}>
      <SectionTitle compact>{titre}</SectionTitle>
      <div className="mt-10">
        <ProjetTexte body={body} points={points} />
      </div>
    </div>
  );

  // L'image sort du cadre du côté où elle est posée : marge négative pour
  // décoller du bord de sa colonne, ET largeur augmentée d'autant — sans ça
  // elle se contente de glisser et laisse un trou derrière elle.
  // `alt` vide : la légende juste en dessous porte déjà l'information, la
  // répéter la ferait entendre deux fois à un lecteur d'écran.
  const image = visuel ? (
    <figure className={imageADroite ? "m-0" : "m-0 md:order-1"}>
      <div
        style={{
          maskImage: MASQUE,
          maskComposite: "intersect",
          WebkitMaskImage: MASQUE,
          WebkitMaskComposite: "source-in",
        }}
        className={`relative aspect-video w-full bg-panel ${
          imageADroite
            ? "md:-mr-24 md:w-[calc(100%+6rem)]"
            : "md:-ml-40 md:w-[calc(100%+10rem)]"
        }`}
      >
        <Image
          src={visuel.image}
          alt=""
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-6">
        <span className="block font-mono text-sm font-bold tracking-widest text-accent">
          {visuel.title}
        </span>
        <p className="mt-3 max-w-xs font-sans text-base leading-relaxed text-muted">
          {visuel.caption}
        </p>
      </figcaption>
    </figure>
  ) : null;

  const colonnes = !visuel
    ? ""
    : imageADroite
      ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
      : "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]";

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`grid grid-cols-1 items-center gap-14 overflow-hidden px-6 py-20 md:gap-16 md:pl-40 md:pr-24 ${colonnes}`}
    >
      {texte}
      {image}
    </motion.section>
  );
}
