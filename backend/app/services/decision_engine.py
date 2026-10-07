"""Heuristic + LLM-assisted PASS / ADAPT / ASK decisions."""

from __future__ import annotations

import re
from typing import Optional

from app.models.prompt import ConversationMessage, LearningContextItem, UserProfile
from app.services.tones import VALID_TONES

_AMBIGUOUS = re.compile(
    r"^(explain\s+this|help|fix\s*(this|it)?|make\s+it\s+better|bro\s+make\s+it\s+better|"
    r"what|idk|asdf+|huh|this|that)\.?$",
    re.IGNORECASE,
)
_CONTEXTUAL = re.compile(
    r"\b(explain\s+that\s+again|again|same\s+thing|more\s+on\s+that|what\s+about|"
    r"continue|go\s+on|like\s+before)\b",
    re.IGNORECASE,
)
_CLEAR_MARKERS = re.compile(
    r"\b(with\s+one\s+example|using\s+a\s+table|in\s+python|step[- ]by[- ]step|"
    r"compare|list\s+\d+|formal\s+definition|do\s+not\s+use|"
    r"exactly\s+\d+|in\s+\d+\s+bullets?)\b",
    re.IGNORECASE,
)
_TASK_VERBS = re.compile(
    r"\b(explain|compare|write|summarize|debug|implement|define|list|analyze|"
    r"translate|refactor|design|prove|derive|outline)\b",
    re.IGNORECASE,
)


def _has_profile_signal(profile: Optional[UserProfile]) -> bool:
    if not profile:
        return False
    return bool(
        profile.learning_preferences
        or profile.explanation_preferences
        or profile.preferred_elements
        or profile.response_length
        or profile.technical_level
        or profile.preferred_tone
        or profile.learning_flags
    )


def _has_learning_signal(ctx: Optional[LearningContextItem]) -> bool:
    if not ctx:
        return False
    return bool(ctx.subject.strip() or ctx.current_topic.strip())


def _relevant_context(
    prompt: str,
    conversation: list[ConversationMessage],
) -> list[ConversationMessage]:
    """Keep last few messages; drop obviously unrelated long history later."""
    if not conversation:
        return []
    # Cap to last 6 messages for cost
    return conversation[-6:]


def heuristic_decision(
    prompt: str,
    *,
    tone: Optional[str] = None,
    profile: Optional[UserProfile] = None,
    learning_context: Optional[LearningContextItem] = None,
    conversation: Optional[list[ConversationMessage]] = None,
) -> Optional[str]:
    """
    Return 'pass', 'ask', or None (needs LLM / adapt path).
    Fast path: clear prompts with no personalization pressure → PASS (0 LLM).
    """
    text = prompt.strip()
    if not text:
        return "ask"

    words = text.split()
    lowered = text.lower()

    if _CONTEXTUAL.search(text) and conversation:
        return None

    if len(words) <= 4 and _AMBIGUOUS.match(text.strip()):
        if not conversation:
            return "ask"
        return None

    if len(words) <= 6 and _CONTEXTUAL.search(text) and not conversation:
        return "ask"

    if re.fullmatch(r"[a-z]{4,}|asdf+|qwerty+", lowered):
        return "ask"

    tone_set = bool(tone and tone in VALID_TONES)
    wants_personalization = _has_profile_signal(profile) or _has_learning_signal(learning_context)
    messy = bool(
        re.search(r"\b(bro|idk|wtf|pls|plz|😭|😂|😭)\b", lowered)
        or ("..." in text and len(words) < 12)
    )

    # Already clear, structured, no tone/profile pressure → PASS
    if (
        not tone_set
        and not wants_personalization
        and not messy
        and len(words) >= 6
        and _TASK_VERBS.search(text)
        and (_CLEAR_MARKERS.search(text) or len(words) >= 10)
    ):
        return "pass"

    # Explicit "do not use analogy" etc. with clear task and no tone → often PASS
    if (
        not tone_set
        and not messy
        and len(words) >= 8
        and _TASK_VERBS.search(text)
        and re.search(r"\b(do not|don't|without|no analogy|formal)\b", lowered)
        and not wants_personalization
    ):
        return "pass"

    return None


def select_context(
    prompt: str,
    conversation: list[ConversationMessage],
) -> list[ConversationMessage]:
    return _relevant_context(prompt, conversation)
