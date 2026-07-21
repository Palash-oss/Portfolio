import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Mail, ArrowUpRight, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const email = "palashpathare@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/palash-pathare-53260b28a' },
    { name: 'GitHub', url: 'https://github.com/Palash-oss' },
    { name: 'Instagram', url: '#' },
    { name: 'X.com', url: '#' },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-16">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-2 mono text-xs font-black text-gray-400 uppercase tracking-widest">
            <Sparkles size={16} className="text-white" /> Init Connection
          </div>

          <h2 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white leading-none">
            LET'S MAKE <br />
            <span className="hero-outline">IMPACT.</span>
          </h2>

          <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-md">
            Open for engineering collaboration on AI/ML projects, neural architectures, and cutting-edge web platforms.
          </p>

          {/* Interactive Email Copy Card */}
          <div className="pt-4 space-y-3">
            <span className="mono text-xs text-gray-500 uppercase font-bold tracking-widest block">Direct Communications</span>
            <div className="inline-flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/10 hover:border-white/40 transition-all duration-300">
              <Mail size={22} className="text-white" />
              <a
                href={`mailto:${email}`}
                className="font-display font-bold text-xl sm:text-2xl text-white hover:text-gray-300 transition-colors"
                data-cursor="EMAIL"
              >
                {email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white transition-all ml-2"
                title="Copy Email Address"
                data-cursor="COPY"
              >
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mono text-xs text-emerald-400 font-bold tracking-wider"
              >
                ✓ Copied email to clipboard!
              </motion.p>
            )}
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
          <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="space-y-2">
              <label className="mono text-xs text-gray-400 font-bold uppercase tracking-widest block">IDENTIFIER</label>
              <input
                type="text"
                required
                placeholder="YOUR NAME"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white text-white font-display text-base tracking-wide transition-all focus:ring-1 focus:ring-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="mono text-xs text-gray-400 font-bold uppercase tracking-widest block">COORDINATES</label>
              <input
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white text-white font-display text-base tracking-wide transition-all focus:ring-1 focus:ring-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="mono text-xs text-gray-400 font-bold uppercase tracking-widest block">TRANSMISSION</label>
              <textarea
                required
                rows={4}
                placeholder="TELL ME ABOUT YOUR PROJECT OR INQUIRY..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white text-white font-display text-base tracking-wide transition-all focus:ring-1 focus:ring-white/20 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-xl bg-white text-black hover:bg-zinc-200 font-display font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.02] active:scale-95 group"
              data-cursor="SEND"
            >
              <span>SEND INQUIRY</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {formSent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 mono text-xs font-bold text-center"
              >
                ✓ Message transmitted successfully!
              </motion.div>
            )}
          </form>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            {socials.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-white flex items-center gap-1 transition-colors group"
                data-cursor="LINK"
              >
                <span>{platform.name}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
