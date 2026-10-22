import React from 'react';

interface DevWovenLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const DevWovenLogo: React.FC<DevWovenLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon recreation matching user reference */}
      <div
        className={`${iconDimensions} relative rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/60 p-1 flex items-center justify-center shadow-md shadow-indigo-950/40 shrink-0 overflow-hidden`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle background glow */}
          <circle cx="24" cy="24" r="16" fill="#6366f1" fillOpacity="0.15" />

          {/* Left bracket < */}
          <path
            d="M17 16L9 24L17 32"
            stroke="#818cf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right bracket > */}
          <path
            d="M31 16L39 24L31 32"
            stroke="#818cf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Diagonal woven green line */}
          <line
            x1="13"
            y1="37"
            x2="35"
            y2="11"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Center weaving node */}
          <circle cx="24" cy="24" r="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none select-none">
        <span
          className={`${titleSizes} font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-indigo-400 font-sans tracking-tight`}
        >
          DevWoven
        </span>
        {showSubtitle && (
          <span
            className={`${subtitleSizes} font-mono font-semibold uppercase text-slate-400 pt-0.5`}
          >
            Web Dev Roadmap
          </span>
        )}
      </div>
    </div>
  );
};
