# Patterns — Prompt Engineering Foundations (Richardson sample)

## History-before-prompts foundation
**When to use**: Starting prompt work with teammates who lack AI/ML shared vocabulary.  
**How**: Cover milestones (Turing test, Dartmouth), then ML evolution, then prompt craft.  
**Trade-offs**: Slower onboarding; fewer magical expectations and better failure diagnosis.

## Operational intelligence test (Turing / imitation game)
**When to use**: Evaluating chatbot “human-likeness” claims.  
**How**: Judge indistinguishability in conversation; do not equate fluency with truth or competence.  
**Trade-offs**: Strong UX heuristic; weak reliability/safety metric.

## Shared-secret crypto analogy (Enigma rotors)
**When to use**: Teaching why secrets, key hygiene, and search space matter.  
**How**: Map rotor settings → shared secret; human-chosen words → reduced search space → brute force.  
**Trade-offs**: Memorable bridge to cybersecurity; not a full modern crypto lesson.

## Symbolic → statistical → deep learning progression
**When to use**: Explaining why modern models need data/compute and why prompts steer probabilities.  
**How**: Contrast rule brittleness → statistical generalization → deep nets enabled by backprop + GPU/TPU + data.  
**Trade-offs**: High explanatory power; sample lacks full chapter narrative depth.

## Prompt structure triad (informative / interrogative / directive)
**When to use**: Choosing the speech-act shape of a prompt.  
**How**: Inform (ground) → ask (interrogative) and/or command (directive); keep hierarchy clear.  
**Trade-offs**: Simple planning lens; finer types (open/closed, multimodal, adaptive) are Ch 8 TOC.

## Prompt anatomy checklist
**When to use**: Debugging vague or unstable outputs.  
**How**: Verify objectives, context/background, prior-knowledge bounds, specificity/depth, examples/analogies, constraints, tone/style, edge cases.  
**Trade-offs**: Thorough; can bloat tokens if every item is verbose.

## Effective vs ineffective prompt contrast
**When to use**: Training or reviewing prompt quality.  
**How**: Compare clear, structured prompts against ambiguous ones; expect accuracy/ambiguity differences.  
**Trade-offs**: Needs concrete examples and evaluation — not slogans.

## Iterate–evaluate loop (active learning on prompts)
**When to use**: After first-pass failures.  
**How**: Change one dimension; gather AI/human feedback; measure; retain winning variant.  
**Trade-offs**: Higher upfront cost; lower long-run error and rework.

## Constraint-first directives
**When to use**: Task execution prompts (rewrite, classify, generate).  
**How**: State format, length, banned content, and edge tags before creative freedom.  
**Trade-offs**: Less free-form creativity; more controllable outputs.
