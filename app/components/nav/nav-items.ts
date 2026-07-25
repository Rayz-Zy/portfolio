// Source de vérité unique de la navigation. Les `id` doivent correspondre aux
// <section id="..."> de la home pour que le scroll-spy et les ancres marchent.
export type NavItem = { id: string; label: string };

export const NAV: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
