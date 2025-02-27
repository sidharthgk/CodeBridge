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
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        { label: "Dashboard", path: "/dashboard" },
        { label: "Courses", path: "/courses" },
        { label: "Practice", path: "/practice" },
      ],
    },
    {
      title: "Tools",
      icon: GitCompare,
      dropdownItems: [
        { label: "Code Converter", path: "/code-converter" },
        { label: "Playground", path: "/playground" },
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
        scrolled ? "py-3 bg-black/40 backdrop-blur-md shadow-md" : "py-5 bg-black/20"
      } border-b border-amber-500`}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="group flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative p-2">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg blur-lg" />
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
          </a>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <>
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.div
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer"
                      whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
                    >
                      <item.icon className="h-4 w-4 text-amber-500" />
                      <span className="text-gray-200 hover:text-amber-500 transition-colors">
                        {item.title}
                      </span>
                      <ChevronDown className="h-4 w-4 text-amber-500" />
                    </motion.div>
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-black/50 backdrop-blur-md border border-amber-500/20 shadow-lg"
                        >
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.path}
                              className="block px-4 py-2 text-sm text-gray-200 hover:bg-amber-500/10 hover:text-amber-500 transition-all"
                            >
                              {dropdownItem.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </>
            )}

            <div className="pl-4 flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href="/profile"
                      className="flex items-center space-x-1 px-6 py-2 rounded-lg border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href="/login"
                      className="px-6 py-2 rounded-lg border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-all duration-300"
                    >
                      Login
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href="/signup"
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                    >
                      Get Started
                    </a>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-amber-500" />
            ) : (
              <Menu className="h-6 w-6 text-amber-500" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/40 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {isAuthenticated && (
                <>
                  {menuItems.map((item) => (
                    <div key={item.title}>
                      <button
                        className="flex items-center justify-between w-full px-4 py-2 text-amber-500"
                        onClick={() => toggleDropdown(item.title)}
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            activeDropdown === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.title && (
                        <div className="pl-6 space-y-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.label}
                              href={dropdownItem.path}
                              className="block text-gray-200 hover:text-amber-500"
                              onClick={closeMenu}
                            >
                              {dropdownItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
              <div className="border-t border-[0.5px] border-amber-500 pt-4">
                {isAuthenticated ? (
                  <>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-amber-500 hover:bg-amber-500/10 transition-colors"
                      onClick={closeMenu}
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        setIsAuthenticated(false);
                        closeMenu();
                      }}
                      className="w-full text-left px-4 py-2 text-amber-500 hover:bg-amber-500/10 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block px-4 py-2 text-amber-500 hover:bg-amber-500/10 transition-colors"
                      onClick={closeMenu}
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="block px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                      onClick={closeMenu}
                    >
                      Get Started
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
