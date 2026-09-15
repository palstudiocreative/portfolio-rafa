import { profile } from "../lib/content";
import Reveal from "./Reveal";

export default function Profile() {
  const featured = profile.experience[0];
  const pastExperience = profile.experience.slice(1);

  return (
    <section
      id="perfil"
      className="edge relative z-10 overflow-hidden bg-paper py-24 sm:py-32"
    >
      <div className="relative">
        <Reveal>
          <p className="label mb-3">Experiencia reciente</p>
          <p className="font-black leading-[0.95] text-[10vw] sm:text-[4.5vw]">
            {featured.role}
          </p>
          <p className="mt-3 text-lg font-light text-ink-soft sm:text-2xl">
            {featured.place} — {featured.location}
          </p>
          <p className="label mt-2">{featured.period}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 border-t border-line pt-10 sm:mt-28">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
            <div>
              <h3 className="label">Trayectoria</h3>
              <ul className="mt-4 flex flex-col gap-4">
                {pastExperience.map((item, i) => (
                  <li key={i} className="border-l border-line pl-3 text-sm">
                    <p className="font-medium">{item.role}</p>
                    <p className="text-ink-soft">{item.place}</p>
                    <p className="label mt-1">{item.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="label">Formación</h3>
              <ul className="mt-4 flex flex-col gap-4">
                {profile.education.map((item, i) => (
                  <li key={i} className="border-l border-line pl-3 text-sm">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-ink-soft">{item.place}</p>
                    <p className="label mt-1">{item.period}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="label">Software</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
                {profile.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="label">Idiomas</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
                {profile.languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
