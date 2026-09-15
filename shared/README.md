# Shared VibePrompt types

TypeScript source of truth for the structured prompt schema:

- [`vibe-prompt-schema.ts`](./vibe-prompt-schema.ts) — `VibePromptSchema`, pattern flags, CO-STAR / Canvas maps

Python runtime mirror (Pydantic): `backend/app/nlp/vibe_schema.py`

Keep field names identical (camelCase) across TS and Python so API JSON stays isomorphic.
