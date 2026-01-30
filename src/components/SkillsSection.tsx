import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Database,
  Layout,
  Globe,
  Wrench,
  TableProperties,
  Palette,
  Smartphone,
  Tablet,
  Laptop,
} from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiSpring,
  SiSpringboot,
  SiMongodb,
  SiHibernate,
  SiGit,
  SiGithub,
  SiAmazonwebservices,
  SiLeetcode,
  SiGoogle,
} from "react-icons/si";
import { TbSql, TbChartHistogram, TbApi } from "react-icons/tb";
import { FaJava, FaC } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/components/ThemeProvider";

type SkillIcon = IconType | LucideIcon;

const skillIcons: Record<string, SkillIcon> = {
  // Programming Languages
  "Java": FaJava,
  "Python": SiPython,
  "C/C++": FaC,
  // Web Technologies
  "HTML": SiHtml5,
  "CSS": SiCss3,
  "JavaScript": SiJavascript,
  "Node.js": SiNodedotjs,
  "React": SiReact,
  // Frameworks & Tools
  "Django": SiDjango,
  "Flask": SiFlask,
  "FastAPI": SiFastapi,
  "Spring": SiSpring,
  "Spring Boot": SiSpringboot,
  // APIs & Databases
  "REST APIs": TbApi,
  "SQL": TbSql,
  "MongoDB": SiMongodb,
  "Hibernate": SiHibernate,
  "Gemini APIs": SiGoogle,
  // Other Skills
  "Excel": TableProperties,
  "Power BI": TbChartHistogram,
  "DSA": Database,
  "LeetCode": SiLeetcode,
  "AWS": SiAmazonwebservices,
  "Git": SiGit,
  "GitHub": SiGithub,
  "UI/UX": Palette,
};

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Java", "Python", "C/C++"],
  },
  {
    title: "Web Technologies",
    icon: Layout,
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "React"],
  },
  {
    title: "Frameworks & Tools",
    icon: Wrench,
    skills: ["Django", "Flask", "FastAPI", "Spring", "Spring Boot"],
  },
  {
    title: "APIs & Databases",
    icon: Database,
    skills: ["REST APIs", "SQL", "MongoDB", "Hibernate", "Gemini APIs"],
  },
  {
    title: "Other Skills",
    icon: Globe,
    skills: ["Excel", "Power BI", "DSA", "LeetCode", "AWS", "Git", "GitHub", "UI/UX"],
  },
];

export const SkillsSection = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-secondary/30 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">What I Know</p>
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-subheading mx-auto mt-4">
            A collection of technologies and tools I've worked with throughout
            my learning journey.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="h-full"
            >
              <MagicCard
                gradientColor={theme === "dark" ? "#262626" : "rgba(255,255,255,0.0)"}
                className="p-6 rounded-xl border-border card-hover group flex-col cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = skillIcons[skill];
                    return (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-secondary text-muted-foreground rounded-full hover:text-primary hover:bg-primary/10 transition-colors cursor-default flex items-center gap-1.5"
                      >
                        {SkillIcon && <SkillIcon className="w-3.5 h-3.5" />}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
