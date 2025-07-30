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

      // Add delay to show the brain animation
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again or check if the API key is configured correctly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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
          variant="outline" 
          className="bg-transparent hover:bg-amber-500/10 border-2 border-amber-400 hover:border-amber-300 text-amber-400 hover:text-amber-300 font-semibold px-6 py-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] rounded-lg"
        >
          <Brain className="h-4 w-4 mr-2 animate-pulse" />
          <span className="relative z-10">Neural AI</span>

        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[85vh] bg-gradient-to-br from-gray-900 via-amber-900/20 to-black border border-amber-500/30 shadow-2xl p-0">
        <div className="flex flex-col h-full relative p-6">
          <DialogHeader className="border-b border-amber-500/20 pb-4 mb-6">
            <DialogTitle className="text-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                AlgoAtlas Neural AI
              </span>
            </DialogTitle>
          </DialogHeader>
          {/* Neural Network Background */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" className="text-amber-400"/>
            </svg>
          </div>
          
          {/* AI Status Indicator - Large Radiating Brain Animation */}
          {isLoading && (
            <div className="absolute inset-0 z-20 bg-black/95 backdrop-blur-md flex items-center justify-center">
              <div className="relative w-80 h-80 flex items-center justify-center">
                {/* Multiple radiating waves */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-amber-400/40 animate-ping" style={{animationDuration: '2s'}}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-2 border-amber-400/25 animate-ping" style={{animationDuration: '2.5s', animationDelay: '0.3s'}}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-amber-400/15 animate-ping" style={{animationDuration: '3s', animationDelay: '0.6s'}}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full border border-amber-400/10 animate-ping" style={{animationDuration: '3.5s', animationDelay: '0.9s'}}></div>
                </div>
                
                {/* Large center brain icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-16 w-16 text-amber-400 animate-pulse drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{animationDuration: '1.5s'}} />
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 mb-4 max-h-[55vh] overflow-y-auto">
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
                        ? 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-400/30 shadow-lg shadow-amber-500/10' 
                        : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-amber-300/20 shadow-lg shadow-amber-500/5'
                    } border rounded-2xl p-4 backdrop-blur-sm`}>
                      <div className="flex items-start gap-3">
                        {message.type === 'ai' && (
                          <div className="relative flex-shrink-0">
                            <Brain className="h-6 w-6 text-amber-400 animate-pulse" />
                            <div className="absolute inset-0 animate-ping opacity-30">
                              <Brain className="h-6 w-6 text-amber-400" />
                            </div>
                          </div>
                        )}
                        {message.type === 'user' && (
                          <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black text-xs font-bold">U</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p className="text-xs text-amber-300/60 mt-2 flex items-center gap-1">
                            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
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
                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-amber-300/20 border rounded-2xl p-4 backdrop-blur-sm shadow-lg shadow-amber-500/5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Brain className="h-6 w-6 text-amber-400 animate-pulse" />
                        <div className="absolute inset-0 animate-ping opacity-30">
                          <Brain className="h-6 w-6 text-amber-400" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                        <span className="text-sm text-amber-300">Neural processing in progress...</span>
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
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-amber-300/70 mb-3 font-medium">Quick neural queries:</p>
              <div className="grid grid-cols-2 gap-3">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-amber-400/30 hover:from-amber-800/50 hover:to-yellow-800/50 hover:border-amber-300/50 text-amber-200 transition-all duration-300 backdrop-blur-sm"
                    onClick={() => setInput(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="flex gap-3 pt-4 border-t border-amber-500/20 bg-gradient-to-r from-gray-900/50 to-amber-900/20 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crypto prices, news, or market analysis..."
                className="bg-gray-900/80 border-amber-400/30 focus:border-amber-300/60 text-white placeholder:text-amber-300/50 rounded-xl backdrop-blur-sm h-12"
                disabled={isLoading}
              />

            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black shadow-lg shadow-amber-500/25 rounded-xl h-12 px-6 transition-all duration-300"
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