"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Project } from "../lib/projects";
import EditorialVideo from "./EditorialVideo";
import Reveal from "./Reveal";

// Case study a medida para "Grandes Vinos": un catálogo editorial del que
// solo existe UN vídeo como material — nada de fotografía de producto,
// mockups ni iconografía de vino (salvo las páginas reales de catálogo que
// aporta la sección 4). Toda la dirección de arte se construye recortando
// ese único vídeo de formas distintas mediante CSS (aspect ratio,
// object-position, escalas), apoyada en tipografía, retícula y espacio
// negativo. Poppins de todo el sitio, sin fuente propia.
//
// Página deliberadamente corta: hero, introducción del proyecto, el
// bloque de sistema editorial y las páginas especiales del catálogo — sin
// las secciones adicionales (vídeo como material, secuencia inmersiva,
// momento experimental, cierre) que se probaron y se descartaron.

const BASE = "/projects/grandes-vinos";
const VIDEO = `${BASE}/catalogo.mp4`;
const POSTER = `${BASE}/poster.jpg`;

const SYSTEM_WORDS = ["RETÍCULA", "JERARQUÍA", "RITMO", "COLECCIÓN"];

const SPECIAL_SPREADS = [
  `${BASE}/vino-01.jpg`,
  `${BASE}/vino-02.jpg`,
  `${BASE}/vino-03.jpg`,
];

