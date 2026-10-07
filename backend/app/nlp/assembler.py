"""Deterministic prompt assembly from VibePromptSchema fields.

Uses a compact single-block layout for simple asks, and the fuller labeled
Canvas/CO-STAR layout only when steps or advanced patterns are active.
"""

from __future__ import annotations

import re

from app.nlp.vibe_schema import VibePromptDraft, VibePromptPatterns, VibePromptSchema

_GENERIC_AUDIENCE = re.compile(
    r"^(the\s+)?(user|reader|anyone|someone|general(\s+audience)?|people|humans?)$",
    re.IGNORECASE,
)
_GENERIC_AUDIENCE_LOOSE = re.compile(
    r"\b(general\s+user|the\s+user|anyone|general\s+audience)\b",
    re.IGNORECASE,
)
_TRIVIAL_CONTEXT = re.compile(
    r"^(n/?a|none|no(t)?\s+specific\s+context|general|nothing|—|-)?$",
    re.IGNORECASE,
)


def _is_generic_audience(audience: str) -> bool:
    text = (audience or "").strip()
    if not text:
        return True
    if _GENERIC_AUDIENCE.match(text):
        return True
    # Long padded audiences that still mean "the user"
    if _word_count(text) <= 16 and _GENERIC_AUDIENCE_LOOSE.search(text):
        return True
    return False


def _pattern_flags(draft: VibePromptDraft) -> VibePromptPatterns:
    return draft.patterns or VibePromptPatterns()


def _word_count(text: str) -> int:
    return len(re.findall(r"\S+", text or ""))


def should_use_compact(draft: VibePromptDraft) -> bool:
    """Prefer a short assembled prompt unless structure is actually needed."""
    flags = _pattern_flags(draft)
    if flags.useTemplate or flags.useReflection or flags.useContextManager:
        return False
    if draft.steps:
        return False
    # Long specialized briefs still get labeled sections for clarity
    bulk = " ".join(
        [
            draft.persona,
            draft.audience,
            draft.task,
            draft.context,
            draft.format,
            draft.tonality,
            draft.style or "",
        ]
    )
    return _word_count(bulk) <= 90


def _short_tonality(tonality: str) -> str:
    text = tonality.strip()
    # "Encourage — supportive…" → prefer the short chip label
    if "—" in text:
        left, right = text.split("—", 1)
        left, right = left.strip(), right.strip()
        if _word_count(left) <= 4:
            return left
        if _word_count(right) <= 8:
            return right
        return left
    return text


def assemble_compact(draft: VibePromptDraft) -> str:
    """Tight 2–5 sentence prompt — proportional to small user asks."""
    flags = _pattern_flags(draft)
    parts: list[str] = []

    persona = draft.persona.strip().rstrip(".…").strip()
    if flags.usePersona:
        parts.append(f"You are {persona}. Stay in this role.")
    else:
        parts.append(f"You are {persona}.")

    task = draft.task.strip().rstrip(".…").strip()
    parts.append(task.rstrip(".") + ".")

    audience = draft.audience.strip().rstrip(".…").strip()
    if audience and not _is_generic_audience(audience):
        parts.append(f"Write for {audience.rstrip('.')}.")

    context = draft.context.strip().rstrip(".…").strip()
    if context and not _TRIVIAL_CONTEXT.match(context) and _word_count(context) <= 12:
        parts.append(context.rstrip(".") + ".")

    tonality = _short_tonality(draft.tonality)
    if tonality and _word_count(tonality) <= 6:
        parts.append(f"Tone: {tonality.rstrip('.')}.")

    fmt = draft.format.strip().rstrip(".…").strip()
    if fmt and _word_count(fmt) <= 10:
        parts.append(f"Format: {fmt.rstrip('.')}.")

    return "\n".join(parts).strip()


def assemble_full(draft: VibePromptDraft) -> str:
    """Labeled Canvas/CO-STAR layout for multi-step or patterned prompts."""
    flags = _pattern_flags(draft)
    sections: list[str] = []

    if flags.usePersona:
        sections.append(
            f"You are {draft.persona.strip()}. "
            "Stay in this role for the entire response; do not break character."
        )
    else:
        sections.append(f"You are {draft.persona.strip()}.")

    audience = draft.audience.strip()
    if audience and not _is_generic_audience(audience):
        sections.append(f"Audience: {audience}.")

    sections.append(f"Task: {draft.task.strip()}.")

    if draft.steps:
        step_lines = "\n".join(
            f"{idx}. {step.strip()}" for idx, step in enumerate(draft.steps, start=1)
        )
        sections.append(f"Follow these steps:\n{step_lines}")

    context = draft.context.strip()
    if context and not _TRIVIAL_CONTEXT.match(context):
        if flags.useContextManager:
            sections.append(
                "Context (authoritative — use only this background unless the user "
                f"explicitly asks for outside knowledge):\n{context}"
            )
        else:
            sections.append(f"Context:\n{context}")

    tonality = draft.tonality.strip()
    style = (draft.style or "").strip()
    if style and style.lower() not in tonality.lower():
        sections.append(f"Tonality: {tonality}. Writing style: {style}.")
    elif tonality:
        sections.append(f"Tonality: {tonality}.")

    fmt = draft.format.strip()
    if fmt:
        if flags.useTemplate:
            sections.append(
                "Response format (Template — fill every labeled section):\n"
                f"{fmt}\n\n"
                "Use clear section headings that match the format above."
            )
        else:
            sections.append(f"Response format: {fmt}")

    if flags.useReflection:
        sections.append(
            "Before you finalize: verify the task is complete, tone fits the audience, "
            "and the format is followed — then give the final answer only."
        )

    return "\n\n".join(sections).strip()


