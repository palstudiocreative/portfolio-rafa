import { notFound } from "next/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import { projects } from "../../lib/projects";
import ChunkedGallery from "../../components/ChunkedGallery";
import GrandesVinosCaseStudy from "../../components/GrandesVinosCaseStudy";
import HuertaCaseStudy from "../../components/HuertaCaseStudy";
import ImageCarousel from "../../components/ImageCarousel";
import MermeladasHeliosCaseStudy from "../../components/MermeladasHeliosCaseStudy";
import MoldoLabLogo from "../../components/MoldoLabLogo";
import Reveal from "../../components/Reveal";
import RevealImage from "../../components/RevealImage";
import StyledDescription from "../../components/StyledDescription";
import TypewriterText from "../../components/TypewriterText";
import VideoHero from "../../components/VideoHero";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "el-alma-de-la-huerta") {
    return <HuertaCaseStudy project={project} />;
  }

  if (project.slug === "mermeladas-helios") {
    return <MermeladasHeliosCaseStudy project={project} />;
  }

  if (project.slug === "grandes-vinos") {
    return <GrandesVinosCaseStudy project={project} />;
  }

  const hasMeta =
    project.client ||
    project.year ||
    project.tags?.length ||
    project.services?.length;

  // Permite que un proyecto de identidad sustituya el acento del sistema
  // solo dentro de su propia página, sin tocar el resto del portfolio.
  const themeStyle = project.accent
    ? ({ "--accent": project.accent } as CSSProperties)
    : undefined;

  return (
    <div className="flex flex-1 flex-col" style={themeStyle}>
      <header
        className={`edge fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 label ${
          project.heroIsLight ? "text-ink" : "text-paper"
        }`}
      >
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
        <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden">
          {project.heroVideo ? (
            <VideoHero src={project.heroVideo} poster={project.cover} />
          ) : (
            <>
              <RevealImage
                src={project.cover}
                title={project.title}
                parallax
                className="absolute inset-0"
              />
              {!project.heroIsLight && (
                <div className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
              )}

              {project.titlePosition === "top-center" ? (
                <div className="edge absolute inset-x-0 top-0 z-10 flex justify-center pt-10 sm:pt-14">
                  {project.titleEffect === "typewriter" ? (
                    <TypewriterText
                      text={project.title.toUpperCase()}
                      className={`font-bold text-lg tracking-[0.2em] sm:text-2xl ${
                        project.heroIsLight ? "text-ink" : "text-paper"
                      }`}
                    />
                  ) : (
                    <h1
                      className={`font-bold text-lg tracking-[0.2em] sm:text-2xl ${
                        project.heroIsLight ? "text-ink" : "text-paper"
                      }`}
                    >
                      {project.title.toUpperCase()}
                    </h1>
                  )}
                </div>
              ) : (
                <div className="edge relative z-10 pb-12 pt-28">
                  <Reveal>
                    <h1 className="font-black leading-[0.88] text-paper text-[13vw] sm:text-[7vw]">
                      {project.title}
                    </h1>
                  </Reveal>
                  {project.tagline && (
                    <Reveal delay={0.1}>
                      <p className="mt-4 max-w-md text-lg font-light text-paper/90 sm:text-xl">
                        {project.tagline}
                      </p>
                    </Reveal>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {(project.description || hasMeta) && (
          <section className="edge relative z-10 bg-paper py-16 sm:py-24">
            <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr] sm:gap-16">
              {project.description && (
                <Reveal>
                  <p className="max-w-xl font-medium text-2xl leading-snug sm:text-3xl">
                    <StyledDescription
                      text={project.description}
                      emphasize={project.title}
                    />
                  </p>
                </Reveal>
              )}

              {hasMeta ? (
                <Reveal delay={0.1}>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                    {project.client && (
                      <div>
                        <dt className="label">Cliente</dt>
                        <dd className="mt-1 text-sm sm:text-base">
                          {project.client}
                        </dd>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <dt className="label">Año</dt>
                        <dd className="mt-1 text-sm sm:text-base">
                          {project.year}
                        </dd>
                      </div>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div>
                        <dt className="label">Disciplinas</dt>
                        <dd className="mt-1 text-sm sm:text-base">
                          {project.tags.join(", ")}
                        </dd>
                      </div>
                    )}
                    {project.services && project.services.length > 0 && (
                      <div>
                        <dt className="label">Servicios</dt>
                        <dd className="mt-1 text-sm sm:text-base">
                          {project.services.join(", ")}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {project.slug === "moldolab" && (
                    <>
                      <MoldoLabLogo className="mt-44 h-auto w-full text-accent sm:-translate-x-12" />
                      <div className="mt-12 flex justify-center sm:justify-end">
                        <a
                          href="https://rafaelpalacios21.github.io/WEB-MOLDO/color-lab.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-paper transition-transform hover:scale-[1.03] sm:mr-10"
                        >
                          Ver la web del proyecto
                        </a>
                      </div>
                    </>
                  )}
                </Reveal>
              ) : null}
            </div>
          </section>
        )}

        {project.manifesto && project.manifesto.length > 0 && (
          <section className="edge relative z-10 bg-paper py-16 sm:py-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              {project.manifesto.map((item, i) => (
                <Reveal key={item.title} delay={(i % 2) * 0.08}>
                  <div className="border-t border-line pt-4">
                    <span className="label text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-bold text-xl leading-snug sm:text-2xl">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft sm:text-base">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {project.carousel && project.carousel.length > 0 && (
          <ImageCarousel images={project.carousel} title={project.title} />
        )}

        {project.images && project.images.length > 0 && (
          <ChunkedGallery images={project.images} title={project.title} />
        )}

        {project.manual && project.manual.length > 0 && (
          <ChunkedGallery
            images={project.manual}
            title={project.title}
            dark
            uniform
          />
        )}

        {project.videos && project.videos.length > 0 && (
          <section className="relative z-10 flex flex-col gap-3 bg-ink py-3 sm:gap-4 sm:py-4">
            {project.videos.map((src) => (
              <div key={src} data-cursor="PLAY">
                <video src={src} controls playsInline className="block w-full" />
              </div>
            ))}
          </section>
        )}

        {/* Cierre del proyecto: si el titular no se mostró ya en el hero
            (caso de los vídeos, que no llevan texto encima), se usa aquí
            como remate — así la página no termina en seco sobre una imagen. */}
        {project.heroVideo && project.tagline && (
          <section className="edge relative z-10 bg-ink py-20 text-center sm:py-28">
            <Reveal>
              <p className="mx-auto max-w-2xl font-medium text-2xl leading-snug text-paper sm:text-4xl">
                {project.tagline
                  .split(/(?<=\.)\s+/)
                  .map((sentence, i) => (
                    <span key={i} className="block">
                      {sentence}
                    </span>
                  ))}
              </p>
            </Reveal>
          </section>
        )}
      </main>

      <footer
        className={`edge relative z-10 py-10 text-center ${
          project.heroVideo ? "bg-ink text-paper" : "bg-paper"
        }`}
      >
        <Link href="/#trabajo" className="nav-link label">
          Ver todos los proyectos
        </Link>
      </footer>
    </div>
  );
}
