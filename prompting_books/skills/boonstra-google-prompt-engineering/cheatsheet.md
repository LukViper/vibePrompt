# Cheatsheet — Boonstra Prompt Engineering

## Parameter decision table (start here)

| Situation | Temperature | Top-P | Top-K | Token limit | Notes |
|-----------|-------------|-------|-------|-------------|-------|
| Single correct answer (math, strict fact) | **0** | any* | any* | as needed | *often irrelevant at temp 0 |
| Classification / label-only | **0.1** | ~1 / default | N/A or default | **very low** (e.g. 5) | Cue `Label:` |
| Structured parse (JSON) | **0.1** | ~1 | N/A/default | medium–high | Schema in prompt |
| CoT, one right answer | **0** | — | — | higher (reasoning tokens) | Answer **after** steps |
| Self-consistency voting | **high** (diverse) | open enough to vary | open enough | per sample | N samples → majority |
| Mildly creative, still coherent | **0.2** | **0.95** | **30** | task-sized | Default creative start |
| Especially creative | **0.9** | **0.99** | **40** | higher | Watch relevance drift |
| Less creative prose | **0.1** | **0.9** | **20** | task-sized | |
| Role/style play (travel guide, humor) | **~1** | **~0.8** | **~40** | high | As in whitepaper tables |
| Code write/explain/translate/debug | **0.1** | ~1 | N/A/default | high | Always test |
| ReAct / agents | **~0.1** | — | — | **tight** | Stop junk after answer |

**Composition (Vertex-style)**: candidates must pass top-K **and** top-P, then temperature samples. Extremes cancel siblings (temp 0; top-K 1; top-P≈0; huge K or P=1).

## Technique picker

| If you need… | Use |
|--------------|-----|
| Baseline / simple task | Zero-shot |
| Imitate a format | One-shot → Few-shot (3–5+) |
| Durable format/safety contract | System prompting |
| Persona / tone | Role prompting |
| Per-request background | Contextual prompting |
| Less generic creative/specific output | Step-back → then specific |
| Multi-step reasoning | CoT (temp 0; answer last) |
| Unstable single CoT | Self-consistency |
| Explore alternative reasonings | Tree of Thoughts |
| External facts / tools | ReAct |
| Many phrasings of same intent | APE |
| Code lifecycle help | Write → Explain → Translate → Debug |

## Decision rules

- When **zero-shot fails**, add **examples** before inventing exotic techniques.
- When shaping content, prefer **instructions over constraints**; constraints for safety/strict format only.
- When extracting/ranking/parsing, demand **JSON/XML** to force structure and limit hallucinations.
- When few-shot **classifying**, **mix class order**; start ~**6** examples and measure.
- When using CoT/self-consistency, **extract the final answer** separately from the rationale.
- When max tokens alone “shortens” badly, also **prompt for length** (tokens truncate, they don’t paraphrase).
- When shipping apps, use **variables** (`{city}`) and keep prompts in **separate files** with evals.
- When models update, **re-run the documented prompt suite**.

## Tells & smells

- Output rambling past the useful part → lower tokens / clearer stop / ReAct trim.
- Flip-flopping labels on sarcasm → self-consistency or clearer system rules.
- Generic high-temp creativity → step-back for principles first.
- Beautiful wrong math → CoT + temp 0 (+ few-shot method).
- JSON missing fields → schema + low temp + examples.
- Classification few-shots all one class then another → order overfitting risk.

## Documentation fields (every attempt)

`Name+version | Goal | Model | Temperature | Token Limit | Top-K | Top-P | Prompt | Output(s) | OK/NOT OK/SOMETIMES | Feedback | Studio link` (+ RAG query/chunks if applicable)
