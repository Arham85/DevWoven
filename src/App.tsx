import React, { useState, useMemo, useCallback } from 'react';
import { ROADMAP_DATA, ALL_TECHNOLOGIES } from './data/roadmapData';
import { Category, RoadmapPhase } from './types';
import {
  getStoredCompleted,
  saveStoredCompleted,
  getStoredSaved,
  saveStoredSaved,
  clearAllStoredData,
} from './utils/storage';
import { sanitizeSearchInput, ProgressBackupData } from './utils/security';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SummaryCards } from './components/SummaryCards';
import { FilterBar } from './components/FilterBar';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { BeginnerTipsPanel } from './components/BeginnerTipsPanel';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { PrivacySecurityModal } from './components/PrivacySecurityModal';
import { DataBackupModal } from './components/DataBackupModal';
import { Sparkles, Check } from 'lucide-react';

export default function App() {
  // State for tracking completed technologies (persisted in localStorage)
  const [completedIds, setCompletedIds] = useState<string[]>(() => getStoredCompleted());

  // State for bookmarked / saved technologies (persisted in localStorage)
  const [savedIds, setSavedIds] = useState<string[]>(() => getStoredSaved());

  // Search query & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'uncompleted' | 'completed'>('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Modals for Privacy/Security and Data Portability
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // Toast notification for helpful learner feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  }, []);

  // Toggle complete handler
  const handleToggleComplete = useCallback((id: string) => {
    setCompletedIds((prev) => {
      let updated: string[];
      const tech = ALL_TECHNOLOGIES.find((t) => t.id === id);
      const techName = tech?.name || 'Technology';

      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        showToast(`Marked "${techName}" as incomplete.`);
      } else {
        updated = [...prev, id];
        showToast(`Mastered "${techName}"! Progress updated.`);
      }
      saveStoredCompleted(updated);
      return updated;
    });
  }, [showToast]);

  // Toggle save/bookmark handler
  const handleToggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      let updated: string[];
      const tech = ALL_TECHNOLOGIES.find((t) => t.id === id);
      const techName = tech?.name || 'Technology';

      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        showToast(`Removed "${techName}" from bookmarks.`);
      } else {
        updated = [...prev, id];
        showToast(`Saved "${techName}" to bookmarks.`);
      }
      saveStoredSaved(updated);
      return updated;
    });
  }, [showToast]);

  // Reset all progress
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your learning progress and bookmarks?')) {
      setCompletedIds([]);
      setSavedIds([]);
      clearAllStoredData();
      showToast('Learning progress has been reset.');
    }
  };

  const handleClearAllFilters = () => {
    setActiveCategory('All');
    setStatusFilter('all');
    setShowSavedOnly(false);
    setSearchQuery('');
  };

  // Restore imported backup data handler
  const handleDataRestored = (data: ProgressBackupData) => {
    setCompletedIds(data.completedIds);
    setSavedIds(data.savedIds);
    showToast(`Restored ${data.completedIds.length} topics and ${data.savedIds.length} bookmarks successfully!`);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      All: ALL_TECHNOLOGIES.length,
      'Front-End': 0,
      'Back-End': 0,
      Database: 0,
      Tools: 0,
    };
    ALL_TECHNOLOGIES.forEach((t) => {
      if (counts[t.category] !== undefined) {
        counts[t.category]++;
      }
    });
    return counts;
  }, []);

  // Smooth scroll and card focus highlight
  const focusTechCard = useCallback((techId: string) => {
    const targetTech = ALL_TECHNOLOGIES.find((t) => t.id === techId);
    if (targetTech) {
      if (activeCategory !== 'All' && activeCategory !== targetTech.category) {
        setActiveCategory('All');
      }
      if (showSavedOnly && !savedIds.includes(techId)) {
        setShowSavedOnly(false);
      }
      if (statusFilter === 'uncompleted' && completedIds.includes(techId)) {
        setStatusFilter('all');
      }
    }

    setTimeout(() => {
      const el = document.getElementById(`tech-card-${techId}`);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        el.focus();
        el.classList.add('ring-2', 'ring-indigo-400', 'shadow-indigo-500/30', 'scale-[1.01]');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-indigo-400', 'shadow-indigo-500/30', 'scale-[1.01]');
        }, 2200);
      }
    }, 80);
  }, [activeCategory, showSavedOnly, savedIds, statusFilter, completedIds]);

  // Token-based, comprehensive search filter
  const filteredPhases: RoadmapPhase[] = useMemo(() => {
    const sanitized = sanitizeSearchInput(searchQuery).toLowerCase().trim();
    const searchTokens = sanitized.split(/\s+/).filter(Boolean);

    return ROADMAP_DATA.map((phase) => {
      const filteredTechs = phase.technologies.filter((tech) => {
        // 1. Saved-only filter
        if (showSavedOnly && !savedIds.includes(tech.id)) {
          return false;
        }

        // 2. Category filter
        if (activeCategory !== 'All' && tech.category !== activeCategory) {
          return false;
        }

        // 3. Status filter
        const isComp = completedIds.includes(tech.id);
        if (statusFilter === 'uncompleted' && isComp) return false;
        if (statusFilter === 'completed' && !isComp) return false;

        // 4. Tokenized search across all relevant fields
        if (searchTokens.length > 0) {
          const searchCorpus = [
            tech.name,
            tech.category,
            tech.tagline,
            tech.whatItIsUsedFor,
            tech.instructor,
            tech.stageNumber,
            tech.whatYouWillBuild,
            ...(tech.aliases || []),
            ...tech.keyConcepts,
            ...tech.learningSequence.map((s) => `${s.title} ${s.description}`),
          ]
            .join(' ')
            .toLowerCase();

          // Every token in query must be present in searchCorpus
          const matchesAllTokens = searchTokens.every((token) => searchCorpus.includes(token));
          if (!matchesAllTokens) {
            return false;
          }
        }

        return true;
      });

      return {
        ...phase,
        technologies: filteredTechs,
      };
    });
  }, [searchQuery, activeCategory, statusFilter, showSavedOnly, completedIds, savedIds]);

  // Smooth scroll utility for main sections
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectSuggestion = (tag: string) => {
    setSearchQuery(tag);
    const match = ALL_TECHNOLOGIES.find(
      (t) =>
        t.name.toLowerCase().includes(tag.toLowerCase()) ||
        t.aliases?.some((a) => a.toLowerCase().includes(tag.toLowerCase()))
    );
    if (match) {
      focusTechCard(match.id);
    } else {
      scrollTo('roadmap');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Top Navigation with Live Search Dropdown */}
      <Navbar
        completedCount={completedIds.length}
        totalCount={ALL_TECHNOLOGIES.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
        onFilterSavedOnly={() => setShowSavedOnly((prev) => !prev)}
        isShowingSavedOnly={showSavedOnly}
        onResetProgress={handleResetProgress}
        allTechnologies={ALL_TECHNOLOGIES}
        onSelectTechCard={focusTechCard}
        onOpenBackup={() => setIsBackupModalOpen(true)}
      />

      {/* Welcoming Hero with Curator Credit */}
      <Hero
        onStartRoadmap={() => scrollTo('roadmap')}
        onExploreTechnologies={() => scrollTo('technologies')}
      />

      {/* Summary Cards */}
      <SummaryCards
        totalPhases={ROADMAP_DATA.length}
        totalTechs={ALL_TECHNOLOGIES.length}
        totalVideos={ALL_TECHNOLOGIES.length}
        completedCount={completedIds.length}
      />

      {/* Filter Chips & Inline Search Controls */}
      <FilterBar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setShowSavedOnly(false);
        }}
        statusFilter={statusFilter}
        onSelectStatusFilter={setStatusFilter}
        categoryCounts={categoryCounts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Roadmap & Beginner Tips Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Active Filter Notice if any filter is active */}
        {(showSavedOnly || searchQuery || activeCategory !== 'All' || statusFilter !== 'all') && (
          <div className="mb-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 flex-wrap">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>
                Active filters:{' '}
                <strong className="text-white">
                  {showSavedOnly ? 'Saved Bookmarks' : activeCategory}
                </strong>
                {statusFilter !== 'all' && ` • status: ${statusFilter}`}
                {searchQuery && (
                  <span>
                    {' '}
                    • search: <strong className="text-indigo-300">"{searchQuery}"</strong>
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={handleClearAllFilters}
              className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer shrink-0"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Column: 4 Roadmap Phases */}
          <div className="lg:col-span-8 space-y-8">
            <RoadmapTimeline
              phases={filteredPhases}
              completedIds={completedIds}
              savedIds={savedIds}
              onToggleComplete={handleToggleComplete}
              onToggleSave={handleToggleSave}
              searchQuery={searchQuery}
              onClearFilters={handleClearAllFilters}
              onSelectSuggestion={handleSelectSuggestion}
            />
          </div>

          {/* Right Column: Beginner Tips Panel & Curator Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            <BeginnerTipsPanel
              completedIds={completedIds}
              allTechnologies={ALL_TECHNOLOGIES}
              onScrollToProjects={() => scrollTo('projects')}
            />
          </div>
        </div>

        {/* Milestone Projects Section with 3 Progressive Projects */}
        <ProjectsSection />
      </main>

      {/* Footer with Muhammad Arham Munir Profile */}
      <Footer
        onScrollTo={scrollTo}
        onResetProgress={handleResetProgress}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
      />

      {/* Privacy & Security Charter Modal */}
      <PrivacySecurityModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Progress Data Backup & Restore Modal */}
      <DataBackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataRestored={handleDataRestored}
      />

      {/* Floating Action / Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 text-slate-200 text-xs font-mono shadow-xl shadow-black/60 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}
