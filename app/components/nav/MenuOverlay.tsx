"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { NAV } from "./nav-items";

const EASE = [0.22, 1, 0.36, 1] as const;

// La liste orchestre l'apparition en cascade (stagger).
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

// Chaque lien glisse depuis la droite en apparaissant.
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};

// Inclinaisons + décalages horizontaux variés par item : look « posé à la
// main » de la capture (colonne centrée, légèrement dispersée).
const ANGLES = [-6, 4, -3, 6, -2] as const;
const JITTER = [-2.2, 1.5, -1.2, 2.4, -0.6] as const; // décalage horizontal (rem)
// Teintes de bleu variées pour les items non sélectionnés (façon capture).
const SHADES = [
  "text-cyan-200",
  "text-sky-400",
  "text-cyan-400",
  "text-blue-400",
  "text-sky-300",
] as const;

export default function MenuOverlay({
  active,
  onClose,
}: {
  active: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus le premier lien à l'ouverture (accessibilité clavier).
  useEffect(() => {
    firstLinkRef.current?.focus();
  }, []);

  return (
    <motion.div
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-30 overflow-hidden bg-background/95 backdrop-blur-md"
    >
      {/* Fond décoratif : dégradé diagonal. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-panel/50 via-background to-background"
      />

      {/* ---- Zone gauche : nom géant incliné qui déborde. ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[60%] overflow-hidden md:w-[46%]"
      >
        <p className="absolute left-2 top-1/2 -translate-y-1/2 -skew-x-6 font-display text-[clamp(3rem,13vw,9rem)] font-black italic leading-[0.82] tracking-tight text-foreground/8">
          RAYANE
          <br />
          ADJAOUD
        </p>
      </div>

      {/* ---- Panneau info haut-gauche (façon « current wallet »). ---- */}
      <div className="absolute left-6 top-6 border border-accent/40 bg-background/40 px-4 py-2 font-mono text-[11px] tracking-wider backdrop-blur-sm">
        <p className="font-bold text-accent">STATUS</p>
        <p className="text-muted">OPEN_TO_WORK</p>
      </div>

      {/* ---- Liste de liens : colonne centrée, serrée, façon Persona. ---- */}
      <motion.nav
        variants={reduce ? undefined : listVariants}
        initial={reduce ? false : "hidden"}
        animate={reduce ? false : "show"}
        className="relative flex h-full flex-col items-center justify-center gap-2 px-6 md:pl-[32%] md:pr-10"
      >
        {NAV.map((item, i) => {
          const isActive = active === item.id;
          // L'item actif est plus incliné et passe au premier plan.
          const angle = isActive ? -8 : ANGLES[i % ANGLES.length];
          // Le triangle alterne d'un titre à l'autre : pointe à droite, puis à
          // gauche, etc. Il s'ancre du côté opposé à sa pointe.
          const pointsRight = i % 2 === 0;
          const clipPath = pointsRight
            ? "polygon(0 0, 100% 50%, 0 100%)"
            : "polygon(100% 0, 0 50%, 100% 100%)";
          const side = pointsRight ? "left-0" : "right-0";
          // L'ombre décalée suit le sens de la pointe.
          const shadowShift = pointsRight
            ? "translate-x-[0.14em]"
            : "-translate-x-[0.14em]";
          return (
            <motion.a
              key={item.id}
              ref={i === 0 ? firstLinkRef : undefined}
              variants={reduce ? undefined : itemVariants}
              href={`#${item.id}`}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              style={{
                marginLeft: `${JITTER[i % JITTER.length]}rem`,
                rotate: `${angle}deg`,
                // L'item actif est agrandi en entier (mot + triangle) pour
                // garder les proportions du décor.
                scale: isActive ? 1.35 : 1,
                zIndex: isActive ? 30 : 20 - i,
              }}
              className="group relative my-1 font-display text-[clamp(2rem,5.2vw,4.75rem)] font-black italic uppercase leading-none tracking-tight"
            >
              {/* Forme triangulaire PAR-DESSUS la fin du mot. Actif :
                  superposition blanc + rouge (triangle rouge décalé + triangle
                  blanc dessus). Survol : simple triangle cyan. */}
              {isActive ? (
                <span
                  aria-hidden
                  className={`absolute top-1/2 ${side} z-10 h-[1.2em] w-[5.4em] translate-y-[-60%] opacity-70`}
                >
                  {/* triangle rouge, décalé */}
                  <span
                    style={{ clipPath }}
                    className={`absolute inset-0 ${shadowShift} translate-y-[0.14em] bg-accent-hot`}
                  />
                  {/* triangle blanc, dessus */}
                  <span
                    style={{ clipPath }}
                    className="absolute inset-0 bg-white"
                  />
                </span>
              ) : (
                // Survol : même géométrie que l'item actif, mais en cyan et
                // révélé uniquement au passage de la souris.
                <span
                  aria-hidden
                  className={`absolute top-1/2 ${side} z-10 h-[1.2em] w-[5.4em] translate-y-[-60%] opacity-0 transition-opacity group-hover:opacity-70`}
                >
                  {/* triangle blanc, décalé */}
                  <span
                    style={{ clipPath }}
                    className={`absolute inset-0 ${shadowShift} translate-y-[0.14em] bg-white`}
                  />
                  {/* triangle cyan, dessus */}
                  <span
                    style={{ clipPath }}
                    className="absolute inset-0 bg-accent"
                  />
                </span>
              )}

              {/* Le mot (une seule couche). Actif : blanc. Sinon : teinte de bleu. */}
              <span
                className={`relative block transition-transform ${
                  isActive
                    ? "text-white"
                    : `${SHADES[i % SHADES.length]} group-hover:scale-105 group-hover:text-white`
                }`}
              >
                {item.label}
              </span>
            </motion.a>
          );
        })}

        {/* Bouton Download CV, sous la liste. */}
        <a
          href="/cv.pdf"
          onClick={onClose}
          className="mt-12 -skew-x-12 border border-accent/70 px-9 py-3 text-base text-accent transition-colors hover:bg-accent hover:text-[#0a1a2b]"
        >
          <span className="block skew-x-12 font-display italic">
            Download CV
          </span>
        </a>
      </motion.nav>

      {/* ---- Rappels de commandes HUD bas-droite. ---- */}
      <p className="absolute bottom-6 right-6 font-mono text-[11px] tracking-wider text-muted">
        <span className="text-accent">[M]</span> CLOSE{"  ·  "}
        <span className="text-accent">[↵]</span> CONFIRM
      </p>
    </motion.div>
  );
}
