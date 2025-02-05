import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ModeSelection() {
  const navigate = useNavigate();
  const setSelectedMode = useState("")[1];

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    navigate(mode === "scratch" ? "/scratch-mode" : "/comparison-mode");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white">
      <h1 className="text-4xl font-bold mb-6 text-[#FFD700]">Choose Your Learning Mode</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button
          className="px-8 py-6 bg-[#2D2D2D] border border-[#FFD700] rounded-lg text-xl font-semibold hover:scale-105 transition"
          onClick={() => handleSelectMode("scratch")}
        >
          Scratch Mode <br />
          <span className="text-sm text-gray-400">Start learning from the basics.</span>
        </button>

        <button
          className="px-8 py-6 bg-[#2D2D2D] border border-[#FFD700] rounded-lg text-xl font-semibold hover:scale-105 transition"
          onClick={() => handleSelectMode("comparison")}
        >
          Comparison Mode <br />
          <span className="text-sm text-gray-400">Compare a new language with one you know.</span>
        </button>
      </div>
    </div>
  );
}

export default ModeSelection;

