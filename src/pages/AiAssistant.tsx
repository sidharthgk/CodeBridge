import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, Lightbulb, MessageSquare, Code2, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import { toast } from 'react-hot-toast';

// Import the library
import { GoogleGenerativeAI } from '@google/generative-ai';

const AiAssistant = () => {
  const navigate = useNavigate();

  // Chat state
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI coding assistant. How can I help you today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  // If you have environment variables, use them instead
  // e.g. const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '...';
  const geminiApiKey = 'AIzaSyAL6kABn-Vf669bPbFAEcXf-35Xv9tGWAA'; // inline for demonstration

  // Load initial code from local storage
  useEffect(() => {
    const savedCode = localStorage.getItem('codeForAI');
    const savedLanguage = localStorage.getItem('languageForAI');
    if (savedCode) {
      setCode(savedCode);
      toast.success('Code loaded successfully!');
      setConversation(prev => [
        ...prev,
        {
          role: 'user',
          content: ``
        }
      ]);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    localStorage.removeItem('codeForAI');
    localStorage.removeItem('languageForAI');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add the user message to the conversation
    setConversation(prev => [...prev, { role: 'user', content: prompt }]);
    setIsTyping(true);

    try {
      // 1) Initialize the client
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      // 2) Grab the model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // 3) Build a single string prompt that includes the code + user’s new question
      let combinedPrompt = '';
      if (code) {
        combinedPrompt += `User's code:\n${code}\n\n`;
      }
      combinedPrompt += `User's question:\n${prompt}\n\nAI Reply:`;

      // 4) Call generateContent
      const result = await model.generateContent(combinedPrompt);
      const responseText = typeof result.response.text === 'function'
        ? result.response.text()
        : result.response.text;

      // 5) Add the AI reply to conversation
      setConversation(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I ran into an error. Please try again.'
        }
      ]);
    } finally {
      setIsTyping(false);
      setPrompt('');
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
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
                {/* If user is typing, show a small “AI is thinking” or “User is typing” indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-black/60 text-gray-200 p-4 rounded-lg border border-gray-800 max-w-[90%]">
                      <div className="flex flex-col space-y-2">
                        <div className="text-sm text-amber-500">Analyzing your code...</div>
                        <div className="flex space-x-2">
                          <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />
                          <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse" />
                          <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse [animation-delay:0.2s]" />
                          <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse [animation-delay:0.4s]" />
                        </div>
                      </div>
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
                height="380px"
                showAiButton={false}
                showHeader={true}
                showFooter={true}
                showOutput={true}
                onCodeChange={newCode => setCode(newCode)}
                onLanguageChange={newLang => setLanguage(newLang)}
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <Lightbulb className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-gray-400">
                Get intelligent code suggestions and best practices as you write.
              </p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <MessageSquare className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Natural Conversations</h3>
              <p className="text-gray-400">
                Ask questions in plain English and get clear, helpful responses.
              </p>
            </div>
            <div className="glass-panel p-6 bg-black/40 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <Code2 className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Code Explanations</h3>
              <p className="text-gray-400">
                Get detailed explanations of code snippets and concepts.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AiAssistant;
