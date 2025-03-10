import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code2,
  Play,
  Settings,
  Copy,
  Save,
  Check,
  Cpu,
  Maximize2,
  Terminal
} from "lucide-react";

// Returns a default code snippet based on the language.
function getInitialCode(lang) {
  const codeExamples = {
    python: `def greet(name):
    return f"Hello, {name}!"

result = greet("World")
print(result)`,
    javascript: `function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet("World");
console.log(result);`,
    java: `public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        String result = greet("World");
        System.out.println(result);
    }
}`,
    cpp: `#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::string result = greet("World");
    std::cout << result << std::endl;
    return 0;
}`
  };

  return codeExamples[lang] || codeExamples.python;
}

const Playground = () => {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("hc-black"); // For potential styling use
  const [code, setCode] = useState(getInitialCode("python"));
  const [isRunning, setIsRunning] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(getInitialCode(newLang));
    setShowOutput(false);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  // Simulated output based on language.
  const getOutputForCode = () => {
    const outputs = {
      python: "Hello, World!",
      javascript: "Hello, World!",
      java: "Hello, World!",
      cpp: "Hello, World!"
    };
    return outputs[language] || "";
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate a delay for code execution.
    setTimeout(() => {
      setIsRunning(false);
      setOutput(getOutputForCode());
      setShowOutput(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="grid gap-8">
          {/* Page Header */}
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
                <h2 className="text-2xl font-bold gold-text">
                  Interactive Playground
                </h2>
                <p className="text-gray-400">
                  View, run, and test code in your browser
                </p>
              </div>
            </div>
          </motion.div>

          {/* Read-Only Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`rounded-xl overflow-hidden bg-gradient-to-br from-black/90 to-black border border-amber-500/10 
                          shadow-2xl shadow-amber-500/5 transition-all duration-300 ${
                            isFullscreen ? "fixed inset-4 z-50" : ""
                          }`}
            >
              {/* Editor Header */}
              <div className="flex items-center justify-between p-3 border-b border-amber-500/10 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
                    <Code2 className="h-4 w-4 text-amber-500" />
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="bg-transparent text-amber-500 outline-none text-sm hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="python" className="bg-black">
                        Python
                      </option>
                      <option value="javascript" className="bg-black">
                        JavaScript
                      </option>
                      <option value="java" className="bg-black">
                        Java
                      </option>
                      <option value="cpp" className="bg-black">
                        C++
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
                    <Settings className="h-4 w-4 text-amber-500" />
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="bg-transparent text-amber-500 outline-none text-sm hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="vs-dark" className="bg-black">
                        Dark
                      </option>
                      <option value="hc-black" className="bg-black">
                        High Contrast
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      onClick={handleCopyCode}
                      className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
                      title="Copy code"
                    >
                      {showCopyTooltip ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                    {showCopyTooltip && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-green-500 text-white text-xs rounded-lg z-10">
                        Copied!
                      </div>
                    )}
                  </div>
                  <button
                    className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
                    title="Save code"
                  >
                    <Save className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <Maximize2 className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Code Display and Output */}
              <div className="relative bg-black/80 flex transition-all duration-300 ease-in-out">
                {/* Code Display (Read-Only) */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    showOutput ? "w-1/2 border-r border-amber-500/10" : "w-full"
                  }`}
                >
                  <pre className="p-4 text-white font-mono whitespace-pre-wrap bg-gray-900 h-[350px] overflow-auto">
                    {code}
                  </pre>
                </div>

                {/* Output Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    showOutput ? "w-1/2" : "w-0"
                  }`}
                >
                  <div className="h-full bg-black/60 p-4">
                    <div className="flex items-center space-x-2 text-amber-500/70 text-sm mb-2">
                      <Terminal className="h-4 w-4" />
                      <span>Output</span>
                    </div>
                    <div className="font-mono text-sm text-gray-300 bg-black/40 rounded-lg p-4 h-[calc(100%-2rem)] overflow-auto">
                      {output}
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="flex justify-between items-center p-3 border-t border-amber-500/10 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center space-x-4 text-sm text-amber-500/70">
                  <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-amber-500/5">
                    <Cpu className="h-4 w-4" />
                    <span>{language.toUpperCase()}</span>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-amber-500/5">
                    {code.split("\n").length} lines
                  </div>
                </div>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-medium shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/30 hover:scale-105 active:scale-95 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  <Play className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
                  <span>{isRunning ? "Running..." : "Run Code"}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-500">
                Multiple Languages
              </h3>
              <p className="text-gray-400">
                Practice with JavaScript, Python, Java, C++, and more. Switch between languages instantly.
              </p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-500">
                Real-time Execution
              </h3>
              <p className="text-gray-400">
                Run your code directly in the browser and see the results immediately.
              </p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-2 text-amber-500">
                AI Assistance
              </h3>
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

export default Playground;
