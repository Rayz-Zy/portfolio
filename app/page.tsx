import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import PlaceholderSection from "./components/PlaceholderSection";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main>
        <Hero />
        <PlaceholderSection id="about" title="About" />
        <PlaceholderSection id="projects" title="Projects" />
        <PlaceholderSection id="skills" title="Skills" />
        <PlaceholderSection id="contact" title="Contact" />
      </main>
    </>
  );
}
