import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ModeSelection from './pages/ModeSelection';
import Dashboard from './pages/Dashboard';
import CodeConverter from './pages/CodeConverter';
import ProjectLearning from './pages/ProjectLearning';
import ScratchMode from './pages/ScratchMode';
import ComparisonMode from './pages/ComparisonMode';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black -z-10" />
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mode-selection" element={<ModeSelection />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/code-converter" element={<CodeConverter />} />
              <Route path="/projects" element={<ProjectLearning />} />
              <Route path="/scratch-mode" element={<ScratchMode />} />
              <Route path="/comparison-mode" element={<ComparisonMode />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;