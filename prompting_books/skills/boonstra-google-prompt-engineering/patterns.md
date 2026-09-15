# Patterns — Prompt Engineering Techniques (Boonstra)

## Zero-Shot Prompting
**When to use**: Simple/standard tasks; establishing a baseline.
**How**: State the task and label set; cue the answer (`Sentiment:`); low temp for classification.
**Trade-offs**: Fast and short; weak when structure or edge cases are unusual.

## One-Shot Prompting
**When to use**: Need imitation of a specific format with minimal tokens.
**How**: One full example, then the real input.
**Trade-offs**: Cheap; may under-specify complex patterns.

## Few-Shot Prompting
**When to use**: Schema/pattern following (JSON parse, labels); zero-shot failed.
**How**: 3–5+ diverse, high-quality examples; include edge cases; mix class order for classification (~6 to start testing).
**Trade-offs**: Strong steering; burns context; bad examples poison output.

## System Prompting
**When to use**: Durable contracts — format, schema, safety, “only return label”.
**How**: Add system-level requirements; JSON schemas force structure and curb hallucination.
**Trade-offs**: Clear control; over-long systems can conflict or confuse.

## Role Prompting
**When to use**: Consistent persona, expertise, or style (travel guide, editor, teacher).
**How**: “Act as …”; optionally set style (humorous, formal, persuasive, …).
**Trade-offs**: Better tone/relevance; weak without a concrete task.

## Contextual Prompting
**When to use**: Dynamic per-request background (blog niche, user state).
**How**: Lead with `Context:`; keep it task-specific and current.
**Trade-offs**: Precision; context rot if stale or oversized.

## Step-Back Prompting
**When to use**: Direct asks feel generic; need activated principles/settings first.
**How**: Broad question → feed answer as context → specific task.
**Trade-offs**: Richer outputs; two calls / more tokens.

## Chain of Thought (CoT)
**When to use**: Explainable multi-step reasoning (math, planning, stepwise code).
**How**: “Let's think step by step” and/or few-shot reasoned examples; **answer after reasoning**; temp **0** for single correct answers.
**Trade-offs**: Accuracy + interpretability; higher cost/latency.

## Self-Consistency
**When to use**: Single CoT flip-flops under ambiguity (tone, sarcasm, competing cues).
**How**: Sample N CoTs at high temp; extract answers; majority vote.
**Trade-offs**: More stable; N× cost; vote ≠ calibrated probability.

## Tree of Thoughts (ToT)
**When to use**: Hard tasks needing exploration of alternative partial solutions.
**How**: Maintain branching thoughts; expand/search the tree (per ToT paper/notebooks).
**Trade-offs**: Powerful search; complex orchestration and cost.

## ReAct (Reason & Act)
**When to use**: Need external tools/APIs/search; agent-style workflows.
**How**: Thought → Action → Observation loop until Final Answer; trim/resend history; limit tokens.
**Trade-offs**: Grounded facts; tooling, latency, and fragile observations.

## Automatic Prompt Engineering (APE)
**When to use**: Large space of equivalent phrasings/instructions to discover.
**How**: Generate variants → score (BLEU/ROUGE/task metric) → select → optional tweak → repeat.
**Trade-offs**: Scales brainstorming; metric misalignment risk; still needs human review.

## Code Write / Explain / Translate / Debug
**When to use**: Developer acceleration across the code lifecycle.
**How**: Low temp; explicit language; include tracebacks when debugging; test everything; preserve Markdown indent for Python in Vertex Studio.
**Trade-offs**: Speed; must verify — models repeat training patterns and can miss edge cases.

## Structured Output (JSON/XML)
**When to use**: Extract, classify, parse, order, rank — non-creative data tasks.
**How**: Demand valid JSON/XML (+ schema); prefer instructions that specify fields.
**Trade-offs**: Easier parsing, fewer free-form hallucinations; schema errors still possible.

## Instruction-First Prompting
**When to use**: Default requirement framing.
**How**: State what to produce; add constraints only for safety/strict format; avoid clashing “don’t” lists.
**Trade-offs**: Clearer targets; constraints still needed for harm/format boundaries.
