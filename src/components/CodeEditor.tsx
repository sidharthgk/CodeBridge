import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  theme?: "vs-dark" | "light";
  onRunCode?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, theme = "vs-dark", onRunCode }) => {
  const [code, setCode] = useState("");

  return (
    <div className="bg-[#1A1A1A] border border-[#FFD700] rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-2 text-[#FFD700]">Code Editor ({language.toUpperCase()})</h2>
      
      <Editor
        height="400px"
        defaultLanguage={language}
        defaultValue="// Start coding..."
        theme={theme}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true }}
      />

      {onRunCode && (
        <button
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-black rounded-lg font-semibold hover:scale-105"
          onClick={() => onRunCode(code)}
        >
          Run Code
        </button>
      )}
    </div>
  );
};

export default CodeEditor;
