import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string; // Added for animation keys
}

const GROQ_API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { 
      role: 'user' as const, 
      content: input,
      id: Date.now().toString() // Add unique ID for animation
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0]) {
        throw new Error('Invalid response format from API');
      }

      const assistantMessage = {
        role: 'assistant' as const,
        content: data.choices[0].message.content,
        id: Date.now().toString() // Add unique ID for animation
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content: "I apologize, but I encountered an error while processing your request. This could be due to:\n\n1. API rate limits\n2. Network connectivity issues\n3. API endpoint being unavailable\n\nPlease try again in a moment.",
        id: Date.now().toString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar with slide animation */}
      <div className="w-64 bg-gray-800 p-4 hidden md:block transform transition-transform duration-300 ease-in-out">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors duration-200 hover:scale-105 transform"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <div className="text-gray-400 text-sm">
          <h3 className="font-medium mb-2">Previous Chats</h3>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'assistant' ? 'bg-gray-800' : ''
              } p-4 rounded-lg transform transition-all duration-300 ease-out opacity-0 translate-y-4 animate-message`}
            >
              <div className="flex-shrink-0 transition-transform duration-200 hover:scale-110">
                {message.role === 'assistant' ? (
                  <Bot className="w-6 h-6 text-blue-500" />
                ) : (
                  <User className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div className="flex-1 text-white whitespace-pre-wrap">{message.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-400 animate-fadeIn">
              <Bot className="w-6 h-6 animate-bounce" />
              <span className="animate-pulse">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area with animations */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 animate-slideUp">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-700 focus:scale-[1.02] transform"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95 transform"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Add global styles for animations */}
      <style>{`
        @keyframes messageAppear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-message {
          animation: messageAppear 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;