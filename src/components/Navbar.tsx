import React, { useState, useEffect, useRef } from 'react';
import { DevWovenLogo } from './DevWovenLogo';
import { Technology } from '../types';
import { sanitizeSearchInput, safeHttpsUrl, SAFE_EXTERNAL_LINK_ATTRS } from '../utils/security';
import {
  Search,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Video,
  FileJson
} from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onFilterSavedOnly?: () => void;
  isShowingSavedOnly?: boolean;
  onResetProgress: () => void;
  allTechnologies: Technology[];
  onSelectTechCard: (id: string) => void;
  onOpenBackup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalCount,
  searchQuery,
  onSearchChange,
  savedCount,
  onFilterSavedOnly,
  isShowingSavedOnly,
  onResetProgress,
  allTechnologies,
  onSelectTechCard,
  onOpenBackup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const percentage = Math.round((completedCount / (totalCount || 1)) * 100);

  // Keyboard shortcut Cmd+K / Ctrl+K focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to dismiss search results dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setIsSearchFocused(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Real-time matching for search dropdown
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const dropdownMatches = React.useMemo(() => {
    if (!normalizedQuery) return [];
    return allTechnologies.filter((tech) => {
      const matchName = tech.name.toLowerCase().includes(normalizedQuery);
      const matchCat = tech.category.toLowerCase().includes(normalizedQuery);
      const matchTagline = tech.tagline.toLowerCase().includes(normalizedQuery);
      const matchDesc = tech.whatItIsUsedFor.toLowerCase().includes(normalizedQuery);
      const matchInstructor = tech.instructor.toLowerCase().includes(normalizedQuery);
      const matchStage = tech.stageNumber.toLowerCase().includes(normalizedQuery);
      const matchAliases = tech.aliases?.some(a => a.toLowerCase().includes(normalizedQuery));
      const matchConcepts = tech.keyConcepts.some(c => c.toLowerCase().includes(normalizedQuery));

      return (
        matchName ||
        matchCat ||
        matchTagline ||
        matchDesc ||
        matchInstructor ||
        matchStage ||
        matchAliases ||
        matchConcepts
      );
    });
  }, [allTechnologies, normalizedQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (dropdownMatches.length === 1) {
      onSelectTechCard(dropdownMatches[0].id);
    } else {
      scrollToSection('roadmap');
    }
  };

  const handleSelectResult = (techId: string) => {
    setIsSearchFocused(false);
    setMobileMenuOpen(false);
    onSelectTechCard(techId);
  };

  const popularTags = ['React', 'TypeScript', 'SQL', 'Node.js', 'JWT', 'Git', 'Tailwind'];

  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0f17]/95 backdrop-blur-md transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and edition badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            aria-label="DevWoven Home"
          >
            <DevWovenLogo size="sm" showSubtitle={false} />
          </button>

          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Beginner to Full-Stack v2025
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono tracking-wide text-slate-300">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('roadmap')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Roadmap Hub
          </button>
          <button
            onClick={() => scrollToSection('technologies')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Technologies
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
        </nav>

        {/* Search Bar Container with Dropdown Results */}
        <div
          ref={searchContainerRef}
          className="relative flex-1 max-w-sm hidden md:block"
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              ref={searchInputRef}
              id="navbar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(sanitizeSearchInput(e.target.value))}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search tech, concepts, instructors..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-16 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-mono transition-colors shadow-inner"
              autoComplete="off"
              spellCheck={false}
            />

            {/* Clear Button or Cmd+K indicator */}
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 pointer-events-none">
                  ⌘K
                </kbd>
              )}
            </div>
          </form>

          {/* Floating Live Search Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl shadow-black/80 overflow-hidden z-50 max-h-96 flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Found {dropdownMatches.length} {dropdownMatches.length === 1 ? 'technology' : 'technologies'}
                </span>
                <span className="text-[10px] text-slate-400">Esc to close</span>
              </div>

              <div className="overflow-y-auto divide-y divide-slate-800/60 max-h-72">
                {dropdownMatches.length > 0 ? (
                  dropdownMatches.map((tech) => (
                    <div
                      key={tech.id}
                      className="p-3 hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectResult(tech.id)}
                        className="flex-1 text-left flex items-start gap-2.5 focus:outline-none"
                      >
                        <span className="shrink-0 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/70 mt-0.5">
                          {tech.stageNumber}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                              {tech.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {tech.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {tech.tagline}
                          </p>
                          <div className="text-[10px] font-mono text-slate-400 mt-1">
                            Instructor: {tech.instructor} • ~{tech.estimatedHours}h
                          </div>
                        </div>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSelectResult(tech.id)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-[11px] font-mono transition-colors flex items-center gap-1"
                          title="View on Roadmap"
                        >
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <a
                          href={safeHttpsUrl(tech.tutorialUrl)}
                          {...SAFE_EXTERNAL_LINK_ATTRS}
                          className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
                          title={`Watch ${tech.name} tutorial`}
                        >
                          <Video className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-slate-300 font-mono">
                      No technologies matched "{searchQuery}"
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 font-mono">
                      Try searching by keyword:
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1 justify-center">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            onSearchChange(tag);
                            searchInputRef.current?.focus();
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {dropdownMatches.length > 0 && (
                <div className="p-2 bg-slate-950 border-t border-slate-800 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchFocused(false);
                      scrollToSection('roadmap');
                    }}
                    className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View all matches filtered in Roadmap Timeline</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress & Saved Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Saved items filter button */}
          {onFilterSavedOnly && (
            <button
              onClick={onFilterSavedOnly}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                isShowingSavedOnly
                  ? 'bg-purple-900/40 text-purple-300 border-purple-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Show bookmarked technologies"
              aria-label="Filter saved technologies"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isShowingSavedOnly ? 'fill-purple-400' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              <span className="bg-slate-800 text-slate-300 px-1 rounded text-[10px]">
                {savedCount}
              </span>
            </button>
          )}

          {/* Progress Indicator */}
          <div
            className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs"
            title={`${completedCount} of ${totalCount} technologies completed`}
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Track Progress
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                {percentage}% <span className="text-slate-400 font-normal">({completedCount}/{totalCount})</span>
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden shrink-0 border border-slate-700/50">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Backup / Export progress button */}
          {onOpenBackup && (
            <button
              onClick={onOpenBackup}
              className="text-slate-400 hover:text-indigo-300 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Backup or restore learning data"
              aria-label="Backup or restore learning data"
            >
              <FileJson className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Reset progress button */}
          <button
            onClick={onResetProgress}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
            title="Reset learning progress"
            aria-label="Reset learning progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0b0f17] px-4 pt-3 pb-5 space-y-3">
          {/* Mobile Search */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(sanitizeSearchInput(e.target.value))}
              placeholder="Search tech, concepts, videos..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile dropdown results if typing */}
          {searchQuery && dropdownMatches.length > 0 && (
            <div className="bg-slate-900/90 rounded-lg border border-slate-800 p-2 space-y-1.5 max-h-48 overflow-y-auto">
              <div className="text-[10px] font-mono text-slate-400 px-1">
                Matches ({dropdownMatches.length}):
              </div>
              {dropdownMatches.slice(0, 5).map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => handleSelectResult(tech.id)}
                  className="w-full text-left p-2 rounded hover:bg-slate-800 flex items-center justify-between text-xs font-mono text-slate-200"
                >
                  <span>{tech.name}</span>
                  <span className="text-[10px] text-indigo-400">{tech.category}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col space-y-2 pt-2 text-sm font-mono text-slate-300">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-1.5 hover:text-emerald-400"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="text-left py-1.5 hover:text-emerald-400"
            >
              Roadmap Hub
            </button>
            <button
              onClick={() => scrollToSection('technologies')}
              className="text-left py-1.5 hover:text-emerald-400"
            >
              Technologies
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left py-1.5 hover:text-emerald-400"
            >
              Projects
            </button>
            {onOpenBackup && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBackup();
                }}
                className="text-left py-1.5 hover:text-indigo-300 text-indigo-400 flex items-center gap-1.5"
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>Backup / Restore Progress</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
