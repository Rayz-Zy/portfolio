"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type IconType } from "react-icons";
import { FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import SectionTitle from "./SectionTitle";

// Liens de contact : remplace les placeholders (adresse + URLs) par les tiens.
// Les logos viennent de react-icons (Simple Icons + Feather).
type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: IconType;
};

const LINKS: ContactLink[] = [
  {
    label: "EMAIL",
    value: "ton@email.com",
    href: "mailto:ton@email.com",
    icon: FiMail,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/ton-profil",
    href: "#",
    icon: FaLinkedin,
  },
  {
    label: "GITHUB",
    value: "github.com/ton-profil",
    href: "#",
    icon: SiGithub,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const stack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Champ de formulaire réutilisable : label mono majuscule + input dark
// avec bordure qui passe au cyan au focus (même langage visuel que Skills).
function Field({
  id,
  label,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  // -skew-x-6 : le champ épouse l'inclinaison du panneau (parallélogramme).
  const base =
    "w-full -skew-x-6 border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground " +
    "placeholder:text-muted/50 outline-none transition-colors " +
    "focus:border-accent focus:bg-white/10 focus:ring-1 focus:ring-accent/50";

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted"
      >
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={id} rows={5} className={`${base} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} className={base} />
      )}
    </div>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();

  // Pas de backend pour l'instant : on empêche juste le rechargement de page.
  // Branche ici ton service d'envoi (Formspree, Resend, etc.) plus tard.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section id="contact" className="min-h-dvh px-6 py-24 md:pl-40 md:pr-72">
      <SectionTitle>Me Contacter</SectionTitle>

      {/* Grand panneau : ombre navy décalée derrière + bordure cyan devant */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mt-16 max-w-5xl"
      >
        {/* Ombre décalée en bas-droite, inclinée comme le cadre */}
        <span
          aria-hidden
          className="absolute inset-0 -skew-x-6 translate-x-3 translate-y-3 bg-(--title-shadow)"
        />
        {/* Cadre parallélogramme (incliné) avec bordure cyan.
            Le contenu est contre-incliné (skew-x-6) pour rester droit. */}
        <div className="relative -skew-x-6 border border-accent/60 bg-panel">
          <motion.div
            variants={reduce ? undefined : stack}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
            className="grid skew-x-6 grid-cols-1 gap-12 p-8 md:p-12 lg:grid-cols-[1.5fr_1fr]"
          >
            {/* Colonne gauche : formulaire */}
            <motion.form
              variants={reduce ? undefined : item}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <Field id="name" label="Nom" />
              <Field id="email" label="Email" type="email" />
              <Field id="message" label="Message" textarea />

              {/* Bouton parallélogramme cyan + ombre décalée (recette VOIR PLUS) */}
              <button type="submit" className="group relative self-start">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-accent/30"
                  style={{ transform: "translate(0.5rem, 0.5rem) skewX(-12deg)" }}
                />
                <span className="relative block -skew-x-12 bg-accent px-9 py-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
                  <span className="block skew-x-12 font-display text-sm font-bold italic tracking-wider text-[#0a1a2b]">
                    ENVOYER
                  </span>
                </span>
              </button>
            </motion.form>

            {/* Colonne droite : liens de contact */}
            <motion.div variants={reduce ? undefined : item} className="flex flex-col gap-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">
                Retrouvez-moi
              </p>
              {LINKS.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    className="group block -skew-x-6 border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:border-accent/60 hover:bg-white/10"
                  >
                    {/* Contenu contre-incliné : la carte penche, pas l'icône ni le texte */}
                    <span className="flex skew-x-6 items-center gap-4">
                      <Icon
                        aria-hidden
                        className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:scale-110"
                      />
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                          {l.label}
                        </span>
                        <span className="block truncate text-sm text-foreground">
                          {l.value}
                        </span>
                      </span>
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
