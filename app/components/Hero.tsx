"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";

// Courbe d'accélération douce réutilisée pour les entrées.
const EASE = [0.22, 1, 0.36, 1] as const;

// Le conteneur orchestre l'apparition en cascade de ses enfants.
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Chaque bloc monte légèrement en apparaissant.
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  // Parallax du carré décoratif suivant la souris (ressort = mouvement fluide).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (reduce) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 40);
    my.set((e.clientY / window.innerHeight - 0.5) * 40);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-dvh items-center overflow-hidden px-6 md:pl-40 md:pr-72"
    >
      {/* Carré décoratif en rotation (fond) */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute right-[14%] top-1/2 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 rotate-12 rounded-sm bg-white/[0.03] ring-1 ring-white/[0.05]"
      />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
        className="relative"
      >
        {/* Trait d'accent incliné à gauche du bloc de texte */}
        <span
          aria-hidden
          className="absolute -left-8 top-1 h-56 w-[3px] -skew-x-12 bg-linear-to-b from-accent-soft to-transparent md:-left-12"
        />

        {/* Kicker mono */}
        <motion.p
          variants={item}
          className="font-mono text-base tracking-[0.25em] text-foreground/80 md:text-lg"
        >
          PORTFOLIO.INIT()
        </motion.p>

        {/* Grand titre display avec ombre décalée */}
        <motion.h1
          variants={item}
          style={{ textShadow: "5px 6px 0 var(--title-shadow)" }}
          className="mt-4 font-display text-[clamp(3.25rem,9vw,7rem)] font-extrabold italic leading-[0.85] tracking-tight text-[#dbe4f2]"
        >
          RAYANE
          <br />
          ADJAOUD
        </motion.h1>

        {/* Bandeau navy (réservé à un slogan / rôle plus tard) */}
        <motion.div
          variants={item}
          className="mt-6 h-16 w-[24rem] max-w-full -skew-x-12 rounded-sm bg-panel"
        />

        {/* Bouton VIEW DATA avec son ombre décalée */}
        <motion.div variants={item} className="mt-10">
          <a href="#projects" className="group relative inline-block">
            {/* Ombre décalée fixe derrière le bouton */}
            <span
              aria-hidden
              className="absolute inset-0 bg-accent/30"
              style={{ transform: "translate(0.6rem, 0.6rem) skewX(-12deg)" }}
            />
            {/* Corps du bouton : glisse vers l'ombre au survol */}
            <span className="relative block -skew-x-12 bg-accent px-8 py-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
              <span className="block skew-x-12 font-display font-bold italic tracking-wide text-[#0a1a2b]">
                VIEW DATA
              </span>
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
