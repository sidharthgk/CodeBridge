import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GitCompare, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚙️' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'go', name: 'Go', icon: '🐹' },
];

const codeExamples: Record<string, string> = {
  python: `def greet(name):
    return f"Hello, {name}!"

result = greet("World")
print(result)`,
  javascript: `function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet("World");
console.log(result);`,
  java: `public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        String result = greet("World");
        System.out.println(result);
    }
}`,
  cpp: `#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::string result = greet("World");
    std::cout << result << std::endl;
    return 0;
}`,
  rust: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let result = greet("World");
    println!("{}", result);
}`,
  go: `package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    result := greet("World")
    fmt.Println(result)
}`,
};

// LanguageSelector component
const LanguageSelector = ({
  selected,
  onChange,
  disabled = false,
}: {
  selected: string | null;
  onChange: (id: string) => void;
  disabled?: boolean;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="glass-panel p-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <motion.button
            key={lang.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(lang.id)}
            disabled={disabled}
            className={`p-4 rounded-lg transition-all duration-300 ${
              selected === lang.id
                ? 'bg-amber-500/20 border border-amber-500'
                : 'glass-panel hover:border-amber-500/30'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-2xl mb-2">{lang.icon}</div>
            <div className="text-sm font-medium">{lang.name}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Shows code for a single language
const LanguageCard = ({ languageId }: { languageId: string }) => {
  const language = languages.find((l) => l.id === languageId);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center">
          <span className="mr-2">{language?.icon}</span>
          {language?.name}
        </h3>
      </div>
      <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono">{codeExamples[languageId]}</code>
      </pre>
    </motion.div>
  );
};

// Calculates and displays a compatibility score
const CompatibilityCard = ({
  source,
  target,
}: {
  source: string;
  target: string;
}) => {
  const compatibilityMatrix: Record<string, Record<string, number>> = {
    python: { javascript: 85, java: 70, cpp: 65, rust: 60, go: 75 },
    javascript: { python: 85, java: 80, cpp: 70, rust: 55, go: 80 },
    java: { python: 70, javascript: 80, cpp: 90, rust: 50, go: 65 },
    cpp: { python: 65, javascript: 70, java: 90, rust: 60, go: 70 },
    rust: { python: 60, javascript: 55, java: 50, cpp: 60, go: 65 },
    go: { python: 75, javascript: 80, java: 65, cpp: 70, rust: 65 },
  };

  let score = 0;
  if (source === target) {
    score = 100;
  } else {
    score = compatibilityMatrix[source]?.[target] || 50;
  }

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 flex flex-col items-center justify-center"
    >
      <h3 className="text-lg font-bold mb-2">Compatibility Score</h3>
      <div className="text-4xl font-bold">{score}%</div>
    </motion.div>
  );
};

// Displays two languages side by side + compatibility
const CodePreview = ({
  sourceLanguage,
  targetLanguage,
}: {
  sourceLanguage: string;
  targetLanguage: string;
}) => {
  return (
    <div className="glass-panel p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LanguageCard languageId={sourceLanguage} />
        <LanguageCard languageId={targetLanguage} />
      </div>
      <div className="mt-6">
        <CompatibilityCard source={sourceLanguage} target={targetLanguage} />
      </div>
    </div>
  );
};

const ComparisonMode = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null);

  const targetSelectorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sourceLanguage && !targetLanguage && targetSelectorRef.current) {
      targetSelectorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sourceLanguage, targetLanguage]);

  useEffect(() => {
    if (targetLanguage && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetLanguage]);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          <div className="glass-panel p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <GitCompare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Language Comparison</h1>
                <p className="text-gray-400">
                  Learn by comparing different programming languages
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h2 className="text-xl font-bold mb-4">Select Source Language</h2>
              <LanguageSelector
                selected={sourceLanguage}
                onChange={setSourceLanguage}
              />
            </div>

            {sourceLanguage && (
              <div ref={targetSelectorRef}>
                <h2 className="text-xl font-bold mb-4">Select Target Language</h2>
                <LanguageSelector
                  selected={targetLanguage}
                  onChange={setTargetLanguage}
                  disabled={!sourceLanguage}
                />
              </div>
            )}
          </div>

          {sourceLanguage && targetLanguage && (
            <CodePreview
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
            />
          )}

          {sourceLanguage && targetLanguage && (
            <motion.div
              ref={buttonRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-10"
            >
              <Link to="/comparison-lesson">
              <button className="btn-primary flex items-center space-x-2 group">
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start Comparison Learning</span>
              </button>
              </Link>
            </motion.div>
            
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonMode;
