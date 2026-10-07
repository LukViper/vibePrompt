"""Pydantic mirror of shared/vibe-prompt-schema.ts — keep fields in sync."""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, Field, field_validator, model_validator


class VibePromptPatterns(BaseModel):
    """Optional White et al. prompt-pattern toggles."""

    usePersona: bool = False
    useTemplate: bool = False
    useReflection: bool = False
    useContextManager: bool = False


class VibePromptDraft(BaseModel):
    """Model-filled cells before deterministic assembly."""

    persona: str = Field(..., min_length=1)
    audience: str = Field(..., min_length=1)
    task: str = Field(..., min_length=1)
    steps: Optional[list[str]] = None
    context: str = Field(..., min_length=1)
    format: str = Field(..., min_length=1)
    tonality: str = Field(..., min_length=1)
    style: Optional[str] = None
    patterns: Optional[VibePromptPatterns] = None

    @field_validator(
        "persona",
        "audience",
        "task",
        "context",
        "format",
        "tonality",
        mode="before",
    )
    @classmethod
    def _strip_required(cls, value: object) -> str:
        if value is None:
            raise ValueError("required field is empty")
        text = str(value).strip()
        if not text:
            raise ValueError("required field is empty")
        return text

    @field_validator("style", mode="before")
    @classmethod
    def _strip_optional_style(cls, value: object) -> Optional[str]:
        if value is None:
            return None
        text = str(value).strip()
        return text or None

    @field_validator("steps", mode="before")
    @classmethod
    def _normalize_steps(cls, value: object) -> Optional[list[str]]:
        if value is None:
            return None
        if isinstance(value, str):
            parts = [p.strip(" -\t") for p in value.splitlines() if p.strip()]
            return parts or None
        if isinstance(value, list):
            steps = [str(item).strip() for item in value if str(item).strip()]
            return steps or None
        raise ValueError("steps must be a list of strings")


class VibePromptSchema(VibePromptDraft):
    """Canonical structured prompt object (Canvas + CO-STAR + patterns)."""

    originalUserInput: str = Field(..., min_length=1)
    generatedPrompt: str = Field(..., min_length=1)

    @field_validator("originalUserInput", "generatedPrompt", mode="before")
    @classmethod
    def _strip_meta(cls, value: object) -> str:
        text = str(value or "").strip()
        if not text:
            raise ValueError("meta field is empty")
        return text

    @model_validator(mode="after")
    def _patterns_default(self) -> VibePromptSchema:
        if self.patterns is None:
            self.patterns = VibePromptPatterns()
        return self


# CO-STAR / Canvas maps (documentation + tooling)
CO_STAR_FIELD_MAP = {
    "C": "context",
    "O": "task",
    "S": "style",
    "T": "tonality",
    "A": "audience",
    "R": "format",
}

CANVAS_FIELD_MAP = {
    "persona": "persona",
    "audience": "audience",
    "task": "task",
    "steps": "steps",
    "context": "context",
    "format": "format",
    "tonality": "tonality",
}

REQUIRED_FIELDS = ("persona", "audience", "task", "context", "format", "tonality")
