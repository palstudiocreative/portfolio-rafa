"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const INTERVAL = 450;

// Cicla las fotos de /public/hero (hero-01.jpg, hero-02.jpg…) dentro del
// óvalo, una detrás de otra en bucle — corte directo, sin crossfade,
// siempre a opacidad 100%. El filtro CSS sube la saturación y calienta la
// temperatura de color (más naranja) de forma uniforme en las 12, sin
// tener que reexportar cada archivo. Con prefers-reduced-motion se queda
// fija en la primera.
export default function HeroSlideshow({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce, images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(1.5) sepia(0.18) contrast(1.05)" }}
      />
    </div>
  );
}
