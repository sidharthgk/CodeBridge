import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Code2, Mail, Lock, User, ArrowRight } from "lucide-react";

function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setUser({
        id: "1",
        name: formData.name || "User",
        email: formData.email,
        progress: {},
        completedProjects: [],
      });
      navigate("/mode-selection"); // Redirect to mode selection after authentication
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Code2 className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2 animate-slide-in">
              <label htmlFor="name" className="block text-sm font-medium"> Name </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg py-3 pl-10 pr-4"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium"> Email </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg py-3 px-4"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium"> Password </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg py-3 px-4"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-black rounded-lg font-semibold hover:scale-105"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
