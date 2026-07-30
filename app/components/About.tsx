"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionTitle from "./SectionTitle";

// Contenu provisoire : remplace ces textes par les tiens.
// Un seul endroit à modifier, l'ordre du tableau donne l'ordre à l'écran.
const ABOUT: string[] = [
  "Hello ! Je m’appelle Rayane Adjaoud, j'étudis dans cette formation afin de devenir Développeur Web",
  "Je suis passionné par l'informatique et plus particulièrement par la programmation. J'ai découvert ma passion durant mes années au lycée avec la spécialité NSI. J'aime réaliser des projets web et apprendre de nouveaux langages de programmation.",
  "Cette 2ème année me permet d'approfondir mes connaissances en développement web et de découvrir de nouveaux langages.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Un paragraphe : filet cyan vertical + texte.
// `right` bascule tout le bloc contre la marge droite (filet et alignement
// compris) à partir de md. En dessous, l'alternance s'écrase : sur mobile un
// bloc « à droite » ne se distingue pas et le texte aligné à droite se lit mal.
function Paragraphe({
  text,
  right,
  first,
  reduce,
}: {
  text: string;
  right: boolean;
  first: boolean;
  reduce: boolean;
}) {
  return (
    // Un écran entier par paragraphe : le précédent est forcément sorti par le
    // haut quand le suivant arrive au centre. C'est la hauteur du conteneur,
    // pas un compteur, qui garantit qu'on n'en voit qu'un à la fois.
    //
    // Sauf le premier : sa boîte commence juste sous le titre de section, donc
    // le centrage sur un écran entier le repoussait très loin de « À Propos ».
    // Demi-écran suffit — les blocs suivants restent à plus d'un écran d'écart,
    // l'exclusivité tient toujours.
    <div className={`flex items-center ${first ? "min-h-[50dvh]" : "min-h-dvh"}`}>
      <motion.div
        // Chaque bloc entre depuis son propre côté : c'est ce glissement opposé
        // qui rend l'alternance lisible au scroll. La direction suit le bloc, pas
        // le breakpoint (le bloc droit entre par la droite même en mobile).
        initial={reduce ? false : { opacity: 0, x: right ? 60 : -60 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        // `once` : le bloc s'anime une seule fois et reste en place. Il ne
        // s'efface plus en quittant l'écran — c'est la hauteur des conteneurs
        // qui garantit qu'on n'en voit qu'un à la fois, pas le fondu.
        //
        // `margin` rétrécit la zone de détection à la bande centrale de l'écran
        // (30 % de hauteur) : sans ça le bloc s'animait dès qu'il pointait en bas
        // de la fenêtre, donc il apparaissait beaucoup trop bas. On garde
        // `amount` par défaut ("some") plutôt qu'une fraction : dans une bande
        // aussi étroite, exiger 50 % d'un bloc haut pourrait ne jamais se
        // déclencher sur un petit écran.
        viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`relative max-w-7xl pl-6 ${
          right ? "md:ml-auto md:pl-0 md:pr-6 md:text-right" : ""
        }`}
      >
        {/* Filet d'accent (même recette que les cartes Skills) */}
        <span
          aria-hidden
          className={`absolute inset-y-1 left-0 w-[3px] bg-linear-to-b from-accent-soft to-accent ${
            right ? "md:left-auto md:right-0" : ""
          }`}
        />
        {/* Anybody (font-display) en romain : la famille des gros titres, donc le
            texte courant reste dans la même voix typographique. Déjà chargée en
            police variable, aucun poids figé — pas de coût réseau en plus. */}
        <p className="font-display text-xl font-bold leading-relaxed text-muted md:text-3xl">
          {text}
        </p>
      </motion.div>
    </div>
  );
}

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="px-6 py-24 md:pl-40 md:pr-40">
      <SectionTitle>À Propos</SectionTitle>

      {/* Pas de `gap` ici : chaque bloc fait déjà un écran de haut et centre son
          contenu, ce qui crée l'espacement — en ajouter doublerait les vides. */}
      <div className="flex flex-col">
        {ABOUT.map((text, i) => (
          <Paragraphe
            key={i}
            text={text}
            // Les blocs impairs partent à droite : gauche, droite, gauche.
            right={i % 2 === 1}
            first={i === 0}
            reduce={!!reduce}
          />
        ))}
      </div>
    </section>
  );
}
