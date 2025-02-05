import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { runCode } from "../utils/api";

const languages = ["javascript", "python", "java", "cpp"];

function ScratchMode() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleRunCode = async (code: string) => {
    setStatus("Running...");
    setOutput("");

    const result = await runCode(selectedLanguage, code);

    if (result.status === "success") {
      setOutput(result.stdout || "No output.");
    } else {
      setOutput(result.error || "Error executing code.");
    }

    setStatus("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-5xl font-bold mb-8 text-[#FFD700] tracking-wide">Scratch Mode</h1>
      <p className="text-lg text-gray-300 mb-6">Choose a language to start coding.</p>

      {/* Language Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`px-6 py-3 rounded-lg transition-all text-lg font-semibold ${
              selectedLanguage === lang
                ? "bg-[#FFD700] text-black shadow-lg scale-110"
                : "bg-[#2D2D2D] text-white hover:scale-105"
            }`}
            onClick={() => {
              setSelectedLanguage(lang);
              setShowEditor(true);
            }}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Show Code Editor only after Language is Selected */}
      {showEditor && (
        <div className="w-full max-w-4xl">
          <CodeEditor language={selectedLanguage} onRunCode={handleRunCode} />

          {/* Output Section */}
          <div className="mt-6 bg-[#2D2D2D] border border-[#FFD700] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-3">Output:</h2>
            {status && <p className="text-yellow-400">{status}</p>}
            <pre className="text-lg text-white p-4 bg-[#1A1A1A] rounded-lg">
              {output || "Run your code to see the output..."}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScratchMode;
