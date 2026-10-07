"""Character n-gram similarity."""


def char_ngrams(text: str, n: int = 3) -> set[str]:
    text = text.lower()
    if len(text) < n:
        return {text} if text else set()
    return {text[i : i + n] for i in range(len(text) - n + 1)}


def ngram_jaccard(a: str, b: str, n: int = 3) -> float:
    ga = char_ngrams(a, n)
    gb = char_ngrams(b, n)
    if not ga and not gb:
        return 1.0
    if not ga or not gb:
        return 0.0
    inter = len(ga & gb)
    union = len(ga | gb)
    return inter / union if union else 0.0
