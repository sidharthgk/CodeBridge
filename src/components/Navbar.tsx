import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, Layout, FolderGit2, LogIn, User } from 'lucide-react';
import { useStore } from '../store/useStore';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-[#1A1A1A]/50 border-b border-[#FFD700] shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <Code2 className="w-8 h-8 text-[#FFD700] transition-transform group-hover:rotate-6" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFDF50]">
            CodeBridge
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'text-[#FFD700]' : ''}`}
              >
                <Layout className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/learn"
                className={`nav-link ${isActive('/learn') ? 'text-[#FFD700]' : ''}`}
              >
                <Code2 className="w-5 h-5" />
                <span>Learn</span>
              </Link>

              <Link
                to="/projects"
                className={`nav-link ${isActive('/projects') ? 'text-[#FFD700]' : ''}`}
              >
                <FolderGit2 className="w-5 h-5" />
                <span>Projects</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="nav-link hover:text-red-400 transition-transform hover:scale-105"
              >
                <LogIn className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="btn-primary flex items-center space-x-2"
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
