"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const gradients = [
  "from-accent via-[#8a2a13] to-ink",
  "from-[#3a352c] via-ink to-[#1c1a16]",
  "from-[#4a4238] via-[#241f19] to-ink",
  "from-[#5c2a17] via-accent to-ink",
];

function gradientFor(seed: string) {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return gradients[hash % gradients.length];
}

// Muestra la imagen en `src` si existe; si no hay imagen o falla la carga
// (todavía no se ha subido el asset), cae en un degradado de la dirección
// de arte para que el diseño nunca se rompa mientras faltan assets reales.
//
// `fill`: true cuando el padre define el tamaño (ej. absolute inset-0 en un
// hero o tarjeta) y la imagen debe recortarse a ese hueco. false cuando la
// imagen debe conservar su proporción natural (ej. galería del case study).
export default function ProjectCover({
  src,
  title,
  className = "",
  fill = true,
  hoverZoom = true,
  objectPosition = "center",
  imageStyle,
  fit = "cover",
}: {
  src?: string;
  title: string;
  className?: string;
  fill?: boolean;
  hoverZoom?: boolean;
  objectPosition?: string;
  imageStyle?: CSSProperties;
  fit?: "cover" | "contain";
}) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showFallback = !src || errored;

  // El <img> se pinta desde el HTML del servidor antes de que React hidrate.
  // Si la petición ya ha fallado (404 en caché, típico en dev) para cuando
  // se conecta el onError, el evento se pierde — por eso también se
  // comprueba el estado real de la imagen al montar.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      {!showFallback && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={title}
          onError={() => setErrored(true)}
          style={fill ? { objectPosition, ...imageStyle } : undefined}
          className={`transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
            hoverZoom ? "group-hover:scale-105" : ""
          } ${fill ? `h-full w-full object-${fit}` : "h-auto w-full"}`}
        />
      )}
      {showFallback && (
        <div
          className={`bg-gradient-to-br ${gradientFor(title)} opacity-90 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
            hoverZoom ? "group-hover:scale-110" : ""
          } ${fill ? "h-full w-full" : "aspect-[4/5] w-full"}`}
        />
      )}
    </div>
  );
}
