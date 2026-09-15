"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo de cabecera con autoplay silenciado (requisito de los navegadores)
// y un botón para que el visitante decida activar el audio si quiere.
export default function VideoHero({
  src,
  poster,
  fit = "cover",
  bgClassName = "bg-ink",
  audioToggle = true,
  filter,
}: {
  src: string;
  poster?: string;
  /** "cover": a lo ancho, letterbox vertical si el contenedor es más alto
   * que el vídeo (comportamiento original, pensado para héroes altos).
   * "contain": el vídeo entero siempre visible dentro del contenedor,
   * sin recortes, aunque el contenedor sea más bajo que el vídeo. */
  fit?: "cover" | "contain";
  /** Color de las franjas del letterbox cuando el vídeo no llena el
   * contenedor. Por defecto oscuro; en secciones sobre fondo claro puede
   * pasarse "bg-paper" para que las franjas se confundan con la página. */
  bgClassName?: string;
  /** Oculta el botón de activar/silenciar audio para vídeos que no tienen
   * pista de sonido. */
  audioToggle?: boolean;
  /** CSS filter (saturate, sepia, contrast...) aplicado sobre el vídeo —
   * corrección de color ligera sin tener que re-exportar el archivo. */
  filter?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // React puede no sincronizar a tiempo el atributo `muted` con la
  // propiedad real del elemento antes de que el navegador decida si
  // permite el autoplay — se fuerza aquí para que el autoplay en bucle
  // funcione siempre, incluso en la primera carga.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  function toggleAudio() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <>
      <div className={`absolute inset-0 flex items-center justify-center overflow-hidden ${bgClassName}`}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          style={filter ? { filter } : undefined}
          className={fit === "contain" ? "block h-full w-full object-contain" : "block w-full"}
        />
      </div>
      {audioToggle && (
        <button
          type="button"
          onClick={toggleAudio}
          className="absolute bottom-6 right-6 z-10 rounded-full bg-ink/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-paper backdrop-blur-sm transition-colors hover:bg-ink sm:bottom-8 sm:right-8"
        >
          {muted ? "Activar audio" : "Silenciar"}
        </button>
      )}
    </>
  );
}
