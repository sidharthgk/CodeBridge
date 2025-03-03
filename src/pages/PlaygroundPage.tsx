import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import InteractiveCodeEditor from "../components/InteractiveCodeEditor";
import { useState } from "react";

const PlaygroundPage = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6 bg-black/40 backdrop-blur-md"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold gold-text">Interactive Playground</h2>
                <p className="text-gray-400">Write, run, and test code in your browser</p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Code Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InteractiveCodeEditor
              initialLanguage={language}
              height="450px"
              showAiButton={true}
              showHeader={true}
              showFooter={true}
              showOutput={true}
              onLanguageChange={handleLanguageChange}
              onCodeChange={handleCodeChange}
            />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-500">Multiple Languages</h3>
              <p className="text-gray-400">
                Practice with JavaScript, Python, Java, C++, and more. Switch between languages instantly.
              </p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-500">Real-time Execution</h3>
              <p className="text-gray-400">
                Run your code directly in the browser and see the results immediately.
              </p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-500">AI Assistance</h3>
              <p className="text-gray-400">
                Stuck on a problem? Ask our AI assistant for help with your code.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaygroundPage;