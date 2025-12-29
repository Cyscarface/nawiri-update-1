
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { UserRole } from '../types';
import { MessageSquare, Send, X, Minus, ChevronRight, Bot, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAssistantProps {
  userRole: UserRole;
  userName: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ userRole, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Greetings ${userName}, I am your nawiri360 intelligence guide. How may I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = geminiService.startChat(userRole, userName);
    }
  }, [userRole, userName]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const stream = await chatSessionRef.current.sendMessageStream({ message: userMessage });
      let fullResponse = '';
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        fullResponse += text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Our intelligence systems are experiencing high demand. Please attempt your query again shortly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed z-[100] font-sans transition-all duration-500 ${
      isOpen 
        ? 'inset-x-4 bottom-24 md:inset-auto md:bottom-10 md:right-10' 
        : 'bottom-28 right-6 md:bottom-10 md:right-10'
    }`}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-900 hover:bg-emerald-950 text-amber-400 p-4 md:p-5 rounded-[24px] shadow-2xl transition-all hover:scale-110 active:scale-95 group relative overflow-hidden ring-4 ring-white dark:ring-emerald-800 shadow-emerald-900/40"
        >
          <div className="absolute inset-0 bg-amber-400/10 scale-0 group-hover:scale-100 transition-transform rounded-full duration-700"></div>
          <MessageSquare size={28} className="relative z-10 md:w-8 md:h-8" strokeWidth={2.5} />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-500 rounded-full border-4 border-emerald-900 animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-[#0D1512] w-full md:w-[420px] h-[75vh] md:h-[650px] max-h-[85vh] rounded-[32px] md:rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 dark:border-emerald-900/30 animate-in slide-in-from-bottom-12 fade-in duration-500 shadow-emerald-950/20">
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-800 p-6 md:p-8 flex items-center justify-between text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="flex items-center gap-3 md:gap-4 relative z-10">
              <div className="bg-amber-400/20 p-2 md:p-3 rounded-2xl backdrop-blur-md ring-1 ring-amber-400/30">
                <Bot size={20} className="text-amber-400 md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="font-black text-base md:text-lg leading-none flex items-center gap-2">
                  Intelligence 
                  <Sparkles size={12} className="text-amber-400 md:w-3.5 md:h-3.5" />
                </h3>
                <span className="text-[9px] text-emerald-300 uppercase tracking-[0.2em] font-black mt-1.5 block">Concierge Active</span>
              </div>
            </div>
            <div className="flex gap-1 md:gap-2 relative z-10">
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <Minus size={20} className="md:w-[22px] md:h-[22px]" />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X size={20} className="md:w-[22px] md:h-[22px]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 md:space-y-6 bg-slate-50/30 dark:bg-emerald-950/20 hide-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-300`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[88%] px-5 md:px-6 py-3.5 md:py-4 rounded-[24px] md:rounded-[28px] text-[14px] md:text-[15px] font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-emerald-800 dark:bg-amber-400 text-white dark:text-emerald-950 rounded-tr-none shadow-emerald-900/10'
                      : 'bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 border border-slate-100 dark:border-emerald-800/20 rounded-tl-none'
                  }`}
                >
                  {msg.content || (idx === messages.length - 1 && isTyping && (
                    <div className="flex gap-1.5 py-1.5">
                      <div className="w-2 h-2 bg-emerald-300 dark:bg-amber-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-300 dark:bg-amber-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-emerald-300 dark:bg-amber-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  ))}
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-5 md:p-6 bg-white dark:bg-[#0D1512] border-t border-slate-100 dark:border-emerald-900/30">
            <div className="flex items-center gap-2 md:gap-3 bg-slate-50 dark:bg-emerald-900/10 rounded-[24px] md:rounded-[28px] px-4 md:px-6 py-1 focus-within:ring-4 focus-within:ring-emerald-800/5 dark:focus-within:ring-amber-400/5 transition-all duration-300 border border-slate-100 dark:border-emerald-800/20">
              <input
                type="text"
                placeholder="Submit inquiry..."
                className="flex-1 bg-transparent py-3 md:py-4 text-[14px] md:text-[15px] focus:outline-none text-emerald-950 dark:text-emerald-50 font-medium placeholder:text-slate-400 dark:placeholder:text-emerald-800/50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-2.5 md:p-3 rounded-2xl transition-all duration-300 ${
                  input.trim() && !isTyping 
                    ? 'bg-emerald-800 dark:bg-amber-400 text-amber-400 dark:text-emerald-950 shadow-lg shadow-emerald-900/20 scale-100 active:scale-90' 
                    : 'text-slate-300 dark:text-emerald-900 scale-95'
                }`}
              >
                <Send size={20} strokeWidth={2.5} className="md:w-[22px] md:h-[22px]" />
              </button>
            </div>
            <div className="flex justify-center mt-3 md:mt-4">
              <p className="text-[8px] md:text-[9px] text-slate-400 dark:text-emerald-800 font-black uppercase tracking-widest">nawiri360 Neural Protocol v2.5</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
