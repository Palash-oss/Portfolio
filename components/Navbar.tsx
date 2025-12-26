import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Brain } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Index', href: '#home' },
    { name: 'Works', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const githubLink = "https://github.com/Palash-oss";
  const linkedinLink = "https://www.linkedin.com/in/palash-pathare-53260b28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter text-white">PALASH</span>
            <span className="text-xs text-gray-400 tracking-widest">PATHARE</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-12">
          <a href="#index" className="mono text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300">Index</a>
          <a href="#works" className="mono text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300">Works</a>
          <a href="#experience" className="mono text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300">Experience</a>
          <a href="#contact" className="mono text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Palash-oss"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/palash-pathare"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-50 p-10 flex flex-col justify-between pointer-events-auto"
          >
            <div className="flex justify-between items-center">
              <span className="font-black text-2xl">PALASH.</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={40} /></button>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-6xl font-black uppercase tracking-tighter hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mono text-xs text-gray-500 uppercase tracking-widest">
              Available for hire 2025 &bull; Portfolio Edition
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
