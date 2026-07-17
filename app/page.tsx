import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import PlaceholderSection from "./components/PlaceholderSection";

export default function Home() {
  return (
    <>
      <Sidebar />
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
