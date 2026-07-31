"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionTitle from "./SectionTitle";

const ABOUT: string[] = [
  "Hello ! Moi c'est Rayane Adjaoud. Passionné par le web et la création numérique, j'entame ma 3ᵉ année en BUT Métiers du Multimédia et de l'Internet",
  "Je suis passionné par le développement web qui aime autant travailler sur l'ergonomie des interfacesque sur la robustesse des architectures et des bases de données.",
  "Aujourd'hui, je suis à la recherche d'une alternance pour ma 3ᵉ année afin de mettre mes compétences au service de projets concrets. N'hésitez pas à jeter un œil à mes réalisations ou à me contacter pour discuter !",
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Paragraphe({
  text,
  right,
  half,
  reduce,
}: {
  text: string;
  right: boolean;
  half: boolean;
  reduce: boolean;
}) {
  return (
    
    <div className={`flex items-center ${half ? "min-h-[50dvh]" : "min-h-dvh"}`}>
      <motion.div
        
        initial={reduce ? false : { opacity: 0, x: right ? 60 : -60 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
        
        viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`max-w-4xl ${right ? "md:ml-auto" : ""}`}
      >
        
        <div
          className={`bg-[#0b2655] p-8 shadow-[4px_6px_0_0_#0c62c7] md:p-12 ${
            right ? "rotate-1" : "-rotate-1"
          }`}
        >
      
          <p className="font-display text-lg font-bold leading-relaxed text-[#e7e7e7] md:text-2xl">
            {text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="px-6 py-24 md:pl-40 md:pr-40">
      <SectionTitle>À Propos</SectionTitle>

      {/* Pas de `gap` : chaque bloc fait déjà un écran et centre son contenu. */}
      <div className="flex flex-col">
        {ABOUT.map((text, i) => (
          <Paragraphe
            key={i}
            text={text}
            // Alternance gauche, droite, gauche.
            right={i % 2 === 1}
            half={i === 0 || i === ABOUT.length - 1}
            reduce={!!reduce}
          />
        ))}
      </div>
    </section>
  );
}
