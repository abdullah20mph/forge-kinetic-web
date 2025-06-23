import React, { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Clock, Zap } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp?: Date;
  modelUsed?: string;
  responseTime?: number;
}

export const ChatbotModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMessages([
        { 
          sender: "bot", 
          text: "Hello! I'm here to help you learn more about our services. You can ask me about our services, pricing, process, timeline, or anything else related to our business.",
          timestamp: new Date()
        }
      ]);
      // Generate new session ID when opening
      setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { 
      sender: "user", 
      text: input,
      timestamp: new Date()
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
          sessionId: sessionId
        }),
      });
      
      if (!res.ok) {
        throw new Error('API request failed');
      }
      
      const data = await res.json();
      const botMsg: Message = { 
        sender: "bot", 
        text: data.reply,
        timestamp: new Date(),
        modelUsed: data.modelUsed,
        responseTime: data.responseTime
      };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((msgs) => [
        ...msgs,
        { 
          sender: "bot", 
          text: "Sorry, I'm having trouble connecting right now. Please try again later or contact us directly.",
          timestamp: new Date()
        },
      ]);
    }
    setLoading(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-0 relative flex flex-col h-[80vh] max-h-[600px] border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6" />
            <h3 className="font-semibold">Business Assistant</h3>
          </div>
          <button
            className="text-white hover:text-gray-200 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-300 text-gray-700"
                }`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  
                  {/* Message metadata for bot messages */}
                  {msg.sender === "bot" && msg.timestamp && (
                    <div className="mt-2 flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>
                      {msg.modelUsed && (
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span className={`px-1.5 py-0.5 rounded text-xs ${
                            msg.modelUsed === 'gemini-1.5-flash' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {msg.modelUsed === 'gemini-1.5-flash' ? 'Gemini' : 'Fallback'}
                          </span>
                        </div>
                      )}
                      {msg.responseTime && (
                        <span className="text-gray-400">
                          {msg.responseTime}ms
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={sendMessage}
          className="flex items-center border-t border-gray-200 p-4 bg-white rounded-b-2xl"
        >
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Ask about our services, pricing, process..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
