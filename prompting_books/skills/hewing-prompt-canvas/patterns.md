# Patterns — The Prompt Canvas (Hewing & Leinhos)

## Fill the Four Primary Categories in Order
**When to use**: Any non-trivial prompt design session or workshop.
**How**: (1) Persona/Role + Audience (2) Task/Intent + Step-by-Step (3) Context + References (4) Output/Format + Tonality. Add Techniques/Tooling only as needed.
**Trade-offs**: Slightly slower than a one-line ask; far clearer collaboration and fewer missing constraints.

## Persona/Role Casting
**When to use**: Expertise, viewpoint, or org culture must shape the answer.
**How**: Name role + skills + values/culture; avoid bare “helpful assistant.”
**Trade-offs**: Over-narrow roles can block legitimate creativity; pair with Audience to stay useful.

## Audience Persona
**When to use**: Reader knowledge, age band, or channel language matters.
**How**: Specify who reads it and language constraints (formality, references, examples).
**Trade-offs**: Stereotyped audiences distort tone — keep traits task-relevant.

## Action-Verb Task + Explicit Intent
**When to use**: Outputs wander or optimize the wrong success metric.
**How**: Start with a verb; state objective and focus (“summarize… focusing on arguments and evidence…”).
**Trade-offs**: Over-specified intent can kill exploration — loosen for brainstorming goals.

## Step-by-Step Procedure (or CoT Cue)
**When to use**: Multi-stage work or reasoning-heavy tasks.
**How**: List sequential steps *or* use “Let’s think step by step” / Plan-and-Solve wording.
**Trade-offs**: Extra tokens and latency; skip for simple lookups.

## Context Before Assumptions
**When to use**: Generic or off-target answers.
**How**: Provide situation, stakeholders, constraints; remember “best what you tell the AI.”
**Trade-offs**: Long context can distract — keep only decision-relevant detail.

## References as Anchors
**When to use**: Need facts, policies, exemplars, or citation discipline.
**How**: Attach/point to docs; say *how* to use them (align to survey, match example article, quote sources).
**Trade-offs**: Unused attachments waste context window.

## Output Contract
**When to use**: Downstream use needs predictable shape.
**How**: Length + sections + format (Markdown/table/code) + optional quote/source rules; preserve templates when provided.
**Trade-offs**: Rigid skeletons can feel formulaic — allow a creative section if needed.

## Tonality Attributes + Style Inspiration
**When to use**: Brand or register must match.
**How**: Name attributes (authenticity, sophistication, luxury…) and optional brand/author/magazine style.
**Trade-offs**: Conflicting attributes confuse the model — pick 2–3 max.

## White Prompt Pattern Assembly
**When to use**: Recurring problem classes (esp. software/process prompts).
**How**: Compose Scope, Task/Goal, Context, Procedure, Role, Output, Termination condition as needed.
**Trade-offs**: Pattern completeness ≠ task clarity; still fill Intent.

## Iterative Optimization Loop
**When to use**: First answer is close but not shippable.
**How**: Adjust one canvas cell or technique per iteration; keep winners.
**Trade-offs**: Endless tweaking without a stop condition (use Termination).

## Placeholders & Delimiters
**When to use**: Reusable templates or mixed instructions + data.
**How**: Variable slots for instance data; fence data blocks away from instructions.
**Trade-offs**: Poor delimiter choice can still leak; be consistent.

## Tree-of-Thoughts Multi-Perspective
**When to use**: Need diverse options or critique, not one linear path.
**How**: Ask for multiple personas/branches, then select/synthesize.
**Trade-offs**: Costlier than single CoT; overkill for factual lookup.

## Emotion Prompting Coda
**When to use**: Empirical boost to care/effort is desired after structure is clear.
**How**: Short stakes phrase at the end; do not replace Task/Audience.
**Trade-offs**: Can feel manipulative; mixed reliability across models.

## RaR / Re-Reading
**When to use**: Model misreads complex briefs.
**How**: Require paraphrase-before-answer or explicit re-read.
**Trade-offs**: Extra steps; may be redundant on strong instruction-following models.

## Tooling by Job
**When to use**: Scaling beyond one-off chats.
**How**: Libraries for reuse, platforms for optimize, arenas for model choice, custom GPT/API for institutional context.
**Trade-offs**: Tool sprawl; canvas literacy still required.
