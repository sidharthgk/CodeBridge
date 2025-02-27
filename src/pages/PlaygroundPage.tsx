import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, ArrowLeft } from "lucide-react";
import Playground from "../components/Playground";

const PlaygroundPage = () => {
  return (
      <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
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
          <Playground />
        </motion.div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
