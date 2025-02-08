// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Code2, Layout, FolderGit2, LogIn, User } from "lucide-react";
import { useStore } from "../store/useStore";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-primary/50 border-b border-accent shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <Code2 className="w-8 h-8 text-accent transition-transform group-hover:rotate-6" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
            CodeBridge
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 ${
                  isActive("/dashboard") ? "text-accent" : "text-white"
                } hover:text-accent transition`}
              >
                <Layout className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/learn"
                className={`flex items-center space-x-1 ${
                  isActive("/learn") ? "text-accent" : "text-white"
                } hover:text-accent transition`}
              >
                <Code2 className="w-5 h-5" />
                <span>Learn</span>
              </Link>
              <Link
                to="/projects"
                className={`flex items-center space-x-1 ${
                  isActive("/projects") ? "text-accent" : "text-white"
                } hover:text-accent transition`}
              >
                <FolderGit2 className="w-5 h-5" />
                <span>Projects</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-red-400 transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center space-x-2 bg-accent text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition transform"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
