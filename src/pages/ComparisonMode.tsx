import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GitCompare, Play, Zap, RefreshCw, BookOpen } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚙️' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'go', name: 'Go', icon: '🐹' }
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
}`
};

const LanguageSelector = ({ 
  selected, 
  onChange,
  disabled = false
}: { 
  selected: string | null, 
  onChange: (id: string) => void,
  disabled?: boolean
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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

const CodePreview = ({ sourceLanguage, targetLanguage }: { sourceLanguage: string, targetLanguage: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="glass-panel p-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center">
              <span className="mr-2">{languages.find(l => l.id === sourceLanguage)?.icon}</span>
              {languages.find(l => l.id === sourceLanguage)?.name}
            </h3>
          </div>
          <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{codeExamples[sourceLanguage]}</code>
          </pre>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center">
              <span className="mr-2">{languages.find(l => l.id === targetLanguage)?.icon}</span>
              {languages.find(l => l.id === targetLanguage)?.name}
            </h3>
          </div>
          <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{codeExamples[targetLanguage]}</code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: React.ComponentType<{ className?: string }>,
  title: string,
  description: string
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-amber-500" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const ComparisonMode = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null);

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
                <GitCompare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Language Comparison</h1>
                <p className="text-gray-400">Learn by comparing different programming languages</p>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Select Source Language</h2>
              <LanguageSelector
                selected={sourceLanguage}
                onChange={setSourceLanguage}
              />
            </div>

            {sourceLanguage && (
              <div>
                <h2 className="text-xl font-bold mb-4">Select Target Language</h2>
                <LanguageSelector
                  selected={targetLanguage}
                  onChange={setTargetLanguage}
                  disabled={!sourceLanguage}
                />
              </div>
            )}
          </div>

          {/* Code Preview */}
          {sourceLanguage && targetLanguage && (
            <CodePreview
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
            />
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Side-by-Side Learning"
              description="Compare syntax and concepts between languages in real-time."
            />
            <FeatureCard
              icon={RefreshCw}
              title="Interactive Examples"
              description="See how the same logic is implemented across different languages."
            />
            <FeatureCard
              icon={BookOpen}
              title="Comprehensive Guide"
              description="Detailed explanations of language-specific features and best practices."
            />
          </div>

          {/* Start Learning Button */}
          {sourceLanguage && targetLanguage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button className="btn-primary flex items-center space-x-2 group">
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start Comparison Learning</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonMode;
