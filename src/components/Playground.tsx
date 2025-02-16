import { useState } from "react";
import { Play, Settings, Copy, Save, Check, Cpu, Code2, Maximize2, Terminal } from "lucide-react";
import Editor from "@monaco-editor/react";

const Playground = () => {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(getInitialCode("python"));
  const [isRunning, setIsRunning] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  interface CodeExamples {
    python: string;
    javascript: string;
    java: string;
    cpp: string;
  }

  function getInitialCode(lang: string): string {
    const codeExamples: CodeExamples = {
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
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      setOutput(getOutputForCode());
      setShowOutput(true);
    }, 1000);
  };

  return (
    <div className={`rounded-xl overflow-hidden bg-gradient-to-br from-black/90 to-black border border-amber-500/10 
                    shadow-2xl shadow-amber-500/5 transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-amber-500/10 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
            <Code2 className="h-4 w-4 text-amber-500" />
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-amber-500 outline-none text-sm hover:text-amber-400 transition-colors cursor-pointer"
            >
              <option value="python" className="bg-black">Python</option>
              <option value="javascript" className="bg-black">JavaScript</option>
              <option value="java" className="bg-black">Java</option>
              <option value="cpp" className="bg-black">C++</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
            <Settings className="h-4 w-4 text-amber-500" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-transparent text-amber-500 outline-none text-sm hover:text-amber-400 transition-colors cursor-pointer"
            >
              <option value="vs-dark" className="bg-black">Dark</option>
              <option value="light" className="bg-black">Light</option>
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
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                          px-2 py-1 bg-green-500 text-white text-xs rounded-lg z-10
                          animate-fade-in-out">
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

      {/* Editor and Output Container */}
      <div className="relative bg-black/80 flex transition-all duration-300 ease-in-out">
        {/* Editor */}
        <div className={`transition-all duration-300 ease-in-out ${showOutput ? 'w-1/2 border-r border-amber-500/10' : 'w-full'}`}>
          <Editor
            height={isFullscreen ? "85vh" : "350px"}
            language={language}
            value={code}
            theme={theme}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              folding: true,
              lineNumbers: "on",
              roundedSelection: false,
              automaticLayout: true,
              padding: { top: 16 },
              suggestOnTriggerCharacters: true,
              hideCursorInOverviewRuler: true,
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6
              }
            }}
            className="[&>div]:bg-transparent"
          />
        </div>

        {/* Output Panel */}
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showOutput ? 'w-1/2' : 'w-0'
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

      {/* Footer */}
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
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 
                   text-black font-medium shadow-lg shadow-amber-500/20 
                   transition-all duration-300 hover:shadow-amber-500/30 
                   hover:scale-105 active:scale-95 flex items-center space-x-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          <Play className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
          <span>{isRunning ? "Running..." : "Run Code"}</span>
        </button>
      </div>
    </div>
  );
};

export default Playground;
