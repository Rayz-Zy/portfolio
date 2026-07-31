"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionTitle from "../SectionTitle";
import ProjetTexte from "./ProjetTexte";
import ProjetCadre from "./ProjetCadre";
import type { ProjetVisuel } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  // La marge négative reste 3rem en dessous du padding de la section (pr-24 /
  // pl-40), pour que le débordement se lise sans que l'image touche le bord de
  // l'écran — à droite elle passerait sous la pastille de nav, fixée là.
  const image = visuel ? (
    <figure className={imageADroite ? "m-0" : "m-0 md:order-1"}>
      <ProjetCadre
        src={visuel.image}
        sizes="(min-width: 768px) 55vw, 100vw"
        className={
          imageADroite
            ? "md:-mr-12 md:w-[calc(100%+3rem)]"
            : "md:-ml-28 md:w-[calc(100%+7rem)]"
        }
      />
      <figcaption className="mt-6">
        <span className="block font-mono text-sm font-bold tracking-widest text-accent">
          {visuel.title}
        </span>
        <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-muted">
          {visuel.caption}
        </p>
      </figcaption>
    </figure>
  ) : null;

  // La colonne de texte prend la part la plus large des deux, quel que soit le
  // côté où elle tombe : c'est elle qui porte le contenu, l'image l'illustre.
  const colonnes = !visuel
    ? ""
    : imageADroite
      ? "md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]";

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`grid grid-cols-1 items-start gap-14 overflow-hidden px-6 py-20 md:gap-16 md:pl-40 md:pr-24 ${colonnes}`}
    >
      {texte}
      {image}
    </motion.section>
  );
}
