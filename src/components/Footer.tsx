import React from 'react';
import { DevWovenLogo } from './DevWovenLogo';
import { SAFE_EXTERNAL_LINK_ATTRS } from '../utils/security';
import { Heart, Github, Linkedin, ShieldCheck, UserCheck, FileJson, Lock } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onResetProgress: () => void;
  onOpenPrivacy: () => void;
  onOpenBackup: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollTo,
  onResetProgress,
  onOpenPrivacy,
  onOpenBackup,
}) => {
  return (
    <footer className="border-t border-slate-800 bg-[#080c14] text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <DevWovenLogo size="md" showSubtitle={true} />

            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              Free &amp; Open Community Curriculum. Built to dismantle tutorial hell with structured
              visual dependencies, verified YouTube modules, and production-grade project checkpoints.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>No fluff. No tutorial hell. Just code.</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-indigo-950/40 border border-indigo-500/30 text-indigo-300">
                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                <span>GitHub Pages Ready</span>
              </div>
            </div>
          </div>

          {/* Curator Profile Block */}
          <div className="md:col-span-3 space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Curated by</span>
            </div>
            <div className="text-sm font-bold text-white font-mono">
              Muhammad Arham Munir
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Full-Stack Engineer &amp; Educator dedicated to making modern web development accessible and structured for everyone.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/arham85"
                {...SAFE_EXTERNAL_LINK_ATTRS}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs transition-colors"
                title="Muhammad Arham Munir GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>arham85</span>
              </a>
              <a
                href="https://www.linkedin.com/in/arham85/"
                {...SAFE_EXTERNAL_LINK_ATTRS}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 hover:text-sky-200 border border-sky-500/30 text-xs transition-colors"
                title="Muhammad Arham Munir LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Curriculum Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Curriculum Paths
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollTo('phase-1')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                >
                  1. Foundations (HTML, CSS, JS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('phase-2')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                >
                  2. Modern Front-End &amp; State
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('phase-3')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                >
                  3. Backend Systems &amp; APIs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('phase-4')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer text-left"
                >
                  4. Deployment &amp; Auth
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation & Security Utilities */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Security &amp; Data
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Privacy Charter</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBackup}
                  className="hover:text-indigo-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <FileJson className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span>Backup / Restore</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('roadmap')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Roadmap Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('projects')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Milestone Projects
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onResetProgress}
                  className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer text-[11px]"
                >
                  Reset Progress Cache
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} DevWoven • Curated by{' '}
            <strong className="text-slate-300 font-semibold">Muhammad Arham Munir</strong>. Distributed under MIT License.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-emerald-400 transition-colors cursor-pointer underline underline-offset-2"
            >
              Privacy Statement
            </button>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>Crafted for web developers with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
