# VibePrompt

**Context-aware, minimal prompt adaptation for GenAI chats.**

> VibePrompt reads what you typed, recovers messy typing, and makes **only the changes that actually help** — without bloating your prompts. No profile setup required.

---

## Supported chats

| Site | URL |
|------|-----|
| ChatGPT | chatgpt.com |
| Claude | claude.ai |
| Gemini | gemini.google.com |
| Grok | grok.x.com / x.com/i/grok |
| DeepSeek | chat.deepseek.com |
| Perplexity | perplexity.ai |
| Copilot | copilot.microsoft.com |

---

## How it works

```
User prompt + chat context
            ↓
      Typing recovery (local)
            ↓
      Decision engine
   /        |         \
PASS      ADAPT       ASK
 │          │          │
original  minimal   clarification
          rewrite
```

- **PASS** — already clear → return as-is (**0 LLM calls**)
- **ADAPT** — tidy slang / add clarity from context + optional tone chip
- **ASK** — too vague to rewrite safely → one clarifying question

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
2. Click the extension icon → confirm **Backend URL** (default `https://vibeprompt.onrender.com`) → **Save** and allow host access
3. Paste Groq API key (or set `GROQ_API_KEY` in `backend/.env`)
4. Open any supported chat site
5. Type in the composer — the panel **previews** your text (no API call)
6. Click **Adapt now** → review PASS / ADAPT / ASK → **Use adapted** or **Original**

Reload the chat tab after updating the extension.

### Chrome Web Store package

```bash
./scripts/pack-extension.sh
```

Uploads go to `dist/vibeprompt-<version>.zip`. Listing copy, privacy disclosures, and promo assets: [`extension/store/STORE_LISTING.md`](extension/store/STORE_LISTING.md). Host [`extension/privacy.html`](extension/privacy.html) on a public HTTPS URL for the dashboard privacy-policy field.

---

## Panel controls

| Control | Action |
|---------|--------|
| **Adapt now** | Run decision engine on the composer text |
| **Use adapted** | Insert adapted prompt into the chat composer |
| **Original** | Insert original prompt |
| Tone chips | Grill / Neutral / Encourage / Simplify / Professional |
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
  ]
}
```

Response:

```json
{
  "decision": "adapt",
  "original": "bro explain deadlock",
  "optimized_prompt": "Explain deadlock clearly with a short real-world analogy.",
  "changes": ["Clarified casual ask"],
  "estimated_token_change": 6,
  "used_llm": true
}
```

`decision: "pass"` → no rewrite, often **zero LLM calls**.

### Other routes

- `GET /api/health`
- `POST /api/v1/adapt` — compact response shape

---

## Project layout

```
backend/app/
  main.py                 # API routes
  models/prompt.py        # Request/response models
  services/
    decision_engine.py    # Heuristic PASS/ASK bypass
    optimizer.py          # Single-call minimal adapter
    recovery.py           # Typo / abbrev recovery
    token_counter.py
    tones.py
  nlp/client.py           # Groq client (key stays server-side)

extension/
  content/
    sites.js              # Per-chat composers + context extractors
    content.js            # Capture + API bridge
    modal.js              # Panel UI
  background.js           # Proxy + settings
  options.html            # API key + backend URL
```

---

## Evaluation

```bash
cd backend && source .venv/bin/activate
python ../evaluation/run_eval.py
```

See [`evaluation/README.md`](evaluation/README.md).

---

## Out of scope (for now)

- Profile / onboarding personalization  
- Full textbook RAG  
- Auto-send into the chat  
- Guaranteeing every site DOM forever (selectors are best-effort fallbacks)

---

## License

Academic / course project — free for learning and demos.
