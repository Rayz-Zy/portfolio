import { notFound } from "next/navigation";
import { PROJECTS, getProjet } from "../../data/projets";
import ProjetHero from "../../components/projet/ProjetHero";
import MissionStatement from "../../components/projet/MissionStatement";
import MediaShowcase from "../../components/projet/MediaShowcase";
import RealTimeProcessing from "../../components/projet/RealTimeProcessing";
import TechStackHud from "../../components/projet/TechStackHud";

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
      <ProjetHero projet={projet} />
      <MissionStatement mission={projet.mission} />
      {projet.media.map((m, i) => (
        <MediaShowcase key={m.label} media={m} index={i} />
      ))}
      <RealTimeProcessing processing={projet.processing} />
      <TechStackHud stack={projet.stack} specs={projet.specs} />
    </main>
  );
}
