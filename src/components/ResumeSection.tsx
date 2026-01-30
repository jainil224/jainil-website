import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Download, FileText, Eye, EyeOff, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/components/ThemeProvider";

const experiences: Array<{
  type: string;
  title: string;
  organization: string;
  period: string;
  description: string;
}> = [];

export const ResumeSection = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPreview, setShowPreview] = useState(false);

  // Replace with your actual resume PDF URL
  const resumeUrl = "/Jainil_Resume.pdf";

  return (
    <section id="resume" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">My Journey</p>
          <h2 className="section-heading">Resume & Experience</h2>
          <p className="section-subheading mx-auto mt-4">
            A timeline of my professional experience and educational background.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Download & Preview Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
              asChild
            >
              <a href={resumeUrl} download="Jainil_Patel_Resume.pdf">
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="border-border hover:bg-secondary"
            >
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 w-4 h-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 w-4 h-4" />
                  Preview Resume
                </>
              )}
            </Button>
          </motion.div>

          {/* PDF Preview */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <MagicCard
                gradientColor={theme === "dark" ? "#262626" : "rgba(255,255,255,0.0)"}
                className="rounded-xl border-border overflow-hidden flex-col"
              >
                <div className="p-4 border-b border-border flex items-center gap-2 relative z-10">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">Resume Preview</span>
                </div>
                <div className="relative w-full" style={{ height: "800px" }}>
                  <object
                    data={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                    type="application/pdf"
                    className="w-full h-full"
                    title="Resume Preview"
                  >
                    <div className="flex flex-col items-center justify-center h-full bg-secondary/50 p-8 text-center">
                      <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        PDF preview not available in your browser.
                      </p>
                      <Button asChild>
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                          Open PDF in New Tab
                        </a>
                      </Button>
                    </div>
                  </object>
                </div>
              </MagicCard>
            </motion.div>
          )}

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-6 md:mt-8 ring-4 ring-background" />

                {/* Content */}
                <div className={`flex-1 ml-10 md:ml-0 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  <MagicCard
                    gradientColor={theme === "dark" ? "#262626" : "rgba(255,255,255,0.0)"}
                    className={`p-6 rounded-xl border-border card-hover flex-col ${index % 2 === 0 ? "md:mr-8 items-end" : "md:ml-8 items-start"
                      }`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.type === "work" ? (
                        <Briefcase className="w-4 h-4 text-primary" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-xs text-primary font-medium uppercase">
                        {exp.type === "work" ? "Experience" : "Education"}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">{exp.organization}</p>
                    <div className={`flex items-center gap-1 text-sm text-muted-foreground mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                    <p className="text-muted-foreground text-sm">{exp.description}</p>
                  </MagicCard>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
