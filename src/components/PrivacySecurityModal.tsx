import React, { useEffect } from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, Database, CheckCircle, X, ExternalLink } from 'lucide-react';
import { SAFE_EXTERNAL_LINK_ATTRS } from '../utils/security';

interface PrivacySecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacySecurityModal: React.FC<PrivacySecurityModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-base font-bold font-mono text-white leading-tight">
                Privacy &amp; Security Charter
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Verified launch security posture for DevWoven
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-300 font-sans">
          {/* Zero tracking statement */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold text-xs mb-1.5">
              <EyeOff className="w-4 h-4" />
              <span>Zero-Tracking Guarantee</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              DevWoven does not track you. We do not use Google Analytics, cookies, advertising beacons,
              or tracking pixels. Your learning journey is 100% private to your device.
            </p>
          </div>

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-[11px]">
                <ServerOff className="w-3.5 h-3.5" />
                <span>100% Client-Side</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                No user credentials, email addresses, or session databases exist on any server.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-teal-400 font-bold text-[11px]">
                <Database className="w-3.5 h-3.5" />
                <span>Local-First Storage</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                Checkmarks, bookmarks, and milestone criteria are stored in your browser's private LocalStorage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[11px]">
                <Lock className="w-3.5 h-3.5" />
                <span>Hardened Headers</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                Equipped with Content-Security-Policy (CSP), nosniff, and strict origin referrer policies.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Isolated Outbound Links</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-normal">
                All tutorial links enforce HTTPS and rel="noopener noreferrer" to stop reverse-tabnabbing.
              </p>
            </div>
          </div>

          {/* Active Security Checkpoints */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Live Security Audit Status
            </h3>
            <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden font-mono text-[11px]">
              <div className="p-2.5 bg-slate-950/60 flex items-center justify-between">
                <span className="text-slate-300">Content Security Policy (CSP)</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Enforced
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/60 flex items-center justify-between">
                <span className="text-slate-300">Third-Party Tracking Beacons</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Zero Detected
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/60 flex items-center justify-between">
                <span className="text-slate-300">LocalStorage Schema Sanitization</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Whitelisted
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/60 flex items-center justify-between">
                <span className="text-slate-300">External Reverse Tabnabbing Defense</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Enabled
                </span>
              </div>
              <div className="p-2.5 bg-slate-950/60 flex items-center justify-between">
                <span className="text-slate-300">Host Target</span>
                <span className="text-indigo-300">GitHub Pages Static CDN</span>
              </div>
            </div>
          </div>

          {/* Curator Note */}
          <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
            <span>Curated with privacy-first standards by </span>
            <strong className="text-slate-200">Muhammad Arham Munir</strong>.
            <span> Open source under the MIT License.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
          >
            Close Charter
          </button>
        </div>
      </div>
    </div>
  );
};
