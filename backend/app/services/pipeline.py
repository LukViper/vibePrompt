"""End-to-end adapt pipeline: recovery → decision → minimal LLM adapt."""

from __future__ import annotations

from typing import Optional

from app.models.prompt import (
    ConversationMessage,
    PersonalVocabulary,
    VibeResponse,
)
from app.services.optimizer import adapt_prompt
from app.services.recovery import recover_prompt


async def run_adapt_pipeline(
    raw_prompt: str,
    *,
    tone: Optional[str] = None,
    conversation_context: Optional[list[ConversationMessage]] = None,
    personal_vocabulary: Optional[PersonalVocabulary] = None,
) -> VibeResponse:
    raw_prompt = (raw_prompt or "").strip()
    recovery = recover_prompt(raw_prompt, personal_vocabulary)
    working = recovery.normalized if recovery.normalized else raw_prompt

    result = await adapt_prompt(
        working,
        tone=tone,
        conversation_context=conversation_context,
        raw_original=raw_prompt,
        recovery_changes=recovery.changes,
        recovery_confidence=recovery.confidence,
        noise_score=recovery.noise_score,
    )
    return result
