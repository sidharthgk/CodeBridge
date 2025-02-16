import { useState } from "react";
import { Play, Settings, Copy, Save } from "lucide-react";
import Editor from "@monaco-editor/react";

const Playground = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(`print("Hello, World!")`);
  const [isRunning, setIsRunning] = useState(false);

  const languageMap = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative p-6 space-y-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">
          Interactive Playground
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-amber-500 py-1.5 px-3 rounded-md border border-amber-500/30 
                     focus:ring-1 focus:ring-amber-500 focus:border-transparent outline-none 
                     hover:border-amber-500/50 text-sm"
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang} value={lang} className="bg-black">
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
          <button className="p-1.5 hover:bg-amber-500/10 rounded-md transition-colors">
            <Settings className="h-4 w-4 text-amber-500" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopyCode}
            className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-md text-amber-500 transition-colors"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-md text-amber-500 transition-colors">
            <Save className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-hidden rounded-lg ring-1 ring-amber-500/20">
          <Editor
            height="450px"
            language={language}
            value={code}
            onChange={(newValue) => setCode(newValue || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              folding: true,
              lineNumbers: "on",
              roundedSelection: false,
              automaticLayout: true,
              padding: { top: 16 },
            }}
            className="[&>div]:bg-black"
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-4">
        <div className="text-sm text-amber-500/70">
          {code.split("\n").length} lines | {language.toUpperCase()}
        </div>
        <button
          onClick={() => {
            setIsRunning(true);
            setTimeout(() => setIsRunning(false), 1000);
            console.log("Run code");
          }}
          disabled={isRunning}
          className={`px-5 py-2 rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 
                     text-black font-medium shadow-lg shadow-amber-500/20 
                     transition-all duration-200 hover:shadow-amber-500/30 
                     hover:scale-102 active:scale-98 flex items-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:scale-100 disabled:hover:shadow-none`}
        >
          <Play className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
          <span className="text-sm">
            {isRunning ? "Running..." : "Run Code"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Playground;
