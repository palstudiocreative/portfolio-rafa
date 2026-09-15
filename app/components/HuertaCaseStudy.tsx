"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import localFont from "next/font/local";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "../lib/projects";
import ProjectCover from "./ProjectCover";
import Reveal from "./Reveal";
import RevealImage from "./RevealImage";
import TypewriterText from "./TypewriterText";

// Case study a medida para "El alma de la huerta": la plantilla genérica
// de proyecto no le hace justicia a un concepto así, así que esta página
// tiene su propia estructura de principio a fin (hero fijo, gran frase,
// concepto, serie como baraja de fotos, contraste tipográfico en scroll,
// créditos).

// Tipografía de marca propia de este proyecto — solo para los títulos de
// esta página, con licencia propia (archivo en /public/fonts).
const display = localFont({
  src: "../../public/fonts/Relationship of mÇlodrame.ttf",
});

// Paleta de marca propia de este proyecto (packaging real de la serie),
// aplicada solo dentro de esta página — igual que moldoLab usa su rojo.
const PALETTE = {
  orange: "#F25D33",
  dark: "#301208",
  olive: "#C4C754",
  pink: "#CD7397",
};

// Ciclo de color compartido por el título, el subtítulo y el menú del
// hero, para que los tres se muevan por la paleta a la vez.
const COLOR_CYCLE = [PALETTE.pink, PALETTE.orange, PALETTE.olive, PALETTE.dark, PALETTE.pink];
const COLOR_CYCLE_TRANSITION = { duration: 7, repeat: Infinity, ease: "linear" as const };

const CONTRAST_PAIRS: [string, string][] = [
  ["Orgánico", "Artificial"],
  ["Cotidiano", "Precioso"],
  ["Imperfecto", "Pulido"],
  ["Huerta", "Joyería"],
];

