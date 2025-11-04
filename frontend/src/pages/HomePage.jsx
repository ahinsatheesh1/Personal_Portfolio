import Hero from "../components/Hero";
import SkillsSection from "../components/SkillsSection";
import Experience from "../components/Experience";
import ContactSection from "../components/ContactSection";
import ViewProjectsCTA from "../components/ViewProjectsCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <SkillsSection />
      <ViewProjectsCTA />
      <ContactSection />
    </>
  );
}
