# VibePrompt

**Why vibe code, when you can vibe prompt?**

Intent & emotion aware prompt generator — a Chrome extension for ChatGPT plus a FastAPI backend that analyzes raw input and returns a structured, copy-ready prompt.

## What it does

1. Reads the text currently in the ChatGPT composer
2. Detects **intent** and **emotion/tone** (with optional overrides: Grill, Neutral, Encourage, Simplify, Professional)
3. Generates an optimized prompt
4. Shows original, analysis, and result in a modal — **Copy** or **Regenerate**

## Project layout

```
extension/          Chrome MV3 extension (ChatGPT only)
backend/            FastAPI + Groq two-step NLP pipeline
evaluation/         Sample prompts for the evaluation plan
```

## Prerequisites

- Google Chrome (or Chromium)
- Python 3.10+
- A [Groq](https://console.groq.com/) API key (free tier works)

## Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and set GROQ_API_KEY=...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: [http://localhost:8000/health](http://localhost:8000/health)

Default model is `openai/gpt-oss-20b` (available on typical Groq free-tier keys). Change `GROQ_MODEL` in `.env` if your account has access to other models.

Example request:

```bash
curl -s http://localhost:8000/api/vibe \
  -H 'Content-Type: application/json' \
  -d '{"text":"grill this essay hard, make it savage","tone":"Grill"}'
```

## Extension setup

1. Start the backend (above)
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. **Load unpacked** → select the `extension/` folder
5. Open [https://chatgpt.com](https://chatgpt.com)
6. The **VibePrompt** panel appears automatically in the **top-right**
7. Type in the ChatGPT composer → click **Generate** → **Copy** the result
8. Use **–** to minimize or **×** to exit (a small **V** restore button remains if you exit)

Optional: change the API base URL in the extension service worker defaults (`background.js`) or via `chrome.storage.sync` key `apiBaseUrl`.

## NLP pipeline

1. **Analyze** — Groq extracts `intent`, `emotion`, `constraints`, `style_notes` as JSON (with one repair retry)
2. **Generate** — second call produces a single optimized ChatGPT prompt from that analysis

## Out of scope (MVP)

- Auto-pasting into ChatGPT
- Claude / other sites
- Files or images
- Prompt history / accounts

## Evaluation

See [evaluation/README.md](evaluation/README.md) and [evaluation/sample_prompts.json](evaluation/sample_prompts.json).

## License

Academic / course project — use freely for learning and demos.
