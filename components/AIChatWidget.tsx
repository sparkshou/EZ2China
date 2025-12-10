import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChatWidget: React.FC = () => {
  const { isChatOpen, setChatOpen } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好！我是您的智能旅行顾问。我可以帮您寻找合适的研学项目、计算拼团优惠或解答行程疑问。请问有什么可以帮您？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Prepare history for Gemini
    const history = messages.map(m => ({ role: m.role, parts: m.text }));

    try {
      const responseText = await sendMessageToGemini(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText || "抱歉，我暂时无法回答。" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "网络连接似乎有问题，请稍后再试。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return (
      <button 
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-900/30 hover:bg-red-800 transition-all z-50 flex items-center gap-2 group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition" />
        <span className="font-bold hidden md:inline">AI 咨询</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col border border-gray-100 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-red-700 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1 rounded-full">
            <Sparkles size={16} className="text-yellow-300" />
          </div>
          <h3 className="font-bold">智能旅行顾问</h3>
        </div>
        <button onClick={() => setChatOpen(false)} className="hover:bg-red-800 p-1 rounded transition">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-red-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 text-gray-500 rounded-2xl rounded-bl-none p-3 text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="问问有什么推荐..."
          className="flex-1 bg-gray-50 border-0 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition ${isLoading ? 'bg-gray-200' : 'bg-red-700 text-white hover:bg-red-800 shadow-md'}`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};