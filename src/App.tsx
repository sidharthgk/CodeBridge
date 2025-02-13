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
  const [initialLoadComplete, setInitialLoadComplete] = useState(false); // ✅ Tracks if first load is done

  // ✅ Initial App Load Animation (Runs Once)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setInitialLoadComplete(true); // ✅ Marks initial load as complete
    }, 2000); // Shows loading screen for 2 seconds initially

    return () => clearTimeout(timer);
  }, []);

  // ✅ Page Change Loader (Only Runs After Initial Load)
  useEffect(() => {
    if (!initialLoadComplete) return; // ✅ Prevents route loader from triggering on first load

    setShowPageLoader(true);

    const timer = setTimeout(() => {
      setShowPageLoader(false);
    }, 1000); // Ensures smooth transition before showing page content

    return () => clearTimeout(timer);
  }, [location]);

  // ✅ If `LoadingScreen` is active, prevent page from rendering (Prevents flickering)
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
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;
