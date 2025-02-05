import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Projects from './pages/Projects';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1A1A1A] text-white">
        <Navbar />
        <main className="container mx-auto px-6 sm:px-12 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
