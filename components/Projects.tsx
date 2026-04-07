import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
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
  color: string;
  images: string[];
  githubLink: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "VIDYA - Academic Chatbot",
    description: "An intelligent academic assistant for CBSE students (Grade 1-4) combining context-aware AI tutoring powered by Gemini & Groq, adaptive assessments, handwriting analysis via PaddleOCR, and knowledge graph visualization. Features multi-role dashboards (student, parent, teacher), persistent chat sessions, and the COMPASS adaptive learning framework for personalized learning paths.",
    category: "AI EDUCATION",
    color: "#3b82f6",
    tags: ["React", "Python", "Firebase", "MongoDB"],
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
    title: "Sentiment Analysis Platform",
    description: "A comprehensive full-stack platform for analyzing sentiment from customer reviews, product feedback, and user comments.",
    category: "WEB ARCHITECTURE",
    color: "#10b981",
    tags: ["React", "Go", "WebSockets"],
    images: ["/sentiment-1.png", "/sentiment-2.png", "/sentiment-3.png"],
    githubLink: "https://github.com/Palash-oss/Product-review-analysis"
  },
  {
    id: "03",
    title: "ECOKERNEL - Green Logistics Engine",
    description: "An AI-driven supply chain orchestration engine addressing 11% of global greenhouse emissions. Integrates a predictive RNN/LSTM module for demand forecasting, a prescriptive Multi-Objective Optimizer solving Green Vehicle Routing Problems (GVRP), and an interactive decision interface visualizing the Pareto Front. Optimizes routes considering vehicle fuel types, traffic dynamics, and multi-modal transport shifting.",
    category: "SUSTAINABILITY",
    color: "#10b981",
    tags: ["Python", "FastAPI", "React", "Meta-heuristics"],
    images: ["/ecokernel-1.png", "/ecokernel-2.png", "/ecokernel-3.png", "/ecokernel-4.png", "/ecokernel-5.png"],
    githubLink: "https://github.com/flashrod/ecokernel"
  }
];

const CaseStudy: React.FC<{ project: Project }> = ({ project }) => {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // GSAP ScrollTrigger animation
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          markers: false
        },
        opacity: 0,
        y: 50,
        duration: 1
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
          markers: false
        },
        opacity: 0,
        scale: 0.95,
        duration: 1
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative w-full py-5 md:py-6 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/10 group">
      <div ref={contentRef} className="flex flex-col gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-5 lg:mb-6">
        {/* Project Header */}
        <div className="z-10 w-full max-w-full">
          <span className="inline-block text-xs md:text-sm font-black tracking-widest text-blue-500 mb-1 md:mb-2 uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            Project // {project.id}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight md:leading-tight lg:leading-snug tracking-tight uppercase group-hover:italic transition-all duration-700 word-break hyphens-auto">
            {project.title}
          </h3>
        </div>

        {/* Description Section - Clipped properly */}
        <div className="w-full lg:max-w-2xl flex items-start">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed md:leading-relaxed lg:leading-relaxed tracking-normal break-words overflow-hidden">
            {project.description}
          </p>
        </div>
      </div>

      {/* Swiper Image Carousel */}
      <div ref={imageRef} className="relative w-full overflow-hidden rounded-md md:rounded-lg lg:rounded-xl mt-3 md:mt-4 lg:mt-5 shadow-2xl glass-card">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoHeight={true}
          className="w-full"
        >
          {project.images.map((image, idx) => (
            <SwiperSlide key={idx} className="w-full">
              <img
                src={image}
                alt={`${project.title} - Slide ${idx + 1}`}
                className="w-full h-auto object-cover block"
                loading="eager"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay gradient (reduced to not darken image too much) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />

        {/* Action Button (top-right) */}
        <div className="absolute top-3 md:top-4 lg:top-6 right-3 md:right-4 lg:right-6 flex gap-3 z-20">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white text-black flex items-center justify-center group/btn transform transition-transform hover:scale-110 active:scale-95 shadow-lg flex-shrink-0"
            aria-label="Open project on GitHub"
          >
            <Github size={18} className="md:hidden" />
            <Github size={20} className="hidden md:block lg:hidden" />
            <Github size={24} className="hidden lg:block" />
          </a>
        </div>

        {/* Floating Tags - Improved responsive */}
        <div className="absolute top-2 md:top-3 lg:top-4 left-2 md:left-3 lg:left-4 flex flex-wrap gap-1.5 md:gap-2 lg:gap-2.5 z-10 max-w-[calc(100%-1rem)]">
          {project.tags.map(tag => (
            <span key={tag} className="text-[7px] md:text-[8px] lg:text-xs bg-black/50 backdrop-blur-sm border border-white/20 px-2 md:px-2.5 lg:px-3 py-1 rounded-full uppercase font-semibold text-white/70 whitespace-nowrap truncate">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          markers: false
        },
        opacity: 0,
        x: -50,
        duration: 1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="works" className="w-full py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8 lg:mb-10">
        <div className="text-xs md:text-sm font-black tracking-widest text-gray-500 uppercase whitespace-nowrap">
          Selected Archive
        </div>
        <h2 className="projects-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-tight break-words">
          THE WORKS
          <span className="text-blue-500">.</span>
        </h2>
      </div>

      <div className="space-y-0 w-full">
        {projects.map((p) => (
          <CaseStudy key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};
