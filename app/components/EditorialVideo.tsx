"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

// Único asset audiovisual del proyecto "Grandes Vinos", reutilizado en
// distintos recortes a lo largo de la página. Cada instancia es su propio
// <video> (para poder mostrar varios encuadres a la vez), pero permanece
// montada de forma permanente — nunca se desmonta al hacer scroll — y un
// IntersectionObserver se limita a pausarla/reanudarla según visibilidad,
// preservando `currentTime`. Así ninguna instancia se reinicia al volver
// a aparecer, y las que están fuera de pantalla no consumen CPU/GPU.
export default function EditorialVideo({
  src,
  poster,
  className = "",
  style,
  objectPosition = "center",
  preload = "metadata",
  playbackRate = 1,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
  preload?: "auto" | "metadata";
  playbackRate?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.playbackRate = playbackRate;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    // Además del IntersectionObserver, se reintenta al llegar metadata/datos
    // — si la primera llamada a play() se hace antes de que el vídeo tenga
    // suficiente buffer, la promesa puede rechazarse y, si el usuario no
    // vuelve a cruzar el umbral de visibilidad, se queda parado para
    // siempre. loadeddata/canplay cubren ese caso sin depender del scroll.
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload={preload}
      className={className}
      style={{ objectPosition, ...style }}
    />
  );
}