def assemble_prompt(draft: VibePromptDraft) -> str:
    """Assemble a copy-ready ChatGPT prompt from structured cells."""
    if should_use_compact(draft):
        return assemble_compact(draft)
    return assemble_full(draft)


def slim_draft(
    draft: VibePromptDraft,
    *,
    original_user_input: str,
    pattern_overrides: VibePromptPatterns | None = None,
) -> VibePromptDraft:
    """Clamp verbosity after the model fills cells (esp. for short user asks)."""
    updates: dict = {}
    word_count = _word_count(original_user_input)
    flags = _pattern_flags(draft)
    forced = pattern_overrides.model_dump(exclude_unset=True) if pattern_overrides else {}

    def _clip(value: str, max_words: int) -> str:
        words = value.split()
        if len(words) <= max_words:
            return value.strip()
        cut = words[:max_words]
        dangling = {
            "a",
            "an",
            "the",
            "and",
            "or",
            "to",
            "for",
            "of",
            "in",
            "on",
            "with",
            "without",
            "that",
            "who",
            "which",
            "their",
            "its",
            "and",
        }
        while cut and cut[-1].lower().strip(",.;:") in dangling:
            cut.pop()
        return " ".join(cut).rstrip(",;:")

    # Short casual asks ONLY (jokes / one-liners) — never for multi-line labs
    is_tiny = word_count <= 24 and "\n" not in original_user_input.strip()
    if is_tiny:
        if not forced.get("useTemplate"):
            flags.useTemplate = False
        if not forced.get("useReflection"):
            flags.useReflection = False
        if not forced.get("useContextManager"):
            flags.useContextManager = False
        if not forced.get("usePersona"):
            flags.usePersona = False
        updates["steps"] = None
        updates["patterns"] = flags

        max_words = 8
        updates["persona"] = _clip(draft.persona, max_words)
        updates["audience"] = _clip(draft.audience, 6)
        updates["task"] = _clip(draft.task, 10)
        updates["context"] = "none"
        updates["format"] = _clip(draft.format, 6)
        tonality = draft.tonality.strip()
        if "—" in tonality:
            updates["tonality"] = tonality.split("—", 1)[0].strip() or _clip(tonality, 6)
        else:
            updates["tonality"] = _clip(tonality, 6)
        updates["style"] = None
    else:
        # Labs / longer asks: keep facts; only soft-trim extreme padding
        max_words = 40
        for field in ("persona", "audience", "task", "format", "tonality"):
            current = getattr(draft, field)
            clipped = _clip(current, max_words)
            if clipped != current:
                updates[field] = clipped
        # Never collapse a rich lab context (IPs, topology) down to nothing
        if draft.context and draft.context.strip().lower() not in {"none", "n/a", "-"}:
            if len(draft.context) > 3000:
                updates["context"] = draft.context[:3000].rstrip() + "…"
        if draft.style:
            clipped_style = _clip(draft.style, 20)
            if clipped_style != draft.style:
                updates["style"] = clipped_style
        if draft.steps and len(draft.steps) > 6:
            updates["steps"] = draft.steps[:6]

    if not updates:
        return draft
    return draft.model_copy(update=updates)


def finalize_schema(
    draft: VibePromptDraft,
    *,
    original_user_input: str,
    generated_prompt: str | None = None,
    pattern_overrides: VibePromptPatterns | None = None,
) -> VibePromptSchema:
    """Attach meta fields and assembled prompt; validate as VibePromptSchema."""
    slimmed = slim_draft(
        draft,
        original_user_input=original_user_input,
        pattern_overrides=pattern_overrides,
    )
    prompt = (generated_prompt or assemble_prompt(slimmed)).strip()
    return VibePromptSchema(
        **slimmed.model_dump(),
        originalUserInput=original_user_input.strip(),
        generatedPrompt=prompt,
    )
