import React from 'react';
import { RoadmapPhase } from '../types';
import { TechCard } from './TechCard';
import { CheckCircle2, Search, RotateCcw, Sparkles } from 'lucide-react';

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
  completedIds: string[];
  savedIds: string[];
  onToggleComplete: (id: string) => void;
  onToggleSave: (id: string) => void;
  searchQuery: string;
  onClearFilters?: () => void;
  onSelectSuggestion?: (tag: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  phases,
  completedIds,
  savedIds,
  onToggleComplete,
  onToggleSave,
  searchQuery,
  onClearFilters,
  onSelectSuggestion,
}) => {
  const totalMatchedTechs = phases.reduce((acc, p) => acc + p.technologies.length, 0);

  const suggestedKeywords = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'JWT',
    'Vercel'
  ];

  if (totalMatchedTechs === 0) {
    return (
      <div className="text-center py-16 px-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl max-w-2xl mx-auto">
        <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold font-mono text-white mb-2">
          No Technologies Match Your Search
        </h3>
        <p className="text-xs text-slate-300 font-mono mb-6 max-w-md mx-auto">
          {searchQuery ? (
            <>No matches found for <span className="text-amber-300">"{searchQuery}"</span>. Try a synonym or explore popular topics below.</>
          ) : (
            'No technologies match the currently active category or status filter.'
          )}
        </p>

        {/* Suggested keywords */}
        <div className="mb-6">
          <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Popular Roadmap Keywords:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {suggestedKeywords.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectSuggestion?.(tag)}
                className="px-2.5 py-1 rounded text-xs font-mono bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors border border-slate-700/60 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold transition-colors shadow-md shadow-indigo-950 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters &amp; Search</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <section id="roadmap" className="space-y-12">
      {phases.map((phase) => {
        // Calculate completion for this specific phase
        const phaseTotal = phase.technologies.length;
        const phaseCompleted = phase.technologies.filter((t) =>
          completedIds.includes(t.id)
        ).length;
        const isPhaseFinished = phaseTotal > 0 && phaseCompleted === phaseTotal;

        // If filtering leaves no technologies in this phase, don't render an empty card block
        if (phase.technologies.length === 0) {
          return null;
        }

        return (
          <div
            key={phase.id}
            id={`phase-${phase.id}`}
            className="relative rounded-2xl bg-slate-900/40 border border-slate-800/80 p-5 sm:p-7 transition-all"
          >
            {/* Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-indigo-300 border border-indigo-500/30">
                    {phase.numberString}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {phase.subtitle}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
                  {phase.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  {phase.description}
                </p>
              </div>

              {/* Phase Completion Badge */}
              <div className="shrink-0 self-start sm:self-auto">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                    isPhaseFinished
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800/90 text-amber-300 border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {phaseCompleted} / {phaseTotal} Completed
                  </span>
                </span>
              </div>
            </div>

            {/* Vertical Timeline Container */}
            <div className="relative mt-6 pt-2">
              {/* Vertical line running through the left side on desktop */}
              <div
                className="hidden sm:block absolute left-4 top-4 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500/40 via-slate-700/60 to-slate-800"
                aria-hidden="true"
              />

              <div className="space-y-6 sm:space-y-8">
                {phase.technologies.map((tech) => {
                  const isCompleted = completedIds.includes(tech.id);
                  const isSaved = savedIds.includes(tech.id);

                  return (
                    <div
                      key={tech.id}
                      className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
                    >
                      {/* Timeline Node on desktop */}
                      <div
                        className="hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center relative z-10 mt-4 transition-all duration-300"
                        aria-hidden="true"
                      >
                        {isCompleted ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-md shadow-emerald-950/40">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500/50 flex items-center justify-center text-indigo-300">
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                          </div>
                        )}
                      </div>

                      {/* Main Technology Card */}
                      <div className="w-full flex-1">
                        <TechCard
                          technology={tech}
                          isCompleted={isCompleted}
                          isSaved={isSaved}
                          onToggleComplete={onToggleComplete}
                          onToggleSave={onToggleSave}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phase suggested checkpoint summary */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 bg-slate-950/40 px-4 py-2.5 rounded-lg border border-slate-800/40">
              <span className="text-slate-300">
                Phase Milestone Goal: <strong className="text-white">{phase.suggestedMilestone}</strong>
              </span>
              <span className="text-[11px] text-indigo-400 font-semibold">
                Estimated Phase Time: ~{phase.technologies.reduce((acc, t) => acc + t.estimatedHours, 0)} hours
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
