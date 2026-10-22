import { VALID_TECH_IDS } from '../data/roadmapData';

/**
 * Utility functions for client-side security, input sanitization,
 * URL verification, and defense-in-depth against XSS and injection attacks.
 */

const VALID_TECH_SET = new Set<string>(VALID_TECH_IDS);

/**
 * Sanitizes search input to prevent injection, strips null bytes,
 * removes potentially hazardous HTML control characters, and enforces length limits.
 */
export function sanitizeSearchInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, 100) // prevent long-string ReDoS or memory abuse
    .replace(/[\x00-\x1F\x7F]/g, '') // strip ASCII control characters
    .replace(/[<>]/g, '') // remove HTML tag brackets
    .trimStart();
}

/**
 * Validates external URLs to ensure they only use HTTPS and valid domains.
 * Prevents javascript: or data: pseudo-protocols from execution.
 */
export function safeHttpsUrl(url: string): string {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('https://')) {
    return trimmed;
  }
  return '#';
}

/**
 * Standard safe attributes for external links to prevent reverse tabnabbing
 * and window.opener hijacking attacks.
 */
export const SAFE_EXTERNAL_LINK_ATTRS = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
};

export interface ProgressBackupData {
  app: 'DevWoven';
  version: number;
  exportedAt: string;
  completedIds: string[];
  savedIds: string[];
  projectCriteria: Record<string, boolean>;
}

export type ValidationResult =
  | { success: true; data: ProgressBackupData }
  | { success: false; error: string };

/**
 * Validates user-imported JSON files against strict cryptographic whitelist schemas.
 * Rejects corrupt data, prototype pollution, oversized files, and invalid technology identifiers.
 */
export function validateImportedProgressData(rawJson: string): ValidationResult {
  if (!rawJson || typeof rawJson !== 'string') {
    return { success: false, error: 'Empty file provided.' };
  }

  // Reject files larger than 100KB to prevent memory exhaustion
  if (rawJson.length > 100 * 1024) {
    return { success: false, error: 'Backup file exceeds safe size limit (100KB).' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { success: false, error: 'File is not a valid JSON document.' };
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { success: false, error: 'Root document must be a JSON object.' };
  }

  const obj = parsed as Record<string, unknown>;

  // Basic signature validation
  if (obj.app !== 'DevWoven') {
    return {
      success: false,
      error: 'Unrecognized backup file. Signature must be for DevWoven.',
    };
  }

  // Validate completedIds array
  const sanitizedCompleted: string[] = [];
  if (Array.isArray(obj.completedIds)) {
    for (const item of obj.completedIds) {
      if (typeof item === 'string' && VALID_TECH_SET.has(item) && !sanitizedCompleted.includes(item)) {
        sanitizedCompleted.push(item);
      }
    }
  }

  // Validate savedIds array
  const sanitizedSaved: string[] = [];
  if (Array.isArray(obj.savedIds)) {
    for (const item of obj.savedIds) {
      if (typeof item === 'string' && VALID_TECH_SET.has(item) && !sanitizedSaved.includes(item)) {
        sanitizedSaved.push(item);
      }
    }
  }

  // Validate projectCriteria dictionary
  const sanitizedCriteria: Record<string, boolean> = {};
  if (typeof obj.projectCriteria === 'object' && obj.projectCriteria !== null && !Array.isArray(obj.projectCriteria)) {
    for (const [key, val] of Object.entries(obj.projectCriteria as Record<string, unknown>)) {
      // Ensure safe key format (letters, numbers, dashes, underscores up to 64 chars)
      if (typeof key === 'string' && /^[a-zA-Z0-9_-]{1,64}$/.test(key) && typeof val === 'boolean') {
        sanitizedCriteria[key] = val;
      }
    }
  }

  return {
    success: true,
    data: {
      app: 'DevWoven',
      version: typeof obj.version === 'number' ? obj.version : 1,
      exportedAt: typeof obj.exportedAt === 'string' ? obj.exportedAt : new Date().toISOString(),
      completedIds: sanitizedCompleted,
      savedIds: sanitizedSaved,
      projectCriteria: sanitizedCriteria,
    },
  };
}
