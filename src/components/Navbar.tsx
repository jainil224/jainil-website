import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-background/95 backdrop-blur-lg border-b border-nav-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <NavLink to="/" className="group flex items-center space-x-2">
            <span className="text-xl font-semibold font-heading text-foreground group-hover:text-primary transition-colors duration-300">
              Jainil Patel
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {["About", "Certifications", "Projects"].map((item, index) => (
              <NavLink
                key={index}
                to={item === "About" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-1">
            {["About", "Certifications", "Projects"].map((item, index) => (
              <NavLink
                key={index}
                to={item === "About" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium rounded-lg ${isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
