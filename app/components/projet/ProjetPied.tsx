import ProjetSection from "./ProjetSection";
import type { Projet } from "../../data/projets";

// Ferme la page : la stack, en parallélogrammes.
// Les métadonnées du projet sont remontées dans l'en-tête.
export default function ProjetPied({ stack }: { stack: Projet["stack"] }) {
  return (
    <ProjetSection titre="Stack">
      {/* Une techno par parallélogramme, même inclinaison que les bandeaux. */}
      <ul className="flex flex-wrap gap-4">
        {stack.map((techno) => (
          <li key={techno} className="-skew-x-12 bg-accent/15 px-5 py-2">
            <span className="block skew-x-12 font-mono text-sm font-bold tracking-widest text-accent">
              {techno}
            </span>
          </li>
        ))}
      </ul>
    </ProjetSection>
  );
}
