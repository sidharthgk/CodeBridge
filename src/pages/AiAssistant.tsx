import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, Lightbulb, MessageSquare, Code2, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import { toast } from 'react-hot-toast';

const AiAssistant = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. How can I help you today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isThinking, setIsThinking] = useState(false);
  const [previousPage, setPreviousPage] = useState('');

  // Check if there's code from localStorage and determine previous page
  useEffect(() => {
    const savedCode = localStorage.getItem('codeForAI');
    const savedLanguage = localStorage.getItem('languageForAI');
    const referrer = document.referrer;
    
    // Try to determine where the user came from
    if (referrer) {
      const url = new URL(referrer);
      const path = url.pathname.split('/').pop();
      if (path) {
        setPreviousPage(path);
      }
    }
    
    if (savedCode) {
      setCode(savedCode);
      toast.success('Code loaded successfully!');
      
      // Add a message to the conversation about the code
      setConversation(prev => [
        ...prev,
        {
          role: 'user',
          content: `I need help with this ${savedLanguage || 'JavaScript'} code.`
        }
      ]);
      
      // Simulate AI thinking about the code
      setIsTyping(true);
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `I've analyzed your ${savedLanguage || 'JavaScript'} code. It looks like a simple function that greets a user. Is there something specific you'd like help with? For example:
            
1. Code optimization
2. Explaining how it works
3. Adding new features
4. Debugging issues`
          }
        ]);
        setIsTyping(false);
      }, 2000);
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

    // Simulate AI response with thinking animation
    setTimeout(() => {
      setIsThinking(false);
      
      // Generate a more contextual response based on the prompt
      let aiResponse = '';
      
      if (prompt.toLowerCase().includes('explain')) {
        aiResponse = `This code defines a simple greeting function that takes a name parameter and returns a formatted string. The function uses template literals (indicated by the backticks) to embed the name variable directly in the string.

After defining the function, it calls greet("World") and stores the result in a variable, then logs that result to the console. This is a common pattern in programming to demonstrate function usage.`;
      } else if (prompt.toLowerCase().includes('optimize')) {
        aiResponse = `Your code is already quite efficient for its purpose. For such a simple function, there's not much optimization needed.

However, if you're using this in a performance-critical application, you might consider:

1. Using a regular string concatenation instead of template literals for very simple cases
2. Memoizing the function if you call it repeatedly with the same inputs
3. For production, ensure you're using minification to reduce code size`;
      } else if (prompt.toLowerCase().includes('error') || prompt.toLowerCase().includes('bug')) {
        aiResponse = `I don't see any syntax errors in your code. The function should work as expected.

Common issues that might occur with similar code:
1. Make sure the function is called with a string parameter
2. Check that the template literal syntax is correct (using backticks)
3. Verify that the console.log statement is working in your environment

Would you like me to help debug a specific issue you're encountering?`;
      } else {
        aiResponse = `I've analyzed your code and it looks well-structured. The greet function takes a name parameter and returns a greeting message.

Here are some suggestions:
1. You could add input validation to handle empty strings or null values
2. Consider adding JSDoc comments to document the function's purpose and parameters
3. If this is part of a larger application, you might want to export this function

Would you like me to implement any of these suggestions?`;
      }
      
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
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