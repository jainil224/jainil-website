import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { SharpBorderBeam } from "@/components/magicui/sharp-border-beam";
import { useTheme } from "@/components/ThemeProvider";

export const ArticlePreviewSection = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="insights" className="py-24 relative" ref={ref}>
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">Developer Insights</p>
          <h2 className="section-heading">Creative UI/UX Engineering</h2>
          <p className="section-subheading mx-auto mt-4 max-w-2xl">
            Deep dives into modern frontend mechanics, motion-based UX paradigms, and high-performance React and Tailwind CSS engineering.
          </p>
        </motion.div>

        {/* Featured Article Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <MagicCard
            className="w-full rounded-2xl border border-border/40 overflow-hidden relative group bg-card/45 backdrop-blur-md"
            gradientColor={theme === "dark" ? "#262626" : "#E2E8F0"}
          >
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10">
              
              {/* Left Column: Visual Orbit animation */}
              <div className="w-full md:w-1/3 flex justify-center relative">
                <div className="relative w-44 h-44 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 animate-pulse">
                  <Orbit className="w-16 h-16 text-primary animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-0 rounded-full border border-dashed border-muted-foreground/30 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-4 h-4 rounded-full bg-accent top-4 left-4 animate-bounce" />
                  <div className="absolute w-3 h-3 rounded-full bg-primary bottom-6 right-6 animate-[bounce_1.5s_infinite_0.5s]" />
                </div>
              </div>

              {/* Right Column: Copywriting & CTA */}
              <div className="w-full md:w-2/3 flex flex-col text-left">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    Featured Deep Dive
                  </span>
                  <span className="text-xs text-muted-foreground/75 font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> 8 min read
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight">
                  The Google Antigravity Effect in Modern UI and Creative Frontend Design
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  How are modern web developers breaking the constraints of standard grids to build interactive, physics-driven user experiences? Explore the intersection of React, Tailwind CSS, motion UI, and immersive JavaScript animation effects that wow visitors and boost user engagement.
                </p>

                <div className="mt-auto">
                  <Button
                    className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 group/btn transition-all duration-300"
                    asChild
                  >
                    <Link to="/article">
                      Read Full Article
                      <ArrowRight className="ml-2 w-4.5 h-4.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Glowing Border Beams */}
            <SharpBorderBeam
              duration={12}
              size={400}
              color="#ffffff"
              borderWidth={1.5}
            />
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
};
