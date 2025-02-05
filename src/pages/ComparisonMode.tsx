import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { runCode } from "../utils/api";

const languages = ["javascript", "python", "java", "cpp"];

function ComparisonMode() {
  const [lang1, setLang1] = useState("");
  const [lang2, setLang2] = useState("");
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");
  const [status1, setStatus1] = useState("");
  const [status2, setStatus2] = useState("");

  const handleRunCode = async (code: string, lang: string, setOutput: (output: string) => void, setStatus: (status: string) => void) => {
    setStatus("Running...");
    setOutput("");

    const result = await runCode(lang, code);

    if (result.status === "success") {
      setOutput(result.stdout || "No output.");
    } else {
      setOutput(result.error || "Error executing code.");
    }

    setStatus("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-5xl font-bold mb-8 text-[#FFD700] tracking-wide">Comparison Mode</h1>
      <p className="text-lg text-gray-300 mb-6">Select two languages to compare.</p>

      {/* Language Selection */}
      <div className="flex space-x-6 mb-6">
        <select
          className="px-6 py-3 bg-[#2D2D2D] border border-[#FFD700] text-white rounded-lg text-lg"
          value={lang1}
          onChange={(e) => setLang1(e.target.value)}
        >
          <option value="">Select Language 1</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          className="px-6 py-3 bg-[#2D2D2D] border border-[#FFD700] text-white rounded-lg text-lg"
          value={lang2}
          onChange={(e) => setLang2(e.target.value)}
        >
          <option value="">Select Language 2</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Show Editors only when both languages are selected */}
      {lang1 && lang2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#FFD700] shadow-lg">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-3">{lang1.toUpperCase()}</h2>
            <CodeEditor language={lang1} onRunCode={(code) => handleRunCode(code, lang1, setOutput1, setStatus1)} />
            {status1 && <p className="text-yellow-400">{status1}</p>}
            <pre className="text-lg text-white p-4 mt-3 bg-[#2D2D2D] rounded-lg">
              {output1 || "Run your code..."}
            </pre>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#FFD700] shadow-lg">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-3">{lang2.toUpperCase()}</h2>
            <CodeEditor language={lang2} onRunCode={(code) => handleRunCode(code, lang2, setOutput2, setStatus2)} />
            {status2 && <p className="text-yellow-400">{status2}</p>}
            <pre className="text-lg text-white p-4 mt-3 bg-[#2D2D2D] rounded-lg">
              {output2 || "Run your code..."}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComparisonMode;
