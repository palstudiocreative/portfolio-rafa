import { Fragment } from "react";

// Da tratamiento tipográfico a un texto plano: el nombre de marca en
// negrita, y cualquier inciso "—entre guiones—" en un peso más fino y en
// cursiva. Evita tener que convertir `description` en contenido enriquecido
// en los datos del proyecto solo para este matiz.
export default function StyledDescription({
  text,
  emphasize,
}: {
  text: string;
  emphasize?: string;
}) {
  const byBrand = emphasize ? text.split(new RegExp(`(${emphasize})`, "g")) : [text];

  return (
    <>
      {byBrand.map((chunk, i) => {
        if (emphasize && chunk === emphasize) {
          return (
            <strong key={i} className="font-black">
              {chunk}
            </strong>
          );
        }
        const byDash = chunk.split(/(—[^—]*—)/g);
        return (
          <Fragment key={i}>
            {byDash.map((piece, j) =>
              /^—[^—]*—$/.test(piece) ? (
                <em key={j} className="font-light italic text-ink-soft">
                  {piece}
                </em>
              ) : (
                <Fragment key={j}>{piece}</Fragment>
              ),
            )}
          </Fragment>
        );
      })}
    </>
  );
}
