import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  theme?: "vs-dark" | "light";
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, theme = "vs-dark" }) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (newValue: string | undefined) => {
    setCode(newValue || "");
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#FFD700] rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-2 text-[#FFD700]">Code Editor ({language.toUpperCase()})</h2>
      
      <Editor
        height="400px"
        defaultLanguage={language}
        defaultValue="// Start coding..."
        theme={theme}
        value={code}
        onChange={handleCodeChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
