import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SharpBorderBeam } from "@/components/magicui/sharp-border-beam";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

import resumeAnalyzerImage from "@/assets/resume-analyzer-new.png";
import excelDashboardImage from "@/assets/excel-dashboard.png";

const projects = [
  {
    title: "Resume Analyzer",
    description:
      "An AI-powered web application that analyzes resumes and provides instant feedback. Helps users optimize for ATS systems, match skills with job requirements, and receive smart, personalized improvement suggestions.",
    features: [
      "Real-time resume analysis",
      "ATS compatibility check",
      "AI-driven improvement suggestions",
      "Job matching score",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Grok AI"],
    github: "https://github.com/jainil224/resume-analyzer",
    live: "https://resume-analyzer22.vercel.app/",
    image: resumeAnalyzerImage,
  },
  {
    title: "Excel Data Analysis Project",
    description:
      "Built an interactive Excel dashboard using Pivot Tables and VBA macros. Delivered clear visual insights for data-driven decision-making.",
    features: [
      "Interactive Dashboard",
      "Automated VBA Macros",
      "Complex Pivot Tables",
      "Data Visualization",
    ],
    tech: ["Excel", "VBA", "Pivot Tables"],
    github: "https://github.com",
    image: excelDashboardImage,
    download: "/excel-project.xlsm",
  },
];

export const ProjectsSection = () => {
  const { theme } = useTheme();
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

        {/* Projects List - Horizontal Design */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="w-full"
            >
              <MagicCard
                className="flex flex-col w-full rounded-2xl border-none shadow-none bg-card/50 text-card-foreground p-0 overflow-hidden relative group"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="flex flex-col lg:flex-row w-full border-none bg-transparent">
                  {/* Project Image - Left Side */}
                  {project.image && (
                    <div className="relative w-full lg:w-1/2 overflow-hidden bg-black/20 flex items-center justify-center p-8 group-hover:bg-black/30 transition-colors">
                      <div className="relative z-10 w-full h-full max-h-[400px] flex items-center justify-center">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto object-contain max-h-full rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content - Right Side */}
                  <div className="relative z-10 w-full lg:w-1/2 p-8 flex flex-col justify-center bg-card/30 backdrop-blur-sm">

                    {/* Title & Desc */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-primary tracking-wider uppercase mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-muted-foreground/50 tracking-wider uppercase mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium px-3 py-1.5 bg-secondary/50 text-primary border border-primary/20 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-auto">
                      {project.live && (
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
                          asChild
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={18} className="mr-2" />
                            View Live
                          </a>
                        </Button>
                      )}
                      {project.download && (
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
                          asChild
                        >
                          <a
                            href={project.download}
                            download
                          >
                            <Download size={18} className="mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button
                          variant="outline"
                          className="border-primary/20 hover:bg-primary/10 text-foreground font-semibold px-6"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={18} className="mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>

                  </div>

                  {/* Sharp Border Beam - specific for projects section */}
                  <SharpBorderBeam
                    duration={10}
                    size={300}
                    color="#ffffff"
                    borderWidth={1.5}
                  />
                </div>
              </MagicCard>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <ShineBorder
              className="text-center p-0 overflow-hidden relative w-fit rounded-xl bg-background/50 border border-border/50"
              color={theme === "dark" ? ["#FFFFFF", "#A3A3A3"] : ["#000000", "#525252"]}
            >
              <div className="px-8 py-3 bg-background/20 backdrop-blur-md rounded-xl flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-foreground/80 text-base font-medium tracking-wide">
                  More projects coming soon...
                </span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
            </ShineBorder>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
