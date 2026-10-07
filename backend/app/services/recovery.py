"""Lightweight NLP recovery before adaptation (generic + personal hints)."""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from app.nlp.char_ngrams import ngram_jaccard
from app.nlp.edit_distance import levenshtein, similarity
from app.models.prompt import PersonalVocabulary

# Generic abbreviations / noisy shorthand (MVP)
GENERIC_ABBREV = {
    "os": "operating systems",
    "ml": "machine learning",
    "db": "database",
    "dl": "deadlock",
    "wth": "with",
    "w": "with",
    "pls": "please",
    "plz": "please",
    "bro": "bro",
    "nd": "and",
    "adn": "and",
    "thsi": "this",
    "expln": "explain",
    "exmpl": "example",
    "exmple": "example",
    "dedlck": "deadlock",
    "dedlk": "deadlock",
    "dedlcks": "deadlocks",
    "oprating": "operating",
    "explian": "explain",
    "giv": "give",
}

COMMON_WORDS = frozenset(
    """
    explain compare write summarize debug implement define list analyze translate
    refactor design prove derive outline help this that with example examples
    using simple formal detailed please and the for in on to of a an is are
    algorithm python java linux thread process deadlock memory virtual tcp udp
    """.split()
)

DOMAIN_TERMS = frozenset(
    """
    CUDA FastAPI Kubernetes LPC2148 Kruskal TCP UDP HTTP JSON API GPU CPU RAM
    ChatGPT Groq VibePrompt Nepal MERN JWT SQL NoSQL
    """.split()
)


@dataclass
class RecoveryResult:
    original: str
    normalized: str
    changes: list[str] = field(default_factory=list)
    noise_score: float = 0.0
    confidence: float = 1.0


def _is_protected(token: str, personal: PersonalVocabulary | None) -> bool:
    if not token:
        return True
    if token in DOMAIN_TERMS:
        return True
    if personal and token in personal.domain_terms:
        return True
    # Preserve likely acronyms / model numbers
    if re.fullmatch(r"[A-Z0-9]{2,}", token):
        return True
    if re.search(r"\d", token) and any(c.isupper() for c in token):
        return True
    return False


def _best_candidate(token: str, personal: PersonalVocabulary | None) -> tuple[str, float, str] | None:
    lower = token.lower()
    if _is_protected(token, personal):
        return None

    # Personal typo map (high trust)
    if personal and lower in personal.personal_typos:
        entry = personal.personal_typos[lower]
        conf = float(entry.confidence or 0.0)
        if conf >= 0.85 and entry.correction:
            return entry.correction, conf, f"{lower} → {entry.correction}"

    if personal and lower in personal.abbreviations:
        entry = personal.abbreviations[lower]
        conf = float(entry.confidence or 0.0)
        meaning = (entry.meaning or entry.correction or "").strip()
        if conf >= 0.85 and meaning:
            return meaning, conf, f"{lower} → {meaning}"

    if lower in GENERIC_ABBREV:
        repl = GENERIC_ABBREV[lower]
        if repl != lower:
            return repl, 0.88, f"{lower} → {repl}"

    # Skip if looks like a normal English word
    if lower in COMMON_WORDS and levenshtein(lower, lower) == 0:
        return None

    suspicious = len(lower) >= 3 and (
        not re.search(r"[aeiou]", lower) or len(set(lower)) <= 2 or lower.count(lower[0]) > len(lower) // 2
    )
    if len(lower) >= 4 and not suspicious and lower in COMMON_WORDS:
        return None

    best_word = None
    best_score = 0.0
    for word in COMMON_WORDS:
        if abs(len(word) - len(lower)) > 3:
            continue
        if levenshtein(lower, word) > 2:
            continue
        edit_sim = similarity(lower, word)
        ngram_sim = ngram_jaccard(lower, word)
        score = 0.45 * edit_sim + 0.55 * ngram_sim
        if score > best_score:
            best_score = score
            best_word = word

    if best_word and best_score >= 0.72:
        return best_word, best_score, f"{lower} → {best_word}"

    return None


def recover_prompt(text: str, personal: PersonalVocabulary | None = None) -> RecoveryResult:
    text = (text or "").strip()
    if not text:
        return RecoveryResult(original="", normalized="", changes=[], noise_score=0.0, confidence=1.0)

    changes: list[str] = []
    suspicious = 0
    tokens = 0
    out_parts: list[str] = []
    confidences: list[float] = []

    for part in re.split(r"(\s+)", text):
        if not part or part.isspace():
            out_parts.append(part)
            continue
        # Punctuation-attached tokens: strip edges for lookup, keep affixes
        m = re.match(r"^([^\w]*)([\w0-9_]+)([^\w]*)$", part)
        if not m:
            out_parts.append(part)
            continue
        prefix, raw, suffix = m.group(1), m.group(2), m.group(3)
        if not raw:
            out_parts.append(part)
            continue

        tokens += 1
        candidate = _best_candidate(raw, personal)
        if candidate:
            repl, conf, note = candidate
            suspicious += 1
            confidences.append(conf)
            if note not in changes:
                changes.append(note)
            if raw.isupper():
                repl_out = repl.upper()
            elif raw[0].isupper():
                repl_out = repl[:1].upper() + repl[1:]
            else:
                repl_out = repl
            out_parts.append(f"{prefix}{repl_out}{suffix}")
        else:
            out_parts.append(part)

    normalized = "".join(out_parts)
    noise_score = suspicious / max(tokens, 1)
    confidence = sum(confidences) / len(confidences) if confidences else 1.0

    return RecoveryResult(
        original=text,
        normalized=normalized.strip() or text,
        changes=changes[:12],
        noise_score=round(noise_score, 3),
        confidence=round(confidence, 3),
    )
