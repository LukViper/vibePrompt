# VibePrompt evaluation

Collect evidence that optimized prompts improve clarity, relevance, and emotional fidelity versus raw student-style inputs.

## Samples

[`sample_prompts.json`](sample_prompts.json) contains 20 vague / emotionally loaded prompts.

## Quick batch run (token estimate)

With the backend running and `GROQ_API_KEY` set:

```bash
cd backend
source .venv/bin/activate
python ../evaluation/run_eval.py
```

This writes `evaluation/results.json` with:

- original text
- intent / emotion / optimized prompt
- rough token estimates (`words * 1.3`)
- empty columns for human ratings: clarity, relevance, emotional_fidelity (1–5)

## Manual A/B (report)

For 15–20 samples:

1. Run the original prompt in ChatGPT; save the reply
2. Run the VibePrompt-optimized prompt in a fresh chat; save the reply
3. Rate both outputs (clarity, relevance, emotional fidelity)
4. Compare approximate token usage of the *prompts* (and optionally replies)
5. Present tables/charts in the project report

Optional: use an LLM-as-a-judge rubric for a second score — keep the same judge prompt for every pair.
