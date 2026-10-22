import React, { useState, useEffect, useRef } from 'react';
import { Download, Upload, ShieldCheck, AlertCircle, CheckCircle2, FileJson, X, RotateCcw } from 'lucide-react';
import { validateImportedProgressData, ProgressBackupData } from '../utils/security';
import { downloadProgressBackupFile, applyImportedProgressData } from '../utils/storage';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored: (data: ProgressBackupData) => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  onDataRestored,
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [stagedData, setStagedData] = useState<ProgressBackupData | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setImportError(null);
      setStagedData(null);
      setFileName(null);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setImportError(null);
    setStagedData(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content !== 'string') {
        setImportError('Failed to read file content.');
        return;
      }

      const result = validateImportedProgressData(content);
      if (result.success) {
        setStagedData(result.data);
      } else {
        setImportError(result.error);
      }
    };
    reader.onerror = () => {
      setImportError('Error reading file from disk.');
    };
    reader.readAsText(file);
  };

  const handleApplyImport = () => {
    if (!stagedData) return;
    applyImportedProgressData(stagedData);
    onDataRestored(stagedData);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="backup-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 id="backup-modal-title" className="text-base font-bold font-mono text-white leading-tight">
                Progress Backup &amp; Portability
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Safeguard or migrate your roadmap data across devices
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 text-xs text-slate-300 font-sans overflow-y-auto max-h-[75vh]">
          {/* Section 1: Export */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-white flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Progress File</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Safe JSON
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Download a clean, timestamped backup of all your completed lessons, saved bookmarks,
              and project criteria. Keep your progress safe before clearing browser cookies.
            </p>
            <button
              onClick={downloadProgressBackupFile}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition-colors cursor-pointer shadow-md shadow-emerald-950"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup File (.json)</span>
            </button>
          </div>

          {/* Section 2: Import */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Restore From Backup</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Whitelist Validated
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Restore your learning progress on another browser or device. Files are strictly
              checked against DevWoven schema boundaries before being applied.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-medium transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{fileName ? `Selected: ${fileName}` : 'Choose Backup File (.json)'}</span>
            </button>

            {/* Error state */}
            {importError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-rose-300 font-mono text-[11px]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{importError}</span>
              </div>
            )}

            {/* Validated preview state */}
            {stagedData && (
              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/40 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid DevWoven Backup Verified</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-center">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold">{stagedData.completedIds.length}</div>
                    <div className="text-slate-400">Completed</div>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold">{stagedData.savedIds.length}</div>
                    <div className="text-slate-400">Bookmarks</div>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold">
                      {Object.values(stagedData.projectCriteria).filter(Boolean).length}
                    </div>
                    <div className="text-slate-400">Milestones</div>
                  </div>
                </div>
                <button
                  onClick={handleApplyImport}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold transition-colors cursor-pointer shadow-md shadow-indigo-950 mt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Verified Progress</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
