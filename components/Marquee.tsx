
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Github, Globe, Layers, Cpu, Zap, Terminal, Brain, Shield, Rocket
} from 'lucide-react';

const techs = [
  { name: 'PyTorch', icon: Brain },
  { name: 'React', icon: Globe },
  { name: 'TensorFlow', icon: Cpu },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Python', icon: Database },
  { name: 'Next.js', icon: Rocket },
  { name: 'Tailwind', icon: Layers },
  { name: 'FastAPI', icon: Zap },
  { name: 'OpenAI', icon: Shield },
];

export const Marquee: React.FC = () => {
  return (
    <div className="relative py-20 overflow-hidden border-t border-white/5">
      <div className="flex w-fit">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-24 items-center px-12"
        >
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-white/20 hover:text-blue-500 transition-colors cursor-default group">
              <tech.icon size={32} className="group-hover:scale-125 transition-transform" />
              <span className="text-4xl font-black uppercase tracking-tighter">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
