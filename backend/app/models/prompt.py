"""Shared request/response and profile models for VibePrompt."""

from __future__ import annotations

from typing import Any, Literal, Optional

from pydantic import BaseModel, Field, field_validator

VALID_TONES = ("Grill", "Neutral", "Encourage", "Simplify", "Professional")
Decision = Literal["pass", "adapt", "ask"]


class ConversationMessage(BaseModel):
    role: Literal["user", "assistant", "system"] = "user"
    content: str = Field(..., min_length=1, max_length=4000)


class PreferenceFlag(BaseModel):
    value: bool = True
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    evidence_count: int = Field(default=1, ge=0)


class UserProfile(BaseModel):
    """Compact personalization profile (browser or request-provided)."""

    learning_preferences: list[str] = Field(default_factory=list)
    explanation_preferences: list[str] = Field(default_factory=list)
    preferred_elements: list[str] = Field(default_factory=list)
    prompt_style: str = ""
    response_length: str = ""
    technical_level: str = ""
    preferred_tone: str = ""
    # Optional confidence-tagged map for richer profiles
    learning_flags: dict[str, PreferenceFlag] = Field(default_factory=dict)

    @field_validator(
        "learning_preferences",
        "explanation_preferences",
        "preferred_elements",
        mode="before",
    )
    @classmethod
    def _cap_lists(cls, value: Any) -> Any:
        if isinstance(value, list):
            return [str(v).strip() for v in value if str(v).strip()][:12]
        return value


class LearningContextItem(BaseModel):
    subject: str = ""
    resource: str = ""
    current_topic: str = ""
    level: str = ""
    progress: Optional[float] = Field(default=None, ge=0.0, le=1.0)


class VocabEntry(BaseModel):
    correction: str = ""
    meaning: str = ""
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    count: int = Field(default=1, ge=0)


class PersonalVocabulary(BaseModel):
    """Compact personal hints from browser local storage (not full history)."""

    personal_typos: dict[str, VocabEntry] = Field(default_factory=dict)
    abbreviations: dict[str, VocabEntry] = Field(default_factory=dict)
    domain_terms: list[str] = Field(default_factory=list)


class VibeRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=8000)
    # Backward compatible alias
    text: Optional[str] = Field(default=None, description="Alias for prompt")
    tone: Optional[str] = None
    conversation_context: list[ConversationMessage] = Field(default_factory=list)
    user_profile: Optional[UserProfile] = None
    learning_context: Optional[LearningContextItem] = None
    personal_vocabulary: Optional[PersonalVocabulary] = None
    api_key: Optional[str] = None

    def resolved_prompt(self) -> str:
        return (self.prompt or self.text or "").strip()


class VibeResponse(BaseModel):
    decision: Decision
    original: str
    normalized_prompt: str = ""
    optimized_prompt: str
    changes: list[str] = Field(default_factory=list)
    recovery_changes: list[str] = Field(default_factory=list)
    estimated_token_change: int = 0
    original_tokens: int = 0
    optimized_tokens: int = 0
    clarification: Optional[str] = None
    used_llm: bool = False
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    noise_score: float = Field(default=0.0, ge=0.0, le=1.0)


class HealthResponse(BaseModel):
    status: str
    model: str


class OnboardingAnswers(BaseModel):
    answers: list[str] = Field(..., min_length=7, max_length=7)


class ProfileResponse(BaseModel):
    profile: UserProfile
    source: str = "onboarding"
