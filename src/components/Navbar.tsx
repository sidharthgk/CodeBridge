import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Menu, BookOpen, GitCompare, GraduationCap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-amber-500" />
            <span className="font-montserrat text-xl tracking-wider">CLLP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 hover:text-amber-500 transition-colors ${
                isActive("/dashboard") ? "text-amber-500" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/code-converter"
              className={`flex items-center space-x-2 hover:text-amber-500 transition-colors ${
                isActive("/code-converter") ? "text-amber-500" : ""
              }`}
            >
              <GitCompare className="h-4 w-4" />
              <span>Code Converter</span>
            </Link>
            <Link
              to="/mode-selection"
              className={`flex items-center space-x-2 hover:text-amber-500 transition-colors ${
                isActive("/mode-selection") ? "text-amber-500" : ""
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Learn</span>
            </Link>
            <Link
              to="/projects"
              className={`flex items-center space-x-2 hover:text-amber-500 transition-colors ${
                isActive("/projects") ? "text-amber-500" : ""
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-panel mt-2 mx-4 p-4 rounded-lg"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/code-converter"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Code Converter
              </Link>
              <Link
                to="/mode-selection"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Learn
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-500 transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn-secondary text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
