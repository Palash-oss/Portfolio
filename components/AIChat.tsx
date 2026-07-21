import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    {
      role: 'ai',
      text: "Greetings! I'm Palash's AI Digital Assistant. Ask me about his machine learning projects, engineering stack, or academic background!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Tell me about project VIDYA",
    "What is ECOKERNEL?",
    "What tech stack does Palash use?",
    "How to contact Palash?"
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    if (!customText) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || '';
      let aiText = '';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: userMsg,
          config: {
            systemInstruction: `You are the personal AI assistant for Palash Pathare.
            Context:
            - Name: Palash Pathare
            - Role: Self-taught AI/ML Engineer & Creative Developer
            - Status: Learning and building high-performance AI systems. Expert in Neural Architectures, LLM Orchestration (RAG, Gemini, Groq), Full-Stack Systems (FastAPI, React, Go).
            - Key Projects:
              1. VIDYA: Academic Chatbot with Gemini/Groq, adaptive assessment & OCR handwriting analysis.
              2. Sentiment Analysis Platform: Full-stack review analytics with Go & WebSockets.
              3. ECOKERNEL: AI Green Logistics Engine with predictive RNN/LSTM & multi-objective VRP optimizer.
            - Email: palashpathare@gmail.com
            - Style: Concise, enthusiastic, technical yet accessible. Keep answers under 3 sentences.`,
          }
        });
        aiText = response.text || "I'm recalibrating my neural circuits. Feel free to ask another question!";
      } else {
        // Fallback local intelligent response system
        const lower = userMsg.toLowerCase();
        if (lower.includes('vidya')) {
          aiText = "VIDYA is Palash's flagship Academic Chatbot for Grade 1-4 CBSE students. It integrates Gemini & Groq AI tutoring, PaddleOCR handwriting analysis, and adaptive learning paths!";
        } else if (lower.includes('ecokernel') || lower.includes('green') || lower.includes('logistics')) {
          aiText = "ECOKERNEL is an AI Green Logistics Engine that uses RNN/LSTM demand forecasting and multi-objective optimizers to solve Green Vehicle Routing Problems.";
        } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('skills')) {
          aiText = "Palash builds with PyTorch, TensorFlow, Python, FastAPI, React 19, TypeScript, Go, Gemini AI, and MongoDB.";
        } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
          aiText = "You can reach Palash directly via email at palashpathare@gmail.com or via LinkedIn!";
        } else {
          aiText = "Palash is an AI/ML Engineer & Creative Dev specializing in RAG systems, model architectures, and full-stack applications. Check out his works section above!";
        }
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Network delay detected. You can reach Palash directly at palashpathare@gmail.com!" }]);
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
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="mb-6 w-[340px] sm:w-[400px] h-[540px] glass-panel rounded-3xl overflow-hidden flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm tracking-tight text-white">PALASH AI TWIN</h3>
                  <p className="mono text-[9px] text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" /> Online & Active
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-1">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none shadow-md font-medium'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs mono">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Suggested Question Chips */}
            <div className="px-5 py-2 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="mono text-[10px] whitespace-nowrap bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-gray-300 px-3 py-1 rounded-full transition-colors flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about projects or skills..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-md"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all flex items-center justify-center relative overflow-hidden group"
        data-cursor="AI CHAT"
      >
        <div className="w-full h-full bg-[#030308] rounded-[14px] flex items-center justify-center text-white group-hover:bg-transparent transition-colors">
          {isOpen ? <X size={26} /> : <MessageSquare size={26} className="text-cyan-400 group-hover:text-white" />}
        </div>
      </motion.button>
    </div>
  );
};
