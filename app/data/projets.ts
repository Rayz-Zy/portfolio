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
    title: "Application SaaS BTP",
    tags: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind"],
    summary:
      "Plateforme SaaS de gestion d'apports d'affaires & conformité fiscale",
    heroBackground: "/projets/application-saas-btp/accueil.png",
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
        title: "La Landing Page",
        caption:
          "L'entrée du produit, qui présente l'application aux entreprises du bâtiment avant la création de compte.",
        image: "/projets/application-saas-btp/accueil.png",
      },
      {
        title: "L'inscription en six étapes",
        caption:
          "Vérification du SIRET, coordonnées bancaires puis contrôle d'identité : la conformité est réglée avant la première commission.",
        image: "/projets/application-saas-btp/inscription.png",
      },
      {
        title: "Le Tableau de bord",
        caption:
          "L'apporteur retrouve ses commissions du mois, ses opportunités en attente et ses affaires en cours sur un seul écran.",
        image: "/projets/application-saas-btp/dashboard.png",
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

  /////////////////// PROJET 2 ////////////////////////////

  {
    slug: "sushi-app",
    title: "Sushi App",
    tags: ["Angular", "PostgreSQL"],
    summary:
      "Une application de commande de sushi",
    heroBackground: "/projets/sushi-app/accueil.png",
    about:
      "Ce projet de groupe consistait à développer une application de commande de sushi en utilisant le framework Angular. Il fallait concevoir une base de données solide ainsi que la relier au framework via une API.",
    work: {
      body: "J'ai participé à la conception du modèle de données et au développement de l'application, de l'interface jusqu'au back-end de l'API.",
      points: [
        "Conception du modèle de données relationnel.",
        "Développement de l'interface utilisateur avec Angular.",
        "Intégration de l'API backend pour la gestion des commandes.",
      ],
    },
    
    visuals: [
      {
        title: "La page d'accueil",
        caption:
          "La page d'accueil de l'application avec l'adresse de livraison à entrer et les produits les plus populaires.",
        image: "/projets/sushi-app/accueil.png",
      },
      {
        title: "Le Panier",
        caption:
          "Le panier de commandes de l'application, où les utilisateurs peuvent ajouter et gérer leurs produits.",
        image: "/projets/sushi-app/panier.png",
      },
      {
        title: "Le Tableau de bord",
        caption:
          "L'apporteur retrouve ses commissions du mois, ses opportunités en attente et ses affaires en cours sur un seul écran.",
        image: "/projets/sushi-app/panier.png",
      },
    ],
    stack: ["Angular", "PostgreSQL", "TypeScript", "CSS"],
    info: {
      year: "2026",
      context: "Projet de groupe",
      role: "Conception et développement",
    },
    links: {
      github: "https://github.com/",
      demo: "https://vercel.com/",
    },
  },

  /////////////////// PROJET 3 ////////////////////////////

  {
    slug: "reservation-materiel",
    title: "Réservation de Matériel",
    tags: ["Angular", "JavaScript", "Bootstrap"],
    summary:
      "Une application de réservation de matériel",
    heroBackground: "/projets/reservation-materiel/accueil.png",
    about:
      "Le but de ce projet était de réaliser un site web pour l'IUT qui permet de réserver du matériel et des salles pour optimiser la gestion des réservations et la mise à disposition des ressources. Le site devait être responsive et accessible, permettant aux utilisateurs de consulter les disponibilités et de faire des demandes de réservation.",
    work: {
      body: "J'ai participé à la conception du modèle de données et au développement de l'application, de l'interface jusqu'au back-end.",
      points: [
        "Conception du modèle de données relationnel.",
        "Développement de l'interface utilisateur avec Angular.",
        "Intégration de l'API backend pour la gestion des réservations.",
      ],
    },
    
    visuals: [
      {
        title: "La page d'accueil",
        caption:
          "La page d'accueil de l'application en tant qu'administrateur pour gérer les réservations et utilisateurs.",
        image: "/projets/reservation-materiel/accueil.png",
      },
      {
        title: "Le Catalogue",
        caption:
          "Le catalogue de matériel de l'application, où les utilisateurs peuvent consulter le matériel disponible.",
        image: "/projets/reservation-materiel/catalogue.png",
      },
      {
        title: "La Page de Réservation",
        caption:
          "La page de réservation de l'application, où les utilisateurs peuvent consulter les disponibilités et faire des demandes de réservation de salle ou de matériel.",
        image: "/projets/reservation-materiel/reservation.png",
      },
    ],
    stack: ["Angular", "JavaScript", "Bootstrap"],
    info: {
      year: "2025",
      context: "Projet de groupe",
      role: "Conception et développement",
    },
    links: {
      github: "https://github.com/",
      demo: "https://vercel.com/",
    },
  },

  ///////////////// PROJET 4 ////////////////////////////

  {
    slug: "web-doc",
    title: "Documentaire Web",
    tags: ["HTML", "CSS", "JavaScript", "Premiere Pro"],
    summary:
      "Réalisation d'un documentaire web sur le métier de Game Master chez EVA",
    heroBackground: "/projets/web-doc/accueil.png",
    about:
      "Ce projet consistait à réaliser un documentaire web sur un métier de notre choix, à réaliser une interview vidéo et à écrire des articles. Nous avons choisi de nous pencher sur le métier de Game Master chez EVA.",
    work: {
      body: "J'ai participé à la réalisation de l'interview en tant que chef de tournage, à l'écriture des articles et à la conception du site.",
      points: [
        "Coordination de la réalisation du documentaire.",
        "Rédaction d'articles pour le webdocumentaire.",
        "Réalisation du site web.",
      ],
    },
    
    visuals: [
      {
        title: "La page d'accueil",
        caption:
          "La page d'accueil du webdocumentaire.",
        image: "/projets/web-doc/accueil.png",
      },
      {
        title: "Articles",
        caption:
          "Article sur l'évolution du laser game en VR.",
        image: "/projets/web-doc/article_doc.png",
      },
      {
        title: "Interview Vidéo",
        caption:
          "La page de l'interview vidéo du webdocumentaire.",
        image: "/projets/web-doc/video.png",
      },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Premiere Pro"],
    info: {
      year: "2025",
      context: "Projet de groupe",
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
