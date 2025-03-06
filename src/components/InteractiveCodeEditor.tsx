import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  Settings, 
  Copy, 
  Save, 
  Check, 
  Cpu, 
  Code2, 
  Maximize2, 
  Terminal, 
  Download,
  Bot,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useSettingsStore } from "../store/settingsStore";
import { useCodeStore } from "../store/codeStore";
import { useCodeExecution } from "../hooks/useCodeExecution";
import { useCodeAnalysis } from "../hooks/useCodeAnalysis";

interface InteractiveCodeEditorProps {
  initialCode?: string;
  initialLanguage?: string;
  height?: string;
  showAiButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  showOutput?: boolean;
  onCodeChange?: (code: string) => void;
  onLanguageChange?: (language: string) => void;
  className?: string;
  sourceComponent?: string;
}

const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
  initialCode,
  initialLanguage = "javascript",
  height = "400px",
  showAiButton = true,
  showHeader = true,
  showFooter = true,
  showOutput = true,
  onCodeChange,
  onLanguageChange,
  className = "",
  sourceComponent,
}) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || getInitialCode(initialLanguage));
  const [isRunning, setIsRunning] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayOutput, setDisplayOutput] = useState(false);
  const [output, setOutput] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const editorRef = useRef<any>(null);

  // Store hooks
  const { editorSettings, updateEditorSettings } = useSettingsStore();
  const { addSnippet, formatCode, addRecentLanguage } = useCodeStore();
  const { executeCode, isExecuting } = useCodeExecution();
  const { analyzeCode, analysis } = useCodeAnalysis();

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
      addRecentLanguage(initialLanguage);
    }
  }, [initialLanguage, addRecentLanguage]);

  interface CodeExamples {
    [key: string]: string;
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
}`,
      typescript: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

const result = greet("World");
console.log(result);`,
      rust: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let result = greet("World");
    println!("{}", result);
}`
    };

    return codeExamples[lang] || codeExamples.javascript;
  }

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    addRecentLanguage(newLang);
    if (!initialCode) {
      setCode(getInitialCode(newLang));
    }
    setDisplayOutput(false);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopyTooltip(true);
      setTimeout(() => setShowCopyTooltip(false), 2000);
      toast.success("Code copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy code");
    }
  };

  const handleSaveSnippet = () => {
    try {
      addSnippet({
        code,
        language,
        title: `${language} Snippet`,
        description: "Code snippet created from editor"
      });
      toast.success("Snippet saved successfully!");
    } catch (error) {
      toast.error("Failed to save snippet");
    }
  };

  const handleDownloadCode = () => {
    try {
      const formattedCode = formatCode(code, language);
      const blob = new Blob([formattedCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `code.${language}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Code downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download code");
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const result = await executeCode(code, language);
      setOutput(result.output);
      setDisplayOutput(true);
      
      // Analyze code after successful execution
      const codeAnalysis = analyzeCode(code, language);
      if (codeAnalysis.suggestions.length > 0) {
        toast.success("Code analysis complete", {
          duration: 5000,
          icon: "💡"
        });
      }
    } catch (error) {
      toast.error("Failed to execute code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleAskAI = () => {
    localStorage.setItem("codeForAI", code);
    localStorage.setItem("languageForAI", language);
    
    if (sourceComponent) {
      localStorage.setItem("sourceComponent", sourceComponent);
    }
    
    navigate("/ai-assistant");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden border border-amber-500/20 
                shadow-2xl shadow-amber-500/5 transition-all duration-300 bg-black/80 backdrop-blur-sm
                ${isFullscreen ? 'fixed inset-4 z-50' : ''} ${className}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between p-3 border-b border-amber-500/20 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
              <Code2 className="h-4 w-4 text-amber-500" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-transparent text-amber-500 outline-none text-sm hover:text-amber-400 transition-colors cursor-pointer"
              >
                <option value="javascript" className="bg-black">JavaScript</option>
                <option value="typescript" className="bg-black">TypeScript</option>
                <option value="python" className="bg-black">Python</option>
                <option value="java" className="bg-black">Java</option>
                <option value="cpp" className="bg-black">C++</option>
                <option value="rust" className="bg-black">Rust</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
              <Settings className="h-4 w-4 text-amber-500" />
              <select
                value={editorSettings.theme}
                onChange={(e) => updateEditorSettings({ theme: e.target.value })}
                className="bg-transparent text-amber-500 outline-none text-sm hover:text-amber-400 transition-colors cursor-pointer"
              >
                <option value="vs-dark" className="bg-black">Dark</option>
                <option value="light" className="bg-black">Light</option>
                <option value="hc-black" className="bg-black">High Contrast</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {showAiButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAskAI}
                className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-500/10 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                title="Ask AI for help"
              >
                <Bot className="h-4 w-4 text-amber-500" />
                <span className="text-amber-500 text-sm">Ask AI</span>
              </motion.button>
            )}
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
            </div>
            <button
              onClick={handleSaveSnippet}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
              title="Save snippet"
            >
              <Save className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleDownloadCode}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
              title="Download code"
            >
              <Download className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={toggleSettings}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
              title="Editor settings"
            >
              <Settings className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors group"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize2 className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {isSettingsOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-black/70 border-b border-amber-500/20 p-4"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-amber-500 font-medium">Editor Settings</h3>
            <button 
              onClick={toggleSettings}
              className="text-gray-400 hover:text-amber-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Font Size</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={editorSettings.fontSize}
                  onChange={(e) => updateEditorSettings({ fontSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-gray-300 w-8 text-center">{editorSettings.fontSize}</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Word Wrap</label>
              <select
                value={editorSettings.wordWrap}
                onChange={(e) => updateEditorSettings({ wordWrap: e.target.value as any })}
                className="w-full bg-gray-800 text-gray-300 rounded-lg px-3 py-1.5 border border-gray-700"
              >
                <option value="off">Off</option>
                <option value="on">On</option>
                <option value="wordWrapColumn">Column</option>
                <option value="bounded">Bounded</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Auto Indent</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateEditorSettings({ autoIndent: true })}
                  className={`px-3 py-1.5 rounded-lg ${
                    editorSettings.autoIndent ? "bg-amber-500/20 text-amber-500" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  On
                </button>
                <button
                  onClick={() => updateEditorSettings({ autoIndent: false })}
                  className={`px-3 py-1.5 rounded-lg ${
                    !editorSettings.autoIndent ? "bg-amber-500/20 text-amber-500" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Editor and Output Container */}
      <div className="relative bg-black/80 flex transition-all duration-300 ease-in-out">
        {/* Editor */}
        <div className={`transition-all duration-300 ease-in-out ${displayOutput && showOutput ? 'w-1/2 border-r border-amber-500/20' : 'w-full'}`}>
          <Editor
            height={isFullscreen ? "calc(100vh - 140px)" : height}
            language={language}
            value={code}
            theme={editorSettings.theme}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            options={{
              fontSize: editorSettings.fontSize,
              minimap: { enabled: editorSettings.minimap },
              scrollBeyondLastLine: false,
              folding: true,
              lineNumbers: editorSettings.lineNumbers ? "on" : "off",
              roundedSelection: false,
              automaticLayout: true,
              padding: { top: 16 },
              suggestOnTriggerCharacters: true,
              hideCursorInOverviewRuler: true,
              wordWrap: editorSettings.wordWrap,
              autoIndent: editorSettings.autoIndent ? "advanced" : "none",
              tabSize: editorSettings.tabSize,
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
        {showOutput && (
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              displayOutput ? 'w-1/2' : 'w-0'
            }`}
          >
            <div className="h-full bg-black/60 p-4">
              <div className="flex items-center justify-between text-amber-500/70 text-sm mb-2">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4" />
                  <span>Output</span>
                </div>
                <button 
                  onClick={() => setDisplayOutput(false)}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="font-mono text-sm text-gray-300 bg-black/40 rounded-lg p-4 h-[calc(100%-2rem)] overflow-auto">
                {output}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="flex justify-between items-center p-3 border-t border-amber-500/20 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center space-x-4 text-sm text-amber-500/70">
            <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-amber-500/5">
              <Cpu className="h-4 w-4" />
              <span>{language.toUpperCase()}</span>
            </div>
            <div className="px-2 py-1 rounded-md bg-amber-500/5">
              {code.split("\n").length} lines
            </div>
            {analysis && (
              <div className="px-2 py-1 rounded-md bg-amber-500/5">
                Complexity: {analysis.complexity}
              </div>
            )}
          </div>
          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 
                     text-black font-medium shadow-lg shadow-amber-500/20 
                     transition-all duration-300 hover:shadow-amber-500/30 
                     hover:scale-105 active:scale-95 flex items-center space-x-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isExecuting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>{isExecuting ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveCodeEditor;