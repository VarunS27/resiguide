'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare, User, Loader2, Mic, MicOff } from 'lucide-react';
import { aiChatbotAssistant, type AIChatbotAssistantInput, type AIChatbotAssistantOutput } from '@/ai/flows/ai-chatbot-assistant';
import { APP_NAME } from '@/lib/constants';
// import Image from 'next/image'; // Not strictly needed if AvatarImage handles src correctly

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

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [browserSupportsSpeech, setBrowserSupportsSpeech] = useState(false);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Generate dynamic placeholder images only on the client
    setAiAvatarUrl('https://picsum.photos/seed/ai-avatar/40/40');
    setUserAvatarUrl('https://picsum.photos/seed/user-avatar/40/40');

    setMessages([
      {
        id: Date.now().toString(),
        text: `Hello! I'm the ${APP_NAME} AI Assistant. How can I help you with your real estate questions or navigating our site today? You can also ask me about general property rates or rent prices in international locations (data provided is simulated). I can understand English, Hindi, and Gujarati. Try typing or using the microphone!`,
        sender: 'ai',
        timestamp: new Date(),
      }
    ]);

    // Check for SpeechRecognition API support
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setBrowserSupportsSpeech(true);
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = false; // Stop after first utterance
      recognitionInstance.interimResults = false;
      // Attempt to set language for better accuracy, but LLM handles text processing for multilingual.
      // User might need to ensure their browser/OS speech input language is set correctly for non-English.
      recognitionInstance.lang = 'en-US'; // Defaulting to English for STT, LLM will handle text.

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Optionally auto-send by creating a synthetic event
        // const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
        // handleSendMessage(syntheticEvent, transcript); 
      };
      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        // Provide user feedback for common errors
        if (event.error === 'no-speech') {
          // toast({ title: "No speech detected", description: "Please try speaking again."});
        } else if (event.error === 'audio-capture') {
          // toast({ title: "Microphone error", description: "Could not capture audio. Please check microphone permissions."});
        } else if (event.error === 'not-allowed') {
          // toast({ title: "Permission denied", description: "Microphone access was denied. Please enable it in your browser settings."});
        }
        setIsListening(false);
      };
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      speechRecognitionRef.current = recognitionInstance;
    } else {
      setBrowserSupportsSpeech(false);
      console.warn("Speech Recognition API not supported in this browser.");
    }
  }, []);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);
  

  const handleSendMessage = async (e: React.FormEvent, messageTextParam?: string) => {
    e.preventDefault();
    const currentMessageText = messageTextParam || input;
    if (currentMessageText.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    if (!messageTextParam) setInput(''); // Clear input only if not from voice auto-send
    setIsLoading(true);

    try {
      let langHint = 'en'; // Default language hint
      // Basic regex for Devanagari (Hindi) and Gujarati scripts
      if (/[\u0900-\u097F]/.test(currentMessageText)) { // Devanagari range
        langHint = 'hi';
      } else if (/[\u0A80-\u0AFF]/.test(currentMessageText)) { // Gujarati range
        langHint = 'gu';
      }

      const aiInput: AIChatbotAssistantInput = { query: userMessage.text, userLanguageHint: langHint };
      const aiOutput: AIChatbotAssistantOutput = await aiChatbotAssistant(aiInput);
      
      let aiResponseText = aiOutput.response;
      if (aiOutput.isRelevant && aiOutput.guidance) {
        const guidanceText = aiOutput.guidance.trim();
        const responseText = aiOutput.response.trim();
        if (responseText && guidanceText) {
            aiResponseText = `${responseText}\n\n${guidanceText}`;
        } else if (responseText) {
            aiResponseText = responseText;
        } else { // Only guidance
            aiResponseText = guidanceText;
        }
      } else if (!aiOutput.isRelevant) {
        aiResponseText = aiOutput.response;
      }


      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
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

  const handleToggleListening = () => {
    if (!browserSupportsSpeech || !speechRecognitionRef.current) {
      // toast({ title: "Voice input not supported", description: "Your browser does not support speech recognition."});
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        // toast({ title: "Could not start voice input", description: "Please ensure microphone permissions are granted."});
        setIsListening(false);
      }
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

      <ScrollArea className="flex-grow p-4 space-y-0" ref={scrollAreaRef}> {/* Changed space-y-4 to space-y-0, margins on individual messages now */}
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex items-end space-x-2 animate-pop-in animation-delay-${index === 0 ? '0' : '100'} mb-4 ${ // Added mb-4 for spacing
              msg.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.sender === 'ai' && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                {aiAvatarUrl && <AvatarImage src={aiAvatarUrl} alt="AI Avatar" data-ai-hint="robot face" />}
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg shadow-md ${ // Added shadow-md for better visibility
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
              <Avatar className="h-8 w-8 flex-shrink-0">
                 {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt="User Avatar" data-ai-hint="person silhouette" />}
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end space-x-2 animate-pop-in animation-delay-100 mb-4"> {/* Added mb-4 */}
            <Avatar className="h-8 w-8 flex-shrink-0">
              {aiAvatarUrl && <AvatarImage src={aiAvatarUrl} alt="AI Avatar" />}
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-secondary text-secondary-foreground rounded-bl-none">
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
          placeholder={isListening ? "Listening..." : "Ask a question..."}
          className="flex-grow h-10" 
          disabled={isLoading || isListening}
          aria-label="Chat input"
        />
        {browserSupportsSpeech && (
          <Button 
            type="button" 
            size="icon" 
            variant={isListening ? "destructive" : "outline"}
            className="h-10 w-10 flex-shrink-0" 
            onClick={handleToggleListening}
            disabled={isLoading} // Keep disabled if main form is loading
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
        <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0" disabled={isLoading || input.trim() === '' || isListening}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">Send Message</span>
        </Button>
      </form>
    </div>
  );
}
