import React, { useState } from "react";
import { Code2 } from "lucide-react";
import CodeEditor from "../components/CodeEditor";

function Learn() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center space-x-4">
        <Code2 className="w-8 h-8 text-[#FFD700]" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
          Learn by Coding
        </h1>
      </div>

      {/* Language Selector */}
      <div className="flex space-x-4">
        {["javascript", "python", "java", "cpp"].map((lang) => (
          <button
            key={lang}
            className={`px-4 py-2 rounded-md ${
              selectedLanguage === lang ? "bg-[#FFD700] text-black" : "bg-[#2D2D2D] text-white"
            } transition hover:scale-105`}
            onClick={() => setSelectedLanguage(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Monaco Code Editor */}
      <CodeEditor language={selectedLanguage} />
    </div>
  );
}

export default Learn;
