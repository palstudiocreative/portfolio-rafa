"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { RefObject } from "react";

const PIXEL_WIDTH = 56;
const SIZE = 320;

// Mancha orgánica (varios círculos difuminados y superpuestos) en vez de un
// círculo perfecto — así el borde de la zona pixelada es irregular.
const BLOB_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <filter id="b" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>
  <g filter="url(#b)" fill="#fff">
    <circle cx="100" cy="92" r="58" />
    <circle cx="54" cy="66" r="36" />
    <circle cx="150" cy="72" r="34" />
    <circle cx="64" cy="142" r="36" />
    <circle cx="140" cy="138" r="32" />
    <circle cx="102" cy="152" r="30" />
  </g>
</svg>`;
const BLOB_MASK = `url("data:image/svg+xml,${encodeURIComponent(BLOB_SVG)}")`;

// Dibuja una versión de la foto a muy baja resolución en un <canvas> y la
// estira con image-rendering:pixelated (de ahí el efecto de bloques). El
// canvas se recorta con una máscara orgánica (no un círculo) que sigue al
// cursor, así que solo se ve pixelado justo por donde pasa el ratón; el
// resto deja ver la foto nítida de debajo. Se desactiva en táctil y con
// movimiento reducido.
export default function PixelateOverlay({
  src,
  wrapperRef,
}: {
  src: string;
  wrapperRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth;
      canvas.width = PIXEL_WIDTH;
      canvas.height = Math.round(PIXEL_WIDTH * ratio);
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    function handleMove(e: PointerEvent) {
      const rect = wrapper!.getBoundingClientRect();
      const x = e.clientX - rect.left - SIZE / 2;
      const y = e.clientY - rect.top - SIZE / 2;
      canvas!.style.setProperty("--mx", `${x}px`);
      canvas!.style.setProperty("--my", `${y}px`);
      canvas!.style.opacity = "1";
    }
    function handleLeave() {
      canvas!.style.opacity = "0";
    }

    wrapper.addEventListener("pointermove", handleMove);
    wrapper.addEventListener("pointerleave", handleLeave);
    return () => {
      wrapper.removeEventListener("pointermove", handleMove);
      wrapper.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduce, src, wrapperRef]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-150"
      style={{
        imageRendering: "pixelated",
        WebkitMaskImage: BLOB_MASK,
        maskImage: BLOB_MASK,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: `${SIZE}px ${SIZE}px`,
        maskSize: `${SIZE}px ${SIZE}px`,
        WebkitMaskPosition: "var(--mx, 50%) var(--my, 50%)",
        maskPosition: "var(--mx, 50%) var(--my, 50%)",
      }}
    />
  );
}
