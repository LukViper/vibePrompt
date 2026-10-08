# VibePrompt

**Context-aware, minimal prompt adaptation for GenAI chats.**

> VibePrompt reads what you typed, recovers messy typing, and makes **only the changes that actually help** — without bloating your prompts. No profile setup required.

**Share / use via Git only** — clone this repo, load the Chrome extension, and use the hosted API at [https://vibeprompt.onrender.com](https://vibeprompt.onrender.com). No local backend required for normal use.

| | |
|---|---|
| **Repo** | [github.com/LukViper/vibePrompt](https://github.com/LukViper/vibePrompt) |
| **API** | [https://vibeprompt.onrender.com](https://vibeprompt.onrender.com) |
| **Health** | [https://vibeprompt.onrender.com/api/health](https://vibeprompt.onrender.com/api/health) |

---

## Use from Git (recommended)

### 1. Clone

```bash
git clone https://github.com/LukViper/vibePrompt.git
cd vibePrompt
```

### 2. Load the extension

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. **Load unpacked** → select the `extension/` folder from this repo
4. Click the VibePrompt toolbar icon → **Save** settings  
   - Backend URL defaults to `https://vibeprompt.onrender.com`  
   - Allow the Chrome host-permission prompt when asked  
5. Paste your **Groq API key** ([console.groq.com/keys](https://console.groq.com/keys)) — stored only in this browser
6. Open a supported chat site, reload the tab, type in the composer, click **Adapt now**

That’s the full shareable path: **Git clone → load unpacked → Render API + your Groq key**.

> **Note:** Free Render services may sleep when idle. The first Adapt after a pause can take ~30–60s while the API wakes up.

### Share with others

```text
1. git clone https://github.com/LukViper/vibePrompt.git
2. Chrome → Load unpacked → vibePrompt/extension
3. Settings → Save (Backend: https://vibeprompt.onrender.com) → paste Groq key
4. Use on ChatGPT / Claude / Gemini / …
```

No need to run Python, Docker, or a local server unless you want to develop the API yourself.

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
      Typing recovery
            ↓
      Decision engine
   /        |         \
PASS      ADAPT       ASK
 │          │          │
original  minimal   clarification
          rewrite
```

- **PASS** — already clear → return as-is (**0 LLM calls**)
- **ADAPT** — tidy slang / typos / add clarity from context + optional tone
- **ASK** — too vague → answer the clarifying question **in the panel** → **Resolve clarification** → then **Use adapted**

---

## Panel controls

| Control | Action |
|---------|--------|
| **Adapt now** | Run decision engine on the composer text |
| **Resolve clarification** | Answer ASK in-panel; get an updated adapted prompt (composer stays untouched) |
| **Use adapted** | Insert adapted prompt into the chat composer |
| **Original** | Insert original prompt |
| Tone chips | **None** (no override) / Grill / Neutral / Encourage / Simplify / Professional |
| Extension icon | Reopen the panel on a supported chat tab |
| **– / ×** | Minimize / close (icon reopens; no floating V) |
| ⚙ | Settings (Backend URL + Groq key) |

---

## Optional: run the backend locally

Only needed if you are changing the API or do not want to use Render.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # set GROQ_API_KEY
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Then in extension Settings set Backend URL to `http://localhost:8000`, **Save**, and allow host access.

Health: http://127.0.0.1:8000/api/health

### Deploy / update Render

Point a Render Web Service at this repo’s `backend/` (or your fork), start command typically:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set `GROQ_API_KEY` in the Render environment (optional if every user pastes their own key in the extension). Public base URL used by the extension: `https://vibeprompt.onrender.com`.

---

## API

Hosted base: `https://vibeprompt.onrender.com`

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
  privacy.html            # Privacy policy (for store / sharing)
```

---

## Chrome Web Store package (maintainers)

```bash
./scripts/pack-extension.sh
```

Creates `dist/vibeprompt-<version>.zip`. See [`extension/store/STORE_LISTING.md`](extension/store/STORE_LISTING.md).

---

## Evaluation

```bash
cd backend && source .venv/bin/activate
python ../evaluation/run_eval.py
```

See [`evaluation/README.md`](evaluation/README.md). Point `API` at Render or localhost as needed.

---

## Out of scope (for now)

- Profile / onboarding personalization  
- Full textbook RAG  
- Auto-send into the chat  
- Guaranteeing every site DOM forever (selectors are best-effort fallbacks)

---

## License

Academic / course project — free for learning and demos.
