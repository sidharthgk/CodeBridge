import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Code2, Mail, Lock, User, ArrowRight } from 'lucide-react';

function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Implement actual authentication
      // For now, just simulate a successful login/signup
      setUser({
        id: '1',
        name: formData.name || 'User',
        email: formData.email,
        progress: {},
        completedProjects: [],
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Code2 className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2 animate-slide-in">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg py-3 pl-10 pr-4 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all duration-300 hover:border-[#FFD700]"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg py-3 pl-10 pr-4 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all duration-300 hover:border-[#FFD700]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg py-3 pl-10 pr-4 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all duration-300 hover:border-[#FFD700]"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm animate-fade-in">{error}</p>
          )}

          <button
            type="submit"
            className="group w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-black rounded-lg font-semibold hover-glow transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#FFD700] hover:underline hover:text-[#FFDF50] transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;