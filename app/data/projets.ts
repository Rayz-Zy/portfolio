// Source de vérité unique des projets : alimente la section Projects de la home
// ET la page détail /projets/[slug]. Contenu placeholder repris des maquettes ;
// remplace par tes vrais projets (les images vont dans public/projets/).

export type ProjetMedia = {
  label: string; // "CAM_01 // FRAME_772"
  caption: string; // texte descriptif italique
  image: string; // chemin dans public/projets/ (fallback panneau HUD si absent)
  stats: { key: string; value: string }[]; // ex: { key: "LATENCY", value: "0.02ms" }
};

export type ProjetModule = { name: string; status: string }; // "THREE.JS" / "ACTIF"

export type Projet = {
  slug: string; // "the-core-engine"
  codename: string; // "PROJECT ALPHA"
  title: string; // "THE_CORE_ENGINE"
  tags: string[]; // ["HTML", "CSS"]
  summary: string; // description courte pour la liste de la home
  heroBackground: string; // image de fond du hero (fallback dégradé si absent)
  mission: { heading: string; body: string };
  media: ProjetMedia[];
  processing: { body: string; github?: string; demo?: string };
  stack: { primaryCore: ProjetModule[]; renderEngine: ProjetModule[] };
  specs: { timestamp: string; license: string; role: string; location: string };
};

export const PROJECTS: Projet[] = [
  {
    slug: "the-core-engine",
    codename: "PROJECT ALPHA",
    title: "THE_CORE_ENGINE",
    tags: ["HTML", "CSS"],
    summary:
      "A high-performance HTML rendering engine built for Three Fiber. Immersive and sharp digital site.",
    heroBackground: "/projets/the-core-engine/hero.png",
    mission: {
      heading:
        "High-performance HTML rendering engine built for modern web ecosystems.",
      body: "It leverages Three Fiber and cutting-edge WebGL implementations to deliver immersive, sharp digital experiences with sub-millisecond response times. Designed for developers who demand peak technical execution and visual precision.",
    },
    media: [
      {
        label: "CAM_01 // FRAME_772",
        caption:
          "Visualizing the core data stream interaction within the 3D viewport environment.",
        image: "/projets/the-core-engine/cam-01.png",
        stats: [
          { key: "LATENCY", value: "0.02ms" },
          { key: "FREQ", value: "60Hz" },
        ],
      },
      {
        label: "SYSTEM_ARCHITECTURE",
        caption:
          "Deep dive into the wireframe nodes that constitute the engine's logical layout.",
        image: "/projets/the-core-engine/architecture.png",
        stats: [{ key: "NODE_COUNT", value: "1,422_ACTIVE" }],
      },
    ],
    processing: {
      body: "Every visual component is processed as a unique data stream for maximum fidelity.",
      github: "https://github.com/",
      demo: "https://vercel.com/",
    },
    stack: {
      primaryCore: [
        { name: "HTML5", status: "READY" },
        { name: "CSS3", status: "READY" },
      ],
      renderEngine: [
        { name: "THREE.JS", status: "ACTIF" },
        { name: "REACT", status: "READY" },
      ],
    },
    specs: {
      timestamp: "OCT_2023",
      license: "OPEN_SOURCE",
      role: "ARCHITECT",
      location: "LOS_ANGELES",
    },
  },
];

export function getProjet(slug: string): Projet | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
