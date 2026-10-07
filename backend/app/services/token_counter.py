"""Rough token estimates for overhead metrics."""

from __future__ import annotations


def estimate_tokens(text: str) -> int:
    text = (text or "").strip()
    if not text:
        return 0
    # ~1.3 tokens per whitespace-separated word for English-ish prompts
    return max(1, int(round(len(text.split()) * 1.3)))


def token_delta(original: str, optimized: str) -> tuple[int, int, int]:
    o = estimate_tokens(original)
    n = estimate_tokens(optimized)
    return o, n, n - o
