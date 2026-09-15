# Glossary — Mausam Prompt Engineering Lecture

**Action step** — In ReAct, the tool/environment call that gathers external information (Ch 3)

**Chain-of-Thought (CoT)** — Prompting that elicits intermediate reasoning steps before the final answer (Ch 2)

**Consistent answer** — The answer that recurs across diverse sampled reasoning paths in Self-Consistency (Ch 2)

**Directional Stimulus Prompting** — Policy LM generates hints that steer a frozen black-box LLM (Ch 3)

**Exemplar** — An in-prompt example showing desired input→(reasoning→)output behavior (Ch 2)

**Few-shot prompting** — Providing multiple exemplars to steer performance without fine-tuning (Ch 2)

**Frozen LLM** — Main model left un-updated while a smaller policy is trained (Directional Stimulus) (Ch 3)

**Generate Knowledge Prompting** — Generate knowledge samples, augment the question, pick highest-confidence answer (Ch 3)

**Greedy / Beam search** — Deterministic or search decoding; often less surprising, weak for open-ended tasks (Ch 1)

**Highest-confidence prediction** — Selection rule among knowledge-conditioned answer proposals (Ch 3)

**In-context learning** — Steering LMs via instructions and examples in the prompt (Ch 1)

**Jailbreaking** — Injection-style attack that bypasses safety and content moderation (Ch 4)

**Knowledge-augmented question** — Question plus generated knowledge used for an answer proposal (Ch 3)

**Output indicator** — Trailing cue (e.g. `Sentiment:`) that shapes completion format (Ch 1)

**PAL (Program-aided Language Model)** — LLM writes a program; a runtime executes it for the answer (Ch 3)

**Policy LM** — Trainable model that emits directional hints for a frozen LLM (Ch 3)

**Prompt** — Instructions and context passed to an LM for a task (Ch 1)

**Prompt engineering** — Developing and optimizing prompts to use LMs efficiently (Ch 1)

**Prompt Injection** — Untrusted command that overrides the intended prompt instructions (Ch 4)

**Prompt Leaking** — Forcing the model to reveal its own (possibly sensitive) prompt (Ch 4)

**ReAct** — Interleaved reasoning traces and actions for tool/environment use (Ch 3)

**Reasoning path** — One sampled CoT trajectory from question to answer (Ch 2)

**Reasoning trace** — Verbal plan/update between ReAct actions (Ch 3)

**Role playing** — Prompting with a persona/tone for character-consistent replies (Ch 1)

**Self-Consistency** — Sample diverse CoT paths; select the most consistent answer (Ch 2)

**Temperature** — Decoding parameter (0–1) controlling sharpness of the next-token distribution (Ch 1)

**Top-p (nucleus sampling)** — Keep smallest token set with cumulative probability ≥ p, then resample (Ch 1)

**Zero-Shot CoT** — Elicit reasoning by adding “Let’s think step by step” without exemplars (Ch 2)
