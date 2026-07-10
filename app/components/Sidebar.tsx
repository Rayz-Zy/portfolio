"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

// Une seule source de vérité pour la nav : les id doivent matcher
// les <section id="..."> de la page pour que le scroll-spy fonctionne.
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");

  // Scroll-spy : on observe chaque section et on met à jour le lien actif
  // quand elle passe au centre de l'écran.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // La "zone active" est la bande centrale de l'écran (45% en haut/bas ignorés).
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed right-0 top-0 z-20 hidden h-dvh w-[15rem] flex-col justify-between border-l border-white/5 bg-surface/70 px-7 py-9 backdrop-blur-sm md:flex">
      {/* Marque */}
      <div>
        <p className="font-display text-xl font-extrabold italic leading-tight text-accent">
          Rayane
          <br />
          Adjaoud
        </p>
        <p className="mt-1 text-sm text-muted">Front-End Developer</p>
      </div>

      {/* Navigation (libellés alignés à droite comme sur le design) */}
      <nav className="mt-12 flex flex-col gap-3">
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "page" : undefined}
              className="relative isolate flex items-center justify-start gap-2.5 pl-1 pr-4 py-2 font-display text-[1.7rem] font-bold italic transition-colors duration-200"
            >
              {/* Item actif : parallélogramme cyan + ombre décalée (même
                  traitement que le bouton VIEW DATA). Le conteneur porte le
                  layoutId : il glisse d'un item à l'autre, les boîtes inclinées
                  à l'intérieur restent statiques. */}
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  aria-hidden
                  className="absolute inset-y-0 -left-12 right-2 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                >
                  {/* Ombre décalée */}
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 -skew-x-12 bg-accent/25" />
                  {/* Corps cyan */}
                  <span className="absolute inset-0 -skew-x-12 bg-linear-to-b from-accent-soft to-accent" />
                </motion.span>
              )}

              {/* Icône "écran" sur l'item actif (comme sur le design) */}
              {isActive && (
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-[#0a1a2b]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="12" rx="1.5" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              )}

              <span
                className={
                  isActive
                    ? "text-[#0a1a2b]"
                    : "text-foreground/80 transition-colors hover:text-foreground"
                }
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Call to action */}
      <a
        href="/cv.pdf"
        className="mt-12 -skew-x-12 self-start border border-accent/70 px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-[#0a1a2b]"
      >
        <span className="block skew-x-12 italic">Download CV</span>
      </a>
    </aside>
  );
}
