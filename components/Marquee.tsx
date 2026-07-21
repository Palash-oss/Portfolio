import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Globe, Layers, Cpu, Zap, Terminal, Brain, Shield, Rocket, Sparkles
} from 'lucide-react';

const techsRow1 = [
  { name: 'PyTorch', icon: Brain },
  { name: 'React 19', icon: Globe },
  { name: 'TensorFlow', icon: Cpu },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Python', icon: Database },
  { name: 'Next.js', icon: Rocket },
];

const techsRow2 = [
  { name: 'FastAPI', icon: Zap },
  { name: 'Gemini AI', icon: Sparkles },
  { name: 'Tailwind CSS', icon: Layers },
  { name: 'OpenAI', icon: Shield },
  { name: 'Go Lang', icon: Terminal },
  { name: 'MongoDB', icon: Database },
];

export const Marquee: React.FC = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-12 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-md hover:bg-transparent hover:backdrop-blur-none transition-all duration-700 my-12 space-y-6 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-none">
      {/* Edge Fade Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, -1800] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex gap-12 items-center px-6 shrink-0"
        >
          {[...techsRow1, ...techsRow1, ...techsRow1, ...techsRow1].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-3 rounded-2xl glass-card hover:border-white/40 transition-all duration-300 group cursor-default"
              data-cursor="TECH"
            >
              <tech.icon size={24} className="text-gray-300 group-hover:scale-125 transition-transform duration-300" />
              <span className="font-display text-2xl font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [-1800, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
          className="flex gap-12 items-center px-6 shrink-0"
        >
          {[...techsRow2, ...techsRow2, ...techsRow2, ...techsRow2].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-3 rounded-2xl glass-card hover:border-white/40 transition-all duration-300 group cursor-default"
              data-cursor="TECH"
            >
              <tech.icon size={24} className="text-gray-300 group-hover:scale-125 transition-transform duration-300" />
              <span className="font-display text-2xl font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