function ContrastWords() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // El desplazamiento es vertical, no horizontal: un drift en "x" recortaba
  // las palabras contra el overflow-hidden de la sección en pantallas
  // estrechas (el padding lateral en móvil son solo 20px) y además el
  // trazo decorativo de mayúsculas cursivas como la "J" de Joyería podía
  // pintar fuera de su caja. En vertical hay mucho más margen de sobra.
  const slow = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-10, 10]);
  const fast = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [16, -16]);

  return (
    <section
      ref={ref}
      className="edge relative z-10 overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: PALETTE.dark }}
    >
      {/* Fotografía entre las dos columnas de palabras, de arriba abajo
          del contenedor — la propia pieza que enfrenta ambos mundos. */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 h-full w-auto -translate-x-1/2 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/el-alma-de-la-huerta/foto-06.png"
          alt=""
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-8 sm:gap-14">
        {CONTRAST_PAIRS.map(([a, b], i) => (
          <div key={a} className="flex items-center justify-between gap-4">
            <motion.span
              style={{ y: i % 2 === 0 ? slow : fast, color: PALETTE.pink }}
              className={`${display.className} leading-none text-[13vw] sm:text-[6.5vw]`}
            >
              {a}
            </motion.span>
            <motion.span
              style={{ y: i % 2 === 0 ? fast : slow, color: PALETTE.olive }}
              className={`${display.className} leading-none opacity-70 text-[13vw] sm:text-[6.5vw]`}
            >
              {b}
            </motion.span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Tilt determinista por posición en la baraja, no aleatorio en cada render,
// para que las cartas de fondo no salten al recalcular.
function tiltFor(i: number) {
  return ((i * 37) % 9) - 4;
}

function HuertaStack({ images, title }: { images: string[]; title: string }) {
  const [order, setOrder] = useState(images);
  const reduce = useReducedMotion();
  // Framer Motion dispara onTap incluso después de un arrastre real, así
  // que sin este guard cycleTop() se llamaba dos veces por swipe (una
  // desde onDragEnd y otra desde onTap) y una vez de más en arrastres que
  // no llegaban al umbral. Este ref recuerda si el gesto actual ya movió
  // la tarjeta lo suficiente como para no tratarlo también como toque.
  const didDragRef = useRef(false);

  // La baraja es circular: retirar la de arriba la manda al fondo en vez
  // de hacerla desaparecer, así la serie se puede recorrer sin fin.
  function cycleTop() {
    setOrder((o) => [...o.slice(1), o[0]]);
  }

  const topNumber = images.indexOf(order[0]) + 1;

  return (
    <section
      className="edge relative z-10 overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: PALETTE.dark }}
    >
      {/* Texto fantasma de fondo: el título repetido a todo lo ancho,
          apenas visible, detrás de la baraja de fotos. */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <span
          className={`${display.className} inline-block whitespace-nowrap uppercase leading-none text-[11vw]`}
          style={{ color: "rgba(205, 115, 151, 0.25)", transform: "translateY(14%) scaleY(2.2)" }}
        >
          El alma de la huerta
        </span>
      </div>

      <div className="relative z-10 mb-10 flex items-baseline justify-between">
        <Reveal>
          <h2 className="label" style={{ color: "var(--paper)" }}>
            Serie fotográfica
          </h2>
        </Reveal>
        <span className="label" style={{ color: "var(--paper)" }}>
          {String(topNumber).padStart(2, "0")} — {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {/* Las 5 fotos comparten el mismo formato horizontal, así que el
          contenedor adopta esa proporción exacta en vez de una caja
          genérica con márgenes — la imagen lo llena sin recortes. */}
      <div className="relative z-10 mx-auto aspect-[3/2] w-full max-w-2xl sm:max-w-3xl">
        {/* Slots fijos por posición (no por imagen): así la tarjeta que
            puede arrastrarse es siempre la misma instancia — solo cambia
            qué foto muestra — y no se pierde el control del gesto de
            arrastre al reordenar la baraja. */}
        {order.slice(0, 4).map((src, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 overflow-hidden rounded-3xl shadow-xl"
            style={{ zIndex: 4 - i, backgroundColor: PALETTE.dark }}
            animate={{
              x: 0,
              scale: 1 - i * 0.045,
              y: i * 16,
              rotate: reduce || i === 0 ? 0 : tiltFor(i),
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag={i === 0 && !reduce ? "x" : false}
            dragElastic={0.6}
            dragMomentum={false}
            dragSnapToOrigin
            onDragStart={() => {
              didDragRef.current = false;
            }}
            onDrag={(_, info) => {
              if (Math.abs(info.offset.x) > 6) didDragRef.current = true;
            }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 120) cycleTop();
            }}
            onTap={() => {
              if (i === 0 && !didDragRef.current) cycleTop();
            }}
            data-cursor={i === 0 ? "RETIRAR" : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} ${images.indexOf(src) + 1}`}
              className="pointer-events-none h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      <p
        className="relative z-10 mt-12 text-center text-[10px] uppercase tracking-[0.2em] sm:text-[11px]"
        style={{ color: "var(--paper)" }}
      >
        Arrastra o toca la fotografía para descubrir la siguiente
      </p>
    </section>
  );
}

export default function HuertaCaseStudy({ project }: { project: Project }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.35]);

  const images = project.images ?? [];

  return (
    <div className="flex flex-1 flex-col">
      <motion.header
        className="edge fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 label mix-blend-difference"
        animate={reduce ? undefined : { color: COLOR_CYCLE }}
        transition={COLOR_CYCLE_TRANSITION}
        style={{ color: PALETTE.pink }}
      >
        <Link href="/#trabajo" className="nav-link">
          ← Volver
        </Link>
        <nav className="flex gap-5 sm:gap-8">
          <Link href="/#perfil" className="nav-link">
            Perfil
          </Link>
          <Link href="/#trabajo" className="nav-link">
            Trabajo
          </Link>
          <Link href="/#contacto" className="nav-link">
            Contacto
          </Link>
        </nav>
        {project.year && <span>{project.year}</span>}
      </motion.header>

      <main className="flex flex-1 flex-col">
        {/* 1. Apertura */}
        <section
          ref={heroRef}
          className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-paper"
        >
          {/* Cabecera fija: visible desde el primer fotograma, sin el
              reveal por scroll de RevealImage (aquí no aplica, ya está
              a la vista antes de que el usuario haga scroll). */}
          <ProjectCover
            src={project.cover}
            title={project.title}
            className="absolute inset-0 h-full w-full"
          />
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="edge absolute inset-0 z-10 flex flex-col items-center justify-start pt-40 text-center sm:pt-52"
          >
            <motion.span
              className="inline-block"
              animate={reduce ? undefined : { color: COLOR_CYCLE }}
              transition={COLOR_CYCLE_TRANSITION}
              style={{ color: PALETTE.pink, transform: "scaleY(1.6)" }}
            >
              <TypewriterText
                text={project.title}
                className={`${display.className} leading-[0.95] tracking-normal text-[16vw] sm:text-[9vw]`}
              />
            </motion.span>
            <div className="mt-4 flex items-center justify-center gap-4">
              <motion.p
                className="label"
                animate={reduce ? undefined : { color: COLOR_CYCLE }}
                transition={COLOR_CYCLE_TRANSITION}
                style={{ color: PALETTE.pink }}
              >
                Still life · Dirección de arte · Fotografía
              </motion.p>
              {project.year && (
                <motion.p
                  className="label"
                  animate={reduce ? undefined : { color: COLOR_CYCLE }}
                  transition={COLOR_CYCLE_TRANSITION}
                  style={{ color: PALETTE.pink }}
                >
                  {project.year}
                </motion.p>
              )}
            </div>
          </motion.div>
        </section>

        {/* Franja a sangre justo en el borde donde termina el hero fijo */}
        <div className="relative z-10 h-16 w-full overflow-hidden sm:h-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/el-alma-de-la-huerta/foto-08.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Gran frase de apertura */}
        <section className="edge relative z-10 bg-paper py-24 text-center sm:py-32">
          <Reveal>
            <p className={`${display.className} text-[#CD7397] mx-auto max-w-3xl leading-none text-3xl sm:text-5xl`}>
              Lo cotidiano también puede convertirse
              <br />
              en objeto de deseo.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              <em className="italic">El alma de la huerta</em> es un experimento
              visual que enfrenta dos universos aparentemente opuestos: la
              materia orgánica de frutas y verduras y el lenguaje sofisticado
              de la joyería.
            </p>
          </Reveal>
        </section>

        {/* 2. Concepto */}
        <section className="relative z-10 bg-paper pb-4 pt-24 sm:pb-6 sm:pt-32">
          <div className="grid gap-12 sm:grid-cols-2 sm:items-center sm:gap-0">
            {/* margin, no padding: .edge ya fija su propio padding-left y
                una utilidad pl-* sobre el mismo elemento pierde siempre
                contra esa regla (ambas compiten por la misma propiedad y
                .edge no está en una @layer, así que gana igual). */}
            <div className="edge sm:ml-20 lg:ml-32">
              <Reveal>
                <h2 className={`${display.className} text-[#CD7397] text-3xl leading-snug sm:text-5xl`}>
                  Entre lo natural y lo diseñado.
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                  La joya no oculta el vegetal: lo enmarca, lo acompaña y altera
                  nuestra percepción sobre él. Elementos cotidianos pasan a
                  ocupar el lugar reservado tradicionalmente al objeto precioso.
                </p>
              </Reveal>
            </div>
            {/* A sangre por el lado derecho: sin el padding .edge del resto de la sección */}
            <Reveal delay={0.1}>
              <RevealImage
                src="/projects/el-alma-de-la-huerta/foto-07.png"
                title={project.title}
                className="h-[45vh] w-full sm:h-[60vh]"
              />
            </Reveal>
          </div>

          <div className="edge">
            <Reveal delay={0.15}>
              <p className={`${display.className} text-[#CD7397] mx-auto mt-44 max-w-2xl text-center leading-snug text-3xl sm:mt-60 sm:text-5xl`}>
                Elevar lo común sin dejar de reconocerlo.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 3. Serie fotográfica — baraja de fotos que se retiran una a una */}
        {images.length > 0 && <HuertaStack images={images} title={project.title} />}

        {/* 4. Dirección artística */}
        <section className="edge relative z-10 bg-paper py-24 sm:py-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            <Reveal>
              <span className="label" style={{ color: PALETTE.orange }}>
                Dirección artística
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                El fondo blanco elimina cualquier contexto y convierte cada
                composición en una pieza casi escultórica. La iluminación
                controlada enfatiza las texturas naturales, mientras los
                reflejos metálicos de las joyas introducen un segundo nivel
                de materialidad.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contraste — palabras enfrentadas con parallax */}
        <ContrastWords />

        {/* Créditos */}
        <section className="edge relative z-10 bg-paper py-24 text-center sm:py-32">
          <Reveal>
            <p className={`${display.className} text-[#CD7397] text-2xl sm:text-4xl`}>
              {project.title}
            </p>
            <div className="mx-auto mt-6 flex flex-col gap-1 text-sm text-ink-soft">
              <p>Dirección de arte, concepto y fotografía</p>
              <p className="font-medium text-ink">Rafael Palacios</p>
              {project.year && <p className="label mt-2">{project.year}</p>}
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="edge relative z-10 bg-paper py-10 text-center">
        <Link href="/#trabajo" className="nav-link label">
          Ver todos los proyectos
        </Link>
      </footer>
    </div>
  );
}
