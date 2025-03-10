import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  BookOpen,
  GitCompare,
  GraduationCap,
  X,
  ChevronDown,
  User,
  Home,
  Code,
  Layout,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const menuItems = [
    {
      title: "Learn",
      icon: GraduationCap,
      dropdownItems: [
        { label: "Scratch Mode", path: "/scratch-mode" },
        { label: "Comparison Mode", path: "/comparison-mode" },
      ],
    },
    {
      title: "Tools",
      icon: GitCompare,
      dropdownItems: [
        { label: "Code Converter", path: "/code-converter" },
        { label: "Playground", path: "/playground" },
        { label: "AI Assistant", path: "/ai-assistant" },
      ],
    },
    {
      title: "Resources",
      icon: BookOpen,
      dropdownItems: [
        { label: "Projects", path: "/projects" },
        { label: "Documentation", path: "/docs" },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "py-2 bg-black/60 backdrop-blur-md shadow-lg" 
          : "py-4 bg-gradient-to-b from-black/80 to-black/20"
      } border-b border-amber-500/30`}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              className="relative p-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-md" />
              <div className="relative text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                &lt;/&gt;
              </div>
            </motion.div>
            <motion.span
              className="font-montserrat text-2xl tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text font-bold"
              whileHover={{ scale: 1.05 }}
            >
              CodeBridge
            </motion.span>
          </Link>

          {/* Desktop Navigation (Dropdown menus only) */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.div
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer group"
                  whileHover={{ 
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    scale: 1.05
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="h-4 w-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
                  <span className="text-gray-200 group-hover:text-amber-500 transition-colors font-medium">
                    {item.title}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-amber-500 transition-transform duration-300 ${
                    activeDropdown === item.title ? "rotate-180" : ""
                  }`} />
                </motion.div>
                <AnimatePresence>
                  {activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-black/70 backdrop-blur-xl border border-amber-500/20 shadow-lg shadow-amber-500/5 overflow-hidden"
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.path}
                          className="block px-4 py-3 text-sm text-gray-200 hover:bg-amber-500/10 hover:text-amber-500 transition-all border-b border-amber-500/10 last:border-0"
                          onClick={closeMenu}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-200 font-medium"
              >
                Login
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-200"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/80 backdrop-blur-xl border-b border-amber-500/20"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Dropdown menus in mobile */}
              {menuItems.map((item) => (
                <div key={item.title} className="rounded-lg overflow-hidden">
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-200 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors"
                    onClick={() => toggleDropdown(item.title)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-amber-500" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-amber-500 transform transition-transform duration-300 ${
                        activeDropdown === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-12 space-y-1 pb-2"
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.path}
                            className="block py-2 px-4 text-gray-300 hover:text-amber-500 transition-colors rounded-lg"
                            onClick={closeMenu}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Auth in mobile menu */}
              <div className="pt-3 space-y-3 border-t border-amber-500/20">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors text-center font-medium"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-medium rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 text-center"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
