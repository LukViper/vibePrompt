"""Tests for request-scoped Groq API key overrides."""

from __future__ import annotations

import os
import sys
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

from app.nlp.client import get_api_key, use_api_key  # noqa: E402
import pytest  # noqa: E402


def test_extension_key_overrides_env(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "env-key-should-lose")
    with use_api_key("extension-key-wins"):
        assert get_api_key() == "extension-key-wins"
    assert get_api_key() == "env-key-should-lose"


def test_missing_key_errors_clearly(monkeypatch):
    monkeypatch.delenv("GROQ_API_KEY", raising=False)
    with use_api_key(None):
        with pytest.raises(Exception) as exc:
            get_api_key()
    assert "extension Settings" in str(exc.value) or "GROQ_API_KEY" in str(exc.value)
