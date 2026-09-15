/**
 * Ambient types for the Chrome extension (plain JS).
 * Mirrors shared/vibe-prompt-schema.ts.
 */

export type {};

declare global {
  interface VibePromptPatterns {
    usePersona?: boolean;
    useTemplate?: boolean;
    useReflection?: boolean;
    useContextManager?: boolean;
  }

  interface VibePromptSchema {
    persona: string;
    audience: string;
    task: string;
    steps?: string[];
    context: string;
    format: string;
    tonality: string;
    style?: string;
    patterns?: VibePromptPatterns;
    originalUserInput: string;
    generatedPrompt: string;
  }

  interface VibeApiResponse {
    original: string;
    intent: string;
    emotion: string;
    constraints: string[];
    optimized_prompt: string;
    schema?: VibePromptSchema;
  }
}
