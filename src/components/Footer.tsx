import { Github, Linkedin, Heart, Instagram } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} Made with{" "}
            <Heart className="w-4 h-4 text-primary fill-primary" /> by Jainil Patel
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/jainil224"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/jainil-patel-947b1a336/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#0077b5] transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/jainilll_2208/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#E1306C] transition-all duration-300 hover:scale-110"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://leetcode.com/u/Jainill_2208/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#FFA116] transition-all duration-300 hover:scale-110"
            >
              <SiLeetcode size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
