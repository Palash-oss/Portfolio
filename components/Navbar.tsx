import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INDEX', href: '#home', id: 'home' },
    { name: 'WORKS', href: '#projects', id: 'projects' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const githubLink = "https://github.com/Palash-oss";
  const linkedinLink = "https://www.linkedin.com/in/palash-pathare-53260b28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/10 bg-black/60 backdrop-blur-2xl' 
            : 'bg-transparent border border-transparent'
        }`}>
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group" data-cursor="PALASH">
            <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <span className="font-black font-display text-lg">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-tighter text-white group-hover:text-gray-300 transition-colors">
                PALASH
              </span>
              <span className="mono text-[9px] text-gray-400 tracking-widest uppercase font-bold">
                PATHARE
              </span>
            </div>
          </a>

          {/* Center Nav Links - Desktop Floating Dock */}
          <div className="hidden md:flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full mono text-xs tracking-widest font-semibold transition-all duration-300 ${
                    isActive ? 'text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                  data-cursor="GOTO"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Social Icons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white hover:text-black text-gray-300 flex items-center justify-center transition-all border border-white/10 hover:border-white"
              aria-label="GitHub"
              data-cursor="GITHUB"
            >
              <Github size={16} />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white hover:text-black text-gray-300 flex items-center justify-center transition-all border border-white/10 hover:border-white"
              aria-label="LinkedIn"
              data-cursor="LINKEDIN"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 p-6 glass-panel rounded-3xl border border-white/10 flex flex-col gap-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-black text-3xl uppercase tracking-tight text-white hover:text-gray-300 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <Sparkles size={20} className="text-white opacity-60" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="mono text-[10px] text-gray-400 uppercase tracking-widest">
                AI/ML & Creative Dev
              </span>
              <div className="flex gap-3">
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white">
                  <Github size={18} />
                </a>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
