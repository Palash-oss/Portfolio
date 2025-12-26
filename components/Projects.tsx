import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    title: "MEDICAL CHATBOT",
    description: "A complete medical chatbot that combines large language models with LangChain orchestration, Pinecone vector search, a Flask backend, and AWS deployment. This end-to-end solution retrieves and grounds clinical information, delivers citation-backed responses, and is designed for secure, scalable inference in real-world healthcare workflows.",
    category: "AI ENGINEERING",
    color: "#3b82f6",
    tags: ["Python", "Pinecone", "RAG","LLMs"],
    images: [
      "/image1.png",
      "/image2.png",
      "/image3.png"
    ],
    githubLink: "https://github.com/Palash-oss/CHATBOT"
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
    title: "Rexy OS Autonomous Interface",
    description: "A futuristic, cyberpunk-themed GUI for Rexy, an autonomous OS-level agent featuring voice control, vision analysis, and automated coding capabilities powered by Gemini.",
    category: "AUTOMATION",
    color: "#f59e0b",
    tags: ["GPT-4o", "Node.js", "AI Agents"],
    images: ["/rexy-2.png", "/rexy-1.png"],
    githubLink: "#"
  }
];

const CaseStudy: React.FC<{ project: Project }> = ({ project }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={container} className="relative min-h-screen flex flex-col justify-center py-20 border-b border-white/10 group">
      <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-12">
        <div className="z-10">
          <span className="mono text-xs font-black tracking-[0.5em] text-blue-500 mb-4 block uppercase">Project // {project.id}</span>
          <h3 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase group-hover:italic transition-all duration-700">
            {project.title}
          </h3>
        </div>
        <div className="md:w-1/3 lg:w-1/4 mb-4 flex items-start">
          <p className="text-base md:text-lg text-gray-300 font-light leading-7 max-w-[420px] tracking-wide">
            {project.description}
          </p>
        </div>
      </div>

      {/* Swiper Image Carousel */}
      <div className="relative aspect-[16/7] w-full overflow-hidden glass-card bg-gradient-to-br from-slate-900 to-black group">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {project.images.map((image, idx) => (
            <SwiperSlide key={idx} className="w-full h-full">
              <img
                src={image}
                alt={`${project.title} - Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Action Button */}
        <div className="absolute bottom-8 right-8 flex gap-4 z-10">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center group/btn transform transition-transform hover:scale-105 shadow-lg"
            aria-label="Open project on GitHub"
          >
            <Github size={24} />
          </a>
        </div>

        {/* Floating Tags */}
        <div className="absolute top-8 left-8 flex flex-wrap gap-2 max-w-xs z-10">
          {project.tags.map(tag => (
            <span key={tag} className="mono text-[10px] bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full uppercase font-bold text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <div id="works" className="pt-20">
      <div className="flex flex-col gap-2 mb-20">
        <div className="mono text-xs font-black tracking-[0.5em] text-gray-500 uppercase">Selected Archive</div>
        <h2 className="text-7xl font-black uppercase tracking-tighter">THE WORKS<span className="text-blue-500">.</span></h2>
      </div>

      <div className="space-y-0">
        {projects.map((p) => (
          <CaseStudy key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
};
