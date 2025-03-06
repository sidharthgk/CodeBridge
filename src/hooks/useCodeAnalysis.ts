import { useState, useCallback } from 'react';
import hljs from 'highlight.js';

interface CodeAnalysis {
  complexity: number;
  suggestions: string[];
  tokenCount: number;
  lineCount: number;
  characterCount: number;
}

export const useCodeAnalysis = () => {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = useCallback((code: string, language: string): CodeAnalysis => {
    setIsAnalyzing(true);

    try {
      // Basic code metrics
      const lines = code.split('\n');
      const lineCount = lines.length;
      const characterCount = code.length;
      
      // Tokenization using highlight.js
      const highlighted = hljs.highlight(code, { language }).value;
      const tokens = highlighted.split(/\s+/).filter(Boolean);
      const tokenCount = tokens.length;

      // Simple complexity analysis
      let complexity = 0;
      const complexityIndicators = [
        { pattern: /if|else|switch|case/g, weight: 1 },
        { pattern: /for|while|do/g, weight: 2 },
        { pattern: /function|class/g, weight: 1 },
        { pattern: /try|catch|finally/g, weight: 1 },
        { pattern: /\?\./g, weight: 0.5 }, // Optional chaining
        { pattern: /\?\?/g, weight: 0.5 }, // Nullish coalescing
      ];

      complexityIndicators.forEach(({ pattern, weight }) => {
        const matches = code.match(pattern) || [];
        complexity += matches.length * weight;
      });

      // Generate suggestions
      const suggestions: string[] = [];

      if (lineCount > 30) {
        suggestions.push('Consider breaking this code into smaller functions');
      }

      if (complexity > 10) {
        suggestions.push('High complexity detected. Consider simplifying the logic');
      }

      if (code.includes('console.log')) {
        suggestions.push('Remember to remove console.log statements in production');
      }

      const analysis: CodeAnalysis = {
        complexity,
        suggestions,
        tokenCount,
        lineCount,
        characterCount,
      };

      setAnalysis(analysis);
      setIsAnalyzing(false);

      return analysis;
    } catch (error) {
      console.error('Error analyzing code:', error);
      setIsAnalyzing(false);
      throw error;
    }
  }, []);

  return {
    analyzeCode,
    analysis,
    isAnalyzing,
  };
};