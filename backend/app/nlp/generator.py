"""Step 2: generate structured VibePromptSchema, then assemble the final prompt."""

from __future__ import annotations

import json
import re
from typing import Any, Optional

from pydantic import ValidationError

from app.nlp.assembler import finalize_schema
from app.nlp.client import chat_completion
from app.nlp.grounding import build_grounded_fallback, is_draft_grounded
from app.nlp.prompts import (
    SCHEMA_GENERATION_SYSTEM,
    SCHEMA_REPAIR_SYSTEM,
    TONE_DESCRIPTIONS,
    VALID_TONES,
)
from app.nlp.vibe_schema import VibePromptDraft, VibePromptPatterns, VibePromptSchema


class SchemaGenerationError(RuntimeError):
    pass


def _strip_fences(text: str) -> str:
    text = text.strip()
    fence = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", text, re.IGNORECASE)
    if fence:
        return fence.group(1).strip()
    return text


def _parse_json(text: str) -> dict[str, Any]:
    cleaned = _strip_fences(text)
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise SchemaGenerationError(f"Invalid schema JSON from model: {exc}") from exc
    if not isinstance(data, dict):
        raise SchemaGenerationError("Schema JSON must be an object")
    return data


def _merge_pattern_overrides(
    raw: dict[str, Any],
    pattern_overrides: Optional[VibePromptPatterns],
) -> dict[str, Any]:
    if not pattern_overrides:
        return raw
    existing = raw.get("patterns") if isinstance(raw.get("patterns"), dict) else {}
    merged = {**existing, **pattern_overrides.model_dump(exclude_unset=True)}
    raw = {**raw, "patterns": merged}
    return raw


def _to_draft(
    raw: dict[str, Any],
    pattern_overrides: Optional[VibePromptPatterns] = None,
) -> VibePromptDraft:
    payload = _merge_pattern_overrides(raw, pattern_overrides)
    payload.pop("originalUserInput", None)
    payload.pop("generatedPrompt", None)
    try:
        return VibePromptDraft.model_validate(payload)
    except ValidationError as exc:
        raise SchemaGenerationError(f"Schema validation failed: {exc}") from exc


async def generate_vibe_schema(
    original: str,
    analysis: dict[str, Any],
    tone: Optional[str] = None,
    pattern_overrides: Optional[VibePromptPatterns] = None,
) -> VibePromptSchema:
    """Fill Canvas/CO-STAR cells via LLM, then assemble generatedPrompt."""
    constraints = analysis.get("constraints") or []
    constraints_block = (
        "\n".join(f"- {c}" for c in constraints) if constraints else "- (none stated)"
    )

    tone_line = ""
    if tone and tone in VALID_TONES:
        tone_line = f"\nForced tonality: {tone} — {TONE_DESCRIPTIONS[tone]}"

    pattern_line = ""
    if pattern_overrides is not None:
        pattern_line = (
            "\nForced pattern flags (must honor these booleans): "
            f"{pattern_overrides.model_dump_json()}"
        )

    user_msg = f"""ORIGINAL USER INPUT (source of truth — do not replace the topic):
\"\"\"
{original}
\"\"\"

NLP analysis (may help, but original wins if they conflict):
- Intent: {analysis.get("intent", "")}
- Emotion / tone: {analysis.get("emotion", "")}
- Style notes: {analysis.get("style_notes", "")}
- Constraints:
{constraints_block}
{tone_line}
{pattern_line}

Requirements:
- task + context must stay about THIS input (keep IPs/topology/devices if present).
- Never invent an unrelated coding/"Project X"/"Review code" prompt.
- Keep fields lean, but do not drop critical lab facts from context.

Return the VibePromptSchema draft JSON now."""

    raw_text = await chat_completion(
        SCHEMA_GENERATION_SYSTEM,
        user_msg,
        temperature=0.2,
        max_tokens=900,
    )

    try:
        draft = _to_draft(_parse_json(raw_text), pattern_overrides)
    except SchemaGenerationError:
        repaired = await chat_completion(
            SCHEMA_REPAIR_SYSTEM,
            f"User topic to preserve:\n{original[:1200]}\n\nBroken content:\n{raw_text}",
            temperature=0.0,
            max_tokens=800,
        )
        try:
            draft = _to_draft(_parse_json(repaired), pattern_overrides)
        except SchemaGenerationError:
            draft = build_grounded_fallback(original, analysis, tone)

    # If the model drifted off-topic, replace with a grounded lab/tutor draft
    if not is_draft_grounded(original, draft):
        draft = build_grounded_fallback(original, analysis, tone)
        if pattern_overrides is not None:
            merged = {
                **draft.patterns.model_dump(),
                **pattern_overrides.model_dump(exclude_unset=True),
            }
            draft = draft.model_copy(update={"patterns": VibePromptPatterns.model_validate(merged)})

    if tone and tone in VALID_TONES:
        draft = draft.model_copy(
            update={"tonality": f"{tone} — {TONE_DESCRIPTIONS[tone]}"}
        )

    return finalize_schema(
        draft,
        original_user_input=original,
        pattern_overrides=pattern_overrides,
    )


async def generate_prompt(
    original: str,
    analysis: dict[str, Any],
    tone: Optional[str] = None,
    pattern_overrides: Optional[VibePromptPatterns] = None,
) -> str:
    """Backward-compatible helper: return only the assembled prompt string."""
    schema = await generate_vibe_schema(
        original, analysis, tone, pattern_overrides=pattern_overrides
    )
    return schema.generatedPrompt
