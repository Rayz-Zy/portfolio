// Bloc de texte d'une section projet : un paragraphe, et éventuellement une
// courte liste de points clés. Sert deux fois : « Le projet » et « Ce que
// j'ai fait ».
export default function ProjetTexte({
  body,
  points,
}: {
  body: string;
  points?: string[];
}) {
  return (
    <div className="max-w-xl">
      <p className="font-sans text-lg leading-relaxed text-muted">{body}</p>

      {points && points.length > 0 && (
        <ul className="mt-8 flex flex-col gap-4">
          {points.map((point) => (
            <li
              key={point}
              className="flex gap-4 font-sans text-lg leading-relaxed text-muted"
            >
              {/* Puce en parallélogramme cyan : reprend le -skew-x-12 des
                  boutons et des bandeaux de section. */}
              <span
                aria-hidden
                className="mt-2.5 h-3 w-3 shrink-0 -skew-x-12 bg-accent"
              />
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
