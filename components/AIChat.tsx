
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I'm Palash's digital twin. Curious about his AI/ML learning journey or the projects he's built? Ask away!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the personal AI assistant for Palash Pathare.
          Context:
          - Name: Palash Pathare
          - Role: AI/ML Student & Creative Developer
          - Status: Learning and building high-end AI projects. Currently mastering Neural Architectures, LLM Integration (RAG), and Modern Web Architecture.
          - Projects: NeuroPath (RAG), Vortex Dash (FinTech), Savant Agent (AI Research).
          - Email: palashpathare@gmail.com
          - Style: Professional, tech-forward, and inspiring.
          Guidelines:
          - Highlight that Palash is currently in his "learning and project expansion" phase.
          - If asked about contact, mention his email: palashpathare@gmail.com.
          - Keep answers under 3 sentences unless asked for detail.
          - Refer to Palash as "Palash" or "my creator".`,
        }
      });

      const aiText = response.text || "I'm recalibrating my circuits. Could you ask that once more?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "The network is a bit noisy right now. You can also reach Palash directly at palashpathare@gmail.com!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="mb-6 w-[360px] md:w-[420px] h-[550px] glass-card rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">PALASH AI</h3>
                  <p className="text-[10px] text-blue-400 uppercase font-black flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> Live Now
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm outline-none focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-blue-500/60 transition-all text-white relative z-50 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={32} className="relative z-10" /> : <MessageSquare size={32} className="relative z-10" />}
      </motion.button>
    </div>
  );
};
