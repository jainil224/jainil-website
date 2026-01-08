import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumeAnalyzerImage from "@/assets/resume-analyzer.png";
import excelDashboardImage from "@/assets/excel-dashboard.png";

const projects = [
  {
    title: "AI-Powered Resume Analyzer",
    description:
      "Developed an AI-powered resume analyzer to provide resume improvement insights. Implemented Supabase Edge Functions for AI-based analysis and assistant features. Integrated AI to extract skills and enhance resume quality.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    github: "https://github.com",
    live: "https://example.com",
    image: resumeAnalyzerImage,
  },
  {
    title: "Excel Data Analysis Project",
    description:
      "Built an interactive Excel dashboard using Pivot Tables and VBA macros. Delivered clear visual insights for data-driven decision-making.",
    tech: ["Excel", "VBA", "Pivot Tables"],
    github: "https://github.com",
    image: excelDashboardImage,
    download: "/excel-project.xlsm",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">My Work</p>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-subheading mx-auto mt-4">
            A selection of projects that showcase my skills and passion for
            building digital solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-card rounded-xl border border-border card-hover relative overflow-hidden"
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
              )}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-3">
                    {project.download && (
                      <a
                        href={project.download}
                        download
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Download size={20} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View More on GitHub
              <Github className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
