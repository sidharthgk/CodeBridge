import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, ArrowLeft } from "lucide-react";
import Playground from "../components/Playground";
import Footer from "../components/Footer";

const PlaygroundPage = () => {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* Header */}
          <div className="glass-panel p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <Code2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Interactive Playground</h1>
                <p className="text-gray-400">Write, test, and run code in real time</p>
              </div>
            </div>
          </div>

          {/* Playground Component */}
          <Playground />

          {/* Back to Home Button */}
          <div className="flex justify-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-black/50 text-gray-400 border border-gray-700 hover:bg-black/70 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PlaygroundPage;
