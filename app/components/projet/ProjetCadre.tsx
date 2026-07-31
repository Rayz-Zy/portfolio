import Image from "next/image";

// Le cadre d'un visuel de projet : l'image, doublée d'un calque cyan décalé
// derrière elle. Reprend le dédoublement de SkewButton, sans son inclinaison —
// une capture d'interface doit rester droite et rectangulaire pour se lire.
//
// L'ombre est déclarée avant l'image et l'image est dans un enfant `relative` :
// à stacking context égal, les éléments positionnés se peignent dans l'ordre du
// DOM, donc l'ombre reste derrière sans avoir besoin de z-index.
//
// `alt` vide : la légende voisine porte déjà l'information, la répéter la
// ferait entendre deux fois à un lecteur d'écran.
export default function ProjetCadre({
  src,
  sizes,
  className = "",
}: {
  src: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video w-full ${className}`}>
      <span
        aria-hidden
        className="absolute inset-0 bg-accent/30"
        style={{ transform: "translate(0.75rem, 0.75rem)" }}
      />
      <div className="relative h-full w-full bg-panel">
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
