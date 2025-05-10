'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChatInterface } from '@/components/chat-interface';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-[60] h-16 w-16 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110",
          "animate-pop-in",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90" 
        )}
        size="icon"
        aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-[calc(3.5rem+1.5rem+1rem)] right-6 z-50 w-[calc(100%-3rem)] sm:w-full max-w-sm animate-fade-in-up">
          <Card className="h-[450px] shadow-2xl rounded-lg flex flex-col overflow-hidden border animate-pop-in animation-delay-100">
            <CardHeader className="flex flex-row items-center justify-between p-3 border-b bg-card">
              <CardTitle className="text-base font-semibold text-card-foreground">AI Assistant</CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-0 pb-0 flex-grow overflow-hidden bg-card"> {/* Adjusted padding */}
              <ChatInterface variant="widget" />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
