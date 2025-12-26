
import React from 'react';

export const Footer: React.FC = () => {
  const githubLink = "https://github.com/Palash-oss";
  const linkedinLink = "https://www.linkedin.com/in/palash-pathare-53260b28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">
            PALASH<span className="text-blue-500">.</span>
          </div>
          
          <p className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Designed & Engineered by Palash Pathare.
          </p>
          
          <div className="flex gap-10">
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-600 hover:text-white transition-all uppercase tracking-widest">GitHub</a>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-600 hover:text-white transition-all uppercase tracking-widest">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
