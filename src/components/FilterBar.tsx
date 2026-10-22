import React from 'react';
import { Category } from '../types';
import { sanitizeSearchInput } from '../utils/security';
import { Filter, Layers, Layout, Server, Database, Wrench, Search, X } from 'lucide-react';

interface FilterBarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  statusFilter: 'all' | 'uncompleted' | 'completed';
  onSelectStatusFilter: (status: 'all' | 'uncompleted' | 'completed') => void;
  categoryCounts: Record<Category, number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  statusFilter,
  onSelectStatusFilter,
  categoryCounts,
  searchQuery,
  onSearchChange,
}) => {
  const categories: { label: Category; icon: React.ReactNode }[] = [
    { label: 'All', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'Front-End', icon: <Layout className="w-3.5 h-3.5" /> },
    { label: 'Back-End', icon: <Server className="w-3.5 h-3.5" /> },
    { label: 'Database', icon: <Database className="w-3.5 h-3.5" /> },
    { label: 'Tools', icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  return (
    <div id="technologies" className="py-3 border-b border-slate-800 bg-[#0b0f17]/95 sticky top-16 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="hidden sm:inline-flex items-center text-xs font-mono text-slate-400 mr-1.5">
              <Filter className="w-3 h-3 mr-1 text-slate-400" />
              Category:
            </span>

            {categories.map(({ label, icon }) => {
              const isActive = activeCategory === label;
              return (
                <button
                  key={label}
                  onClick={() => onSelectCategory(label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-sm font-semibold'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {categoryCounts[label] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right side: Search filter & Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Inline Search Bar */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(sanitizeSearchInput(e.target.value))}
                placeholder="Filter by keyword..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-7 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-white"
                  aria-label="Clear filter query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Toggles */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono shrink-0">
              <button
                onClick={() => onSelectStatusFilter('all')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onSelectStatusFilter('uncompleted')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  statusFilter === 'uncompleted'
                    ? 'bg-slate-800 text-amber-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Incomplete
              </button>
              <button
                onClick={() => onSelectStatusFilter('completed')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-slate-800 text-emerald-400 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mastered
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
