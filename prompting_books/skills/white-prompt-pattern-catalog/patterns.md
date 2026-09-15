# Patterns

## Meta Language Creation
**When to use**: Default language is verbose/ambiguous for structures (graphs, FSMs, command shorthand).
**How**: State “When I say X, I mean Y (or do Y)”; define unambiguous notation; prefer one meta-language per fresh session.
**Trade-offs**: Powerful compression vs. confusion if symbols collide with common language; model may refuse overloaded remappings.

## Output Automater
**When to use**: Outputs list manual steps (multi-file edits, shell/cloud ops) you don’t want to retype.
**How**: On stepwise outputs, require a concrete artifact type X (e.g., Python script) that performs the steps; remind if omitted.
**Trade-offs**: Saves labor vs. execution risk and need for full conversational context; never run unread scripts.

## Persona
**When to use**: You know the role/expert lens better than the exact output checklist.
**How**: “Act as persona X” + “provide outputs persona X would create”; define I/O mapping for non-human personas.
**Trade-offs**: Strong focus and situational color vs. hallucinations and possible blocks on living-person personas.

## Visualization Generator
**When to use**: Need diagrams/images; model can’t draw natively.
**How**: “Generate X I can feed to tool Y”; optionally list tools (Graphviz, DALL·E) and let the model choose; name viz type when needed.
**Trade-offs**: Extends modality via pipelines vs. extra tooling step and format mismatches.

## Recipe
**When to use**: Know goal + partial steps/constraints; need full ordered plan.
**How**: Achieve X; known steps A,B,C; complete sequence; fill gaps; identify unnecessary steps.
**Trade-offs**: Completes plans vs. bias to retain user’s bad ingredients unless flagged.

## Template
**When to use**: Exact layout required (URLs, forms, constrained records).
**How**: Provide template; mark placeholders; fit content into placeholders; preserve formatting.
**Trade-offs**: Consistency vs. lost explanations and poor composability with free-form patterns (e.g., Recipe lists).

## Fact Check List
**When to use**: Non-expert or high-risk claims; output is fact-checkable.
**How**: Emit fundamental dependent facts at a set position (prefer end); scope to risk topics.
**Trade-offs**: Enables due diligence vs. incomplete/wrong lists; unsuitable for some code-only asks.

## Reflection
**When to use**: Need rationale, assumption surfacing, or prompt debugging.
**How**: After answers, explain reasoning/assumptions (optionally to improve the question); scope if needed.
**Trade-offs**: Transparency vs. opaque technical rationales and erroneous explanations — pair with Fact Check List.

## Question Refinement
**When to use**: User may not know the best question; reduce trial-and-error.
**How**: Within scope X, suggest a better question; optionally auto-offer to use it; combine with verifier/persona/fact checks.
**Trade-offs**: Better targeting vs. over-narrowing and injected inaccuracies.

## Alternative Approaches
**When to use**: Fight familiarity bias; force exploration before committing.
**How**: Within scope X, list best alternatives; optional pros/cons, include original, ask which to use.
**Trade-offs**: Broader search vs. noise if unconstrained.

## Cognitive Verifier
**When to use**: Vague/high-level questions; subdivision improves reasoning.
**How**: Generate helping subquestions; combine answers into the final answer; bound count to user bandwidth.
**Trade-offs**: Accuracy vs. interaction cost; fixed N may omit a critical follow-up.

## Refusal Breaker
**When to use**: Legitimate can’t-answer cases needing diagnosis and rephrasings.
**How**: On refusal: explain why + propose answerable alternate wordings.
**Trade-offs**: Unblocks misunderstanding vs. misuse risk against policies; alternates may not match intent. Use ethically.

## Flipped Interaction
**When to use**: Model should drive questioning toward a goal (quiz, requirements gathering).
**How**: Ask questions to achieve X until condition; optional batch size; set engagement/expertise.
**Trade-offs**: Efficient elicitation vs. wandering if goal/constraints underspecified.

## Game Play
**When to use**: Narrow rules, wide content; experiential learning/exploration.
**How**: Game around X + fundamental rules; stack Persona/Infinite Generation/Visualization as needed.
**Trade-offs**: Rich scenarios vs. capability limits and spoiler leakage in prompts.

## Infinite Generation
**When to use**: Same generator applied many times; avoid retyping.
**How**: Generate forever, X at a time; optional between-output inputs; explicit stop phrase.
**Trade-offs**: Throughput vs. context drift and repetition — monitor and correct.

## Context Manager
**When to use**: Wrong prior context dominates; need focus or reset.
**How**: Within scope X, consider Y / ignore Z; optional start over; list losses before reset.
**Trade-offs**: Coherence control vs. accidental removal of helpful prior patterns.
