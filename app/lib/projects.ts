export type Project = {
  /** Debe coincidir con la carpeta en /public/projects/<slug>/ */
  slug: string;
  title: string;
  /** Orden de aparición en la landing (menor = antes) */
  order: number;
  year?: number;
  /** Etiquetas internas del proyecto — no crean secciones, solo se muestran como metadata */
  tags?: string[];
  client?: string;
  description?: string;
  /** Frase corta bajo el título en la página del proyecto */
  tagline?: string;
  /** Dónde va el título sobre la foto de cabecera. Por defecto abajo a la izquierda. */
  titlePosition?: "bottom-left" | "top-center";
  /** Efecto de aparición del título de cabecera */
  titleEffect?: "typewriter";
  /** La foto de cabecera es clara (fondo blanco) — el header usa texto oscuro en vez de blanco */
  heroIsLight?: boolean;
  /** Ruta dentro de /public, ej. "/projects/mi-proyecto/cover.jpg" */
  cover?: string;
  /** Imagen para la tarjeta de la landing, si debe ser distinta del cover de la página del proyecto */
  thumbnail?: string;
  /** Vídeo a pantalla completa como cabecera del proyecto (autoplay, sin sonido, en loop) */
  heroVideo?: string;
  images?: string[];
  /** Imágenes en carrusel continuo; al hacer clic se abren en grande */
  carousel?: string[];
  /** Páginas o spreads de un manual/documento del proyecto — mismo ritmo que `images` */
  manual?: string[];
  videos?: string[];
  services?: string[];
  /** Color de acento (hex) que sustituye al del sistema solo en la página de este proyecto */
  accent?: string;
  /** Paleta de marca del proyecto, si el proyecto es un trabajo de identidad */
  palette?: { hex: string; name?: string }[];
  /** Lista de razones / manifiesto de marca, si aplica */
  manifesto?: { title: string; body: string }[];
  /** Piezas o entregables nombrados del proyecto */
  pieces?: { name: string; category: string; description: string }[];
};

