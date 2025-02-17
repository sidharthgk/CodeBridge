import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, Lightbulb, MessageSquare, Code2 } from 'lucide-react';
import Editor from "@monaco-editor/react";

const AiAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. How can I help you today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message
    setConversation(prev => [...prev, { role: 'user', content: prompt }]);
    setPrompt('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: 'Here\'s a sample response from the AI assistant. In a real implementation, this would be connected to an AI service.'
      }]);
      setIsTyping(false);
    }, 1500);
  };

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
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">AI Coding Assistant</h1>
                <p className="text-gray-400">Get help with your code and learn faster</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chat Section */}
            <div className="glass-panel p-6 flex flex-col h-[600px]">
              <div className="flex-1 overflow-auto space-y-4 mb-4">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-black/40 text-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-black/40 text-gray-200 p-4 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
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
                  placeholder="Ask me anything about coding..."
                  className="flex-1 bg-black/30 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Code Preview */}
            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Code Preview</h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                  </button>
                  <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors">
                    <Code2 className="h-4 w-4 text-amber-500" />
                  </button>
                </div>
              </div>
              <Editor
                height="500px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value="// Your code will appear here"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14
                }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel p-6">
              <Lightbulb className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-gray-400">Get intelligent code suggestions and best practices as you write.</p>
            </div>
            <div className="glass-panel p-6">
              <MessageSquare className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Natural Conversations</h3>
              <p className="text-gray-400">Ask questions in plain English and get clear, helpful responses.</p>
            </div>
            <div className="glass-panel p-6">
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