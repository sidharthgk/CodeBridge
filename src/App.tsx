import { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ModeSelection from "./pages/ModeSelection";
import Dashboard from "./pages/Dashboard";
import CodeConverter from "./pages/CodeConverter";
import ProjectLearning from "./pages/ProjectLearning";
import ScratchMode from "./pages/ScratchMode";
import ComparisonMode from "./pages/ComparisonMode";
import PlaygroundPage from "./pages/PlaygroundPage";
import AiAssistant from "./pages/AiAssistant";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialLoadComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoadComplete) return;

    setShowPageLoader(true);

    const timer = setTimeout(() => {
      setShowPageLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading || showPageLoader) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black -z-10" />
      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mode-selection" element={<ModeSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/code-converter" element={<CodeConverter />} />
            <Route path="/projects" element={<ProjectLearning />} />
            <Route path="/scratch-mode" element={<ScratchMode />} />
            <Route path="/comparison-mode" element={<ComparisonMode />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;