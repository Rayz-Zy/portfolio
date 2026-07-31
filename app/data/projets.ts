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
    slug: "application-saas-btp",
    title: "Application Saas BTP",
    tags: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind"],
    summary:
      "Plateforme SaaS de gestion d'apports d'affaires & conformité fiscale",
    heroBackground: "/projets/portfolio/hero.png",
    about:
      "Dans le cadre de mon stage chez Stack48, j'ai développé une application SaaS sur mesure pour une entreprise du secteur du BTP. L'objectif était de répondre à une problématique juridique et fiscale majeure : la gestion et la déclaration des commissions d'apporteurs d'affaires. Sans traçabilité ni facturation officielle, ces flux financiers exposent les entreprises et leurs partenaires à de lourds risques de redressement ou de soupçons de blanchiment d'argent.",
    work: {
      body: "Avec mes collègues, j'ai conçu et développé l'application, en mettant l'accent sur l'expérience utilisateur pour une interface simple et intuitive.",
      points: [
        "Conception du design et de l'expérience utilisateur.",
        "Modélisation & Architecture : Conception de la structure de données relationnelle et des schémas pour gérer les rôles, les transactions et le suivi des recommandations.",
        "Développement du backend avec gestion des utilisateurs, des rôles et des transactions.",
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
    stack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind"],
    info: {
      year: "2026",
      context: "Projet de Stage",
      role: "Conception et développement",
    },
    links: {
      github: "https://github.com/",
      demo: "https://vercel.com/",
    },
  },
  // Contenu d'exemple, à remplacer par un vrai projet.
  {
    slug: "reservation",
    title: "Réservation",
    tags: ["React", "PostgreSQL"],
    summary:
      "Une application de réservation de salles pour une association, pensée pour être utilisable depuis un téléphone en quelques secondes.",
    heroBackground: "/projets/reservation/hero.png",
    about:
      "L'association gérait ses créneaux dans un tableur partagé, ce qui provoquait régulièrement des doubles réservations. J'ai repris le besoin depuis le début : qui réserve, quand, et comment on empêche deux personnes de prendre le même créneau.",
    work: {
      body: "J'ai conçu le modèle de données puis développé l'application, de l'interface jusqu'aux règles métier côté serveur.",
      points: [
        "Un schéma de base de données qui rend le double créneau impossible, plutôt que de le rattraper dans l'interface.",
        "Un calendrier hebdomadaire lisible sur mobile, où réserver tient en deux gestes.",
        "Un espace d'administration pour ouvrir, fermer ou bloquer des créneaux.",
      ],
    },
    visuals: [
      {
        title: "Le calendrier",
        caption:
          "La semaine tient sur un écran de téléphone, les créneaux pris sont grisés d'emblée.",
        image: "/projets/reservation/calendrier.png",
      },
      {
        title: "L'administration",
        caption:
          "Le responsable ouvre ou ferme des créneaux sans passer par le développeur.",
        image: "/projets/reservation/admin.png",
      },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma"],
    info: {
      year: "2025",
      context: "Projet universitaire",
      role: "Conception et développement",
    },
    links: {
      github: "https://github.com/",
    },
  },
];

export function getProjet(slug: string): Projet | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
