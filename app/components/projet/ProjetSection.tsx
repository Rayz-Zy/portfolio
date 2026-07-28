"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionTitle from "../SectionTitle";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjetSection({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  // Haut resserré, bas généreux : c'est la dernière section de la page, elle se
  // rapproche du contenu qui la précède et respire en dessous.
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="px-6 pb-40 pt-10 md:pl-40 md:pr-72"
    >
      <SectionTitle>{titre}</SectionTitle>
      <div className="mt-12">{children}</div>
    </motion.section>
  );
}
