import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Play, Download, Copy, Code2 } from 'lucide-react';

const CodeConverter = () => {
  const [fromLanguage, setFromLanguage] = useState('javascript');
  const [toLanguage, setToLanguage] = useState('python');
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');

  const handleConvert = () => {
    // Placeholder conversion logic
    if (fromLanguage === 'javascript' && toLanguage === 'python') {
      const converted = sourceCode
        .replace('const ', '')
        .replace('let ', '')
        .replace('var ', '')
        .replace(';', '')
        .replace('function ', 'def ')
        .replace('===', '==')
        .replace('{', ':')
        .replace('}', '');
      setConvertedCode(converted);
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'rust', label: 'Rust' },
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* Header */}
          <div className="glass-panel p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <Code2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Code Converter</h1>
                <p className="text-gray-400">Transform your code between different programming languages</p>
              </div>
            </div>
          </div>

          {/* Converter */}
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4 items-center flex-grow">
                <select
                  value={fromLanguage}
                  onChange={(e) => setFromLanguage(e.target.value)}
                  className="input-field bg-black/50 flex-grow"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-50" />
                  <GitCompare className="h-8 w-8 text-amber-500 relative" />
                </div>
                <select
                  value={toLanguage}
                  onChange={(e) => setToLanguage(e.target.value)}
                  className="input-field bg-black/50 flex-grow"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Source Code</label>
                  <button
                    onClick={() => setSourceCode('')}
                    className="text-sm text-amber-500 hover:text-amber-400"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  className="input-field h-96 font-mono"
                  placeholder="Enter your code here..."
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Converted Code</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(convertedCode)}
                      className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-amber-500" />
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([convertedCode], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `converted.${toLanguage}`;
                        a.click();
                      }}
                      className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                      title="Download file"
                    >
                      <Download className="h-4 w-4 text-amber-500" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={convertedCode}
                  readOnly
                  className="input-field h-96 font-mono"
                  placeholder="Converted code will appear here..."
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleConvert}
                className="btn-primary flex items-center space-x-2 group"
              >
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Convert Code</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeConverter;