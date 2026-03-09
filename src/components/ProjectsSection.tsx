import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Folder, Download, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SharpBorderBeam } from "@/components/magicui/sharp-border-beam";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

import resumeAnalyzerImage from "@/assets/resume-analyzer-new.png";
import excelDashboardImage from "@/assets/excel-dashboard.png";
import chromaticImage from "@/assets/chromatic color.png";
import dataCleaningImage from "@/assets/data cleaining.png";
import chromaticVideo from "@/assets/chromatic color .mp4";
import uiHubVideo from "@/assets/UI HUB NEW.mp4";
import dataWaveVideo from "@/assets/data wave.mp4";

const projects = [
  {
    title: "UI Hub",
    description:
      "Developed a modern platform for discovering, generating, and exploring high-quality UI components, animations, and design prompts for developers and designers.",
    features: [
      "Large library of ready-to-use UI components",
      "AI-powered prompt system for generating modern UI designs",
      "Live preview with copy-paste code (HTML / CSS / React / Tailwind)",
      "Categorized components like buttons, cards, cursors, effects, and backgrounds",
      "Smooth animations and interactive UI using modern frontend technologies",
      "Clean, responsive, and developer-friendly interface",
    ],
    tech: ["React", "Node.js", "Tailwind CSS", "Framer Motion", "AI APIs"],
    github: "https://github.com/jainil224",
    live: "https://ui-hub-design.vercel.app/",
    video: uiHubVideo,
  },
  {
    title: "DataWeave AI",
    description:
      "Developed an AI-powered Excel data cleaning platform for automated dataset preprocessing.",
    features: [
      "Duplicate removal & missing value handling",
      "Formatting automation & AI-driven insights",
      "Simplified complex data-cleaning workflows",
      "Responsive UI for automated preprocessing",
    ],
    tech: ["React", "Node.js", "AI APIs", "Excel Processing"],
    github: "https://github.com/jainil224",
    live: "https://smartdataclean-ai.vercel.app/",
    video: dataWaveVideo,
  },
  {
    title: "Chromatic Color Palettes",
    description:
      "A comprehensive platform for discovering and creating beautiful color palettes. Features hand-picked collections, a powerful palette maker, and AI-driven extraction from images.",
    features: [
      "700+ Curated Palettes",
      "Interactive Palette Maker",
      "Image-to-Palette Extractor",
      "Midnight & Light Themes",
    ],
    tech: ["HTML", "JS", "React", "Tailwind CSS", "Vite", "Supabase"],
    github: "https://github.com/jainil224/Chromatic",
    live: "https://chromatic-colorpalette.vercel.app/",
    video: chromaticVideo,
  },
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
    live: "https://resume-analyzerai.vercel.app/",
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
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; title: string; type: "video" | "image" } | null>(null);

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
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <MagicCard
                className="flex flex-col w-full rounded-2xl border-none shadow-none bg-card/50 text-card-foreground p-0 overflow-hidden relative group"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="flex flex-col lg:flex-row w-full border-none bg-transparent">
                  {/* Project Image/Video - Left Side */}
                  {(project.image || project.video) && (
                    <div
                      className="relative w-full lg:w-1/2 overflow-hidden bg-black/20 flex items-center justify-center p-8 group-hover:bg-black/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedMedia({
                        src: (project.video || project.image) as string,
                        title: project.title,
                        type: project.video ? "video" : "image"
                      })}
                    >
                      <div className="relative z-10 w-full h-full max-h-[400px] flex items-center justify-center group/media">
                        {project.video ? (
                          <video
                            key={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-contain max-h-full rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                          >
                            <source src={project.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-contain max-h-full rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                          />
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/media:opacity-100 rounded-lg">
                          <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover/media:translate-y-0 transition-transform duration-300">
                            <ZoomIn size={18} />
                            <span className="font-semibold text-sm">Full View</span>
                          </div>
                        </div>
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
                </div>
                <SharpBorderBeam
                  key={`beam-${project.title}`}
                  duration={10}
                  size={300}
                  color="#ffffff"
                  borderWidth={1.5}
                />
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
          <div className="mt-12 flex justify-center">
            <div className="text-center p-0 overflow-hidden relative w-fit rounded-xl bg-background/50 border border-border/50">
              <div className="px-8 py-3 bg-background/20 backdrop-blur-md rounded-xl flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-foreground/80 text-base font-medium tracking-wide">
                  More projects coming soon...
                </span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <SharpBorderBeam
                duration={10}
                size={300}
                color="#ffffff"
                borderWidth={1.5}
              />
            </div>
          </div>
        </motion.div>
      </div>
      {/* Media Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 md:right-0 p-2 text-white hover:text-primary transition-colors bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              <div className="w-full bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedMedia.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
};
