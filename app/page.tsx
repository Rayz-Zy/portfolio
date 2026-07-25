import NavMenu from "./components/nav/NavMenu";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import PlaceholderSection from "./components/PlaceholderSection";

export default function Home() {
  return (
    <>
      <NavMenu />
      <main>
        <Hero />
        <PlaceholderSection id="about" title="About" />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
