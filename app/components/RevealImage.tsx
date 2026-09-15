"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import { useRef } from "react";
import ProjectCover from "./ProjectCover";

// Imagen con reveal de máscara al entrar en el viewport, más un desplazamiento
// interno muy sutil (parallax) mientras se hace scroll a través de ella.
// `className` posiciona el contenedor exterior (absolute inset-0, una altura
// fija, un ancho…), igual que se le pasaría antes directamente a ProjectCover.
export default function RevealImage({
  src,
  title,
  className = "",
  fill = true,
  parallax = false,
  hoverZoom = true,
  objectPosition = "center",
  imageStyle,
  fit = "cover",
  reveal = true,
}: {
  src?: string;
  title: string;
  className?: string;
  fill?: boolean;
  parallax?: boolean;
  hoverZoom?: boolean;
  objectPosition?: string;
  imageStyle?: CSSProperties;
  fit?: "cover" | "contain";
  /** Máscara que revela la imagen al entrar en el viewport. Antes de que
   * termine, se ve el fondo oscuro del contenedor — desactívala cuando esa
   * espera no aporte nada (ej. tarjetas de la rejilla de proyectos). */
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && !reduce ? ["-6%", "6%"] : ["0%", "0%"],
  );

  if (reduce || !reveal) {
    return (
      // useScroll de arriba sigue esperando este ref (los hooks no pueden
      // saltarse condicionalmente), así que hay que enlazarlo aquí también
      // aunque esta rama no anime nada con scrollYProgress.
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <ProjectCover
          src={src}
          title={title}
          fill={fill}
          hoverZoom={hoverZoom}
          objectPosition={objectPosition}
          imageStyle={imageStyle}
          fit={fit}
          className={fill ? "h-full w-full" : "w-full"}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ y }} className={fill ? "h-[112%] w-full" : "w-full"}>
        <ProjectCover
          src={src}
          title={title}
          fill={fill}
          hoverZoom={hoverZoom}
          objectPosition={objectPosition}
          imageStyle={imageStyle}
          fit={fit}
          className={fill ? "h-full w-full" : "w-full"}
        />
      </motion.div>
    </motion.div>
  );
}
