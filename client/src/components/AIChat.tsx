import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, TrendingUp, Newspaper, Loader2, Sparkles, Bot, MessageCircle } from "lucide-react";
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
      content: 'Welcome to AlgoAtlas AI! I can help you with cryptocurrency analysis, market insights, and financial data. What would you like to explore today?',
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
          <MessageCircle className="h-4 w-4 mr-2" />
          <span className="relative z-10">AI Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] bg-black/95 backdrop-blur-sm border border-amber-500/30 shadow-2xl">
        <DialogHeader className="border-b border-amber-500/20 pb-4">
          <DialogTitle className="flex items-center gap-3 text-amber-400 text-xl font-bold">
            <MessageCircle className="h-6 w-6 text-amber-400" />
            AlgoAtlas AI Assistant
            {isLoading && (
              <Badge variant="secondary" className="bg-amber-600/20 text-amber-300 border-amber-500/30">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Analyzing
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">{/* Clean background with subtle pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent"></div>
          </div>

          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-6 mb-4 max-h-[60vh] overflow-y-auto">
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
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-black" />
                          </div>
                        )}
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">U</span>
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
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Loader2 className="h-4 w-4 text-black animate-spin" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-amber-300">Analyzing your request...</span>
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
              <p className="text-sm text-amber-300/70 mb-3 font-medium">Quick queries:</p>
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
          <div className="flex gap-3 p-6 border-t border-amber-500/20 bg-black/50 backdrop-blur-sm">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crypto prices, news, or market analysis..."
                className="pr-16 bg-gray-900/80 border-amber-400/30 focus:border-amber-300/60 text-white placeholder:text-amber-300/50 rounded-xl backdrop-blur-sm h-12"
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