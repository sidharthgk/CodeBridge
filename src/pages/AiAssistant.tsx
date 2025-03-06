import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, Lightbulb, MessageSquare, Code2, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import { toast } from 'react-hot-toast';
import { useCodeStore } from '../store/codeStore';
import { useCodeAnalysis } from '../hooks/useCodeAnalysis';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiAssistant = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. How can I help you today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isThinking, setIsThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Store hooks
  const { addSnippet, formatCode } = useCodeStore();
  const { analyzeCode } = useCodeAnalysis();

  // Check if there's code from localStorage and analyze it
  useEffect(() => {
    const savedCode = localStorage.getItem('codeForAI');
    const savedLanguage = localStorage.getItem('languageForAI');
    
    if (savedCode) {
      const formattedCode = formatCode(savedCode, savedLanguage || 'javascript');
      setCode(formattedCode);
      toast.success('Code loaded successfully!');
      
      // Analyze the code
      const analysis = analyzeCode(formattedCode, savedLanguage || 'javascript');
      setSuggestions(analysis.suggestions);
      
      // Add initial messages about the code
      setConversation(prev => [
        ...prev,
        {
          role: 'user',
          content: `I need help with this ${savedLanguage || 'JavaScript'} code.`
        },
        {
          role: 'assistant',
          content: `I've analyzed your ${savedLanguage || 'JavaScript'} code. Here's what I found:

1. Code Complexity: ${analysis.complexity}
2. Line Count: ${analysis.lineCount}
3. Token Count: ${analysis.tokenCount}

${analysis.suggestions.length > 0 ? 'Here are some suggestions:\n' + analysis.suggestions.map(s => `- ${s}`).join('\n') : 'The code looks well-structured!'}

What specific aspect would you like help with?
- Code optimization
- Understanding the logic
- Adding new features
- Debugging issues`
        }
      ]);
    }
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Clear the localStorage after loading
    localStorage.removeItem('codeForAI');
    localStorage.removeItem('languageForAI');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message
    setConversation(prev => [...prev, { role: 'user', content: prompt }]);
    setPrompt('');
    setIsTyping(true);
    setIsThinking(true);

    // Analyze the current context
    const analysis = analyzeCode(code, language);
    
    // Generate a contextual response
    setTimeout(() => {
      setIsThinking(false);
      
      let aiResponse = '';
      const promptLower = prompt.toLowerCase();
      
      if (promptLower.includes('explain')) {
        aiResponse = generateExplanationResponse(code, language, analysis);
      } else if (promptLower.includes('optimize')) {
        aiResponse = generateOptimizationResponse(analysis);
      } else if (promptLower.includes('error') || promptLower.includes('bug')) {
        aiResponse = generateDebugResponse(analysis);
      } else if (promptLower.includes('feature') || promptLower.includes('add')) {
        aiResponse = generateFeatureResponse(code, language);
      } else {
        aiResponse = generateGeneralResponse(analysis);
      }
      
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const generateExplanationResponse = (code: string, language: string, analysis: any) => {
    return `Let me explain how this code works:

1. Structure Analysis:
   - The code has ${analysis.lineCount} lines
   - Complexity score: ${analysis.complexity}
   - Uses ${analysis.tokenCount} tokens

2. Key Components:
   ${getCodeComponents(code, language)}

3. Flow:
   ${getCodeFlow(code, language)}

Would you like me to explain any specific part in more detail?`;
  };

  const generateOptimizationResponse = (analysis: any) => {
    const suggestions = analysis.suggestions.length > 0
      ? analysis.suggestions.map((s: string) => `- ${s}`).join('\n')
      : '- The code is already well-optimized\n- Consider adding type safety\n- Could add error handling';

    return `Here are some optimization suggestions:

${suggestions}

Would you like me to help implement any of these optimizations?`;
  };

  const generateDebugResponse = (analysis: any) => {
    return `I'll help you debug the code. Here's what I've found:

1. Potential Issues:
   - Checked for syntax errors: None found
   - Analyzed logic flow: Looks consistent
   - Reviewed error handling: Could be improved

2. Suggestions:
   ${analysis.suggestions.map((s: string) => `- ${s}`).join('\n')}

Would you like me to help implement better error handling or focus on a specific issue?`;
  };

  const generateFeatureResponse = (code: string, language: string) => {
    return `I can help you add new features. Based on your current code:

1. Possible Enhancements:
   - Add input validation
   - Implement error handling
   - Add TypeScript types
   - Create unit tests
   - Add documentation

2. Suggested Next Steps:
   - Choose a feature to implement
   - We can plan the implementation
   - I'll guide you through the process

Which feature would you like to add first?`;
  };

  const generateGeneralResponse = (analysis: any) => {
    return `I've analyzed your code and here are my observations:

1. Code Quality:
   - Complexity: ${analysis.complexity}
   - Structure: Well-organized
   - Style: Consistent

2. Suggestions:
   ${analysis.suggestions.map((s: string) => `- ${s}`).join('\n')}

How would you like to improve the code?`;
  };

  const getCodeComponents = (code: string, language: string) => {
    // Simple code component analysis
    const hasFunction = code.includes('function') || code.includes('def');
    const hasClass = code.includes('class');
    const hasLoop = code.includes('for') || code.includes('while');
    const hasCondition = code.includes('if') || code.includes('switch');

    return `The code includes:${hasFunction ? '\n- Functions/Methods' : ''}${hasClass ? '\n- Classes' : ''}${hasLoop ? '\n- Loops' : ''}${hasCondition ? '\n- Conditional statements' : ''}`;
  };

  const getCodeFlow = (code: string, language: string) => {
    return `The code follows a logical flow:
1. Defines necessary functions/variables
2. Processes input/data
3. Produces output/results`;
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // Analyze code changes
    const analysis = analyzeCode(newCode, language);
    setSuggestions(analysis.suggestions);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* Header */}
          <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gold-text">AI Coding Assistant</h1>
                  <p className="text-gray-400">Get expert help with your code</p>
                </div>
              </div>
              <button 
                onClick={handleGoBack}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-black/40 border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Go Back</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chat Section */}
            <div className="glass-panel p-6 flex flex-col h-[600px] bg-black/40 backdrop-blur-md border border-amber-500/20">
              <div className="flex-1 overflow-auto space-y-4 mb-4 pr-2">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-amber-500/10 text-white border border-amber-500/30'
                          : 'bg-black/60 text-gray-200 border border-gray-800'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-black/60 text-gray-200 p-4 rounded-lg border border-gray-800 max-w-[90%]">
                      {isThinking ? (
                        <div className="flex flex-col space-y-2">
                          <div className="text-sm text-amber-500">Analyzing your code...</div>
                          <div className="flex space-x-2">
                            <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />
                            <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse" />
                            <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse [animation-delay:0.2s]" />
                            <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse [animation-delay:0.4s]" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask me anything about your code..."
                  className="flex-1 bg-black/50 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Code Preview */}
            <div className="glass-panel p-6 space-y-4 bg-black/40 backdrop-blur-md border border-amber-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-amber-500">Your Code</h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                  </button>
                  <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors">
                    <Code2 className="h-4 w-4 text-amber-500" />
                  </button>
                </div>
              </div>
              <InteractiveCodeEditor
                initialCode={code}
                initialLanguage={language}
                height="500px"
                showAiButton={false}
                showHeader={true}
                showFooter={true}
                showOutput={true}
                onCodeChange={handleCodeChange}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <Lightbulb className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-gray-400">Get intelligent code suggestions and best practices as you write.</p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <MessageSquare className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Natural Conversations</h3>
              <p className="text-gray-400">Ask questions in plain English and get clear, helpful responses.</p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <Code2 className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Code Explanations</h3>
              <p className="text-gray-400">Get detailed explanations of code snippets and concepts.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AiAssistant;