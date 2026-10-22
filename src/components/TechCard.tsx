import React, { useState, memo } from 'react';
import { Technology } from '../types';
import { safeHttpsUrl, SAFE_EXTERNAL_LINK_ATTRS } from '../utils/security';
import {
  ExternalLink,
  CheckCircle,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sparkles,
  Layers,
  Code2,
  Video
} from 'lucide-react';

interface TechCardProps {
  technology: Technology;
  isCompleted: boolean;
  isSaved: boolean;
  onToggleComplete: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export const TechCard = memo(function TechCard({
  technology,
  isCompleted,
  isSaved,
  onToggleComplete,
  onToggleSave,
}: TechCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Category badge colors
  const categoryBadgeStyles = {
    'Front-End': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Back-End': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Database': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Tools': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }[technology.category] || 'bg-slate-800 text-slate-300 border-slate-700';

  const validatedTutorialUrl = safeHttpsUrl(technology.tutorialUrl);

  return (
    <article
      id={`tech-card-${technology.id}`}
      tabIndex={-1}
      className={`relative rounded-xl border transition-all duration-300 overflow-hidden outline-none ${
        isCompleted
          ? 'bg-slate-900/60 border-emerald-500/30 shadow-sm shadow-emerald-950/20'
          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700/80 shadow-sm'
      }`}
    >
      {/* Top status & metadata bar */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Stage badge */}
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
              {technology.stageNumber}
            </span>

            {/* Category badge */}
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${categoryBadgeStyles}`}
            >
              {technology.category}
            </span>

            {/* Estimated learning time */}
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <Clock className="w-3 h-3 text-slate-400" />
              ~{technology.estimatedHours} hrs
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save / Bookmark button */}
            <button
              onClick={() => onToggleSave(technology.id)}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-purple-900/30 text-purple-300 border-purple-500/40'
                  : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:text-slate-200'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later reference'}
              aria-label={`Bookmark ${technology.name}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-purple-400' : ''}`} />
            </button>

            {/* Status indicator badge */}
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle className="w-3 h-3" />
                Mastered
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700">
                To Learn
              </span>
            )}
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
              <span>{technology.name}</span>
              <span className="text-xs font-normal text-slate-400 font-sans hidden sm:inline">
                • {technology.tagline}
              </span>
            </h3>
          </div>
        </div>

        {/* Plain-English "What it is used for" */}
        <div className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            <strong className="text-slate-200 font-semibold">What it's used for: </strong>
            {technology.whatItIsUsedFor}
          </p>
        </div>

        {/* Learning sequence (3-5 ordered steps) */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-indigo-400" />
            Learning Sequence:
          </div>
          <ol className="space-y-1.5 text-xs text-slate-300">
            {technology.learningSequence.map((step) => (
              <li
                key={step.stepNumber}
                className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50"
              >
                <span className="shrink-0 w-4 h-4 rounded bg-slate-800 text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                  {step.stepNumber}
                </span>
                <div className="leading-snug">
                  <span className="font-semibold text-slate-200 font-mono">{step.title}: </span>
                  <span className="text-slate-400">{step.description}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Expandable "What you will build" & "Key concepts" area */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3 bg-slate-950/30 p-3 rounded-lg border border-slate-800/60">
            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                What You Will Build:
              </div>
              <p className="text-xs text-slate-300 pl-5 leading-relaxed">
                {technology.whatYouWillBuild}
              </p>
            </div>

            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Key Concepts to Master:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-5">
                {technology.keyConcepts.map((concept, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 list-disc marker:text-purple-400"
                  >
                    {concept}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Bottom controls: Expand button, Mark complete control, Watch free tutorial */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Mark complete control */}
          <button
            onClick={() => onToggleComplete(technology.id)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark complete</span>
              </>
            )}
          </button>

          {/* Right: Expand details + Watch free tutorial button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors border border-slate-700/60"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? 'Less' : 'Details'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Exact YouTube Tutorial Button with safe link attributes */}
            <a
              href={validatedTutorialUrl}
              {...SAFE_EXTERNAL_LINK_ATTRS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-mono font-semibold transition-all shadow-sm shadow-indigo-950 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title={`Watch ${technology.name} free tutorial by ${technology.instructor} (${technology.videoDurationText})`}
            >
              <Video className="w-3.5 h-3.5 text-indigo-200" />
              <span>Watch free tutorial</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Video meta footnote */}
        <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Instructor: {technology.instructor}</span>
          <span>Runtime: {technology.videoDurationText}</span>
        </div>
      </div>
    </article>
  );
});
