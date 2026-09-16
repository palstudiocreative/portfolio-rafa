import { profile } from "../lib/content";
import Reveal from "./Reveal";

export default function SiteFooter() {
  return (
    <footer
      id="contacto"
      className="edge relative z-10 overflow-hidden bg-paper py-24 sm:py-32"
    >
      <div className="relative">
        <Reveal>
          <h2 className="font-black text-3xl sm:text-5xl">Contacto</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Dos formas de trabajar juntos: como estudio para proyectos
            puntuales, o incorporándome a un equipo de forma estable.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 border-t border-line pt-14 sm:mt-20 sm:grid-cols-2 sm:gap-12">
          <Reveal delay={0.1}>
            <span className="label text-accent">01</span>
            <h3 className="mt-3 font-black text-2xl sm:text-3xl">
              Freelance / Estudio
            </h3>
            <p className="mt-3 max-w-sm text-sm text-ink-soft">
              Para proyectos, colaboraciones y encargos como diseñador
              freelance.
            </p>
            <a
              href={`mailto:${profile.studio.email}`}
              data-cursor="OPEN"
              className="mt-8 block break-all font-black leading-[1.05] text-[4.6vw] transition-colors hover:text-accent sm:text-[2.2vw]"
            >
              {profile.studio.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <a
                href={`https://instagram.com/${profile.studio.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="nav-link"
              >
                {profile.studio.instagram}
              </a>
              <a
                href={`https://${profile.contact.behance}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="nav-link"
              >
                {profile.contact.behance}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <span className="label text-accent">02</span>
            <h3 className="mt-3 font-black text-2xl sm:text-3xl">
              Jornada completa
            </h3>
            <p className="mt-3 max-w-sm text-sm text-ink-soft">
              Disponible para incorporarme a un equipo o empresa de forma
              estable.
            </p>
            <a
              href={`mailto:${profile.contact.email}`}
              data-cursor="OPEN"
              className="mt-8 block break-all font-black leading-[1.05] text-[4.6vw] transition-colors hover:text-accent sm:text-[2.2vw]"
            >
              {profile.contact.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex justify-end sm:mt-20">
            <a href="#top" className="nav-link label">
              Volver arriba ↑
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
