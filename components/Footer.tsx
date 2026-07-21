import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const githubLink = "https://github.com/Palash-oss";
  const linkedinLink = "https://www.linkedin.com/in/palash-pathare-53260b28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-white/10 bg-black/40 backdrop-blur-md hover:bg-transparent hover:backdrop-blur-none transition-all duration-700 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] hover:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-display font-black text-sm">
              P
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white">
              PALASH<span className="text-gray-500">.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm font-medium text-center">
            &copy; {new Date().getFullYear()} Engineered with passion by Palash Pathare. All rights reserved.
          </p>

          {/* Right Action & Links */}
          <div className="flex items-center gap-6">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              data-cursor="GITHUB"
            >
              GitHub
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              data-cursor="LINKEDIN"
            >
              LinkedIn
            </a>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white transition-all shadow-lg"
              title="Back to Top"
              data-cursor="TOP"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
