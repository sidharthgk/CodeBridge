import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, Layout, FolderGit2, LogIn } from 'lucide-react';
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
    <nav className="bg-[#1A1A1A] border-b border-[#FFD700] px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Code2 className="w-8 h-8 text-[#FFD700]" />
          <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
            CodePolyglot
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 hover:text-[#FFD700] transition-colors ${
                  isActive('/dashboard') ? 'text-[#FFD700]' : 'text-white'
                }`}
              >
                <Layout className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/learn"
                className={`flex items-center space-x-2 hover:text-[#FFD700] transition-colors ${
                  isActive('/learn') ? 'text-[#FFD700]' : 'text-white'
                }`}
              >
                <Code2 className="w-5 h-5" />
                <span>Learn</span>
              </Link>
              
              <Link
                to="/projects"
                className={`flex items-center space-x-2 hover:text-[#FFD700] transition-colors ${
                  isActive('/projects') ? 'text-[#FFD700]' : 'text-white'
                }`}
              >
                <FolderGit2 className="w-5 h-5" />
                <span>Projects</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-[#FFD700] transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-black rounded-lg font-semibold hover:shadow-[0_0_8px_#FFD700] transition-shadow"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;