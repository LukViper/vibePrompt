/**
 * VibePrompt structured prompt schema
 * -----------------------------------
 * Combines:
 *   - CO-STAR  (Context, Objective, Style, Tone, Audience, Response)
 *   - Prompt Canvas (Persona, Audience, Task, Steps, Context, Format, Tonality)
 *   - Optional White Prompt Pattern Catalog flags
 *
 * The backend Pydantic models in `backend/app/nlp/vibe_schema.py` mirror this
 * file 1:1. Keep them in sync when changing fields.
 */

/** Optional White et al. prompt-pattern toggles */
export interface VibePromptPatterns {
  /** Emphasize / lock the role block (Persona pattern) */
  usePersona?: boolean;
  /** Emit labeled Template sections for the response shape */
  useTemplate?: boolean;
  /** Append a Reflection checklist before the final answer */
  useReflection?: boolean;
  /** Scope generation to provided context only (Context Manager) */
  useContextManager?: boolean;
}

/**
 * Canonical structured prompt object produced by VibePrompt.
 * All required strings must be non-empty after generation.
 */
export interface VibePromptSchema {
  // —— Prompt Canvas + CO-STAR ——
  /** Role the model should adopt (Canvas Persona / CO-STAR Style role) */
  persona: string;
  /** Who the output is for (Canvas + CO-STAR Audience) */
  audience: string;
  /** Clear objective / what to do (Canvas Task / CO-STAR Objective) */
  task: string;
  /** Optional step-by-step instructions (Canvas Steps) */
  steps?: string[];
  /** Background information (Canvas + CO-STAR Context) */
  context: string;
  /** Desired output shape (Canvas Format / CO-STAR Response) */
  format: string;
  /** Combined Tone + delivery Style (Canvas Tonality / CO-STAR Tone) */
  tonality: string;
  /** Optional finer writing-style notes (CO-STAR Style detail) */
  style?: string;

  // —— Optional advanced patterns ——
  patterns?: VibePromptPatterns;

  // —— Meta ——
  originalUserInput: string;
  /** Final assembled prompt — always derived from the fields above */
  generatedPrompt: string;
}

/** Fields the model fills before assembly (excludes assembled output) */
export type VibePromptDraft = Omit<
  VibePromptSchema,
  "generatedPrompt" | "originalUserInput"
> & {
  originalUserInput?: string;
  generatedPrompt?: string;
};

/** API request options that influence schema generation */
export interface VibePromptGenerateOptions {
  /** Tone chip override: Grill | Neutral | Encourage | Simplify | Professional */
  tone?: "Grill" | "Neutral" | "Encourage" | "Simplify" | "Professional" | null;
  /** Force-enable White patterns (undefined → model / heuristic defaults) */
  patterns?: VibePromptPatterns;
}

/** Full API response shape (backward-compatible with existing extension) */
export interface VibeApiResponse {
  original: string;
  intent: string;
  emotion: string;
  constraints: string[];
  /** @deprecated Prefer schema.generatedPrompt — kept for extension compat */
  optimized_prompt: string;
  schema: VibePromptSchema;
}

/** Required canvas / CO-STAR cells that must be present */
export const VIBE_REQUIRED_FIELDS = [
  "persona",
  "audience",
  "task",
  "context",
  "format",
  "tonality",
] as const;

export type VibeRequiredField = (typeof VIBE_REQUIRED_FIELDS)[number];

/** CO-STAR letter → schema field mapping */
export const CO_STAR_FIELD_MAP = {
  C: "context",
  O: "task",
  S: "style",
  T: "tonality",
  A: "audience",
  R: "format",
} as const;

/** Prompt Canvas cell → schema field mapping */
export const CANVAS_FIELD_MAP = {
  persona: "persona",
  audience: "audience",
  task: "task",
  steps: "steps",
  context: "context",
  format: "format",
  tonality: "tonality",
} as const;

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Runtime guard for partially-filled drafts (browser / Node without Zod).
 * Returns a list of missing required field names.
 */
export function missingRequiredFields(
  draft: Partial<VibePromptSchema>
): VibeRequiredField[] {
  return VIBE_REQUIRED_FIELDS.filter((key) => !isNonEmptyString(draft[key]));
}

export function assertVibePromptSchema(
  value: unknown
): asserts value is VibePromptSchema {
  if (!value || typeof value !== "object") {
    throw new TypeError("VibePromptSchema must be an object");
  }
  const obj = value as Record<string, unknown>;
  for (const key of VIBE_REQUIRED_FIELDS) {
    if (!isNonEmptyString(obj[key])) {
      throw new TypeError(`VibePromptSchema.${key} must be a non-empty string`);
    }
  }
  if (!isNonEmptyString(obj.originalUserInput)) {
    throw new TypeError("VibePromptSchema.originalUserInput is required");
  }
  if (!isNonEmptyString(obj.generatedPrompt)) {
    throw new TypeError("VibePromptSchema.generatedPrompt is required");
  }
  if (obj.steps !== undefined) {
    if (!Array.isArray(obj.steps) || !obj.steps.every(isNonEmptyString)) {
      throw new TypeError("VibePromptSchema.steps must be string[] when set");
    }
  }
}
