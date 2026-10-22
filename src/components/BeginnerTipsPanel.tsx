import React from 'react';
import { Technology } from '../types';
import { safeHttpsUrl, SAFE_EXTERNAL_LINK_ATTRS } from '../utils/security';
import {
  Compass,
  AlertTriangle,
  Play,
  ExternalLink,
  Target,
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface BeginnerTipsPanelProps {
  completedIds: string[];
  allTechnologies: Technology[];
  onScrollToProjects: () => void;
}

export const BeginnerTipsPanel: React.FC<BeginnerTipsPanelProps> = ({
  completedIds,
  allTechnologies,
  onScrollToProjects,
}) => {
  // Find the first uncompleted technology to recommend
  const nextUpTech = allTechnologies.find((t) => !completedIds.includes(t.id)) || allTechnologies[0];

  return (
    <aside aria-label="Beginner Guidance & Tips" className="space-y-4">
      {/* Curator & Architect Profile Card */}
      <div className="rounded-xl border border-indigo-500/40 bg-gradient-to-b from-slate-900/95 to-slate-950 p-4 sm:p-5 shadow-lg shadow-indigo-950/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-indigo-400" />
            Curator &amp; Architect
          </span>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-500 p-0.5 shrink-0 shadow-md">
            <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-white">
              MAM
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-mono leading-snug">
              Muhammad Arham Munir
            </h4>
            <div className="text-[11px] font-mono text-indigo-300">
              Full-Stack Architect &amp; Educator
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-3 leading-relaxed font-sans">
          Curated DevWoven to eliminate tutorial hell and replace paid bootcamps with verified,
          industry-standard free roadmaps and progressive milestone architectures.
        </p>

        {/* Curator Social Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <a
            href="https://github.com/arham85"
            {...SAFE_EXTERNAL_LINK_ATTRS}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono transition-colors border border-slate-700/80"
            title="Muhammad Arham Munir on GitHub"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span>@arham85</span>
          </a>

          <a
            href="https://www.linkedin.com/in/arham85/"
            {...SAFE_EXTERNAL_LINK_ATTRS}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 hover:text-sky-200 text-xs font-mono transition-colors border border-sky-500/30"
            title="Muhammad Arham Munir on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* 1. Active Milestone Project Card */}
      <div className="rounded-xl border border-indigo-500/30 bg-slate-900/90 p-4 sm:p-5 shadow-md shadow-indigo-950/20">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
            Active Milestone
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Phase 01 Checkpoint
          </span>
        </div>

        <h4 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
          <Target className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Build a Responsive Showcase</span>
        </h4>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
          Validate your HTML5, CSS Flexbox/Grid, and basic JS interaction before jumping into heavy
          frameworks.
        </p>

        {/* Acceptance Criteria Checklist */}
        <div className="mt-3 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1.5 text-slate-300">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Acceptance Criteria:
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span>
            <span className="text-slate-300">Semantic &lt;header&gt;, &lt;main&gt;, &lt;article&gt;</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span>
            <span className="text-slate-300">CSS Grid auto-fit product catalog</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span>
            <span className="text-slate-300">Fluid media queries 320px–1200px</span>
          </div>
        </div>

        <button
          onClick={onScrollToProjects}
          className="mt-3.5 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors border border-slate-700 cursor-pointer"
        >
          <span>View All 3 Milestone Briefs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Today's Recommended Watch */}
      {nextUpTech && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Play className="w-3 h-3 text-teal-400" />
              Recommended Next Watch
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20">
              High Yield
            </span>
          </div>

          <div className="mt-2 p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-[11px] font-mono text-indigo-400">
              {nextUpTech.stageNumber} • {nextUpTech.category}
            </div>
            <h5 className="text-sm font-bold text-white font-mono mt-0.5">
              {nextUpTech.name} Deep Tutorial
            </h5>
            <div className="text-xs text-slate-400 mt-1">
              By {nextUpTech.instructor} • {nextUpTech.videoDurationText}
            </div>

            <a
              href={safeHttpsUrl(nextUpTech.tutorialUrl)}
              {...SAFE_EXTERNAL_LINK_ATTRS}
              className="mt-3 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 text-xs font-mono font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Resume Tutorial ({nextUpTech.videoDurationText})</span>
            </a>
          </div>
        </div>
      )}

      {/* 3. Anti-Tutorial Hell Rules */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Anti-Tutorial Hell Rules
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          The curriculum is engineered to prevent mindless passive consumption. Follow these
          non-negotiable rules:
        </p>

        <div className="space-y-2.5 text-xs text-slate-300 font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-amber-400 font-bold text-[11px] mb-1">
              01 • The 2:1 Code-to-Watch Ratio
            </div>
            <p className="text-slate-400 text-[11px] font-sans leading-snug">
              For every 20 minutes of video watched, spend at least 40 minutes in VS Code writing,
              modifying, or debugging code.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-amber-400 font-bold text-[11px] mb-1">
              02 • No Copy-Pasting Code
            </div>
            <p className="text-slate-400 text-[11px] font-sans leading-snug">
              Type every single line manually. Muscle memory and syntax comprehension develop through
              physical typing and compiler errors.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
            <div className="text-amber-400 font-bold text-[11px] mb-1">
              03 • Build 1 Milestone Every Phase
            </div>
            <p className="text-slate-400 text-[11px] font-sans leading-snug">
              Never advance to the next roadmap phase until your companion project acceptance
              criteria are completely satisfied without handholding.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Beginner Debugging Wisdom */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Stuck on an Error?</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          1. Read the error message word for word. Most specify the exact file &amp; line.<br />
          2. Check console for misspelled variables or broken imports.<br />
          3. Inspect browser Network tab to verify API responses.
        </p>
      </div>
    </aside>
  );
};
