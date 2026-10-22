import { VALID_TECH_IDS } from '../data/roadmapData';
import { ProgressBackupData } from './security';

const COMPLETED_KEY = 'devwoven_completed_techs_v1';
const SAVED_KEY = 'devwoven_saved_techs_v1';
const PROJECTS_CRITERIA_KEY = 'devwoven_projects_criteria';

// Whitelist set for O(1) membership check
const VALID_TECH_SET = new Set<string>(VALID_TECH_IDS);

/**
 * Validates and filters an array to ensure it only contains valid, known technology IDs.
 * Protects against corrupted storage, schema drift, or malicious local storage tampering.
 */
function sanitizeTechIdArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const sanitized: string[] = [];
  for (const item of input) {
    if (typeof item === 'string' && VALID_TECH_SET.has(item) && !sanitized.includes(item)) {
      sanitized.push(item);
    }
  }
  return sanitized;
}

export const getStoredCompleted = (): string[] => {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (!raw) {
      return ['html', 'css']; // default starter state
    }
    const parsed = JSON.parse(raw);
    const validated = sanitizeTechIdArray(parsed);
    return validated.length > 0 ? validated : ['html', 'css'];
  } catch (e) {
    console.warn('LocalStorage error reading completed items:', e);
    return ['html', 'css'];
  }
};

export const saveStoredCompleted = (ids: string[]) => {
  try {
    const validated = sanitizeTechIdArray(ids);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(validated));
  } catch (e) {
    console.error('LocalStorage write failed (quota or disabled):', e);
  }
};

export const getStoredSaved = (): string[] => {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) {
      return ['javascript', 'react']; // initial bookmarks
    }
    const parsed = JSON.parse(raw);
    return sanitizeTechIdArray(parsed);
  } catch (e) {
    console.warn('LocalStorage error reading saved bookmarks:', e);
    return ['javascript', 'react'];
  }
};

export const saveStoredSaved = (ids: string[]) => {
  try {
    const validated = sanitizeTechIdArray(ids);
    localStorage.setItem(SAVED_KEY, JSON.stringify(validated));
  } catch (e) {
    console.error('LocalStorage write failed (quota or disabled):', e);
  }
};

export const getStoredProjectCriteria = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(PROJECTS_CRITERIA_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    // ensure all values are booleans and keys are safe strings
    const sanitized: Record<string, boolean> = {};
    for (const [key, val] of Object.entries(parsed)) {
      if (typeof key === 'string' && /^[a-zA-Z0-9_-]{1,64}$/.test(key) && typeof val === 'boolean') {
        sanitized[key] = val;
      }
    }
    return sanitized;
  } catch (e) {
    console.warn('LocalStorage error reading project criteria:', e);
    return {};
  }
};

export const saveStoredProjectCriteria = (criteria: Record<string, boolean>) => {
  try {
    localStorage.setItem(PROJECTS_CRITERIA_KEY, JSON.stringify(criteria));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
};

export const clearAllStoredData = () => {
  try {
    localStorage.removeItem(COMPLETED_KEY);
    localStorage.removeItem(SAVED_KEY);
    localStorage.removeItem(PROJECTS_CRITERIA_KEY);
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
};

/**
 * Generates an exportable backup object containing all progress, bookmarks, and milestone criteria.
 */
export const createProgressBackup = (): ProgressBackupData => {
  return {
    app: 'DevWoven',
    version: 1,
    exportedAt: new Date().toISOString(),
    completedIds: getStoredCompleted(),
    savedIds: getStoredSaved(),
    projectCriteria: getStoredProjectCriteria(),
  };
};

/**
 * Triggers a browser download of the learner's encrypted-like JSON backup file.
 */
export const downloadProgressBackupFile = () => {
  const data = createProgressBackup();
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `devwoven-backup-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Imports validated backup data into localStorage.
 */
export const applyImportedProgressData = (data: ProgressBackupData) => {
  saveStoredCompleted(data.completedIds);
  saveStoredSaved(data.savedIds);
  saveStoredProjectCriteria(data.projectCriteria);
};
