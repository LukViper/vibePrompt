"""Ground generated schema cells to the user's original ask.

Prevents the model from swapping domains (e.g. networking lab → "Review code").
"""

from __future__ import annotations

import re
from typing import Optional

from app.nlp.prompts import TONE_DESCRIPTIONS, VALID_TONES
from app.nlp.vibe_schema import VibePromptDraft, VibePromptPatterns

_TOKEN_RE = re.compile(r"[a-z0-9]+(?:\.[a-z0-9]+)*|\d{1,3}(?:\.\d{1,3}){3}", re.I)
_IP_RE = re.compile(r"\b\d{1,3}(?:\.\d{1,3}){3}\b")
_STOP = {
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
    "at",
    "by",
    "with",
    "from",
    "as",
    "is",
    "are",
    "was",
    "be",
    "this",
    "that",
    "it",
    "you",
    "your",
    "me",
    "my",
    "we",
    "our",
    "how",
    "what",
    "when",
    "where",
    "why",
    "do",
    "does",
    "did",
    "can",
    "could",
    "should",
    "would",
    "will",
    "just",
    "into",
    "using",
    "use",
    "used",
    "set",
    "create",
    "make",
    "help",
    "please",
    "need",
    "want",
    "tell",
    "explain",
    "write",
    "short",
    "clear",
    "step",
    "steps",
    "none",
    "null",
    "true",
    "false",
    "tone",
    "format",
    "json",
    "markdown",
    "professional",
    "neutral",
    "team",
    "user",
    "developer",
    "project",
    "code",
    "review",
}

# Domains that often get hallucinated when the model ignores the ask
_GENERIC_HIJACK = {
    "developer",
    "engineer",
    "code",
    "review",
    "refactor",
    "json",
    "api",
    "pull",
    "request",
    "pr",
    "typescript",
    "javascript",
    "python",
    "react",
}


def significant_tokens(text: str) -> set[str]:
    tokens: set[str] = set()
    for match in _TOKEN_RE.finditer(text or ""):
        tok = match.group(0).lower()
        if tok in _STOP:
            continue
        if tok.isdigit() and len(tok) < 2:
            continue
        if len(tok) < 3 and "." not in tok:
            continue
        tokens.add(tok)
    return tokens


def extract_ips(text: str) -> list[str]:
    return _IP_RE.findall(text or "")


def is_draft_grounded(original: str, draft: VibePromptDraft) -> bool:
    """Return False when the draft clearly abandoned the user's topic."""
    orig_tokens = significant_tokens(original)
    if len(orig_tokens) < 3:
        return True

    blob = " ".join(
        [
            draft.persona or "",
            draft.audience or "",
            draft.task or "",
            draft.context or "",
            draft.format or "",
        ]
    )
    gen_tokens = significant_tokens(blob)
    if not gen_tokens:
        return False

    overlap = orig_tokens & gen_tokens
    # IP addresses / hostnames from the lab must survive when present
    ips = {ip for ip in extract_ips(original)}
    if ips and not any(ip in blob for ip in ips):
        return False

    # Require a small absolute overlap or decent ratio against a capped denom
    needed = max(2, min(5, len(orig_tokens) // 8))
    if len(overlap) >= needed:
        return True

    ratio = len(overlap) / max(1, min(20, len(orig_tokens)))
    if ratio >= 0.12:
        return True

    # Explicit hijack: generated text is generic coding while original isn't
    orig_hijack = orig_tokens & _GENERIC_HIJACK
    gen_hijack = gen_tokens & _GENERIC_HIJACK
    if gen_hijack and not orig_hijack and len(overlap) <= 1:
        return False

    return False


def _infer_persona(original: str, intent: str) -> str:
    text = f"{original} {intent}".lower()
    if any(k in text for k in ("router", "switch", "gateway", "lan", "subnet", "cisco", "packet")):
        return "a networking instructor who teaches router and LAN configuration"
    if any(k in text for k in ("linux", "bash", "shell", "ubuntu")):
        return "a systems administrator teaching hands-on lab setup"
    if any(k in text for k in ("python", "code", "function", "bug", "api")):
        return "a senior software engineer"
    return "a clear technical tutor"


def build_grounded_fallback(
    original: str,
    analysis: dict,
    tone: Optional[str] = None,
) -> VibePromptDraft:
    """Deterministic draft that keeps the user's content as context."""
    intent = str(analysis.get("intent") or "").strip()
    if not intent:
        intent = "Help complete the user's technical lab or question"

    emotion = str(analysis.get("emotion") or "Neutral").strip()
    if tone and tone in VALID_TONES:
        tonality = f"{tone} — {TONE_DESCRIPTIONS[tone]}"
    else:
        tonality = emotion.split("—")[0].strip() or "Neutral"

    constraints = analysis.get("constraints") or []
    constraint_bits = "; ".join(str(c) for c in constraints[:4] if str(c).strip())

    # Keep the original lab text — this is the grounding anchor
    context = original.strip()
    if constraint_bits:
        context = f"{context}\n\nConstraints: {constraint_bits}"
    if len(context) > 2500:
        context = context[:2500].rstrip() + "…"

    steps = None
    # Long procedure-style labs benefit from an explicit how-to format
    procedural = any(
        k in original.lower()
        for k in ("configure", "implementation", "topology", "step", "objective")
    )
    if procedural:
        steps = [
            "Restate the topology and IP plan briefly",
            "Give exact device/interface configuration commands",
            "Set default gateways on the hosts",
            "Show how to verify with ping and what success looks like",
        ]

    return VibePromptDraft(
        persona=_infer_persona(original, intent),
        audience="a student following a hands-on lab",
        task=intent if len(intent.split()) >= 4 else f"{intent}: explain how to configure this setup",
        steps=steps,
        context=context,
        format=(
            "Step-by-step configuration with example commands, then a short verification checklist"
            if procedural
            else "Clear direct answer with short examples"
        ),
        tonality=tonality,
        style="Concrete and practical; keep the user's IP addresses and topology",
        patterns=VibePromptPatterns(
            usePersona=True,
            useTemplate=False,
            useReflection=False,
            useContextManager=True,
        ),
    )
