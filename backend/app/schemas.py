"""Backward-compatible re-exports — prefer app.models.prompt."""

from app.models.prompt import (  # noqa: F401
    HealthResponse,
    LearningContextItem,
    UserProfile,
    VibeRequest,
    VibeResponse,
)
