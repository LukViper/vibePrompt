# VibePrompt

**Why vibe code, when you can vibe prompt?**

Intent & emotion aware prompt generator for ChatGPT. A Chrome extension plus a FastAPI backend that reads your rough chat input, detects intent and emotional tone, and returns a clear, copy-ready prompt.

---

## Features

- Auto-opens a **top-right panel** on ChatGPT (no keyboard shortcut required)
- Reads the text currently typed in the ChatGPT composer
- Detects **intent** and **emotion/tone**
- Optional tone overrides: `Grill` · `Neutral` · `Encourage` · `Simplify` · `Professional`
- Shows original input, analysis chips, and an editable optimized prompt
- **Copy**, **Regenerate**, **Minimize (–)**, and **Exit (×)**
- After exit, a small **V** button restores the panel

---

## How it works

```
ChatGPT composer  →  Extension panel  →  FastAPI backend  →  Groq LLM
                                              │
                                    1. Analyze intent + emotion
                                    2. Generate optimized prompt
                                              │
                                              ▼
                                    Panel shows result → Copy → paste into ChatGPT
```

| Layer | Tech | Role |
|-------|------|------|
| Extension | Chrome Manifest V3 | UI + read ChatGPT input |
| Backend | Python FastAPI | NLP pipeline API |
| Model | Groq (`openai/gpt-oss-20b` by default) | Intent analysis + prompt rewrite |
| Target chat | ChatGPT | Where you paste and run the optimized prompt |

---

## Project structure

```
project/
├── extension/                 # Chrome extension (load unpacked)
│   ├── manifest.json
│   ├── background.js          # Proxies requests to the backend
│   ├── content/               # Panel UI + ChatGPT input capture
│   └── icons/
├── backend/                   # FastAPI + Groq NLP pipeline
│   ├── app/
│   │   ├── main.py            # /health , /api/vibe
│   │   ├── schemas.py
│   │   └── nlp/               # analyzer → generator
│   ├── requirements.txt
│   └── .env.example
├── evaluation/                # Sample prompts + eval runner
├── VibePrompt_Project_Idea.md # Original project brief
└── README.md
```

---

## Prerequisites

- Google Chrome (or Chromium)
- Python 3.10+
- A free [Groq API key](https://console.groq.com/keys)

---

## 1. Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-20b
HOST=0.0.0.0
PORT=8000
```

Start the server:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Check it is alive:

- Health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Example API call:

```bash
curl -s http://127.0.0.1:8000/api/vibe \
  -H 'Content-Type: application/json' \
  -d '{"text":"grill this essay hard, make it savage","tone":"Grill"}'
```

---

## 2. Extension setup

1. Make sure the backend is running on port **8000**
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `extension/` folder in this repo
6. Open [https://chatgpt.com](https://chatgpt.com)

The **VibePrompt** panel should appear in the **top-right** automatically.

### Using the panel

1. Type a rough / emotional prompt in the ChatGPT input box  
   Example: `i failed my midterm again... help me make a study plan, be encouraging`
2. Click **Generate** in the VibePrompt panel
3. Review intent, emotion, and the optimized prompt
4. Optionally pick a tone chip and click **Regenerate**
5. Click **Copy**, paste into ChatGPT, and send

**Window controls**

| Control | Action |
|---------|--------|
| **–** | Minimize the panel |
| **×** | Exit / hide the panel |
| **V** (after exit) | Restore the panel |

After changing extension files, click **Reload** on `chrome://extensions`, then refresh ChatGPT.

---

## API reference

### `GET /health`

```json
{ "status": "ok", "model": "openai/gpt-oss-20b" }
```

### `POST /api/vibe`

Request:

```json
{
  "text": "explain recursion like i'm 5",
  "tone": "Simplify"
}
```

`tone` is optional. Allowed values: `Grill`, `Neutral`, `Encourage`, `Simplify`, `Professional`.

Response:

```json
{
  "original": "...",
  "intent": "...",
  "emotion": "...",
  "constraints": ["..."],
  "optimized_prompt": "..."
}
```

---

## NLP pipeline

1. **Analyze** — Groq returns JSON: `intent`, `emotion`, `constraints`, `style_notes` (one repair retry if parsing fails)
2. **Generate** — second call turns that analysis into one structured ChatGPT-ready prompt

The Groq API key stays on the server only. The extension never sees it.

---

## Evaluation

Sample set and runner live in [`evaluation/`](evaluation/):

```bash
# backend must be running
cd backend && source .venv/bin/activate
python ../evaluation/run_eval.py
```

See [`evaluation/README.md`](evaluation/README.md) for the full comparison plan.

---

## Out of scope (MVP)

- Auto-pasting into ChatGPT
- Sites other than ChatGPT
- File / image inputs
- Prompt history or user accounts
- Offline / local models (e.g. Ollama)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Panel does not appear | Reload the extension, refresh ChatGPT, confirm it is loaded for `chatgpt.com` |
| “Could not reach backend” | Start uvicorn on `127.0.0.1:8000` |
| `GROQ_API_KEY is not set` | Put your key in `backend/.env` and restart the server |
| Model 404 / no access | Set another model in `.env`, e.g. one listed in your [Groq console](https://console.groq.com/docs/models) |
| Generate says type something first | Focus the ChatGPT composer and type text before Generate |

---

## License

Academic / course project — free to use for learning and demos.
