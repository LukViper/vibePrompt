"""Build compact profile text and normalize onboarding answers."""

from __future__ import annotations

import re
from typing import Iterable

from app.models.prompt import OnboardingAnswers, UserProfile

ONBOARDING_QUESTIONS = [
    "When you are learning something difficult, what helps you most? "
    "(analogies, real-world examples, step-by-step, visual, code, practice, theory…)",
    "When you don't understand something, what kind of explanation do you usually ask for?",
    "How do you normally write prompts to ChatGPT? "
    "(short/casual, detailed, structured, messy, conversational…)",
    "How long do you usually want ChatGPT's answers to be?",
    "How technical should explanations normally be for you?",
    "What kind of tone do you usually prefer? "
    "(friendly, casual, professional, direct, challenging, encouraging…)",
    "When ChatGPT explains a technical topic, what do you usually want it to include? "
    "(examples, analogies, code, diagrams, comparisons, practical applications…)",
]

_PREF_KEYWORDS = {
    "analogies": ["analogy", "analogies"],
    "examples": ["example", "examples", "real-world", "real world"],
    "step_by_step": ["step-by-step", "step by step", "steps"],
    "visual": ["visual", "diagram", "diagrams"],
    "code": ["code", "code examples"],
    "practice": ["practice", "questions", "exercises"],
    "theory": ["theory", "theory first"],
}


def _extract_keywords(text: str, mapping: dict[str, list[str]]) -> list[str]:
    lowered = text.lower()
    found: list[str] = []
    for label, keys in mapping.items():
        if any(k in lowered for k in keys):
            found.append(label.replace("_", "-"))
    return found


def profile_from_onboarding(answers: OnboardingAnswers | Iterable[str]) -> UserProfile:
    if isinstance(answers, OnboardingAnswers):
        vals = list(answers.answers)
    else:
        vals = list(answers)
    while len(vals) < 7:
        vals.append("")
    vals = [str(v).strip() for v in vals[:7]]

    learning = _extract_keywords(vals[0], _PREF_KEYWORDS) or [
        t.strip() for t in re.split(r"[,/]| and ", vals[0]) if t.strip()
    ][:6]
    explanation = [
        t.strip() for t in re.split(r"[,/]| and ", vals[1]) if t.strip()
    ][:6] or learning[:3]
    elements = _extract_keywords(vals[6], _PREF_KEYWORDS) or [
        t.strip() for t in re.split(r"[,/]| and ", vals[6]) if t.strip()
    ][:6]

    length = vals[3].lower()
    if "very short" in length:
        response_length = "very short"
    elif "short" in length:
        response_length = "short"
    elif "detail" in length or "long" in length:
        response_length = "detailed"
    elif "medium" in length:
        response_length = "medium"
    else:
        response_length = vals[3][:40] or "medium"

    tech = vals[4].lower()
    if "begin" in tech:
        technical_level = "beginner"
    elif "advanc" in tech:
        technical_level = "advanced"
    elif "inter" in tech:
        technical_level = "intermediate"
    else:
        technical_level = vals[4][:40] or "intermediate"

    return UserProfile(
        learning_preferences=learning[:8],
        explanation_preferences=explanation[:8],
        preferred_elements=elements[:8],
        prompt_style=vals[2][:80] or "casual",
        response_length=response_length,
        technical_level=technical_level,
        preferred_tone=vals[5][:40] or "friendly",
    )


def profile_brief(profile: UserProfile | None) -> str:
    if not profile:
        return "(none)"
    bits = []
    if profile.learning_preferences:
        bits.append("learning=" + ", ".join(profile.learning_preferences))
    if profile.preferred_elements:
        bits.append("include=" + ", ".join(profile.preferred_elements))
    if profile.response_length:
        bits.append(f"length={profile.response_length}")
    if profile.technical_level:
        bits.append(f"level={profile.technical_level}")
    if profile.preferred_tone:
        bits.append(f"tone={profile.preferred_tone}")
    if profile.prompt_style:
        bits.append(f"prompt_style={profile.prompt_style}")
    return "; ".join(bits) if bits else "(empty profile)"
