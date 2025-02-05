import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Code2 } from 'lucide-react';

function Learn() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'scratch';

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Code2 className="w-8 h-8 text-[#FFD700]" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
          {mode === 'compare' ? 'Language Comparison' : 'Learn from Scratch'}
        </h1>
      </div>

      <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
        <p className="text-gray-400">
          {mode === 'compare'
            ? 'Select the language you know and the language you want to learn to start comparing.'
            : 'Choose a programming language to begin your coding journey.'}
        </p>
      </div>

      {/* Language selection will be implemented in the next iteration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mode === 'compare' && (
          <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
            <h2 className="text-xl font-semibold mb-4">Language You Know</h2>
            <p className="text-gray-400">Select a language you're familiar with</p>
          </div>
        )}
        <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
          <h2 className="text-xl font-semibold mb-4">
            {mode === 'compare' ? 'Language to Learn' : 'Choose Language'}
          </h2>
          <p className="text-gray-400">Select a language you want to learn</p>
        </div>
      </div>
    </div>
  );
}

export default Learn;