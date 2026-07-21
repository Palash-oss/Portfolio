import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Maximize2, X, ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  githubLink: string;
  liveLink?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "VIDYA - Academic Chatbot",
    description: "An intelligent academic assistant for CBSE students (Grade 1-4) combining context-aware AI tutoring powered by Gemini & Groq, adaptive assessments, handwriting analysis via PaddleOCR, and knowledge graph visualization. Features multi-role dashboards (student, parent, teacher), persistent chat sessions, and the COMPASS adaptive learning framework for personalized learning paths.",
    category: "AI EDUCATION",
    tags: ["React", "Python", "Gemini AI", "PaddleOCR", "Firebase", "MongoDB"],
    images: [
      "/vidya-1.png",
      "/vidya-2.png",
      "/vidya-3.png",
      "/vidya-4.png"
    ],
    githubLink: "https://github.com/flashrod/ACADEMIC-CHATBOT"
  },
  {
    id: "02",
    title: "CodeBase X-Ray — Static Analysis Platform",
    description: "An advanced, 100% private AST-driven source code analysis and architecture refactoring platform. Parses local repositories or public GitHub URLs to construct evidence-based System Design Topologies, interactive Refactoring Simulations, 1-Click Codebase Auto-Fixers, and exportable Mermaid.js architecture diagrams.",
    category: "STATIC ANALYSIS & AST",
    tags: ["React", "Node.js", "AST Analysis", "Mermaid.js", "WebSockets", "Vercel"],
    images: [
      "/codebase-xray-1.png",
      "/codebase-xray-2.png",
      "/codebase-xray-3.png",
      "/codebase-xray-4.png"
    ],
    githubLink: "https://github.com/Palash-oss/Codebase",
    liveLink: "https://codebase-eight-murex.vercel.app/"
  },
  {
    id: "03",
    title: "GitHub Automation Bot 🤖",
    description: "A production-grade, highly responsive GitHub automation bot built with Next.js 14 (App Router), Auth.js, Prisma ORM, Neon serverless Postgres, Octokit REST/Webhooks, and Slack Block Kit. Features an idempotent webhook engine, dynamic rules binder, real-time live polling dashboard, and interactive Slack writeback cards.",
    category: "DEVOPS & AUTOMATION",
    tags: ["Next.js 14", "Prisma", "Neon Postgres", "Octokit", "Slack API", "Auth.js"],
    images: [
      "/github-bot-1.png",
      "/github-bot-2.png",
      "/github-bot-3.png"
    ],
    githubLink: "https://github.com/Palash-oss/github-automation-bot",
    liveLink: "https://github-event-b3z3.vercel.app/"
  }
];

const CaseStudy: React.FC<{ project: Project; onOpenLightbox: (images: string[], index: number) => void }> = ({ project, onOpenLightbox }) => {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
        },
        opacity: 0,
        y: 40,
        duration: 1
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.96,
        y: 30,
        duration: 1
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 group">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Project Header & Info */}
        <div ref={contentRef} className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="mono text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/15 text-gray-300 uppercase tracking-widest">
              PROJECT {project.id}
            </span>
            <span className="mono text-[11px] text-gray-500 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white group-hover:text-zinc-300 transition-colors duration-500">
            {project.title}
          </h3>

          <p className="text-gray-300 font-light leading-relaxed text-base sm:text-lg">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="mono text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-gray-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-lg"
                data-cursor="DEMO"
              >
                <ExternalLink size={18} />
                <span>LIVE DEMO</span>
              </a>
            )}

            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-widest transition-colors shadow-lg ${
                project.liveLink 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
              data-cursor="GITHUB"
            >
              <Github size={18} />
              <span>SOURCE CODE</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Image Carousel Card */}
        <div ref={imageRef} className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden glass-card border border-white/10 group/card shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full h-auto"
            >
              {project.images.map((imgUrl, idx) => (
                <SwiperSlide key={idx} className="w-full">
                  <div
                    className="relative cursor-pointer overflow-hidden group/slide"
                    onClick={() => onOpenLightbox(project.images, idx)}
                    data-cursor="EXPAND"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} - Preview ${idx + 1}`}
                      className="w-full h-[320px] sm:h-[420px] object-cover object-top transition-transform duration-700 group-hover/slide:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/slide:opacity-30 transition-opacity" />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLightbox(project.images, idx);
                      }}
                      className="absolute bottom-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-lg z-10"
                      title="Expand screenshot"
                      data-cursor="EXPAND"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; currentIndex: number }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  }, []);

  const nextImage = useCallback((e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  }, []);

  const prevImage = useCallback((e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, nextImage, prevImage]);

  return (
    <div ref={sectionRef} id="projects" className="w-full py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-12">
        <div className="flex items-center gap-2 text-gray-400 mono text-xs font-bold uppercase tracking-widest">
          <Sparkles size={16} className="text-white" /> Selected Engineering Case Studies
        </div>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
          THE WORKS<span className="text-gray-600">.</span>
        </h2>
      </div>

      {/* Case Studies */}
      <div className="space-y-0 w-full">
        {projects.map((p) => (
          <CaseStudy key={p.id} project={p} onOpenLightbox={openLightbox} />
        ))}
      </div>

      {/* Full-Screen Lightbox Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {lightbox.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-[500000] bg-[#030308]/98 flex items-center justify-center p-2 sm:p-6 select-none pointer-events-auto"
            >
              {/* Top Bar with Counter & Exit Button */}
              <div className="fixed top-5 left-6 right-6 flex items-center justify-between z-[500010] pointer-events-auto">
                <span className="mono text-xs text-white font-bold bg-zinc-900 px-4 py-2 rounded-full border border-white/20 shadow-lg">
                  IMAGE {lightbox.currentIndex + 1} / {lightbox.images.length}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="px-5 py-2.5 bg-white text-black font-display font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-2xl cursor-pointer pointer-events-auto z-[500010] flex items-center gap-2"
                  aria-label="Close Preview"
                  data-cursor="CLOSE"
                >
                  <span>CLOSE</span>
                  <X size={18} />
                </button>
              </div>

              {/* Left Nav Arrow */}
              <button
                type="button"
                onClick={prevImage}
                className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 p-4 bg-zinc-900/90 hover:bg-white hover:text-black rounded-full text-white transition-all duration-200 border border-white/30 z-[500010] shadow-2xl pointer-events-auto cursor-pointer"
                aria-label="Previous Image"
                data-cursor="PREV"
              >
                <ChevronLeft size={30} />
              </button>

              {/* Right Nav Arrow */}
              <button
                type="button"
                onClick={nextImage}
                className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 p-4 bg-zinc-900/90 hover:bg-white hover:text-black rounded-full text-white transition-all duration-200 border border-white/30 z-[500010] shadow-2xl pointer-events-auto cursor-pointer"
                aria-label="Next Image"
                data-cursor="NEXT"
              >
                <ChevronRight size={30} />
              </button>

              {/* Crystal Clear Image Preview Container */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-[94vw] max-h-[90vh] flex items-center justify-center z-[500005] cursor-default"
              >
                <img
                  src={lightbox.images[lightbox.currentIndex]}
                  alt={`Project Preview ${lightbox.currentIndex + 1}`}
                  className="max-w-[94vw] max-h-[88vh] w-auto h-auto object-contain rounded-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] block select-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
