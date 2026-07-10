// Sections temporaires : elles servent d'ancres pour le scroll-spy de la nav.
// On les remplacera par le vrai contenu (About, Projects, Skills, Contact).
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
      className="flex min-h-dvh items-center px-6 md:pl-40 md:pr-72"
    >
      <div>
        <p className="font-mono text-sm tracking-[0.2em] text-accent">
          {`// ${id}`}
        </p>
        <h2 className="mt-3 font-display text-5xl font-extrabold italic text-[#dbe4f2]">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-muted">Section à venir.</p>
      </div>
    </section>
  );
}
