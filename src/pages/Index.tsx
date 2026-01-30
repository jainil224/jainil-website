import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResumeSection } from "@/components/ResumeSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Meteors } from "@/components/magicui/meteors";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Meteors number={40} />
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
