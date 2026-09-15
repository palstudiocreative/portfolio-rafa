"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Escribe el texto letra a letra, como una máquina de escribir, sin cursor
// parpadeante. Con movimiento reducido se muestra el texto completo
// directamente, sin animación.
export default function TypewriterText({
  text,
  className = "",
  speed = 65,
  startDelay = 400,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          const next = c + 1;
          if (next >= text.length && interval) clearInterval(interval);
          return next;
        });
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, reduce]);

  return (
    <span className={className}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
