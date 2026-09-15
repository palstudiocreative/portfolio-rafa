import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "../lib/projects";
import RevealImage from "./RevealImage";

export default function ProjectCard({
  project,
  label,
  className = "",
  hoverZoom = true,
  objectPosition = "center",
  labelColor = "paper",
  imageStyle,
  labelPosition = "bottom",
}: {
  project: Project;
  label: string;
  className?: string;
  hoverZoom?: boolean;
  objectPosition?: string;
  labelColor?: "paper" | "ink";
  imageStyle?: CSSProperties;
  labelPosition?: "top" | "bottom";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block overflow-hidden rounded-3xl bg-ink ${className}`}
    >
      <RevealImage
        src={project.thumbnail ?? project.cover}
        title={project.title}
        hoverZoom={hoverZoom}
        objectPosition={objectPosition}
        imageStyle={imageStyle}
        reveal={false}
        className={`absolute inset-0 transition-transform duration-700 ease-[var(--ease)] ${
          hoverZoom ? "group-hover:scale-[1.03]" : ""
        }`}
      />
      <div className="absolute inset-0 bg-ink/15 mix-blend-multiply" />

      <div
        className={`relative z-10 flex h-full flex-col p-5 sm:p-8 ${
          labelPosition === "top" ? "justify-start" : "justify-end"
        }`}
      >
        <p
          className={`font-light leading-[1.1] text-[4.5vw] sm:text-[1.4vw] ${
            labelColor === "ink" ? "text-ink" : "text-paper"
          }`}
        >
          {label}
        </p>
      </div>
    </Link>
  );
}
