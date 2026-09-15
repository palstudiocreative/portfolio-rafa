"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "../lib/projects";
import Reveal from "./Reveal";
import VideoHero from "./VideoHero";

// Case study a medida para "Mermeladas Helios". Deliberadamente mínima:
// hero, introducción y cierre — sin las secciones de proceso/personajes/
// packaging que se probaron antes y se descartaron.

const BASE = "/projects/mermeladas-helios";

export default function MermeladasHeliosCaseStudy({ project }: { project: Project }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.5]);

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
        <section ref={heroRef} className="relative h-[92vh] w-full overflow-hidden bg-paper">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 25%" }}
            />
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="edge absolute inset-x-0 top-12 z-10 text-center sm:top-16"
          >
            <Reveal>
              <h1 className="font-black uppercase leading-[0.95] tracking-tight text-ink text-[6vw] sm:text-[3.25vw]">
                Mermeladas Helios
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="label mt-8">Ilustración · Packaging · Dirección de arte</p>
            </Reveal>
          </motion.div>
        </section>

        {/* 2. Introducción / Concepto */}
        <section className="edge relative z-10 bg-paper py-24 sm:py-36">
          <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr] sm:gap-16">
            <Reveal>
              <p className="max-w-2xl font-medium text-2xl leading-snug sm:text-4xl">
                Una reinterpretación del universo Helios a través de la ilustración surrealista.
                <span className="mt-4 block font-normal text-lg text-ink-soft sm:text-xl">
                  Frutas, ingredientes y figuras humanas se combinan para transformar cada sabor
                  en un personaje — y trasladar ese imaginario al packaging.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  <dt className="label">Disciplinas</dt>
                  <dd className="mt-1 text-sm sm:text-base">
                    Ilustración, packaging, dirección de arte
                  </dd>
                </div>
                <div>
                  <dt className="label">Proyecto</dt>
                  <dd className="mt-1 text-sm sm:text-base">
                    Rediseño conceptual de packaging
                  </dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="label">Cliente</dt>
                    <dd className="mt-1 text-sm sm:text-base">{project.client}</dd>
                  </div>
                )}
                {project.year && (
                  <div>
                    <dt className="label">Año</dt>
                    <dd className="mt-1 text-sm sm:text-base">{project.year}</dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* 3. Vídeo — los personajes en movimiento */}
        <section className="relative z-10 h-[68vh] w-full overflow-hidden bg-paper">
          <VideoHero
            src={`${BASE}/videomermelada.mp4`}
            fit="contain"
            bgClassName="bg-paper"
            audioToggle={false}
            filter="saturate(1.35) sepia(0.14) contrast(1.04)"
          />
        </section>

        {/* Espaciador: un trozo de fondo crema antes de que empiece el blanco */}
        <div className="relative z-10 h-16 w-full bg-paper sm:h-24" />

        {/* 4. Etiqueta */}
        <section className="relative z-10 bg-white pb-10 pt-24 sm:pb-14 sm:pt-36">
          <div className="edge">
            <Reveal>
              <p className="mx-auto max-w-2xl text-center font-black leading-snug text-3xl sm:text-5xl">
                Entre lo cotidiano y lo inesperado
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink-soft sm:text-base">
                Partiendo del surrealismo, cada variedad construye su propio imaginario. Los
                ingredientes dejan de ser únicamente producto para convertirse en personajes,
                creando una colección de etiquetas conectadas por un mismo lenguaje visual.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/mermelada-02.jpg`}
              alt="Etiqueta técnica de Mermelada Helios sabor Higo"
              className="mx-auto mt-16 w-2/3 rounded-2xl sm:mt-24 sm:w-1/2"
            />
          </Reveal>
        </section>

        {/* 5. Resultado final */}
        <section className="edge relative z-10 bg-white pb-24 pt-2 text-center sm:pb-36 sm:pt-4">
          <Reveal>
            <p className="font-black uppercase tracking-tight text-3xl sm:text-5xl">
              Mermeladas Helios
            </p>
            <p className="label mt-2">Illustration / Packaging</p>
          </Reveal>
        </section>
      </main>

      <footer className="edge relative z-10 bg-white py-10 text-center">
        <Link href="/#trabajo" className="nav-link label">
          Ver todos los proyectos
        </Link>
      </footer>
    </div>
  );
}
