"""Tests for off-topic detection and grounded fallback drafts."""

from __future__ import annotations

import sys
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

from app.nlp.assembler import assemble_prompt, finalize_schema  # noqa: E402
from app.nlp.grounding import (  # noqa: E402
    build_grounded_fallback,
    is_draft_grounded,
)
from app.nlp.vibe_schema import VibePromptDraft, VibePromptPatterns  # noqa: E402

LAB = """Two Different Networks Using a Router

Objective: Understand how a router connects two different networks.

Topology:
PC1 - Switch - Router - Switch - PC2

Implementation:
Create two LANs.
Configure:
PC1: 192.168.1.10/24
Router interface: 192.168.1.1/24
Router second interface: 192.168.2.1/24
PC2: 192.168.2.10/24
Set default gateways:
PC1 -> 192.168.1.1
PC2 -> 192.168.2.1
Ping PC2 from PC1.

Concepts: Router, default gateway, inter-network communication, IP addressing.

how to config the router
"""


def test_detects_off_topic_code_hijack():
    hijacked = VibePromptDraft(
        persona="Developer",
        audience="Team",
        task="Review code",
        context="Project X",
        format="JSON",
        tonality="Professional",
        patterns=VibePromptPatterns(),
    )
    assert is_draft_grounded(LAB, hijacked) is False


def test_accepts_grounded_networking_draft():
    grounded = VibePromptDraft(
        persona="a networking instructor",
        audience="a lab student",
        task="Explain how to configure the router between the two LANs",
        context="PC1 192.168.1.10/24 via 192.168.1.1; PC2 192.168.2.10/24 via 192.168.2.1",
        format="Step-by-step router commands and ping verification",
        tonality="Neutral",
        patterns=VibePromptPatterns(useContextManager=True),
    )
    assert is_draft_grounded(LAB, grounded) is True


def test_fallback_keeps_ips_and_router_topic():
    draft = build_grounded_fallback(
        LAB,
        {"intent": "Explain how to configure the router for this two-LAN lab", "emotion": "Neutral"},
    )
    assert "192.168.1.1" in draft.context
    assert "192.168.2.10" in draft.context
    assert "router" in draft.task.lower() or "router" in draft.persona.lower()
    prompt = assemble_prompt(draft)
    assert "192.168.1.10" in prompt
    assert "Review code" not in prompt
    assert "Project X" not in prompt


def test_finalize_fallback_path_preserves_lab():
    hijacked = VibePromptDraft(
        persona="Developer",
        audience="Team",
        task="Review code",
        context="Project X",
        format="JSON",
        tonality="Professional",
    )
    # Simulate generator choosing fallback before finalize
    draft = build_grounded_fallback(
        LAB,
        {"intent": "Show how to configure the router and verify with ping", "emotion": "Neutral"},
    )
    assert not is_draft_grounded(LAB, hijacked)
    schema = finalize_schema(draft, original_user_input=LAB)
    assert "192.168.2.1" in schema.generatedPrompt
    assert "JSON" not in schema.generatedPrompt or "192.168" in schema.generatedPrompt
