# Glossary — Prompt Engineering (Boonstra / Google, Sept 2024)

**Action (ReAct)** — Tool call the model chooses (e.g. Search) with an Action Input. (Ch 7)

**Automatic Prompt Engineering (APE)** — Generate prompt candidates with an LLM, score them, select/tweak the best, repeat. (Ch 8)

**BLEU** — Bilingual Evaluation Understudy; n-gram overlap metric usable to rank APE candidates. (Ch 8)

**Chain of Thought (CoT)** — Elicit intermediate reasoning steps before the final answer. (Ch 5)

**Constraint** — Limit on what the model must not do; use sparingly vs positive instructions. (Ch 10)

**Contextual prompting** — Supply immediate, task-specific background for the current ask. (Ch 4)

**Few-shot prompting** — Provide multiple input→output examples so the model follows a pattern (often 3–5+). (Ch 3)

**Greedy decoding** — Always pick the highest-probability next token (temperature 0 / top-K 1). (Ch 2, Ch 5)

**Instruction** — Explicit guidance on desired format, style, or content (what to do). (Ch 10)

**Max output length / token limit** — Hard stop on generated tokens; does not rewrite style to be concise. (Ch 2)

**Multimodal prompting** — Guiding a model with multiple modalities (text, image, audio, …); distinct from text/code prompts. (Ch 9)

**Nucleus sampling** — Synonym for top-P sampling. (Ch 2)

**Observation (ReAct)** — Tool result returned into the thought–action loop. (Ch 7)

**One-shot prompting** — Single demonstration example before the real query. (Ch 3)

**Prompt** — Input that conditions an LLM’s predicted continuation. (Ch 1)

**Prompt engineering** — Iterative design of high-quality prompts (and configs) for accurate outputs. (Ch 1)

**ReAct (Reason & Act)** — Interleave reasoning with external tool actions until a Final Answer. (Ch 7)

**Role prompting** — Assign an identity/persona to shape expertise, tone, and style. (Ch 4)

**ROUGE** — Recall-Oriented Understudy for Gisting Evaluation; metric option for scoring APE candidates. (Ch 8)

**Self-consistency** — Sample diverse CoT paths (high temperature) and majority-vote the extracted answer. (Ch 6)

**Step-back prompting** — Answer a broader related question first; inject that knowledge into the specific task prompt. (Ch 4)

**System prompting** — Set overarching purpose, capabilities, format contracts, or safety rules. (Ch 4)

**Temperature** — Sampling randomness; low → deterministic; high → diverse/unexpected. (Ch 2)

**Thought (ToT / ReAct)** — Intermediate natural-language step toward a solution or next action. (Ch 6, Ch 7)

**Token** — Unit the LLM predicts sequentially from prior context. (Ch 1, Ch 2)

**Top-K** — Restrict next token to the K highest-probability candidates. (Ch 2)

**Top-P** — Restrict next token to the smallest set whose cumulative probability ≤ P. (Ch 2)

**Tree of Thoughts (ToT)** — Explore multiple branching reasoning paths in a tree, generalizing linear CoT. (Ch 6)

**Zero-shot CoT** — CoT via a cue like “Let's think step by step” without demonstrations. (Ch 5)

**Zero-shot prompting** — Task description only; no examples. (Ch 3)
