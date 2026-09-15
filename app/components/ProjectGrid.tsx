import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";

const LABELS = ["01. Branding", "02. Maquetación", "03. Ilustración", "04. Fotografía"];

export default function ProjectGrid() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const [featured, ...restAll] = sorted;
  // La rejilla pequeña tiene exactamente 3 huecos; el resto se queda en
  // los datos por si vuelve a necesitarse, pero no se muestra en la landing.
  const rest = restAll.slice(0, 3);

  return (
    <section
      id="trabajo"
      className="edge relative z-10 bg-paper py-24 sm:py-32"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        {featured && (
          <ProjectCard
            project={featured}
            label={LABELS[0]}
            className="h-[65vh] sm:h-[80vh]"
          />
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              label={LABELS[i + 1] ?? LABELS[LABELS.length - 1]}
              className="h-[48vh] sm:h-[52vh]"
              hoverZoom={false}
              labelColor="ink"
              labelPosition="top"
              objectPosition={i === 0 ? "center 30%" : "center"}
              // La pieza de "Fotografía" queda baja en el encuadre original;
              // como la altura ya cubre el contenedor exacto (sin margen
              // vertical para object-position), se hace zoom real y se
              // desplaza hacia arriba.
              imageStyle={
                i === 2
                  ? { transform: "scale(1.03) translateY(0%)", transformOrigin: "right center" }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
