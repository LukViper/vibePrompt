"""Tone → compact behavioral instructions (explicit selection wins)."""

from __future__ import annotations

VALID_TONES = ("Grill", "Neutral", "Encourage", "Simplify", "Professional")

TONE_BEHAVIOR = {
    "Grill": "Be blunt, direct, and focus on correcting misconceptions.",
    "Neutral": "Keep a clear, matter-of-fact tone.",
    "Encourage": "Be supportive and constructive without fluff.",
    "Simplify": "Use simple language and short sentences; avoid jargon.",
    "Professional": "Use a precise, professional tone.",
}
