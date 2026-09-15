import RevealImage from "./RevealImage";

type ImageChunk =
  | { type: "full"; items: [string] }
  | { type: "pair"; items: [string, string] }
  | { type: "offset"; items: [string] };

// Reparte las imágenes en un ritmo full / pareja / suelta con mucho aire
// alrededor, ciclando el patrón — así cualquier lista de imágenes (una
// campaña, las páginas de un manual…) obtiene una composición variada en
// vez de una lista plana repetida.
function chunkImages(images: string[]): ImageChunk[] {
  const pattern: Array<"full" | "pair" | "offset"> = ["full", "pair", "offset"];
  const chunks: ImageChunk[] = [];
  let i = 0;
  let cycle = 0;
  while (i < images.length) {
    const wanted = pattern[cycle % pattern.length];
    if (wanted === "pair" && images.length - i >= 2) {
      chunks.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      chunks.push({
        type: wanted === "pair" ? "full" : wanted,
        items: [images[i]],
      });
      i += 1;
    }
    cycle += 1;
  }
  return chunks;
}

export default function ChunkedGallery({
  images,
  title,
  dark = false,
  uniform = false,
}: {
  images: string[];
  title: string;
  dark?: boolean;
  /** Si es true, todas las imágenes se muestran a ancho completo, sin ciclar el patrón. */
  uniform?: boolean;
}) {
  const chunks: ImageChunk[] = uniform
    ? images.map((src) => ({ type: "full", items: [src] }))
    : chunkImages(images);

  return (
    <section
      className={`relative z-10 flex flex-col gap-3 py-3 sm:gap-4 sm:py-4 ${
        dark ? "bg-ink" : "bg-paper"
      }`}
    >
      {chunks.map((chunk, i) => {
        if (chunk.type === "pair") {
          return (
            <div key={i} className="edge flex flex-col gap-3 sm:flex-row sm:gap-4">
              {chunk.items.map((src) => (
                <RevealImage
                  key={src}
                  src={src}
                  title={title}
                  fill={false}
                  className="rounded-3xl sm:flex-1"
                />
              ))}
            </div>
          );
        }
        if (chunk.type === "offset") {
          return (
            <div key={i} className="edge flex sm:justify-center">
              <RevealImage
                src={chunk.items[0]}
                title={title}
                fill={false}
                parallax
                className="w-full rounded-3xl sm:w-1/2"
              />
            </div>
          );
        }
        return (
          <RevealImage
            key={i}
            src={chunk.items[0]}
            title={title}
            fill={false}
            parallax
            className="w-full"
          />
        );
      })}
    </section>
  );
}
