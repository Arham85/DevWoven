import React from 'react';
import { Layers, Cpu, PlaySquare, Award } from 'lucide-react';

interface SummaryCardsProps {
  totalPhases: number;
  totalTechs: number;
  totalVideos: number;
  completedCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalPhases,
  totalTechs,
  totalVideos,
  completedCount,
}) => {
  const percentage = Math.round((completedCount / (totalTechs || 1)) * 100);

  const stats = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      label: '4 Phases',
      sublabel: 'ZERO TO DEPLOYMENT',
      value: `${totalPhases} Key Stages`,
      borderClass: 'hover:border-indigo-500/40',
    },
    {
      icon: <Cpu className="w-5 h-5 text-teal-400" />,
      label: `${totalTechs} Technologies`,
      sublabel: 'CAREFULLY FILTERED',
      value: 'Modern Web Stack',
      borderClass: 'hover:border-teal-500/40',
    },
    {
      icon: <PlaySquare className="w-5 h-5 text-purple-400" />,
      label: `${totalVideos} Deep Tutorials`,
      sublabel: 'PEER-REVIEWED & FREE',
      value: '100+ Free Hours',
      borderClass: 'hover:border-purple-500/40',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      label: `${percentage}% Completed`,
      sublabel: `${completedCount} OF ${totalTechs} MASTERED`,
      value: percentage === 100 ? 'Roadmap Mastered!' : `${totalTechs - completedCount} Left to Go`,
      borderClass: 'hover:border-emerald-500/40',
      isProgress: true,
      percentage,
    },
  ];

  return (
    <section className="py-6 border-b border-slate-800/80 bg-[#0d131f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl bg-slate-900/80 border border-slate-800 transition-all ${stat.borderClass} group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono tracking-wider font-semibold text-slate-400 uppercase">
                  {stat.sublabel}
                </span>
              </div>

              <div className="text-base sm:text-lg font-bold text-white font-mono tracking-tight">
                {stat.label}
              </div>

              <div className="text-xs text-slate-400 mt-0.5">
                {stat.value}
              </div>

              {stat.isProgress && (
                <div className="mt-2.5 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
