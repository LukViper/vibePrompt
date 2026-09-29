# VibePrompt evaluation (v2 — decision + token overhead)

[`sample_prompts.json`](sample_prompts.json) includes clear, vague, emotional, and already-good prompts.

## Run

```bash
# backend on :8000
cd backend && source .venv/bin/activate
python ../evaluation/run_eval.py
```

Writes `results.json` with:

- `decision` (`pass` / `adapt` / `ask`)
- `estimated_token_change`
- `used_llm`
- empty human rating columns

## What to measure

- **Pass rate** on already-clear prompts (should be high, low token Δ)
- **Adapt quality** on messy prompts with profiles
- **Ask rate** on ambiguous inputs without inventing topics
- Ablations later: generic optimizer vs +context vs +profile (see `update.md`)
