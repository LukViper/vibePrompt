"""Shared Groq chat-completion client."""

from __future__ import annotations

import os
from contextlib import contextmanager
from contextvars import ContextVar
from typing import Any, Iterator, Optional

import httpx

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# Per-request API key from the Chrome extension (falls back to env).
_api_key_override: ContextVar[Optional[str]] = ContextVar("groq_api_key_override", default=None)


class GroqError(RuntimeError):
    pass


def get_model() -> str:
    return os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")


def get_api_key() -> str:
    override = (_api_key_override.get() or "").strip()
    if override:
        return override

    key = os.getenv("GROQ_API_KEY", "").strip()
    if not key or key == "your_groq_api_key_here":
        raise GroqError(
            "Groq API key is not set. Add it in the VibePrompt extension Settings "
            "(extension icon), or set GROQ_API_KEY in backend/.env."
        )
    return key


@contextmanager
def use_api_key(api_key: Optional[str]) -> Iterator[None]:
    """Temporarily prefer a request-provided Groq API key for this async task."""
    cleaned = (api_key or "").strip() or None
    token = _api_key_override.set(cleaned)
    try:
        yield
    finally:
        _api_key_override.reset(token)


async def chat_completion(
    system: str,
    user: str,
    *,
    temperature: float = 0.4,
    max_tokens: int = 1024,
    api_key: Optional[str] = None,
) -> str:
    key = (api_key or "").strip() or get_api_key()
    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }
    payload: dict[str, Any] = {
        "model": get_model(),
        "temperature": temperature,
        "max_tokens": max_tokens,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(GROQ_URL, headers=headers, json=payload)

    if response.status_code >= 400:
        detail = response.text[:500]
        if response.status_code in (401, 403):
            raise GroqError(
                f"Groq rejected the API key ({response.status_code}). "
                "Update it in VibePrompt Settings or backend/.env."
            )
        raise GroqError(f"Groq API error ({response.status_code}): {detail}")

    data = response.json()
    try:
        return data["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError, AttributeError) as exc:
        raise GroqError("Unexpected Groq response shape") from exc
