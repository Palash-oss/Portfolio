
import React from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="py-20 border-t border-white/5">
      <div className="flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
          <span className="mono text-xs text-blue-500 font-bold uppercase tracking-[0.4em] mb-6 block">Ready to start?</span>
          <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Let's Make <br /> <span className="hero-outline">Impact.</span>
          </h2>
          <div className="space-y-4">
            <p className="text-gray-400 max-w-sm text-lg">
              Open for collaboration on AI/ML projects and creative web experiences.
            </p>
            <a href="mailto:palashpathare@gmail.com" className="text-3xl font-bold hover:text-blue-500 transition-colors underline decoration-white/10 underline-offset-8 break-all">
              palashpathare@gmail.com
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="group relative">
              <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors font-bold uppercase tracking-widest text-sm" />
            </div>
            <div className="group relative">
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors font-bold uppercase tracking-widest text-sm" />
            </div>
            <div className="group relative">
              <textarea placeholder="TELL ME ABOUT YOUR PROJECT" rows={3} className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors font-bold uppercase tracking-widest text-sm resize-none" />
            </div>
            
            <button className="flex items-center gap-4 group">
              <span className="text-3xl font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors">Send Inquiry</span>
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Send size={24} />
              </div>
            </button>
          </form>
          
          <div className="mt-20 flex gap-10">
            {['Instagram', 'Dribbble', 'LinkedIn', 'X.com'].map((platform) => (
              <a key={platform} href="#" className="mono text-[10px] uppercase font-bold tracking-widest text-white/20 hover:text-white transition-colors">
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
