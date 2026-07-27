import type { ReactNode } from "react";
import Link from "next/link";

// Bouton parallélogramme cyan + ombre décalée. Recette partagée par la home
// (VOIR PLUS) et la page projet (retour, code, démo).
export default function SkewButton({
  href,
  label,
  icon,
  iconFirst = false,
  external = false,
  className = "",
}: {
  href: string;
  label: string;
  icon?: ReactNode;
  iconFirst?: boolean;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 bg-accent/30"
        style={{ transform: "translate(0.5rem, 0.5rem) skewX(-12deg)" }}
      />
      <span className="relative flex -skew-x-12 items-center bg-accent px-8 py-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1">
        <span className="flex skew-x-12 items-center gap-2.5 font-display text-sm font-bold italic tracking-wider text-[#0a1a2b]">
          {iconFirst && icon}
          {label}
          {!iconFirst && icon}
        </span>
      </span>
    </>
  );

  const classes = `group relative inline-block shrink-0 ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
