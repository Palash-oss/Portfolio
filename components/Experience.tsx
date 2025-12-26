
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, MapPin, Sparkles } from 'lucide-react';

const milestones = [
  {
    phase: "01",
    title: "Project Expansion",
    context: "CURRENT FOCUS",
    period: "2024 - 2025",
    desc: "Scaling personal projects from simple scripts to full-scale AI applications. Deep-diving into RAG (Retrieval Augmented Generation) and high-latency web performance optimizations.",
    highlights: ["Llama-3 Integration", "Vector Databases", "Framer Motion"]
  },
  {
    phase: "02",
    title: "Technical Specialization",
    context: "AI/ML MASTERY",
    period: "2023 - 2024",
    desc: "Intensive focus on Deep Learning fundamentals. Built various vision and NLP models to understand the math behind modern AI before moving to engineering.",
    highlights: ["PyTorch", "Computer Vision", "TensorFlow"]
  },
  {
    phase: "03",
    title: "Foundation Era",
    context: "WEB CORE",
    period: "2021 - 2023",
    desc: "Mastered the core pillars of the web. Moving from static HTML/CSS to complex React applications. Developing an eye for high-end UI/UX and pixel-perfect layouts.",
    highlights: ["Javascript ES6+", "React Ecosystem", "Tailwind CSS"]
  }
];

export const Experience: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
        <div>
          <span className="mono text-xs font-black tracking-[0.5em] text-blue-500 uppercase mb-4 block">Milestones</span>
          <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">JOURNEY<br/><span className="text-white/20">LOGS.</span></h2>
        </div>
        <p className="mono text-[10px] text-gray-500 max-w-[200px] uppercase leading-relaxed">
          CHRONOLOGICAL DATA OF TECHNICAL GROWTH AND PROJECT DEVELOPMENT // PERSISTED SINCE 2021
        </p>
      </div>

      <div className="border-t border-white/10">
        {milestones.map((milestone, i) => (
          <div 
            key={i} 
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative border-b border-white/10 transition-colors hover:bg-white/[0.02]"
          >
            <div className="flex flex-col md:grid md:grid-cols-12 items-center py-10 px-4 md:px-0">
              <div className="md:col-span-1 mono text-xs text-gray-600 font-bold group-hover:text-blue-500 transition-colors">
                {milestone.phase}
              </div>
              
              <div className="md:col-span-3 text-2xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                {milestone.title}
              </div>

              <div className="md:col-span-3 text-lg font-light text-gray-400">
                {milestone.context}
              </div>

              <div className="md:col-span-2 mono text-[10px] text-gray-600 tracking-widest uppercase font-bold text-center">
                {milestone.period}
              </div>

              <div className="md:col-span-2 flex justify-end gap-2">
                {milestone.highlights.map(h => (
                  <span key={h} className="hidden lg:inline-block mono text-[8px] border border-white/5 px-2 py-0.5 text-gray-500 rounded-sm">
                    {h}
                  </span>
                ))}
              </div>

              <div className="md:col-span-1 flex justify-end">
                <motion.div 
                  animate={{ rotate: hoveredIndex === i ? 90 : 0 }}
                  className="text-white/20 group-hover:text-blue-500 transition-colors"
                >
                  <ChevronRight size={24} />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-12 px-4 md:px-12 grid md:grid-cols-12 gap-10">
                    <div className="md:col-start-5 md:col-span-6">
                      <p className="text-xl text-gray-300 font-light leading-relaxed mb-6">
                        {milestone.desc}
                      </p>
                      <div className="flex items-center gap-2 text-blue-500 mono text-xs font-bold uppercase tracking-widest">
                        <Sparkles size={14} /> Building for the Future
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
