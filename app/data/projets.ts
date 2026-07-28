// Source de vérité unique des projets : alimente la section Projets de la home
// ET la page détail /projets/[slug]. Contenu à remplacer par tes vrais projets
// (les images vont dans public/projets/<slug>/).

export type ProjetVisuel = {
  title: string; // intitulé court, affiché en mono cyan
  caption: string; // une phrase de légende
  image: string; // chemin dans public/projets/ ; panneau navy si absent
};

export type Projet = {
  // --- champs consommés aussi par la liste de la home ---
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  heroBackground?: string;
  // --- champs propres à la page détail ---
  about: string; // section « Le projet »
  work: { body: string; points: string[] }; // section « Ce que j'ai fait »
  visuals: ProjetVisuel[];
  stack: string[];
  info: { year: string; context: string; role: string };
  links: { github?: string; demo?: string };
};

export const PROJECTS: Projet[] = [
  {
    slug: "portfolio",
    title: "Portfolio",
    tags: ["Next.js", "Tailwind"],
    summary:
      "Un site personnel pensé comme un menu de jeu vidéo, pour présenter mes projets sans passer par un modèle tout fait.",
    heroBackground: "/projets/portfolio/hero.png",
    about:
      "Ce portfolio me sert à la fois de vitrine et de terrain d'expérimentation. Je voulais un site qui me ressemble plutôt qu'un thème repris tel quel : une mise en page asymétrique, de grands titres inclinés, et une navigation qui emprunte aux menus de jeux vidéo.",
    work: {
      body: "J'ai dessiné la maquette puis développé l'ensemble du site, de la structure des composants jusqu'au déploiement.",
      points: [
        "Une mise en page asymétrique : le contenu reste ancré à gauche, le vide à droite.",
        "Des composants réutilisés d'une section à l'autre pour garder un rendu homogène.",
        "Des apparitions discrètes au défilement, coupées si le visiteur réduit les animations.",
      ],
    },
    visuals: [
      {
        title: "La page d'accueil",
        caption:
          "Le titre déborde du cadre et la barre latérale reste visible pendant tout le défilement.",
        image: "/projets/portfolio/accueil.png",
      },
      {
        title: "La liste des projets",
        caption:
          "Chaque ligne révèle un aperçu du projet au survol, qui glisse depuis la droite.",
        image: "/projets/portfolio/projets.png",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    info: {
      year: "2026",
      context: "Projet personnel",
      role: "Conception et développement",
    },
    links: {
      github: "https://github.com/",
      demo: "https://vercel.com/",
    },
  },
];

export function getProjet(slug: string): Projet | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
