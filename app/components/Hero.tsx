"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroSlideshow from "./HeroSlideshow";
import { profile } from "../lib/content";

const HERO_PHOTOS = Array.from(
  { length: 12 },
  (_, i) => `/hero/hero-${String(i + 1).padStart(2, "0")}.jpg`,
);

// Hero de la portada: en vez de una sola foto fija, la ventana ovalada
// cicla las fotos de /public/hero (ver HeroSlideshow) una tras otra en
// bucle. El nombre, antes partido a los dos lados (y luego sangrando
// entero por un borde), vive ahora entero, alineado a la izquierda y
// contenido dentro del viewport — nada de texto cortado por el borde. El
// lado derecho, que se quedaba vacío, lleva una pequeña ficha con el rol
// y la base — el mismo tipo de "spec sheet" que acompaña al óvalo en la
// referencia — y abajo un aviso de scroll con una línea que respira, para
// que el hero no se sienta tan plano.
//
// El óvalo es un rounded-full sobre una caja ancha: al pedir un radio muy
// grande, CSS lo recorta al máximo posible en cada esquina y el resultado
// es una píldora (lados rectos, puntas redondas), no un círculo ni un
// rectángulo con las esquinas cortadas.
//
// Se conserva el mecanismo de scroll que ya tenía este hero: la sección
// se fija (sticky) mientras la siguiente se desliza por encima, la foto
// se escala muy ligeramente y el resto se desvanece — sin relación con el
// efecto de "crecer hasta pantalla completa" que dio problemas en otro
// proyecto; aquí todo vive dentro de su propio hueco fijo, nunca cambia
// de sección ni se desmonta. La entrada al cargar (fade + leve subida) es
// un motion.div interior aparte del que lleva el opacity/y ligado al
// scroll, para no animar la misma propiedad desde dos sitios a la vez.
export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);

  const nameLines = profile.name.split(" ");
  const role = profile.role.split("/")[0].trim();

  return (
    <section
      id="top"
      ref={ref}
      className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
    >
      <motion.div
        style={{ opacity, y }}
        className="edge pointer-events-none absolute left-0 top-24 z-0 sm:top-1/2 sm:-translate-y-1/2"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[46vw] sm:max-w-[24vw]"
        >
          <p className="label text-ink-soft">Portfolio</p>
          <div aria-hidden className="select-none font-black uppercase leading-[1.15] text-ink/90 text-[5.5vw] sm:text-[2.3vw]">
            {nameLines.map((word) => (
              <p key={word}>{word}</p>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className="edge pointer-events-none absolute right-0 top-1/2 z-0 hidden -translate-y-1/2 text-right sm:block"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-10"
        >
          <div>
            <p className="label text-ink-soft">Rol</p>
            <p className="mt-1 text-lg font-medium text-ink">{role}</p>
          </div>
          <div>
            <p className="label text-ink-soft">Base</p>
            <p className="mt-1 text-lg font-medium text-ink">{profile.location}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ scale }}
        className="relative z-10 aspect-[16/9] w-[82vw] overflow-hidden rounded-full bg-ink sm:w-[46vw]"
      >
        <HeroSlideshow images={HERO_PHOTOS} alt={`${profile.name} — momentos`} />
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex flex-col items-center gap-3 sm:bottom-14"
      >
        <p className="label text-ink-soft sm:hidden">
          {role} — {profile.location}
        </p>
        <p className="label text-ink-soft">Scroll</p>
        <motion.span
          aria-hidden
          className="block h-10 w-px bg-ink/30"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
