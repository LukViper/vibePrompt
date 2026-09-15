# Chapter 3: Tool-Augmented and Knowledge Techniques

## Core Idea
When text-only reasoning is not enough, generate knowledge into the context, offload math to a program runtime (PAL), interleave reason+act with tools (ReAct), or steer a frozen LLM with learned hints (Directional Stimulus Prompting).

## Frameworks Introduced
- **Generate Knowledge Prompting**: First generate knowledge snippets, then answer with knowledge-augmented questions; keep the highest-confidence prediction.
  - When to use: Commonsense or factual questions where missing background causes errors.
  - How: (1) Prompt the model to produce knowledge samples for the input; (2) prepend each sample to the question; (3) collect answer proposals; (4) select highest-confidence.
  - Why it works: Explicit knowledge reduces reliance on latent recall alone.
  - Failure mode: Low-quality or contradictory knowledge → confident wrong answers; always prefer high-confidence traces.

- **Program-aided Language Model (PAL)**: LLM emits a program as intermediate reasoning; a runtime (e.g. Python) executes it for the final answer.
  - When to use: CoT is not enough because natural-language arithmetic/logic is unreliable.
  - How: Prompt for code that solves the problem; run it; return the runtime result (not the LM’s verbal guess).
  - Why it works: Offloads precise computation to an interpreter.
  - Failure mode: Generated code that doesn’t compile or solves the wrong problem — validate inputs/outputs.

- **ReAct**: Interleave **reasoning traces** and **task-specific actions** so the model plans and calls external tools/environments.
  - When to use: Need facts from a KB, search, or environment — not only parametric memory.
  - How: Alternate Thought (plan/update/handle exceptions) with Action (tool call); observe results; continue until done.
  - Why it works: Reasoning tracks the plan; actions gather fresh evidence → more factual responses.
  - Failure mode: Actions without reasoning (blind tool spam) or reasoning without actions (hallucinated “facts”).

- **Directional Stimulus Prompting**: A tunable policy LM generates hints that guide a black-box frozen LLM (e.g. toward a desired summary).
  - When to use: You cannot fine-tune the main LLM but can train a smaller policy to emit stimuli/hints.
  - How: Train policy to produce directional hints; feed hints + task to the frozen LLM.
  - Failure mode: Hints that over-constrain or bias the summary away from source fidelity.

## Key Concepts
- **Knowledge sample**: Model-generated background text used as prompt context.
- **Knowledge-augmented question**: Original question plus inserted knowledge for answer proposals.
- **Highest-confidence prediction**: Selection rule among knowledge-conditioned answers.
- **Intermediate program**: Code standing in for CoT steps in PAL.
- **Runtime / interpreter**: External executor that turns PAL programs into answers.
- **Reasoning trace**: Verbal plan/update in ReAct between actions.
- **Action step**: Tool or environment interface call in ReAct.
- **Policy LM**: Smaller trainable model that emits directional stimuli/hints.
- **Frozen LLM**: Black-box main model that stays un-updated during Directional Stimulus training.

## Mental Models
- Use **Generate Knowledge** when Y is “commonsense fails without explicit background in context.”
- Prefer **PAL over CoT** when Y is “the bottleneck is precise calculation, not conceptual steps.”
- Use **ReAct** when Y is “answers need external retrieval or environment interaction.”
- Use **Directional Stimulus** when Y is “you can train a hint generator but not the production LLM.”
- Think of **ReAct** as CoT + tools: traces for planning, actions for evidence.

## Anti-patterns
- **CoT-only for calculator tasks**: Natural language math when PAL would hand off to Python.
- **Knowledge without selection**: Using every generated snippet equally instead of confidence filtering.
- **Tool use without traces**: Acting without an updated plan (ReAct’s reasoning half).
- **Fine-tuning when a policy hint would do**: Heavy updates to a black-box API model instead of Directional Stimulus.

## Worked Example
**Generate Knowledge (golf objective)**:
1. Generate knowledge about golf (e.g. “objective is fewest strokes,” vs a vague club-and-ball blurb).
2. Ask: “Part of golf is trying to get a higher point total than others. Yes or No?” with each knowledge prepended.
3. High-confidence path with correct knowledge → **No** (minimize strokes, not maximize points).
4. Low-confidence path with weaker knowledge → may wrongly say **Yes** — discard via confidence.

**PAL vs CoT**:
- CoT: model writes verbal steps and may mis-add.
- PAL: model writes `print(21 - 15)` (trees example style); interpreter returns `6`.

**ReAct (conceptual loop)**:
Thought → need fact from tool → Action(lookup) → Observation → Thought (update plan) → … → Final answer.

## Key Takeaways
1. Generate Knowledge injects model-made context, then answers with confidence selection.
2. PAL replaces fragile verbal arithmetic with executable programs.
3. ReAct synergizes reasoning traces and tool actions for factuality.
4. Directional Stimulus steers a frozen LLM via a trainable hint policy.
5. Escalate: CoT → Self-Consistency → Knowledge / PAL / ReAct as failure modes demand.

## Connects To
- **Ch 2**: CoT and Self-Consistency are the text-only baseline before PAL/ReAct.
- **Ch 4**: Tool and knowledge prompts still must resist injection and leaking.
- **Papers**: Generated Knowledge Prompting; PAL; ReAct; Directional Stimulus Prompting.
