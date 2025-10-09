import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotViewProps {
  userId: string;
  userName: string;
}

export function ChatbotView({ userId, userName }: ChatbotViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today? You can ask me about your appointments, services, payments, or any other questions.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call to Gemini/OpenAI
    // In production, this would call: 
    // const response = await fetch('/api/chat', { 
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: userMessage, userId })
    // });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('appointment') || lowerMessage.includes('booking')) {
      return 'I can help you with appointments! You have an upcoming house cleaning appointment on October 5th at 10:00 AM. Would you like to reschedule or book a new appointment?';
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('invoice')) {
      return 'Regarding payments, you currently have one pending invoice (INV-2025-002) for $150.00 due on October 10th. You can make a payment from the Payments tab. Would you like me to help with anything else?';
    } else if (lowerMessage.includes('modification') || lowerMessage.includes('project')) {
      return 'You have an active modification project: "Kitchen Renovation" which is currently 45% complete. The estimated completion date is October 30th. Would you like more details about the project timeline?';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('price')) {
      return 'We offer various services including House Cleaning ($100), HVAC Maintenance ($150), Plumbing Repair ($120), Electrical Work ($180), and Landscaping ($200). Which service are you interested in?';
    } else if (lowerMessage.includes('cancel')) {
      return 'To cancel an appointment, please go to the Appointments tab, find the appointment you want to cancel, and click the "Cancel" button. Is there a specific appointment you\'d like to cancel?';
    } else {
      return 'I understand you\'re asking about "' + userMessage + '". I can help you with appointments, payments, modification requests, and service information. Could you please provide more details about what you need help with?';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseContent = await generateAIResponse(input);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">AI Support Chat</h2>
        <p className="text-gray-600 mt-1">Get instant help with your questions</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <p className="text-sm text-gray-500">Powered by Gemini API</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className={message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                } max-w-[80%]`}
              >
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-gray-100">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: This is a simulated AI chatbot. In production, it would integrate with Gemini API.
          </p>
        </div>
      </Card>
    </div>
  );
}