// Carrusel en movimiento continuo (mismo recurso que ImageCarousel usa en
// el resto del sitio: .animate-marquee, duplicando la tira para que el
// bucle sea perfecto), pero con las tarjetas a altura fija y ancho libre
// en vez de una caja con object-cover — así cada página del catálogo se
// ve entera, sin recortar nada, al tamaño pequeño que ya funcionaba.
function SpreadsCarousel() {
  const reduce = useReducedMotion();
  const track = reduce ? SPECIAL_SPREADS : [...SPECIAL_SPREADS, ...SPECIAL_SPREADS];

  return (
    <div className="overflow-hidden py-2">
      <div
        className={
          reduce
            ? "edge flex gap-8 overflow-x-auto sm:gap-12"
            : "flex w-max gap-8 animate-marquee sm:gap-12"
        }
      >
        {track.map((src, i) => (
          <div key={`${src}-${i}`} className="flex shrink-0 flex-col">
            <p className="label mb-3 text-ink-soft">
              {String((i % SPECIAL_SPREADS.length) + 1).padStart(2, "0")} /{" "}
              {String(SPECIAL_SPREADS.length).padStart(2, "0")}
            </p>
            <div className="h-[32vh] overflow-hidden rounded-xl bg-ink sm:h-[42vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Página especial del catálogo Grandes Vinos"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero: mismo layout en mobile y desktop (titular + ventana de vídeo),
// sin animación ligada al scroll. La ventana de vídeo entra con un reveal
// de máscara (el mismo recurso que usa RevealImage para las fotografías
// del sitio) y respira con un Ken Burns muy sutil y continuo — vida
// propia sin depender del scroll.
function Hero({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  return (
    <section className="edge relative z-10 flex min-h-screen w-full flex-col justify-center bg-paper pt-24 pb-16 sm:pt-32">
      <div className="grid gap-10 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-7">
          <Reveal>
            <h1 className="font-black uppercase leading-[0.92] tracking-tight text-ink text-[16vw] sm:text-[9vw]">
              Grandes
              <br />
              Vinos
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 sm:mt-12">
              <p className="label">Editorial Design</p>
              <p className="label text-ink-soft">Catalogue / Publication</p>
            </div>
          </Reveal>
        </div>

        <div className="sm:col-span-4 sm:col-start-8 sm:flex sm:items-end sm:justify-center">
          <motion.div
            className="mt-10 w-full overflow-hidden rounded-2xl bg-ink sm:mt-0"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] w-full">
              <motion.div
                className="absolute inset-0"
                animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
                transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
              >
                <EditorialVideo
                  src={VIDEO}
                  poster={POSTER}
                  preload="auto"
                  objectPosition="center 15%"
                  className="h-full w-full object-cover"
                  playbackRate={2}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {project.year && <p className="label absolute right-6 top-24 text-ink-soft sm:hidden">{project.year}</p>}
    </section>
  );
}

export default function GrandesVinosCaseStudy({ project }: { project: Project }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="edge fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 label text-ink">
        <Link href="/#trabajo" className="nav-link">
          <span className="sm:hidden">←</span>
          <span className="hidden sm:inline">← Volver</span>
        </Link>
        <nav className="flex gap-3 sm:gap-5 lg:gap-8">
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
        {project.year && <span className="hidden sm:inline">{project.year}</span>}
      </header>

      <main className="flex flex-1 flex-col">
        {/* 1. Hero */}
        <Hero project={project} />

        {/* 2. Una colección, un mismo lenguaje */}
        <section className="edge relative z-10 bg-paper py-24 sm:py-40">
          <div className="grid gap-10 sm:grid-cols-12 sm:gap-6">
            <div className="sm:col-span-3">
              <Reveal>
                <h2 className="label">Una colección, un mismo lenguaje</h2>
              </Reveal>
            </div>
            <div className="sm:col-span-8 sm:col-start-5">
              <Reveal delay={0.1}>
                <p className="font-medium leading-snug text-2xl sm:text-4xl">
                  Una publicación editorial que reúne la selección de Grandes Vinos bajo un
                  sistema visual común. La maquetación organiza cada referencia mediante una
                  estructura clara y consistente, dando protagonismo tanto al producto como a la
                  información y construyendo un recorrido coherente a través de toda la
                  colección.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. Sistema editorial */}
        <section className="edge relative z-10 bg-paper py-24 sm:py-40">
          <div className="grid gap-16 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-5">
              <Reveal>
                <h2 className="font-black leading-snug text-3xl sm:text-5xl">
                  Diseñar el recorrido
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
                  La repetición de una estructura común permite ordenar las distintas referencias
                  y construir continuidad entre ellas. La retícula, la jerarquía y el ritmo
                  editorial articulan el recorrido por la publicación.
                </p>
              </Reveal>

              <div className="mt-12 flex flex-col gap-1 sm:mt-16">
                {SYSTEM_WORDS.map((w, i) => (
                  <Reveal key={w} delay={0.1 + i * 0.05}>
                    <p
                      className="font-black leading-[1.05] text-ink/90 text-[10vw] sm:text-[3.4vw]"
                      style={{ opacity: 1 - i * 0.12 }}
                    >
                      {w}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="sm:col-span-6 sm:col-start-7 sm:flex sm:items-center">
              <Reveal delay={0.15} className="w-full">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink">
                  <EditorialVideo
                    src={VIDEO}
                    poster={POSTER}
                    preload="auto"
                    objectPosition="center 65%"
                    className="h-full w-full object-cover"
                    playbackRate={1}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Una maquetación para cada vino — páginas reales del catálogo */}
        <section className="relative z-10 bg-paper py-24 sm:py-40">
          <div className="edge">
            <div className="grid gap-10 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-3">
                <Reveal>
                  <h2 className="label">Una maquetación para cada vino</h2>
                </Reveal>
              </div>
              <div className="sm:col-span-8 sm:col-start-5">
                <Reveal delay={0.1}>
                  <p className="font-medium leading-snug text-2xl sm:text-4xl">
                    Aunque la publicación mantiene un sistema editorial común, algunas
                    referencias rompen la estructura para adquirir un mayor protagonismo.
                  </p>
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                    Los vinos más especiales cuentan con páginas diseñadas específicamente para
                    ellos, creando momentos únicos dentro del recorrido y aportando ritmo y
                    personalidad a la colección.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-24">
            <SpreadsCarousel />
          </div>
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
