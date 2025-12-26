
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { CustomCursor } from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#030303] text-white">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-10 lg:px-20">
        <section id="home">
          <Hero />
        </section>
        
        <Marquee />
        
        <section id="projects" className="pt-24">
          <Projects />
        </section>
        
        <section id="experience" className="pt-24">
          <Experience />
        </section>
        
        <section id="contact" className="pt-24 pb-32">
          <Contact />
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default App;
