"""Tone → how the adapted prompt should steer GenAI replies."""

from __future__ import annotations

VALID_TONES = ("Grill", "Neutral", "Encourage", "Simplify", "Professional")

# Instructions embedded into the *user's* adapted prompt for the target GenAI.
TONE_PROMPT_DIRECTIVES = {
    "Grill": (
        "Respond with rigorous critical judgment of the given context and claims: "
        "challenge weak assumptions, judge flaws directly, stress-test the idea, "
        "and do not soften or praise by default."
    ),
    "Neutral": (
        "Respond in a neutral, matter-of-fact way: neither critical grilling nor "
        "encouragement. Stick to clear facts, balanced explanation, and no emotional push."
    ),
    "Encourage": (
        "Respond encouragingly and supportively: even if the idea is weak or something "
        "went wrong, acknowledge effort, keep confidence up, and guide forward without "
        "harsh judgment or shaming."
    ),
    "Simplify": (
        "Simplify the concepts and conversation: use plain language, short sentences, "
        "everyday analogies when helpful, and avoid jargon unless you immediately explain it."
    ),
    "Professional": (
        "Respond in a professional register: polished, precise, and business-appropriate "
        "wording with a clear structure suitable for workplace or formal use."
    ),
}

# Compact behavior line for the optimizer LLM.
TONE_BEHAVIOR = {
    "Grill": (
        "Rewrite so GenAI critically judges the context/claims — blunt critique at the core, "
        "no soft padding."
    ),
    "Neutral": (
        "Rewrite so GenAI stays neutral — neither grilling nor encouraging; factual and even."
    ),
    "Encourage": (
        "Rewrite so GenAI replies encouragingly — supportive even when the idea is bad or "
        "something went wrong; no harsh judgment."
    ),
    "Simplify": (
        "Rewrite so GenAI simplifies concepts/conversation — plain language, short sentences, "
        "minimal jargon."
    ),
    "Professional": (
        "Rewrite so GenAI's output is professional — formal, precise, polished structure."
    ),
}
