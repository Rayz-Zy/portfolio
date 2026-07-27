import SkewButton from "../ui/SkewButton";
import type { Projet } from "../../data/projets";

// Chevron gauche du bouton de retour.
function FlecheRetour() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

// En-tête : le retour, le nom du projet, et les métadonnées qui remplissent le
// vide à droite. Pas de motion — c'est au-dessus de la ligne de flottaison,
// une apparition différée n'y ferait que clignoter.
export default function ProjetEntete({
  titre,
  info,
}: {
  titre: Projet["title"];
  info: Projet["info"];
}) {
  const infos = [
    { label: "Année", value: info.year },
    { label: "Contexte", value: info.context },
    { label: "Rôle", value: info.role },
  ];

  return (
    <header className="px-6 pb-14 pt-10 md:pl-40 md:pr-24">
      <SkewButton
        href="/#projects"
        label="RETOUR AUX PROJETS"
        icon={<FlecheRetour />}
        iconFirst
      />

      {/* Titre et métadonnées sur la même ligne, calés sur la même base.
          `flex-wrap` sur le conteneur : si les deux ne tiennent pas côte à
          côte, les infos repassent sous le titre au lieu d'être écrasées. */}
      <div className="mt-20 flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
        <h1
          className="font-display text-[clamp(2.75rem,9vw,6rem)] font-black italic uppercase leading-[0.85] tracking-tight text-[#dbe4f2] md:-ml-16"
          style={{ textShadow: "5px 6px 0 var(--title-shadow)" }}
        >
          {titre}
        </h1>

        <dl className="flex flex-wrap gap-x-10 gap-y-6">
          {infos.map((i) => (
            <div key={i.label}>
              <dt className="font-mono text-ms tracking-widest text-muted">
                {i.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-black italic tracking-tight text-foreground">
                {i.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14 h-px w-full bg-linear-to-r from-white/15 to-transparent" />
    </header>
  );
}
