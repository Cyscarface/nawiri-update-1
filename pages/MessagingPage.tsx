
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/mockApi';
import { Message, User } from '../types';
import { Send, User as UserIcon, Search, MoreVertical, Paperclip, Sparkles } from 'lucide-react';

interface MessagingPageProps {
  currentUser: User;
}

const MessagingPage: React.FC<MessagingPageProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeContact, setActiveContact] = useState({ id: 'u2', name: 'Jane Smith', role: 'Landlord' });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchThread = async () => {
      const thread = await api.messages.getThread(currentUser.id, activeContact.id);
      setMessages(thread);
    };
    fetchThread();
  }, [currentUser.id, activeContact.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = await api.messages.send({
      senderId: currentUser.id,
      receiverId: activeContact.id,
      content: input
    });
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white dark:bg-[#0D1512] rounded-[40px] border border-slate-100 dark:border-emerald-900/20 shadow-2xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 dark:border-emerald-900/20 flex flex-col bg-slate-50/30 dark:bg-emerald-950/10">
        <div className="p-6 border-b border-slate-100 dark:border-emerald-900/20">
          <h2 className="text-xl font-black text-emerald-950 dark:text-emerald-50 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white dark:bg-emerald-900/20 border border-slate-100 dark:border-emerald-800/20 rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            { id: 'u2', name: 'Jane Smith', role: 'Landlord', last: 'Move-in docs are ready', time: '10:00 AM', unread: 0 },
            { id: 'sp1', name: 'Elite Cleaners', role: 'Provider', last: 'Request scheduled', time: 'Yesterday', unread: 2 }
          ].map(contact => (
            <button 
              key={contact.id}
              onClick={() => setActiveContact({ id: contact.id, name: contact.name, role: contact.role })}
              className={`w-full p-4 flex items-center gap-4 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all ${activeContact.id === contact.id ? 'bg-emerald-50 dark:bg-emerald-900/40' : ''}`}
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center text-emerald-800 dark:text-amber-400 shrink-0">
                <UserIcon size={24} />
              </div>
              <div className="text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-sm text-emerald-950 dark:text-emerald-50 truncate">{contact.name}</h4>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{contact.time}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-emerald-500/60 truncate font-medium">{contact.last}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-emerald-900/20 flex items-center justify-between bg-white/50 dark:bg-[#0D1512]/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-emerald-950">
              <UserIcon size={20} />
            </div>
            <div>
              <h3 className="font-black text-emerald-950 dark:text-emerald-50 leading-none">{activeContact.name}</h3>
              <span className="text-[10px] text-emerald-600 dark:text-amber-400 font-black uppercase tracking-widest">{activeContact.role} &bull; Online</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-emerald-950 dark:hover:text-emerald-50"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/20 dark:bg-emerald-950/5">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-6 py-4 rounded-[28px] text-sm font-medium leading-relaxed ${
                msg.senderId === currentUser.id 
                  ? 'bg-emerald-800 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 border border-slate-100 dark:border-emerald-800/20 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
                <div className={`text-[9px] mt-2 opacity-40 font-bold text-right`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* AI Suggestion Banner */}
        <div className="mx-6 mb-2 p-3 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center gap-3">
          <Sparkles size={16} className="text-amber-400" />
          <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">AI Suggestion: Ask Jane about the move-in inspection checklist.</p>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white dark:bg-[#0D1512] border-t border-slate-100 dark:border-emerald-900/20">
          <div className="bg-slate-50 dark:bg-emerald-900/10 rounded-[28px] px-6 py-2 flex items-center gap-4 border border-slate-100 dark:border-emerald-800/20">
            <button className="text-slate-400 hover:text-emerald-800 transition-colors"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent py-4 text-sm font-medium focus:outline-none text-emerald-950 dark:text-emerald-50"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-3 rounded-2xl transition-all ${input.trim() ? 'bg-emerald-800 text-white shadow-lg' : 'text-slate-300'}`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
