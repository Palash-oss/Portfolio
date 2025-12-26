import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Cpu, Code2, BrainCircuit, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] } 
    }
  };

  return (
    <section id="index" className="relative min-h-screen flex flex-col justify-center pt-20">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-4">
          <div className="w-10 h-1 bg-blue-500" />
          <span className="mono text-[10px] uppercase tracking-[0.6em] text-white/50 font-black">
            Engineering the Future // Learning & Building
          </span>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-[14vw] md:text-[11vw] font-black leading-[0.75] tracking-tighter uppercase mb-6 flex flex-col">
          <span>Palash</span>
          <span className="hero-outline translate-x-[5vw]">Pathare.</span>
        </motion.h1>

        <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-20 items-end mt-16">
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-light text-gray-400 leading-tight max-w-xl">
              <span className="text-white font-medium italic">Self-taught AI/ML Engineer</span> and <span className="text-white">Creative Developer</span>. Solving complex problems through <span className="text-white">Intelligent Systems</span> and high-performance code.
            </p>
            <div className="flex gap-6">
              <a href="#projects" className="group relative bg-white text-black px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest overflow-hidden transition-all">
                <span className="relative z-10">EXPLORE CASE STUDIES</span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="/Palash_Pathare_resume (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20 hover:border-white/40"
                  title="View Resume"
                >
                  <FileText size={24} className="text-white" />
                </a>
                <BrainCircuit size={32} className="text-white/20" />
                <Code2 size={32} className="text-white/20" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end text-right">
            <div className="mono text-[10px] text-blue-500 uppercase mb-4 tracking-[0.4em] font-black">Mastery Overview</div>
            <div className="space-y-2">
              {['Neural Architectures', 'LLM Integration', 'Full-Stack Web', 'Modern UI/UX Designs'].map((item) => (
                <div key={item} className="text-3xl font-black uppercase tracking-tighter text-white/10 hover:text-white transition-all duration-500 cursor-default hover:translate-x-[-10px]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Decorative Large Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden pointer-events-none opacity-[0.01] select-none rotate-[-5deg]">
        <h2 className="text-[40vw] font-black whitespace-nowrap leading-none tracking-tighter">INTELLIGENCE</h2>
      </div>
    </section>
  );
};
