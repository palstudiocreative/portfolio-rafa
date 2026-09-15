"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Cursor global minimalista: una pequeña píldora que sigue al puntero y
// muestra una etiqueta contextual (VIEW, PLAY...) cuando el elemento bajo
// el cursor declara data-cursor="ETIQUETA". No sustituye al cursor nativo,
// solo lo complementa — así nunca se pierde la afordancia por defecto.
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      setLabel(target?.getAttribute("data-cursor") ?? null);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-pill pointer-events-none fixed left-0 top-0 z-[100] items-center justify-center rounded-full bg-ink mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: label ? 76 : 8,
        height: label ? 76 : 8,
        opacity: label ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {label && (
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-paper">
          {label}
        </span>
      )}
    </motion.div>
  );
}
