import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, TrendingUp, Newspaper, Loader2, Sparkles, Bot } from "lucide-react";
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
          className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-black font-bold px-6 py-2 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] border border-amber-400/30 relative overflow-hidden group"
        >
          <span className="relative z-10">AI Assistant</span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] bg-black border-yellow-600/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-400">
            <Sparkles className="h-5 w-5" />
            AlgoAtlas AI Assistant
            <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300 border-yellow-600/30">
              Live Analysis
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 mb-4 max-h-[50vh] overflow-y-auto">
            <div className="space-y-4 min-h-0">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] break-words ${
                      message.type === 'user' 
                        ? 'bg-yellow-600/20 border-yellow-600/30' 
                        : 'bg-gray-800/50 border-gray-700/30'
                    } border rounded-lg p-3`}>
                      <div className="flex items-start gap-2">
                        {message.type === 'ai' && (
                          <Bot className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs text-gray-400 mt-1">
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800/50 border-gray-700/30 border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-yellow-400" />
                      <Loader2 className="h-4 w-4 animate-spin text-yellow-400" />
                      <span className="text-sm text-gray-300">Analyzing real-time data...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested Queries */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gray-800/50 border-gray-700/30 hover:bg-yellow-600/20 hover:border-yellow-600/30"
                    onClick={() => setInput(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2 p-4 border-t border-gray-800">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crypto prices, news, or market analysis..."
                className="pr-12 bg-gray-900/50 border-gray-700/30 focus:border-yellow-600/50"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <Newspaper className="h-4 w-4 text-blue-400" />
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-yellow-600 hover:bg-yellow-500 text-black"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChat;