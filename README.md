# VibePrompt

**Personalized, context-aware prompt adaptation for AI conversations.**

> VibePrompt learns how you communicate and learn, understands the current conversation, and makes **only the changes that actually help** — without bloating your prompts.

---

## What changed (v2.1 — revised plan)

- **NLP recovery** before adapt (edit distance + char n-grams + generic abbreviations)
- **Personal vocabulary** stored locally in the browser (`personalModel.js`)
- **`POST /api/v1/adapt`** — v1 response shape (`normalized_prompt`, `adapted_prompt`, `confidence`)
- **Quick setup** onboarding (~30s) + **Advanced** ChatGPT JSON onboarding
- **ASK** clarifications → **Ask this in ChatGPT** (no invented topics)
- **Live composer sync** tracks typing separately from last adapted result

## What changed (v2)

| Old | New |
|-----|-----|
| Always rewrite into a large “perfect” prompt | **PASS / ADAPT / ASK** decision engine |
| Two LLM calls (analyze + generate) | **0 calls** when clear, **1 call** when adapting |
| Generic optimization | Profile + conversation + learning context |
| Copy-only UI | **Use adapted** / **Use original** into ChatGPT |

---

## How it works

```
User prompt + chat context + profile + learning context
                         ↓
                 Decision engine
              /        |         \
           PASS      ADAPT       ASK
            │          │          │
         original   minimal   clarification
                    rewrite
```

Priority (never overridden incorrectly):

1. Explicit current instruction  
2. Conversation context  
3. Explicit user preferences  
4. Learned preferences (future)  
5. Detected emotion/vibe (supporting only)  
6. Defaults  

---

## Quick start

### Backend

```bash
cd backend
source .venv/bin/activate   # or: python3 -m venv .venv && pip install -r requirements.txt
cp .env.example .env        # set GROQ_API_KEY if not using extension settings
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Health: http://127.0.0.1:8000/health

### Extension

1. `chrome://extensions` → Developer mode → **Load unpacked** → `extension/`
2. Click the extension icon → paste Groq API key (or use `backend/.env`)
3. Open [chatgpt.com](https://chatgpt.com)
4. Open [chatgpt.com](https://chatgpt.com)
5. **Profile setup:** paste the setup prompt into ChatGPT, answer its questions, paste the JSON result into VibePrompt → **Save profile** (or skip)
6. Type in ChatGPT — the panel **previews** your text (no API call)
7. Click **Adapt now** once — that is the only Groq call for that prompt
8. Review PASS / ADAPT / ASK → **Use adapted** or **Original**

---

## Panel controls

| Control | Action |
|---------|--------|
| **Adapt** | Run decision engine on the composer text |
| **Use adapted** | Insert adapted prompt into ChatGPT |
| **Original** | Insert original prompt |
| Tone chips | Grill / Neutral / Encourage / Simplify / Professional |
| **Profile** | Re-run onboarding |
| **– / ×** | Minimize / exit (V restores) |

---

## API

### `POST /api/vibe`

```json
{
  "prompt": "bro explain deadlock",
  "tone": null,
  "conversation_context": [
    { "role": "user", "content": "explain processes" },
    { "role": "assistant", "content": "..." }
  ],
  "user_profile": {
    "learning_preferences": ["analogies", "examples"],
    "response_length": "short",
    "technical_level": "beginner",
    "preferred_tone": "friendly"
  },
  "learning_context": {
    "subject": "Operating Systems",
    "current_topic": "Process Management"
  }
}
```

Response:

```json
{
  "decision": "adapt",
  "original": "bro explain deadlock",
  "optimized_prompt": "Explain deadlock simply using a real-world analogy and one concise example.",
  "changes": ["Added analogy preference", "Kept concise length"],
  "estimated_token_change": 8,
  "original_tokens": 5,
  "optimized_tokens": 13,
  "used_llm": true
}
```

`decision: "pass"` → no rewrite, often **zero LLM calls**.

### Other routes

- `GET /api/health`
- `GET /api/onboarding` — question list
- `POST /api/onboarding` — `{ "answers": ["...", ...] }` → profile
- `POST /api/profile` — validate a client profile

---

## Project layout

```
backend/app/
  main.py                 # API routes
  models/prompt.py        # Request/response + profile models
  services/
    decision_engine.py    # Heuristic PASS/ASK bypass
    optimizer.py          # Single-call minimal adapter
    profile_engine.py     # Onboarding → profile
    token_counter.py
    tones.py
  nlp/client.py           # Groq client (key stays server-side)

extension/
  content/                # Panel + ChatGPT context capture
  background.js           # Proxy + profile storage
  options.html            # API key + learning context
```

---

## Evaluation

```bash
cd backend && source .venv/bin/activate
python ../evaluation/run_eval.py
```

See [`evaluation/README.md`](evaluation/README.md). Metrics now include decision rates and token Δ.

---

## Out of scope (for now)

- Full textbook RAG / PDF chapter graphs  
- Automatic preference learning from long history  
- Auto-send into ChatGPT  
- Sites other than ChatGPT  

See [`update.md`](update.md) for the full product vision and later phases.

---

## License

Academic / course project — free for learning and demos.
