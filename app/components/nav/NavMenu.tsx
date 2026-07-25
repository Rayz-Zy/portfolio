"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import MenuOverlay from "./MenuOverlay";
import { NAV } from "./nav-items";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Scroll-spy : met à jour la section active (surlignée dans le menu).
  // Logique reprise de l'ancienne Sidebar.
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
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Raccourci clavier : `M` bascule, `Échap` ferme. Ignoré si l'utilisateur
  // tape dans un champ ou utilise un modificateur.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const typing =
        t?.tagName === "INPUT" ||
        t?.tagName === "TEXTAREA" ||
        t?.isContentEditable;
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Verrou du scroll du body pendant l'ouverture.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Restituer le focus au bouton uniquement lors d'une fermeture (open -> close),
  // pas au montage initial.
  useEffect(() => {
    if (wasOpen.current && !open) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {/* Onglet MENU vertical fixe sur la marge droite (desktop + mobile). */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="nav-overlay"
        className="group fixed right-0 top-1/2 z-40 -translate-y-1/2 -skew-x-12 border-y border-l border-accent/60 bg-accent px-3 py-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1/2"
      >
        <span className="block skew-x-12 [writing-mode:vertical-rl] rotate-180 font-display text-sm font-black italic tracking-[0.3em] text-[#0a1a2b]">
          {open ? "CLOSE" : "MENU"}
        </span>
      </button>

      <AnimatePresence>
        {open && <MenuOverlay active={active} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
