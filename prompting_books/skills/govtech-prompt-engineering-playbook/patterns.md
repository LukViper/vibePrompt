# Patterns

## CO-STAR Prompt Assembly
**When to use**: Outputs feel generic, incomplete, or off-voice.
**How**: Add Context (often first), clear Objective, optional Style/Tone/Audience, and explicit Response length/format. Mix only the letters you need.
**Trade-offs**: Fuller prompts raise first-shot quality but cost tokens and drafting time; iteration may be cheaper for exploration.

## Context-Above-Objective Ordering
**When to use**: Thank-you notes, situational advice, domain-specific asks.
**How**: Background paragraph/sentence, then the imperative objective.
**Trade-offs**: Slightly longer prompts; sharper relevance.

## Few-Shot Format Lock
**When to use**: You need exact labels, schemas, or Q/A patterns.
**How**: Show 2+ examples of input→output (e.g. sentiment words or +1/0/−1). Even unlabeled Q:/A: patterns teach the task.
**Trade-offs**: Uses token budget; bad examples teach bad behaviour.

## Temperature / Creativity Matching
**When to use**: Every production prompt.
**How**: Low (0) for classify/cluster/extract/corrections; Balanced (0.5) for rewrite/summary; High (1) for brainstorming, taglines, creative speeches. Re-run High for variants.
**Trade-offs**: Low can feel dull; High reduces reproducibility.

## Task-Rewriting Pipeline
**When to use**: Existing text must change form for a new audience or channel.
**How**: Paste source + name subtype (simplify / correct / translate / enhance). For typos, also ask for a change list.
**Trade-offs**: Translation and enhancement can drift meaning — human review required.

## Schema Extraction
**When to use**: Reports, incidents, recipes, HR/crime-style narratives.
**How**: List fields and output shape (bullets/table). Prefer explicit fields over “key points” when consistency matters.
**Trade-offs**: Over-constrained schemas miss unexpected facts; under-constrained ones wander.

## Criterion Clustering
**When to use**: Free lists or mixed records need buckets.
**How**: Name groups and criteria (or let model infer once); provide an unsure/leftover group; optionally re-cluster on another axis.
**Trade-offs**: Inferred criteria may not match ops needs — specify when it matters.

## Label Classification + Correction Turn
**When to use**: Sentiment, routing, custom A/B/C taxonomies.
**How**: Define labels; classify; if multi-membership possible, allow it; follow up to fix errors in-thread.
**Trade-offs**: Single-label forcing creates silent mistakes.

## Summarize / Merge / Follow-ups
**When to use**: Long docs, dual meeting notes, conflicting news.
**How**: Shorten, or ask key points, or merge sources; add “do not make up new contents”; optionally list ministry/action follow-ups.
**Trade-offs**: Aggressive shortening drops nuance; merge without anti-invention invites hallucination.

## Framed Generation with Variables
**When to use**: Speeches, appraisals, testimonials, quizzes, campaign copy.
**How**: Provide bullets/structure; declare variables (Start Term, End Term); set High creativity for options; verify facts/MCQ answers.
**Trade-offs**: Highest hallucination surface; models may ignore exact closing instructions.

## Chain-of-Thought Probe
**When to use**: Opaque or wrong answers on multi-step tasks.
**How**: Append “Show your chain of thought” / “think step by step” / “show your workings.”
**Trade-offs**: Longer outputs; rationale can be fabricated — still verify.

## Roleplay Interview Loop
**When to use**: Underspecified coaching/mentoring goals.
**How**: Instruct the model to ask questions until it can recommend; answer its questions; stop when advice is enough.
**Trade-offs**: Can ramble without an exit criterion.

## Multi-Task Chaining
**When to use**: End-to-end workflows (e.g. extract → rewrite → generate social post).
**How**: Sequence task families in one thread or staged prompts; reuse prior outputs as context.
**Trade-offs**: Error compounds across stages — checkpoint after each.
