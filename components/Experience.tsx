import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Calendar, Activity } from 'lucide-react';

const milestones = [
  {
    phase: "01",
    title: "AI Ecosystems",
    context: "ADVANCED PLATFORMS",
    period: "2025 - 2026",
    desc: "Building production-grade AI platforms like VIDYA and EcoKernel. Deep-diving into RAG, LLM orchestration (Gemini/Groq), meta-heuristics for multi-objective optimization, and multi-role dashboards.",
    highlights: ["LLMs/RAG", "FastAPI", "React 19", "Gemini AI"]
  },
  {
    phase: "02",
    title: "Full-Stack Scale",
    context: "WEB ARCHITECTURE",
    period: "2024 - 2025",
    desc: "Developing complex, data-heavy systems such as Sentiment Analysis Platforms and dynamic real-time user interfaces. Emphasizing microservices, socket connections, and database management.",
    highlights: ["Go", "React", "MongoDB", "WebSockets"]
  },
  {
    phase: "03",
    title: "AI/ML Base",
    context: "MODELS & VISION",
    period: "2023 - 2024",
    desc: "Intensive focus on Deep Learning fundamentals. Built various vision, NLP, and OCR models (like PaddleOCR) to understand the math behind modern AI before moving to engineering.",
    highlights: ["Python", "Computer Vision", "TensorFlow", "PyTorch"]
  }
];

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center gap-2 mono text-xs font-black tracking-widest text-gray-400 uppercase mb-3">
            <Activity size={16} className="text-white" /> Milestones & Evolution
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
            JOURNEY<br />
            <span className="text-white/20">LOGS.</span>
          </h2>
        </div>
        <p className="mono text-xs text-gray-400 max-w-xs uppercase leading-relaxed border-l border-white/20 pl-4">
          Chronological index of technical milestones, architecture research, and project iterations.
        </p>
      </div>

      {/* Accordion List */}
      <div className="border-t border-white/10 space-y-0">
        {milestones.map((milestone, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div
              key={i}
              onClick={() => setExpandedIndex(isOpen ? null : i)}
              className={`group relative border-b border-white/10 transition-all duration-300 cursor-pointer ${
                isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
              }`}
              data-cursor={isOpen ? "COLLAPSE" : "EXPAND"}
            >
              <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-6 sm:py-8 px-4 md:px-6 gap-3 sm:gap-4">
                <div className="md:col-span-1 mono text-sm font-bold text-gray-400">
                  {milestone.phase}
                </div>

                <div className="md:col-span-4 font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-zinc-300 group-hover:translate-x-2 transition-all">
                  {milestone.title}
                </div>

                <div className="md:col-span-3 text-xs sm:text-sm font-light text-gray-400 tracking-wider">
                  {milestone.context}
                </div>

                <div className="md:col-span-2 mono text-xs text-gray-500 font-semibold tracking-widest uppercase flex items-center gap-2">
                  <Calendar size={14} className="text-white" />
                  {milestone.period}
                </div>

                <div className="w-full md:w-auto md:col-span-2 flex justify-between md:justify-end items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  <div className="flex lg:flex gap-1.5 flex-wrap">
                    {milestone.highlights.slice(0, 2).map((h) => (
                      <span key={h} className="mono text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-gray-300 rounded">
                        {h}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-full bg-white/5 group-hover:bg-white/20 text-white/50 group-hover:text-white"
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </div>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 px-4 md:px-12 grid md:grid-cols-12 gap-8 pt-2 border-t border-white/5">
                      <div className="md:col-start-2 md:col-span-10 space-y-4">
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                          {milestone.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {milestone.highlights.map((h) => (
                            <span key={h} className="mono text-xs bg-white/5 border border-white/15 text-gray-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                              <Sparkles size={12} className="text-white" /> {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
