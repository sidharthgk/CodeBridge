import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Particles from "./components/Particles"; // Import Particles

// Lazy loading pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ModeSelection = lazy(() => import("./pages/ModeSelection"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CodeConverter = lazy(() => import("./pages/CodeConverter"));
const ProjectLearning = lazy(() => import("./pages/ProjectLearning"));
const ScratchMode = lazy(() => import("./pages/ScratchMode"));
const ComparisonMode = lazy(() => import("./pages/ComparisonMode"));
const PlaygroundPage = lazy(() => import("./pages/PlaygroundPage"));
const AiAssistant = lazy(() => import("./pages/AiAssistant"));

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
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

    if (location.pathname !== prevPath) {
      setShowPageLoader(true);
      const timer = setTimeout(() => setShowPageLoader(false), 800);
      
      setPrevPath(location.pathname);
      return () => clearTimeout(timer); // ✅ Cleanup timer to prevent memory leaks
    }
  }, [location.pathname, prevPath, initialLoadComplete]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Page transition animation settings
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 },
  };

  return (
    <div className="relative">
      {/* Particle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black" />
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={window.innerWidth > 768 ? 700 : 300} // Optimize for mobile
          particleSpread={20}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>


      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          
      <Navbar />
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <LandingPage />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/signup"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Signup />
                </motion.div>
              }
            />
            <Route
              path="/mode-selection"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <ModeSelection />
                </motion.div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Dashboard />
                </motion.div>
              }
            />
            <Route
              path="/code-converter"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <CodeConverter />
                </motion.div>
              }
            />
            <Route
              path="/projects"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectLearning />
                </motion.div>
              }
            />
            <Route
              path="/scratch-mode"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <ScratchMode />
                </motion.div>
              }
            />
            <Route
              path="/comparison-mode"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <ComparisonMode />
                </motion.div>
              }
            />
            <Route
              path="/playground"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <PlaygroundPage />
                </motion.div>
              }
            />
            <Route
              path="/ai-assistant"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={{ duration: 0.5 }}
                >
                  <AiAssistant />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;
