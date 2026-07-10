"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import SectionTitle from "./SectionTitle";

// Données factices : remplace par tes vrais projets (titre, tags, description, lien, image).
// Dépose les previews dans public/projects/ ; si le fichier manque, on affiche juste un cadre.
const PROJECTS = [
  {
    title: "PROJECT ALPHA",
    tags: ["HTML", "CSS"],
    description:
      "A high-performance HTML rendering engine build for Three Fiber. Immersive and sharp digital site",
    href: "#",
    image: "/fond.png",
  },
  {
    title: "VELVET UI",
    tags: ["HTML", "CSS"],
    description:
      "A high-performance HTML rendering engine build for Three Fiber. Immersive and sharp digital site",
    href: "#",
    image: "/fond.png",
  },
  {
    title: "PROJECT ALPHA",
    tags: ["HTML", "CSS"],
    description:
      "A high-performance HTML rendering engine build for Three Fiber. Immersive and sharp digital site",
    href: "#",
    image: "/fond.png",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Ligne de séparation qui s'estompe vers la droite (comme sur le design).
function Divider() {
  return <div className="h-px w-full bg-linear-to-r from-white/15 to-transparent" />;
}

// Bouton parallélogramme cyan + ombre décalée (même recette que VIEW DATA).
function VoirPlus({ href }: { href: string }) {
  return (
    <a href={href} className="group relative z-10 mr-8 inline-block shrink-0">
      <span
        aria-hidden
        className="absolute inset-0 bg-accent/30"
        style={{ transform: "translate(0.5rem, 0.5rem) skewX(-12deg)" }}
      />
      <span className="relative block -skew-x-12 bg-accent px-9 py-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
        <span className="block skew-x-12 font-display text-sm font-bold italic tracking-wider text-[#0a1a2b]">
          VOIR PLUS
        </span>
      </span>
    </a>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="min-h-dvh px-6 py-24 md:pl-40 md:pr-72">
      {/* En-tête : bandeau MES PROJETS + flèche */}
      <SectionTitle>Mes Projets</SectionTitle>

      {/* Liste des projets */}
      <motion.div
        variants={reduce ? undefined : list}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 flex flex-col"
      >
        {PROJECTS.map((p, i) => (
          <motion.div key={i} variants={reduce ? undefined : row}>
            <Divider />
            <div className="group relative isolate flex items-center justify-between gap-8 py-10">
              <div className="relative z-10">
                <p className="font-mono text-sm font-bold tracking-[0.15em] text-accent">
                  {p.tags.join("  //  ")}
                </p>
                {/* Le titre rétrécit en restant ancré à gauche au survol */}
                <h3 className="mt-2 origin-left font-display text-5xl font-extrabold italic leading-none text-[#6c7686] transition-transform duration-500 ease-out group-hover:scale-[0.82] md:text-6xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md font-mono text-[13px] italic leading-relaxed text-muted">
                  {p.description}
                </p>
              </div>

              {/* Preview : bande pleine largeur, plus haute, qui glisse depuis
                  la droite. Ses bords gauche/droite se fondent dans le fond
                  grâce au masque en dégradé horizontal. */}
              <div
                aria-hidden
                style={{
                  backgroundImage: p.image ? `url(${p.image})` : undefined,
                  // Deux dégradés (horizontal + vertical) combinés avec
                  // "intersect" : les 4 bords se fondent dans le fond.
                  maskImage:
                    "linear-gradient(to right, transparent, #000 20%, #000 80%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 20%, #000 80%, transparent), linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
                  WebkitMaskComposite: "source-in",
                }}
                className="pointer-events-none absolute inset-x-16 top-1/2 z-0 hidden h-56 -translate-y-1/2 translate-x-8 bg-panel bg-cover bg-center opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block"
              />

              <VoirPlus href={p.href} />
            </div>
          </motion.div>
        ))}
        <Divider />
      </motion.div>
    </section>
  );
}
