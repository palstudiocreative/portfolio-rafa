import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="edge relative z-10 bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-3xl leading-snug sm:text-5xl">
            Diseñador y creativo explorando nuevas formas de construir
            imágenes, identidades y experiencias entre diseño, dirección de
            arte e inteligencia artificial.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#trabajo"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-ink-soft px-8 py-4 text-base text-paper transition-colors hover:bg-accent sm:text-lg"
          >
            Proyectos
          </a>
        </Reveal>
      </div>
    </section>
  );
}
