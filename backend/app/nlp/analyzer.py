"""Step 1: intent + emotion analysis."""

from __future__ import annotations

import json
import re
from typing import Any, Optional

from app.nlp.client import chat_completion
from app.nlp.prompts import ANALYSIS_SYSTEM, JSON_REPAIR_SYSTEM, TONE_DESCRIPTIONS, VALID_TONES


class AnalysisError(RuntimeError):
    pass


def _strip_fences(text: str) -> str:
    text = text.strip()
    fence = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", text, re.IGNORECASE)
    if fence:
        return fence.group(1).strip()
    return text


def _normalize_analysis(raw: dict[str, Any], tone: Optional[str]) -> dict[str, Any]:
    intent = str(raw.get("intent") or "").strip()
    emotion = str(raw.get("emotion") or "").strip()
    style_notes = str(raw.get("style_notes") or "").strip()
    constraints_raw = raw.get("constraints") or []

    if isinstance(constraints_raw, str):
        constraints = [c.strip() for c in constraints_raw.split(",") if c.strip()]
    elif isinstance(constraints_raw, list):
        constraints = [str(c).strip() for c in constraints_raw if str(c).strip()]
    else:
        constraints = []

    if not intent:
        raise AnalysisError("Analysis missing intent")

    if tone and tone in VALID_TONES:
        emotion = f"{tone} — {TONE_DESCRIPTIONS[tone]}"
        if style_notes:
            style_notes = f"Tone override: {tone}. {style_notes}"
        else:
            style_notes = f"Tone override: {tone}."

    if not emotion:
        emotion = "Neutral"

    return {
        "intent": intent,
        "emotion": emotion,
        "constraints": constraints,
        "style_notes": style_notes,
    }


def _parse_json(text: str) -> dict[str, Any]:
    cleaned = _strip_fences(text)
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise AnalysisError(f"Invalid JSON from model: {exc}") from exc
    if not isinstance(data, dict):
        raise AnalysisError("Analysis JSON must be an object")
    return data


async def analyze_input(text: str, tone: Optional[str] = None) -> dict[str, Any]:
    user_parts = [f"Raw user input:\n{text}"]
    if tone and tone in VALID_TONES:
        user_parts.append(
            f"\nTone override (must set emotion to this): {tone} — {TONE_DESCRIPTIONS[tone]}"
        )
    user_msg = "\n".join(user_parts)

    raw_text = await chat_completion(ANALYSIS_SYSTEM, user_msg, temperature=0.2)

    try:
        return _normalize_analysis(_parse_json(raw_text), tone)
    except AnalysisError:
        repaired = await chat_completion(
            JSON_REPAIR_SYSTEM,
            f"Broken content:\n{raw_text}",
            temperature=0.0,
            max_tokens=512,
        )
        return _normalize_analysis(_parse_json(repaired), tone)
