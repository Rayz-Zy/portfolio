import { notFound } from "next/navigation";
import { PROJECTS, getProjet } from "../../data/projets";
import ProjetEntete from "../../components/projet/ProjetEntete";
import ProjetBloc from "../../components/projet/ProjetBloc";
import ProjetImage from "../../components/projet/ProjetImage";
import ProjetPied from "../../components/projet/ProjetPied";

// Pré-génère une page statique par projet (compatible export statique).
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) notFound();

  return (
    <main>
      <ProjetEntete titre={projet.title} info={projet.info} />

      <ProjetBloc
        titre="Le projet"
        body={projet.about}
        visuel={projet.visuals[0]}
        imageADroite
      />

      <ProjetBloc
        titre="Ce que j'ai fait"
        body={projet.work.body}
        points={projet.work.points}
        visuel={projet.visuals[1]}
        imageADroite={false}
      />

      {/* Visuels au-delà des deux premiers : rangées autonomes, pour qu'un
          projet plus fourni ne perde pas ses captures en silence. */}
      {projet.visuals.slice(2).map((visuel, i) => (
        <ProjetImage key={visuel.title} visuel={visuel} index={i} />
      ))}

      <ProjetPied stack={projet.stack} />
    </main>
  );
}
