import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const Playground = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");

  const codeExamples = {
    python: `def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
    javascript: `function greet(name) {
    return \`Hello, \${name}!\`
}

console.log(greet("World"))`,
    java: `public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        System.out.println(greet("World"));
    }
}`
  };

  return (
    <div className="glass-panel p-6">
      {/* Language Selection Buttons */}
      <div className="flex space-x-4 mb-4">
        {Object.keys(codeExamples).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedLanguage === lang
                ? "bg-amber-500 text-black"
                : "bg-black/30 text-gray-400 hover:bg-black/50"
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      {/* Code Display Section */}
      <div className="bg-black/40 rounded-lg p-4 font-mono text-sm">
        <pre className="text-gray-300">
          {codeExamples[selectedLanguage as keyof typeof codeExamples]}
        </pre>
      </div>

      {/* Run Button */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-400">Try editing the code in our full playground</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-black rounded-lg"
        >
          <Play className="h-4 w-4" />
          <span>Run Code</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Playground;
