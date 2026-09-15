"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Tira de imágenes en movimiento continuo (marquee). Se pausa con
// prefers-reduced-motion (se convierte en una fila con scroll normal).
// Al hacer clic en una imagen se abre en grande sobre el resto de la página.
export default function ImageCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const track = reduce ? images : [...images, ...images];

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div
        className="overflow-hidden py-3 sm:py-4"
        data-cursor="ZOOM"
      >
        <div
          className={
            reduce
              ? "edge flex gap-3 overflow-x-auto sm:gap-4"
              : "flex w-max gap-3 animate-marquee sm:gap-4"
          }
        >
          {track.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(src)}
              aria-label={`Ampliar imagen de ${title}`}
              className="block h-[70vw] w-[52vw] shrink-0 overflow-hidden rounded-3xl bg-ink transition-transform duration-500 ease-[var(--ease)] hover:scale-[0.98] sm:h-[65vh] sm:w-[46vh]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={title}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active}
              alt={title}
              className="max-h-full max-w-full object-contain"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
