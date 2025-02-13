import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, BookOpen, GitCompare, GraduationCap, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    })
  };

  const logoVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: { 
      y: [-2, 2, -2],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const NavLink = ({ to, children, index }: { to: string; children: React.ReactNode; index: number }) => (
    <motion.div
      custom={index}
      variants={menuItemVariants}
      initial="closed"
      animate="open"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive(to)
            ? "text-amber-500 bg-amber-500/10"
            : "hover:text-amber-500 hover:bg-amber-500/5"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </Link>
    </motion.div>
  );

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-black/80 backdrop-blur-lg shadow-lg" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500"
                >
                  &lt;/&gt;
                </motion.div>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full -z-10"
                />
              </div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-montserrat text-xl tracking-wider gold-text"
            >
              CodeBridge
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/dashboard" index={0}>
              <GraduationCap className="h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/code-converter" index={1}>
              <GitCompare className="h-4 w-4" />
              <span>Code Converter</span>
            </NavLink>
            <NavLink to="/mode-selection" index={2}>
              <GraduationCap className="h-4 w-4" />
              <span>Learn</span>
            </NavLink>
            <NavLink to="/projects" index={3}>
              <BookOpen className="h-4 w-4" />
              <span>Projects</span>
            </NavLink>
            
            <div className="pl-4 flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="btn-secondary px-6 py-2">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="btn-primary px-6 py-2">
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <div className="absolute inset-0 bg-amber-500/20 rounded-lg blur-lg opacity-0 transition-opacity duration-300 hover:opacity-100" />
            {isOpen ? (
              <X className="h-6 w-6 text-amber-500" />
            ) : (
              <Menu className="h-6 w-6 text-amber-500" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              <NavLink to="/dashboard" index={0}>
                <GraduationCap className="h-5 w-5" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/code-converter" index={1}>
                <GitCompare className="h-5 w-5" />
                <span>Code Converter</span>
              </NavLink>
              <NavLink to="/mode-selection" index={2}>
                <GraduationCap className="h-5 w-5" />
                <span>Learn</span>
              </NavLink>
              <NavLink to="/projects" index={3}>
                <BookOpen className="h-5 w-5" />
                <span>Projects</span>
              </NavLink>
              
              <div className="pt-4 grid gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary w-full text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
