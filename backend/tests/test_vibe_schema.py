"""Unit tests for VibePrompt schema + deterministic assembler."""

from __future__ import annotations

import sys
from pathlib import Path

import pytest
from pydantic import ValidationError

# Allow `pytest` from repo root or backend/
BACKEND = Path(__file__).resolve().parents[1]
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

from app.nlp.assembler import assemble_prompt, finalize_schema  # noqa: E402
from app.nlp.vibe_schema import (  # noqa: E402
    VibePromptDraft,
    VibePromptPatterns,
    VibePromptSchema,
)


def _draft(**overrides) -> VibePromptDraft:
    base = {
        "persona": "a senior writing coach",
        "audience": "a college student who failed a midterm",
        "task": "Create a realistic two-week study recovery plan",
        "steps": ["Diagnose weak topics", "Schedule daily blocks", "Add accountability checks"],
        "context": "Student failed calculus midterm; wants encouragement and structure.",
        "format": "Markdown with daily checklist and time estimates",
        "tonality": "Encourage — supportive, motivating, constructive",
        "style": "Short sentences; no jargon",
        "patterns": VibePromptPatterns(usePersona=True, useTemplate=True),
    }
    base.update(overrides)
    return VibePromptDraft.model_validate(base)


def test_required_fields_reject_empty():
    with pytest.raises(ValidationError):
        VibePromptDraft.model_validate(
            {
                "persona": " ",
                "audience": "students",
                "task": "explain recursion",
                "context": "CS101",
                "format": "bullets",
                "tonality": "Neutral",
            }
        )


def test_assemble_includes_canvas_and_costar_cells():
    # Multi-step + patterns → full labeled layout
    prompt = assemble_prompt(_draft())
    assert "You are a senior writing coach." in prompt or "Stay in this role" in prompt
    assert "Audience:" in prompt
    assert "Task:" in prompt
    assert "Follow these steps:" in prompt
    assert "1. Diagnose weak topics" in prompt
    assert "Context:" in prompt
    assert "Tonality:" in prompt
    assert "Writing style:" in prompt
    assert "Response format" in prompt


def test_simple_ask_uses_compact_assembly():
    draft = _draft(
        persona="a witty comedian",
        audience="the user",
        task="Tell one short clean joke",
        steps=None,
        context="User feels low and wants a joke",
        format="One joke only",
        tonality="Encourage — warm and light",
        style=None,
        patterns=VibePromptPatterns(),
    )
    prompt = assemble_prompt(draft)
    assert "Audience:" not in prompt
    assert "Follow these steps:" not in prompt
    assert "Reflection" not in prompt
    assert "You are a witty comedian." in prompt
    assert "Tell one short clean joke" in prompt
    # Compact prompts should stay short
    assert len(prompt.split()) < 80


def test_slim_draft_strips_steps_on_tiny_inputs():
    from app.nlp.assembler import slim_draft

    draft = _draft(
        steps=["A", "B", "C"],
        patterns=VibePromptPatterns(useReflection=True, useTemplate=True, usePersona=True),
    )
    slimmed = slim_draft(draft, original_user_input="tell me a joke")
    assert slimmed.steps is None
    assert slimmed.patterns is not None
    assert slimmed.patterns.useReflection is False
    assert slimmed.patterns.useTemplate is False
    assert slimmed.patterns.usePersona is False


def test_white_patterns_mutate_assembly():
    plain = assemble_prompt(_draft(patterns=VibePromptPatterns()))
    locked = assemble_prompt(
        _draft(
            patterns=VibePromptPatterns(
                usePersona=True,
                useTemplate=True,
                useReflection=True,
                useContextManager=True,
            )
        )
    )
    assert "Stay in this role" in locked
    assert "authoritative" in locked.lower()
    assert "Template" in locked
    assert "verify the task is complete" in locked.lower()
    assert "Stay in this role" not in plain
    assert "verify the task is complete" not in plain.lower()


def test_finalize_schema_sets_meta_and_generated_prompt():
    draft = _draft()
    schema = finalize_schema(
        draft,
        original_user_input="i failed midterm help me study be encouraging",
    )
    assert isinstance(schema, VibePromptSchema)
    assert schema.originalUserInput.startswith("i failed")
    assert schema.generatedPrompt
    # finalize may slim cells; assembled output must still cover the core task
    assert "study recovery plan" in schema.generatedPrompt.lower() or "Task:" in schema.generatedPrompt


def test_steps_accept_newline_string():
    draft = _draft(steps="First\nSecond\nThird")
    assert draft.steps == ["First", "Second", "Third"]