// Fuente única de datos de proyectos. Añade objetos nuevos a este array
// para que aparezcan automáticamente en la landing y en /projects/[slug].
export const projects: Project[] = [
  {
    slug: "moldolab",
    title: "moldoLab",
    order: 1,
    year: 2026,
    tags: ["Branding", "Dirección de arte"],
    client: "Trabajo Final de Grado",
    description:
      "moldoLab es una marca de joyas contemporánea que no nace para adornar, sino para expresar. Trabajo Final de Grado en el que desarrollo la identidad verbal y gráfica completa de la marca —logotipo, paleta, tipografía y aplicaciones— para una firma que apuesta por el plástico y el polímero frente al metal precioso, y por la forma y la actitud frente a la tendencia.",
    tagline: "No es para todo el mundo. Y nunca ha intentado serlo.",
    services: [
      "Identidad verbal",
      "Identidad gráfica",
      "Manual de marca",
      "IA aplicada al proceso creativo",
    ],
    cover: "/projects/moldolab/fondo-01.jpg",
    heroVideo: "/projects/moldolab/video-main.mp4",
    carousel: [
      "/projects/moldolab/image-04.jpg",
      "/projects/moldolab/image-02.jpg",
      "/projects/moldolab/image-01.jpg",
      "/projects/moldolab/image-05.jpg",
      "/projects/moldolab/image-03.jpg",
      "/projects/moldolab/image-06.jpg",
    ],
    manual: [
      "/projects/moldolab/manual-07.png",
      "/projects/moldolab/manual-01.png",
      "/projects/moldolab/manual-02.png",
      "/projects/moldolab/manual-03.png",
      "/projects/moldolab/manual-04.png",
      "/projects/moldolab/manual-05.png",
    ],
    accent: "#be223d",
    palette: [
      { hex: "#ede9ce", name: "Crema" },
      { hex: "#565f34", name: "Verde oscuro" },
      { hex: "#a7bf67", name: "Verde claro" },
      { hex: "#780313", name: "Granate" },
      { hex: "#be223d", name: "Rojo" },
    ],
    manifesto: [
      { title: "No sabes por qué te gusta", body: "Sabes que es tuyo." },
      {
        title: "No seguimos tendencias",
        body: "Las usamos, las mezclamos... o las ignoramos.",
      },
      {
        title: "Lo imperfecto tiene personalidad",
        body: "Y la personalidad siempre gana.",
      },
      { title: "No todo el mundo lo entiende", body: "Y no pasa nada." },
      {
        title: "No creemos en lo correcto",
        body: "Si una pieza es demasiado rara... probablemente vamos bien.",
      },
      {
        title: "El material no define el valor",
        body: "Lo que vale es lo que transmite.",
      },
    ],
    pieces: [
      {
        name: "Cala",
        category: "Anillo estrella",
        description:
          "Anillo de gran volumen y presencia escultórica; su forma blanda y envolvente rompe con la idea clásica del anillo como pieza discreta.",
      },
      {
        name: "Nara",
        category: "Collar",
        description:
          "Se construye desde la continuidad y la torsión, integrando una forma central envolvente que concentra toda la atención de la pieza.",
      },
      {
        name: "Ora",
        category: "Brazalete",
        description:
          "Forma amplia y envolvente, definida por un recorrido fluido que parece plegarse sobre sí mismo.",
      },
      {
        name: "Lua",
        category: "Anillo",
        description:
          "Trabaja desde la curva, el brillo y la sensación de fluidez: apariencia suave pero de gran impacto visual.",
      },
      {
        name: "Sira",
        category: "Pendientes",
        description:
          "Volumen compacto y carácter escultórico, donde los pliegues se entrelazan generando una forma cerrada y expresiva.",
      },
    ],
  },
  {
    slug: "unknown-studio",
    title: "Unknown Studio",
    order: 6,
    year: 2026,
    tags: ["Branding", "Dirección de arte"],
    client: "[Cliente — placeholder]",
    description:
      "[Descripción del proyecto — placeholder. Sustituir por el texto real cuando esté disponible.]",
    services: ["Identidad visual", "Dirección de arte"],
    cover: "/projects/unknown-studio/cover.jpg",
    images: [
      "/projects/unknown-studio/01.jpg",
      "/projects/unknown-studio/02.jpg",
    ],
  },
  {
    slug: "pulso-cero",
    title: "Pulso Cero",
    order: 5,
    year: 2025,
    tags: ["Editorial", "Fotografía"],
    description:
      "[Descripción del proyecto — placeholder. Sustituir por el texto real cuando esté disponible.]",
    cover: "/projects/pulso-cero/cover.jpg",
    images: ["/projects/pulso-cero/01.jpg"],
    videos: ["/projects/pulso-cero/reel.mp4"],
  },
  {
    slug: "el-alma-de-la-huerta",
    title: "El alma de la huerta",
    order: 4,
    tags: ["Fotografía"],
    description:
      "Serie fotográfica que combina joyería con frutas y verduras: piezas de oro creciendo, envolviendo o sosteniendo cada producto, como si formaran parte de la misma naturaleza.",
    titlePosition: "top-center",
    titleEffect: "typewriter",
    heroIsLight: true,
    cover: "/projects/el-alma-de-la-huerta/bodegon.jpg",
    thumbnail: "/projects/el-alma-de-la-huerta/foto-01.jpg",
    images: [
      "/projects/el-alma-de-la-huerta/foto-01.jpg",
      "/projects/el-alma-de-la-huerta/foto-02.jpg",
      "/projects/el-alma-de-la-huerta/foto-03.jpg",
      "/projects/el-alma-de-la-huerta/foto-04.jpg",
      "/projects/el-alma-de-la-huerta/foto-05.jpg",
    ],
  },
  {
    slug: "mermeladas-helios",
    title: "Mermeladas Helios",
    order: 3,
    year: 2024,
    tags: ["Ilustración", "Packaging", "Dirección de arte"],
    client: "Helios",
    description:
      "Una reinterpretación del universo Helios a través de la ilustración surrealista: frutas, ingredientes y figuras humanas se combinan para transformar cada sabor en un personaje y trasladar ese imaginario al packaging.",
    services: ["Ilustración", "Packaging", "Dirección de arte"],
    cover: "/projects/mermeladas-helios/mermelada-01.jpg",
  },
  {
    slug: "grandes-vinos",
    title: "Grandes Vinos",
    order: 2,
    year: 2025,
    tags: ["Editorial Design", "Art Direction", "Layout"],
    client: "Grandes Vinos",
    description:
      "Catálogo editorial que reúne la colección de Grandes Vinos bajo un mismo sistema visual: una retícula clara y consistente que da protagonismo tanto al producto como a la información a lo largo de toda la publicación.",
    services: ["Editorial Design", "Art Direction", "Layout"],
    cover: "/projects/grandes-vinos/vino-04.jpg",
    heroVideo: "/projects/grandes-vinos/catalogo.mp4",
  },
];
