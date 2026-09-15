export const profile = {
  name: "Rafael Palacios López",
  role: "Graphic Designer / Diseñador gráfico",
  location: "Zaragoza, España",
  experience: [
    {
      role: "Diseñador Gráfico",
      place: "Agencia Creativa Omnia",
      location: "Zaragoza",
      period: "Marzo 2026 — Julio 2026",
    },
    {
      role: "Colaboración Proyecto Hexagonal",
      place: "Colaboración con Gema Rupérez",
      period: "2024",
    },
    {
      role: "Diseño del cartel de los Premios Simón",
      place: "Gala Premios Simón 2023",
      period: "2023",
    },
  ],
  education: [
    {
      title: "Grado en Diseño Gráfico",
      place: "Centro Superior de Diseño Hacer Creativo",
      period: "2022–2026",
    },
    {
      title: "Bachillerato de Artes Plásticas",
      place: "EASDI — Escuela de Arte de Corella",
      period: "2020–2022",
    },
  ],
  tools: [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Procreate",
  ],
  languages: ["Español", "Inglés"],
  contact: {
    instagram: "@rafa.grafico",
    email: "rafapalacioslopezz@gmail.com",
    behance: "behance.net/rafapalacio1",
  },
  studio: {
    instagram: "@palstudio.creative",
    email: "palstudio.creative@gmail.com",
  },
};

export type Category = {
  index: string;
  slug: string;
  name: string;
  short: string;
};

export const categories: Category[] = [
  {
    index: "01",
    slug: "branding",
    name: "Branding / Identidad visual",
    short: "Branding",
  },
  {
    index: "02",
    slug: "editorial",
    name: "Diseño editorial",
    short: "Editorial",
  },
  {
    index: "03",
    slug: "fotografia",
    name: "Fotografía",
    short: "Fotografía",
  },
  {
    index: "04",
    slug: "ia",
    name: "Inteligencia Artificial",
    short: "IA",
  },
];
