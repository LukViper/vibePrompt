"""VibePrompt FastAPI — recovery + minimal context-aware adaptation."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.models.prompt import (
    HealthResponse,
    VibeRequest,
    VibeResponse,
)
from app.nlp.client import GroqError, get_model, use_api_key
from app.services.pipeline import run_adapt_pipeline
from app.services.tones import VALID_TONES

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

app = FastAPI(
    title="VibePrompt API",
    description="Context-aware, minimal prompt adaptation for GenAI chats",
    version="2.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_CONTEXT_MESSAGES = 8


class AdaptV1Response(BaseModel):
    decision: str
    normalized_prompt: str
    adapted_prompt: Optional[str] = None
    changes: list[str] = Field(default_factory=list)
    recovery_changes: list[str] = Field(default_factory=list)
    clarification: Optional[str] = None
    confidence: float = 1.0
    noise_score: float = 0.0
    used_llm: bool = False


def _to_v1(response: VibeResponse) -> AdaptV1Response:
    adapted = response.optimized_prompt if response.decision == "adapt" else None
    return AdaptV1Response(
        decision=response.decision.upper(),
        normalized_prompt=response.normalized_prompt or response.original,
        adapted_prompt=adapted,
        changes=response.changes,
        recovery_changes=response.recovery_changes,
        clarification=response.clarification,
        confidence=response.confidence,
        noise_score=response.noise_score,
        used_llm=response.used_llm,
    )


@app.get("/health", response_model=HealthResponse)
@app.get("/api/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok", model=get_model())


def _resolve_request_api_key(
    body_key: Optional[str],
    header_key: Optional[str],
) -> Optional[str]:
    for candidate in (body_key, header_key):
        if candidate and candidate.strip():
            return candidate.strip()
    return None


async def _handle_adapt(request: VibeRequest, api_key: Optional[str]) -> VibeResponse:
    prompt = request.resolved_prompt()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is empty")
    if len(prompt) > 8000:
        raise HTTPException(status_code=400, detail="Prompt too long")

    tone = request.tone.strip() if request.tone else None
    if tone and tone not in VALID_TONES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid tone. Choose one of: {', '.join(VALID_TONES)}",
        )

    conversation = (request.conversation_context or [])[-MAX_CONTEXT_MESSAGES:]

    try:
        with use_api_key(api_key):
            return await run_adapt_pipeline(
                prompt,
                tone=tone,
                conversation_context=conversation,
                personal_vocabulary=request.personal_vocabulary,
            )
    except GroqError as exc:
        from app.services.recovery import recover_prompt
        from app.services.optimizer import adapt_prompt

        recovery = recover_prompt(prompt, request.personal_vocabulary)
        status_hint = str(exc)
        if "API key" in status_hint or "rejected the API key" in status_hint:
            raise HTTPException(status_code=401, detail=status_hint) from exc
        with use_api_key(api_key):
            return await adapt_prompt(
                recovery.normalized,
                tone=tone,
                conversation_context=conversation,
                raw_original=prompt,
                recovery_changes=recovery.changes,
                recovery_confidence=recovery.confidence,
                noise_score=recovery.noise_score,
            )


@app.post("/api/vibe", response_model=VibeResponse)
async def vibe(
    request: VibeRequest,
    x_groq_api_key: Optional[str] = Header(default=None, alias="X-Groq-Api-Key"),
) -> VibeResponse:
    api_key = _resolve_request_api_key(request.api_key, x_groq_api_key)
    return await _handle_adapt(request, api_key)


@app.post("/api/v1/adapt", response_model=AdaptV1Response)
async def adapt_v1(
    request: VibeRequest,
    x_groq_api_key: Optional[str] = Header(default=None, alias="X-Groq-Api-Key"),
) -> AdaptV1Response:
    api_key = _resolve_request_api_key(request.api_key, x_groq_api_key)
    return _to_v1(await _handle_adapt(request, api_key))


if __name__ == "__main__":
    import uvicorn

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
