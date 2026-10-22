import React from 'react';
import { ArrowDownRight, Compass, Sparkles, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { SAFE_EXTERNAL_LINK_ATTRS } from '../utils/security';

interface HeroProps {
  onStartRoadmap: () => void;
  onExploreTechnologies: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartRoadmap,
  onExploreTechnologies,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 border-b border-slate-800/80">
      {/* Subtle background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Top badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-700/80 text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Structured Full-Stack Roadmap 2025</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-semibold">100% Free Resources</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/40 border border-indigo-500/30 text-indigo-300">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Curated by Muhammad Arham Munir</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Weave Your Way From Total Beginner to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-teal-300">
            Full-Stack Web Developer.
          </span>
        </h1>

        {/* Beginner friendly subtext */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          No paid courses, no tutorial hell. An opinionated, step-by-step path mapping every
          essential technology, simple mental models, hands-on progressive projects, and the
          highest-rated free YouTube tutorials.
        </p>

        {/* Call to action buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onStartRoadmap}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-mono text-sm font-semibold transition-all shadow-lg shadow-indigo-900/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <span>Start the Roadmap</span>
            <ArrowDownRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreTechnologies}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <Compass className="w-4 h-4 text-teal-400" />
            <span>Explore Technologies</span>
          </button>
        </div>

        {/* Curator Profile Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-800 shadow-md">
              MA
            </div>
            <div>
              <span className="text-slate-400">Curriculum Architect: </span>
              <strong className="text-white font-semibold">Muhammad Arham Munir</strong>
              <span className="hidden sm:inline text-slate-400"> • Full-Stack Engineer</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/arham85"
              {...SAFE_EXTERNAL_LINK_ATTRS}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="GitHub: arham85"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>@arham85</span>
            </a>
            <a
              href="https://www.linkedin.com/in/arham85/"
              {...SAFE_EXTERNAL_LINK_ATTRS}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 transition-colors"
              title="LinkedIn: Muhammad Arham Munir"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
