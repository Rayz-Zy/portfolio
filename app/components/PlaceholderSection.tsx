import SectionTitle from "./SectionTitle";

// Sections temporaires : elles servent d'ancres pour le scroll-spy de la nav.
// On les remplacera par le vrai contenu (About, Skills, Contact).
export default function PlaceholderSection({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <section
      id={id}
      className="flex min-h-dvh flex-col items-start justify-center px-6 md:pl-40 md:pr-72"
    >
      <SectionTitle>{title}</SectionTitle>
      <p className="mt-6 max-w-md text-muted">Section à venir.</p>
    </section>
  );
}
