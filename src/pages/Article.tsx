import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Share2, Sparkles, AlertCircle, ArrowUpRight, Play, RotateCcw } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { SharpBorderBeam } from "@/components/magicui/sharp-border-beam";

// Physics Sandbox Item structure
interface PhysicsItem {
  id: number;
  label: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isDragging: boolean;
}

// ----------------------------------------------------
// Component: Antigravity Physics Sandbox
// ----------------------------------------------------
const AntigravitySandbox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [items, setItems] = useState<PhysicsItem[]>([
    { id: 1, label: "React Node", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", x: 40, y: 150, vx: 0.8, vy: -0.6, width: 120, height: 45, isDragging: false },
    { id: 2, label: "Tailwind CSS", color: "bg-sky-500/20 text-sky-400 border-sky-500/30", x: 180, y: 150, vx: -0.7, vy: 0.9, width: 130, height: 45, isDragging: false },
    { id: 3, label: "Framer Motion", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", x: 330, y: 150, vx: 0.5, vy: -0.8, width: 140, height: 45, isDragging: false },
    { id: 4, label: "JavaScript DOM", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", x: 490, y: 150, vx: -0.6, vy: 0.5, width: 150, height: 45, isDragging: false },
    { id: 5, label: "Motion UI", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", x: 100, y: 220, vx: 0.9, vy: 0.7, width: 110, height: 45, isDragging: false },
    { id: 6, label: "Physics Box", color: "bg-green-500/20 text-green-400 border-green-500/30", x: 230, y: 220, vx: -0.5, vy: -0.5, width: 120, height: 45, isDragging: false },
    { id: 7, label: "Google Antigravity", color: "bg-primary/20 text-primary border-primary/30", x: 380, y: 220, vx: 0.8, vy: -0.4, width: 170, height: 45, isDragging: false },
    { id: 8, label: "Jainil Patel Portfolio", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", x: 570, y: 220, vx: -0.4, vy: 0.8, width: 180, height: 45, isDragging: false },
  ]);

  const activeRef = useRef(isActive);
  const itemsRef = useRef(items);
  const animationFrameId = useRef<number | null>(null);

  // Drag states
  const dragItemIdx = useRef<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0, time: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Main Physics loop
  useEffect(() => {
    const updatePhysics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const updated = itemsRef.current.map((item, idx) => {
        if (item.isDragging) return item;

        if (activeRef.current) {
          // Physics simulation (Antigravity Mode active)
          let nextX = item.x + item.vx;
          let nextY = item.y + item.vy;

          let nextVx = item.vx;
          let nextVy = item.vy;

          const bounce = 0.75;
          const airResistance = 0.99;

          // Float effect (anti-gravity upwards drift)
          nextVy -= 0.02; // Slight upward pull

          // Boundaries collisions
          if (nextX < 5) {
            nextX = 5;
            nextVx = Math.abs(nextVx) * bounce;
          } else if (nextX > containerWidth - item.width - 5) {
            nextX = containerWidth - item.width - 5;
            nextVx = -Math.abs(nextVx) * bounce;
          }

          if (nextY < 5) {
            nextY = 5;
            nextVy = Math.abs(nextVy) * bounce;
          } else if (nextY > containerHeight - item.height - 5) {
            nextY = containerHeight - item.height - 5;
            nextVy = -Math.abs(nextVy) * bounce;
          }

          // Friction
          nextVx *= airResistance;
          nextVy *= airResistance;

          // Minimum movement speed when floating
          if (Math.abs(nextVx) < 0.05) nextVx = (Math.random() - 0.5) * 0.5;
          if (Math.abs(nextVy) < 0.05) nextVy = (Math.random() - 0.5) * 0.5;

          return {
            ...item,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        } else {
          // Standard grid returning animation (interpolated to initial grid slots)
          const gridSlots = [
            { x: 30, y: 120 },
            { x: 170, y: 120 },
            { x: 320, y: 120 },
            { x: 480, y: 120 },
            { x: 70, y: 200 },
            { x: 200, y: 200 },
            { x: 340, y: 200 },
            { x: 530, y: 200 },
          ];

          const slot = gridSlots[idx] || { x: 100, y: 100 };
          const dx = slot.x - item.x;
          const dy = slot.y - item.y;

          // Slow smooth return
          return {
            ...item,
            x: item.x + dx * 0.1,
            y: item.y + dy * 0.1,
            vx: 0,
            vy: 0,
          };
        }
      });

      setItems(updated);
      animationFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (!isActive || !containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const item = items[index];
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    dragItemIdx.current = index;
    dragOffset.current = {
      x: clientX - item.x,
      y: clientY - item.y,
    };

    prevMousePos.current = { x: clientX, y: clientY, time: Date.now() };
    mouseVelocity.current = { x: 0, y: 0 };

    const updated = [...items];
    updated[index] = { ...item, isDragging: true };
    setItems(updated);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragItemIdx.current === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const idx = dragItemIdx.current;
    const item = items[idx];

    const nextX = Math.max(0, Math.min(rect.width - item.width, clientX - dragOffset.current.x));
    const nextY = Math.max(0, Math.min(rect.height - item.height, clientY - dragOffset.current.y));

    // Calculate drag velocity
    const now = Date.now();
    const dt = now - prevMousePos.current.time;
    if (dt > 0) {
      mouseVelocity.current = {
        x: (clientX - prevMousePos.current.x) / dt * 16, // scale to frame
        y: (clientY - prevMousePos.current.y) / dt * 16,
      };
    }

    prevMousePos.current = { x: clientX, y: clientY, time: now };

    const updated = [...items];
    updated[idx] = {
      ...item,
      x: nextX,
      y: nextY,
    };
    setItems(updated);
  };

  const handleMouseUp = () => {
    if (dragItemIdx.current === null) return;
    const idx = dragItemIdx.current;
    dragItemIdx.current = null;

    const updated = [...items];
    updated[idx] = {
      ...updated[idx],
      isDragging: false,
      vx: Math.max(-10, Math.min(10, mouseVelocity.current.x)),
      vy: Math.max(-10, Math.min(10, mouseVelocity.current.y)),
    };
    setItems(updated);
  };

  const handleReset = () => {
    setIsActive(false);
    setItems([
      { id: 1, label: "React Node", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", x: 40, y: 150, vx: 0.8, vy: -0.6, width: 120, height: 45, isDragging: false },
      { id: 2, label: "Tailwind CSS", color: "bg-sky-500/20 text-sky-400 border-sky-500/30", x: 180, y: 150, vx: -0.7, vy: 0.9, width: 130, height: 45, isDragging: false },
      { id: 3, label: "Framer Motion", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", x: 330, y: 150, vx: 0.5, vy: -0.8, width: 140, height: 45, isDragging: false },
      { id: 4, label: "JavaScript DOM", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", x: 490, y: 150, vx: -0.6, vy: 0.5, width: 150, height: 45, isDragging: false },
      { id: 5, label: "Motion UI", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", x: 100, y: 220, vx: 0.9, vy: 0.7, width: 110, height: 45, isDragging: false },
      { id: 6, label: "Physics Box", color: "bg-green-500/20 text-green-400 border-green-500/30", x: 230, y: 220, vx: -0.5, vy: -0.5, width: 120, height: 45, isDragging: false },
      { id: 7, label: "Google Antigravity", color: "bg-primary/20 text-primary border-primary/30", x: 380, y: 220, vx: 0.8, vy: -0.4, width: 170, height: 45, isDragging: false },
      { id: 8, label: "Jainil Patel Portfolio", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", x: 570, y: 220, vx: -0.4, vy: 0.8, width: 180, height: 45, isDragging: false },
    ]);
  };

  return (
    <div className="my-10 border border-border/40 rounded-2xl overflow-hidden bg-card/20 backdrop-blur-md relative select-none">
      <div className="px-6 py-4 border-b border-border/40 bg-card/45 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            Interactive Physics Playground
          </h4>
          <p className="text-xs text-muted-foreground">
            Test the Google Antigravity simulation. Click elements, drag them around, and throw them!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setIsActive(!isActive)}
            className={`font-semibold transition-all ${isActive ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : "bg-primary hover:bg-primary/90 text-primary-foreground"}`}
          >
            <Play className="w-3.5 h-3.5 mr-1.5" />
            {isActive ? "Disable Antigravity" : "Enable Antigravity"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="border-border hover:bg-secondary font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-[320px] bg-neutral-950/40 relative overflow-hidden flex items-center justify-center border-t border-b border-border/10 cursor-grab active:cursor-grabbing"
      >
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
        <div className="absolute top-6 left-6 text-2xs text-muted-foreground/35 font-mono select-none pointer-events-none uppercase tracking-widest">
          PHYSICS_SANDBOX // STATUS: {isActive ? "ANTIGRAVITY_MODE" : "STANDARD_LAYOUT"}
        </div>

        {items.map((item, idx) => (
          <div
            key={item.id}
            onMouseDown={(e) => handleMouseDown(e, idx)}
            style={{
              position: "absolute",
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.width}px`,
              height: `${item.height}px`,
              transition: item.isDragging ? "none" : isActive ? "none" : "left 0.4s ease-out, top 0.4s ease-out",
            }}
            className={`flex items-center justify-center rounded-lg border text-sm font-semibold tracking-wide shadow-lg select-none cursor-pointer ${item.color} ${item.isDragging ? "ring-2 ring-primary border-primary" : ""}`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="px-6 py-3 bg-secondary/20 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground leading-normal">
          {isActive 
            ? "Antigravity active! Left-drag cards to throw them. Observe drift dynamics simulating the Google Antigravity effect."
            : "Grid alignment forced. Turn on Antigravity Mode above to float elements and break traditional 2D web layouts."
          }
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Main Component: Article Page
// ----------------------------------------------------
const Article = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sectionsRef = {
    sec1: useRef<HTMLElement>(null),
    sec2: useRef<HTMLElement>(null),
    sec3: useRef<HTMLElement>(null),
    sec4: useRef<HTMLElement>(null),
    sec5: useRef<HTMLElement>(null),
    sec6: useRef<HTMLElement>(null),
    sec7: useRef<HTMLElement>(null),
    sec8: useRef<HTMLElement>(null),
    sec9: useRef<HTMLElement>(null),
    sec10: useRef<HTMLElement>(null),
    sec11: useRef<HTMLElement>(null),
  };

  const [activeSub, setActiveSub] = useState("sec1");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const [key, ref] of Object.entries(sectionsRef)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSub(key);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20">
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Main Content Area */}
      <div className="pt-32 pb-24 container mx-auto px-6 relative z-10">
        
        {/* Floating Back to Home button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Developer Showcase
          </Link>
        </div>

        {/* Title Block */}
        <div className="max-w-4xl mx-auto text-left mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Creative Engineering Analysis
            </span>
            <span className="text-xs text-muted-foreground/75 font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> 8 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            The Google Antigravity Effect in Modern UI and Creative Frontend Design
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
            How physics-based simulation, interactive web animation, and developer creativity are disrupting static UI matrices. An architectural guide to building immersive digital experiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary border border-border/50 overflow-hidden flex items-center justify-center">
                <span className="text-foreground text-sm font-bold">JP</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Jainil Patel</p>
                <p className="text-2xs text-muted-foreground font-mono">FRONTEND DEVELOPER & UI DESIGNER</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="border-border hover:bg-secondary flex items-center gap-1 text-xs">
                <Share2 className="w-3.5 h-3.5" /> Share Article
              </Button>
            </div>
          </div>
        </div>

        {/* Page Structure: Sidebar Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_280px] gap-12 items-start mt-12">
          
          {/* Main Article Body */}
          <article className="prose prose-invert prose-neutral max-w-none text-left space-y-12">
            
            {/* 1. Creative Frontend Development */}
            <section ref={sectionsRef.sec1} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                1. Creative Frontend Development: Where Code Meets Canvas
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                In the early days of the web, development was primarily concerned with data structure and document layout. Today, the role of a <span className="text-foreground font-medium">modern web developer</span> has evolved into that of a digital architect. Creative frontend development represents the intersection of code and visual art, turning flat mockups into living, breathing digital canvases.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                A top-tier <span className="text-primary font-medium">frontend developer portfolio</span> is no longer just a list of static screenshots. It is a sandbox showing off technical capabilities, dynamic interactive state management, and custom rendering optimization. By utilizing advanced browser techniques, engineers can make interfaces feel fluid and alive.
              </p>
            </section>

            {/* 2. Interactive Web Design Inspiration */}
            <section ref={sectionsRef.sec2} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                2. Interactive Web Design Inspiration: Cultivating Digital Magic
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Where does interactive magic start? Great designers look beyond standard components to draw <span className="text-foreground font-medium">UI/UX portfolio inspiration</span> from video game interfaces, industrial controls, and natural physical properties. By studying how organic materials bounce, bend, and yield under pressure, we can replicate these visual triggers in code.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                This search for interactive web design inspiration leads developers to abandon static forms and explore elastic, kinetic components. The goal is simple: capture the user's focus, lower cognitive friction, and transform basic utility into moments of pure visual delight.
              </p>
            </section>

            {/* 3. Google Antigravity Effect in Modern UI */}
            <section ref={sectionsRef.sec3} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                3. The Google Antigravity Effect in Modern UI: A Physics-Driven Paradigm
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Originally created as a famous interactive search easter egg, the <span className="text-primary font-medium">Google Antigravity effect</span> remains an outstanding design metaphor. It represents the ultimate rebellion against standard grid constraints. In this paradigm, HTML elements are treated as physical rigid bodies in a 2D space, subject to gravitational drift, force vectors, and kinetic impacts.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Integrating the Google Antigravity concept into modern user interfaces forces developers to think about coordinate spaces, collision bounding boxes, and velocity calculation. Instead of traditional static flexboxes, elements react to user physics—giving the layout a weightless, futuristic feel.
              </p>
              
              {/* Physics Sandbox embedded right here! */}
              <AntigravitySandbox />
            </section>

            {/* 4. Motion-based User Experiences */}
            <section ref={sectionsRef.sec4} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                4. Motion-Based User Experiences: The Psychology of Flow
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                A premium <span className="text-foreground font-medium">motion UI website</span> leverages movement to direct the user's eyes, not just to show off animations. In cognitive psychology, "flow" refers to a state of absolute immersion. Responsive motion design provides immediate feedback, giving users visual signposts as they interact with the page.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Whether it's a card expanding on hover, a menu sliding out with elastic friction, or a micro-animation confirming a button click, these motion-based cues make digital interactions feel reassuringly physical.
              </p>
            </section>

            {/* 5. React and Tailwind CSS Projects */}
            <section ref={sectionsRef.sec5} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                5. React and Tailwind CSS Projects: Building High-Performance Architectures
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Executing modern motion design requires modern web infrastructure. A robust <span className="text-primary font-medium">Tailwind CSS portfolio</span> combined with React state structures ensures that animations stay lightning-fast. React provides modular component lifecycles, while Tailwind CSS optimizes style injection to prevent layout recalculation bottlenecks.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Building customized, high-performance <span className="text-foreground font-medium">React developer portfolio</span> architectures allows us to use CSS custom properties dynamically inside React hooks, feeding mouse coordinates directly into utility-first responsive grids without frame drops.
              </p>
            </section>

            {/* 6. Dynamic Animations for Websites */}
            <section ref={sectionsRef.sec6} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                6. Dynamic Animations for Websites: Creating Smooth Interactivity
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                How do we prevent animations from feeling sluggish? Dynamic animations for websites rely on physics-based spring systems rather than simple linear durations. Spring curves emulate actual kinetic inertia, preventing abrupt stops.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Using tools like Framer Motion or custom <span className="text-foreground font-medium">JavaScript animation effects</span>, we can bind transition velocities to mouse gestures, creating interactive layouts that feel satisfying and perfectly responsive under any screen constraints.
              </p>
            </section>

            {/* 7. Portfolio Projects and UI Showcases */}
            <section ref={sectionsRef.sec7} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                7. Portfolio Projects and UI Showcases: Translating Theory into Code
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                A premium developer portfolio is evaluated on real deliverables. On the <span className="text-primary font-medium">Jainil Patel portfolio</span>, interactive experiments are combined with actual working products. Examples like **UI Hub**, which lets developers discover and copy modern animation scripts, or **Chromatic**, which extracts palette datasets from assets, prove that visual design and complex engineering are closely linked.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                By presenting clean, live examples alongside open-source source files, our featured UI showcases prove we can solve real-world problems with production-grade modular systems.
              </p>
            </section>

            {/* 8. Modern Responsive Web Design */}
            <section ref={sectionsRef.sec8} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                8. Modern Responsive Web Design: Immersive on Every Screen
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Designing for the web means designing for variability. <span className="text-foreground font-medium">Responsive web design</span> requires that our layouts translate beautifully from high-resolution 4K screens to hand-held smartphone screens. Custom media queries, CSS grid configurations, and modular components are essential for consistent experiences.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Furthermore, interactive animation systems must be performance-adjusted on mobile. On smaller screens, high-overhead mouse tracing calculations are turned off in favor of simple touch-friendly swipe gestures, ensuring speed remains excellent.
              </p>
            </section>

            {/* 9. User Engagement Through Animation */}
            <section ref={sectionsRef.sec9} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                9. Elevating User Engagement Through Animation: Metrics and Magic
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Are interactive animations just digital eye candy? Analysis says otherwise. Websites that use subtle, high-quality animations see lower bounce rates, longer session times, and higher conversion rates. By drawing the user in, they build a memorable connection with the brand.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                When a recruiter or client interacts with a physics sandbox like the one above, they spend more time on your page—which directly improves memory retention and brand search visibility.
              </p>
            </section>

            {/* 10. Developer Creativity and Innovation */}
            <section ref={sectionsRef.sec10} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                10. Developer Creativity and Innovation: Staying Ahead of the Curve
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                The modern frontend landscape changes extremely fast. To stay competitive, developers must continually experiment with new technology, like WebGL shaders, Canvas particle fields, and browser-native physics integrations. Developer creativity and innovation are about taking risks and trying new visual ideas.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                By pushing our skills, we can discover new methods for rendering complex layout systems, proving that backend logic and creative visual interfaces can work together harmoniously.
              </p>
            </section>

            {/* 11. Building Immersive Digital Experiences */}
            <section ref={sectionsRef.sec11} className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                11. Building Immersive Digital Experiences: The Path Forward
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our ultimate goal is to design immersive digital experiences that leave a lasting impression. By combining technical knowledge with design details, responsive layouts, and physics effects like the Antigravity sandbox, we establish new standards for frontend development.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                As you explore the portfolio, analyze the tools, and test the physics sandbox, consider how these dynamic elements can elevate your own digital products.
              </p>
            </section>

            {/* Call To Action Block */}
            <div className="my-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none" />
              <div className="relative z-10 max-w-2xl text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                  Let's Construct Something Phenomenal Together
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Are you looking to add modern web developer talent, high-performance React and Tailwind CSS projects, or interactive motion UI to your engineering team or startup? Let's connect and share ideas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6"
                    asChild
                  >
                    <Link to="/#projects">Explore Portfolio Projects</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10 text-foreground font-semibold px-6"
                    asChild
                  >
                    <Link to="/#contact">Connect With Me</Link>
                  </Button>
                </div>
              </div>
              <SharpBorderBeam
                duration={12}
                size={350}
                color="#ffffff"
                borderWidth={1.5}
              />
            </div>

          </article>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block sticky top-28 p-6 rounded-2xl border border-border/40 bg-card/25 backdrop-blur-md text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60 mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Table of Contents
            </h4>
            <nav className="space-y-3.5 text-xs font-medium">
              {[
                { key: "sec1", label: "1. Creative Frontend" },
                { key: "sec2", label: "2. Design Inspiration" },
                { key: "sec3", label: "3. Antigravity Effect" },
                { key: "sec4", label: "4. Motion UI & Flow" },
                { key: "sec5", label: "5. React & Tailwind" },
                { key: "sec6", label: "6. Dynamic Animations" },
                { key: "sec7", label: "7. Projects Showcase" },
                { key: "sec8", label: "8. Responsive Web" },
                { key: "sec9", label: "9. User Engagement" },
                { key: "sec10", label: "10. Dev Creativity" },
                { key: "sec11", label: "11. Immersive Digital" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToRef(sectionsRef[item.key as keyof typeof sectionsRef])}
                  className={`block text-left w-full transition-colors hover:text-primary ${
                    activeSub === item.key ? "text-primary font-bold pl-2 border-l border-primary" : "text-muted-foreground pl-2 border-l border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Article;
