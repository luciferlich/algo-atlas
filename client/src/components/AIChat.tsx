import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, TrendingUp, Newspaper, Loader2, Sparkles, Bot, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isPending?: boolean;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant specialized in real-time cryptocurrency data and market news. Ask me about any coin price or latest market updates!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again or check if the API key is configured correctly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQueries = [
    "What's the current price of Bitcoin?",
    "Latest Ethereum news",
    "Solana price prediction",
    "Crypto market news today"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:via-violet-500 hover:to-purple-600 text-white font-bold px-6 py-2 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] border border-purple-400/30 relative overflow-hidden group"
        >
          <Brain className="h-4 w-4 mr-2 animate-pulse" />
          <span className="relative z-10">AI Assistant</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[85vh] bg-gradient-to-br from-gray-900 via-purple-900/20 to-black border border-purple-500/30 shadow-2xl">
        <DialogHeader className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-violet-500/20 to-purple-500/10 rounded-t-lg"></div>
          <DialogTitle className="flex items-center gap-3 text-purple-300 relative z-10">
            <div className="relative">
              <Brain className="h-6 w-6 animate-pulse text-purple-400" />
              <div className="absolute inset-0 animate-ping">
                <Brain className="h-6 w-6 text-purple-400/30" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent font-bold">
              AlgoAtlas Neural AI
            </span>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30 animate-pulse">
              • Processing
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full relative">
          {/* Neural Network Background */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" className="text-purple-400"/>
            </svg>
          </div>
          
          {/* AI Status Indicator */}
          {isLoading && (
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-400/30">
                <div className="relative">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-purple-300 text-sm font-medium">AI is generating analysis...</span>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-6 mb-4 max-h-[55vh] overflow-y-auto">
            <div className="space-y-6 min-h-0">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] break-words ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-purple-400/30 shadow-lg shadow-purple-500/10' 
                        : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-purple-300/20 shadow-lg shadow-purple-500/5'
                    } border rounded-2xl p-4 backdrop-blur-sm`}>
                      <div className="flex items-start gap-3">
                        {message.type === 'ai' && (
                          <div className="relative flex-shrink-0">
                            <Brain className="h-6 w-6 text-purple-400 animate-pulse" />
                            <div className="absolute inset-0 animate-ping opacity-30">
                              <Brain className="h-6 w-6 text-purple-400" />
                            </div>
                          </div>
                        )}
                        {message.type === 'user' && (
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">U</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p className="text-xs text-purple-300/60 mt-2 flex items-center gap-1">
                            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-purple-300/20 border rounded-2xl p-4 backdrop-blur-sm shadow-lg shadow-purple-500/5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Brain className="h-6 w-6 text-purple-400 animate-pulse" />
                        <div className="absolute inset-0 animate-ping opacity-30">
                          <Brain className="h-6 w-6 text-purple-400" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                        <span className="text-sm text-purple-300">Neural processing in progress...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested Queries */}
          {messages.length === 1 && (
            <motion.div 
              className="mb-6 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-purple-300/70 mb-3 font-medium">Quick neural queries:</p>
              <div className="grid grid-cols-2 gap-3">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gradient-to-r from-purple-900/30 to-violet-900/30 border-purple-400/30 hover:from-purple-800/50 hover:to-violet-800/50 hover:border-purple-300/50 text-purple-200 transition-all duration-300 backdrop-blur-sm"
                    onClick={() => setInput(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="flex gap-3 p-6 border-t border-purple-500/20 bg-gradient-to-r from-gray-900/50 to-purple-900/20 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crypto prices, news, or market analysis..."
                className="pr-16 bg-gray-900/80 border-purple-400/30 focus:border-purple-300/60 text-white placeholder:text-purple-300/50 rounded-xl backdrop-blur-sm h-12"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <TrendingUp className="h-4 w-4 text-green-400 animate-pulse" />
                <Newspaper className="h-4 w-4 text-blue-400 animate-pulse" />
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-500/25 rounded-xl h-12 px-6 transition-all duration-300"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChat;