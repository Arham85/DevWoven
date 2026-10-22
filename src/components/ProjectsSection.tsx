import React, { useState } from 'react';
import { PROGRESSIVE_PROJECTS } from '../data/projectsData';
import {
  FolderGit2,
  Clock,
  CheckSquare,
  Square,
  Sparkles,
  Terminal,
  Code2,
  CheckCircle2
} from 'lucide-react';

import { getStoredProjectCriteria, saveStoredProjectCriteria } from '../utils/storage';

export const ProjectsSection: React.FC = () => {
  // Local state for checking off project criteria as the student builds
  const [completedCriteria, setCompletedCriteria] = useState<Record<string, boolean>>(() => {
    return getStoredProjectCriteria();
  });

  const toggleCriteria = (id: string) => {
    setCompletedCriteria((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      saveStoredProjectCriteria(updated);
      return updated;
    });
  };

  const difficultyColors = {
    Starter: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Core: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    'Full-Stack': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <section id="projects" className="pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-indigo-300 mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Progressive Milestone Projects</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Stop Watching. Start Building.
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Tutorials only teach you grammar; projects teach you how to think. Tackle these three
            progressive milestones in order to solidify your mental models and graduate with a proud
            portfolio.
          </p>
        </div>

        {/* 3 Progressive Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROGRESSIVE_PROJECTS.map((project, index) => {
            return (
              <div
                key={project.id}
                className="rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div className="p-5 sm:p-6">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                        difficultyColors[project.difficulty]
                      }`}
                    >
                      {project.difficulty} Milestone
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
                      <Clock className="w-3 h-3 text-slate-400" />
                      ~{project.estimatedHours} hrs
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-indigo-400 font-semibold mb-1">
                    {project.tagline}
                  </div>

                  <h3 className="text-lg font-bold text-white font-mono tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mb-5">
                    <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Core Technologies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                    <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      What You Will Implement:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <span className="text-teal-400 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Acceptance Criteria Checklist */}
                  <div>
                    <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      Acceptance Criteria (Check when built):
                    </div>
                    <div className="space-y-1.5">
                      {project.acceptanceCriteria.map((crit, cIdx) => {
                        const critKey = `${project.id}-crit-${cIdx}`;
                        const isDone = !!completedCriteria[critKey];
                        return (
                          <button
                            key={cIdx}
                            onClick={() => toggleCriteria(critKey)}
                            className={`w-full text-left flex items-start gap-2 p-2 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                              isDone
                                ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30'
                                : 'bg-slate-950/30 text-slate-400 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            {isDone ? (
                              <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span className={isDone ? 'line-through opacity-80' : ''}>
                              {crit}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Summary */}
                <div className="p-4 bg-slate-950/70 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Target: {project.phaseRelation.split(':')[0]}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Portfolio
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
