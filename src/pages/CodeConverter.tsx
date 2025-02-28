import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Play, Download, Copy, Code2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CodeConverter = () => {
  const [fromLanguage, setFromLanguage] = useState('javascript');
  const [toLanguage, setToLanguage] = useState('python');
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        toast.success('Code converted successfully!');
      }
    } catch (error) {
      toast.error('Failed to convert code. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedCode);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code.');
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([convertedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${toLanguage}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('File downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download file.');
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '📜' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'rust', label: 'Rust', icon: '🦀' },
  ];

  return (
    <div className="h-[calc(100vh-164px)] mt-[100px] px-6 pb-4">
      <div className="h-full flex flex-col">
        {/* Header with three sections */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          {/* Left: Title and Logo */}
          <motion.div className="flex items-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg mr-4">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gold-text bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Code Converter
              </h1>
              <p className="text-gray-400 text-sm mt-1">Transform your code instantly</p>
            </div>
          </motion.div>

          {/* Center: Select inputs with icon */}
          <motion.div className="flex-1 flex justify-start items-center transform ml-40">
          <div className="flex items-center space-x-3 bg-black/50 p-2 rounded-xl">
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
                className="input-field bg-black/50 w-full py-2 px-3 text-lg rounded-lg"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
              <div className="relative flex-shrink-0 flex items-center justify-center w-10">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-50" />
                <GitCompare className="h-6 w-6 text-amber-500 relative" />
              </div>
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
                className="input-field bg-black/50 py-2 px-3 w-full text-lg rounded-lg"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Right: Convert Button remains in place */}
          <motion.div className="flex items-center">
            <button
              onClick={handleConvert}
              disabled={isConverting || !sourceCode}
              className="btn-primary flex items-center space-x-2 group py-1.5 px-4 text-lg"
            >
              <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>{isConverting ? 'Converting...' : 'Convert'}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 flex-1 overflow-hidden grid grid-cols-2 gap-6 bg-black/50 rounded-xl"
        >
          {/* Source Code */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-medium text-gray-300">Source Code</label>
              <button
                onClick={() => setSourceCode('')}
                className="text-amber-500 hover:text-yellow-500 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="input-field font-mono text-lg h-full w-full bg-black/50 p-4 rounded-xl resize-none border border-white/10 focus:border-amber-500"
                placeholder="Enter your code here..."
              />
            </div>
          </div>

          {/* Converted Code */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-medium text-gray-300">Converted Code</label>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4 text-amber-500" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                  title="Download file"
                >
                  <Download className="h-4 w-4 text-amber-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={convertedCode}
                readOnly
                className="input-field font-mono text-lg h-full w-full bg-black/50 p-4 rounded-xl resize-none border border-white/10"
                placeholder="Converted code will appear here..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeConverter;
