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

// Le titre de droite est rendu deux fois (ombre + dégradé) : une seule source.
const ROLE = (
  <>
    DEVELOPPEUR
    <br />
    FULL STACK
  </>
);

// Chaque bloc monte légèrement en apparaissant.
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  // Parallax du bloc de rôle suivant la souris (ressort = mouvement fluide).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (reduce) return;
    // Amplitude volontairement faible : un glyphe de cette taille amplifie
    // visuellement le moindre déplacement.
    mx.set((e.clientX / window.innerWidth - 0.5) * 14);
    my.set((e.clientY / window.innerHeight - 0.5) * 14);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-dvh items-center overflow-hidden px-6 md:pl-40 md:pr-40"
    >
      {/* Les deux blocs sont alignés par le haut, et c'est la paire qui est
          centrée verticalement : les deux titres coïncident sans réglage. */}
      <div className="flex w-full items-start justify-between">
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

          {/* Rôle, version étroite : sous xl les deux blocs ne tiennent pas côte
              à côte, mais l'info doit rester visible — seule mention du poste. */}
          <motion.p
            variants={item}
            className="mt-6 font-mono text-sm tracking-[0.3em] text-accent-soft xl:hidden"
          >
            DEVELOPPEUR WEB FULL STACK
          </motion.p>

          {/* Bouton VIEW DATA avec son ombre décalée */}
          <motion.div variants={item} className="mt-12">
            <a href="#about" className="group relative inline-block">
              {/* Ombre décalée fixe derrière le bouton */}
              <span
                aria-hidden
                className="absolute inset-0 bg-accent/30"
                style={{ transform: "translate(0.6rem, 0.6rem) skewX(-12deg)" }}
              />
              {/* Corps du bouton : glisse vers l'ombre au survol */}
              <span className="relative block -skew-x-12 bg-accent px-8 py-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                <span className="block skew-x-12 font-display font-bold italic tracking-wide text-[#0a1a2b]">
                  VOIR PLUS
                </span>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Rôle, version large : contrepoids à droite du nom. Le div externe
            porte le parallax, l'interne l'entrée — deux transforms, deux nœuds. */}
        <motion.div
          style={{ x: sx, y: sy }}
          className="hidden text-right xl:mr-16 xl:block"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={reduce ? false : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            <p className="font-mono text-base tracking-[0.25em] text-muted md:text-lg">
              ETUDIANT
            </p>
            <p className="relative mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold italic leading-[0.85] tracking-tight">
              {/* Ombre décalée en calque : text-shadow ne survit pas au
                  bg-clip-text du dégradé, on redessine donc le texte derrière. */}
              <span
                aria-hidden
                className="absolute inset-0 translate-x-1.25 translate-y-1.5 text-(--title-shadow)"
              >
                {ROLE}
              </span>
              {/* Le padding élargit la boîte que bg-clip-text peint ; l'italique
                  et le leading serré débordent sinon et les bords sont rognés.
                  Les marges négatives annulent son effet sur la mise en page. */}
              <span className="relative -mx-4 -my-2 inline-block bg-linear-to-r from-accent-soft to-accent bg-clip-text px-4 py-2 text-transparent">
                {ROLE}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
