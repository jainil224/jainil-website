import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { IntroAnimation } from "./components/IntroAnimation";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  /* Removed persistency - Animation plays on every load as requested
  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowIntro(false);
    }
  }, []);
  */

  const handleIntroComplete = () => {
    setShowIntro(false);
    // sessionStorage.setItem("hasVisited", "true"); // Removed persistence
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {showIntro ? (
            <IntroAnimation key="intro" onComplete={handleIntroComplete} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
