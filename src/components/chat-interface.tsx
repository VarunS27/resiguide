
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare, User, Loader2 } from 'lucide-react';
import { aiChatbotAssistant, type AIChatbotAssistantInput, type AIChatbotAssistantOutput } from '@/ai/flows/ai-chatbot-assistant';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  variant?: 'page' | 'widget';
}

export function ChatInterface({ variant = 'page' }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [aiAvatarUrl, setAiAvatarUrl] = useState('');
  const [userAvatarUrl, setUserAvatarUrl] = useState('');

  useEffect(() => {
    // Generate dynamic placeholder images only on the client
    setAiAvatarUrl('https://picsum.photos/seed/ai-avatar/40/40');
    setUserAvatarUrl('https://picsum.photos/seed/user-avatar/40/40');

    setMessages([
      {
        id: Date.now().toString(),
        text: `Hello! I'm the ${APP_NAME} AI Assistant. How can I help you with your real estate questions today?`,
        sender: 'ai',
        timestamp: new Date(),
      }
    ]);
  }, []);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);
  

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiInput: AIChatbotAssistantInput = { query: userMessage.text };
      const aiOutput: AIChatbotAssistantOutput = await aiChatbotAssistant(aiInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiOutput.response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error trying to respond. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerClass = variant === 'widget'
    ? "flex flex-col h-full"
    : "flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] max-w-3xl mx-auto bg-card shadow-2xl rounded-lg border animate-fade-in-up";

  const formClass = variant === 'widget'
    ? "p-3 border-t flex items-center space-x-2 bg-background"
    : "p-4 border-t flex items-center space-x-2 bg-background rounded-b-lg";

  return (
    <div className={containerClass}>
      {variant === 'page' && (
        <header className="p-4 border-b flex items-center bg-primary text-primary-foreground rounded-t-lg animate-fade-in-down">
          <MessageSquare className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-semibold">AI Real Estate Assistant</h2>
        </header>
      )}

      <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex items-end space-x-2 animate-pop-in animation-delay-${index === 0 ? '0' : '100'} ${
              msg.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.sender === 'ai' && (
              <Avatar className="h-8 w-8">
                {aiAvatarUrl && <AvatarImage src={aiAvatarUrl} alt="AI Avatar" data-ai-hint="robot face" />}
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg shadow ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-secondary text-secondary-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-secondary-foreground/70'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {msg.sender === 'user' && (
              <Avatar className="h-8 w-8">
                 {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt="User Avatar" data-ai-hint="person silhouette" />}
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end space-x-2 animate-pop-in animation-delay-100">
            <Avatar className="h-8 w-8">
              {aiAvatarUrl && <AvatarImage src={aiAvatarUrl} alt="AI Avatar" />}
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="max-w-[70%] p-3 rounded-lg shadow bg-secondary text-secondary-foreground rounded-bl-none">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className={`${formClass} animate-fade-in-up animation-delay-200`}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow h-10" 
          disabled={isLoading}
          aria-label="Chat input"
        />
        <Button type="submit" size="icon" className="h-10 w-10" disabled={isLoading || input.trim() === ''}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">Send Message</span>
        </Button>
      </form>
    </div>
  );
}

