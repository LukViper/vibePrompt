# Chapter 7: Context Control & Composition Lessons

## Core Idea
Context Control focuses attention — what to consider, ignore, or wipe — so conversations stay coherent; combined with catalog-wide lessons, it is how multi-pattern prompts stay intentional instead of accidentally erasing prior programming.

## Frameworks Introduced
- **Context Manager**: Specify or remove conversational context.
  - When to use: Prior turns pull attention to the wrong statements; need topical focus or a clean reset.
  - How — fundamental statements: **Within scope X**; **Please consider Y**; **Please ignore Z**; optional **start over**. Be explicit about concepts/facts/instructions; vague “ignore security-adjacent stuff” fails if those statements are far back.
  - Example shapes: “When analyzing this code, only consider security aspects.” / “Do not consider formatting or naming.” / “Ignore everything we have discussed. Start over.”
  - Failure mode: Resets can silently remove org-injected or earlier helpful patterns; users may not notice lost capabilities. Mitigate by asking the model to list what will be lost before proceeding.

## Key Concepts
- Context as inclusion/exclusion lists, not vibes
- Reset vs. surgical ignore
- Accidental de-patterning on “start over”
- Pattern composition (from concluding remarks): catalogs enable discussion; combinations create capabilities larger than single prompts

## Mental Models
- Use **Context Manager** when the model latches onto the wrong prior statements.
- Prefer **surgical consider/ignore** over full reset when you still need active patterns.
- Before **start over**, inventory which prompt patterns you must re-apply.
- Prefer **pattern combinations** when one pattern’s consequence is another’s strength (e.g., Game Play + Persona; Infinite Generation + Template; Question Refinement + Fact Check List).

## Anti-patterns
- Naked “start over” in environments with invisible system/org patterns.
- Ignoring topics without naming concrete statements/concepts.
- Assuming context persists perfectly across Infinite Generation marathon sessions.

## Worked Example
**Focused analysis**:  
“When analyzing the following pieces of code, only consider security aspects.”

**Surgical exclusion**:  
“When analyzing the following pieces of code, do not consider formatting or naming conventions.”

**Reset with safety ask (recommended consequence handling)**:  
“Ignore everything we have discussed and start over. First list any instructions or patterns that will be lost if we reset, then wait for confirmation.”

**Composition reminder (from paper lessons)**: Cybersecurity terminal game = Game Play + Persona (+ optional Visualization Generator for network views). Larger behaviors emerge from stacks, not from longer single sentences alone.

## Why it works / failure mode
Explicit consider/ignore lists work better than vague topical vibes because distant conversational statements are easy for the model to mishandle. Failure mode: surgical ignores miss items not named; full resets erase helpful prior patterns (including ones the user didn’t author). Authors’ concluding lessons: patterns enrich capabilities via combination; catalogs are useful but incomplete without a fuller pattern language; evolving LLM features will force pattern refinement; the same structures transfer beyond software.

## Key Takeaways
1. Control context with explicit consider/ignore lists scoped to X.
2. Treat full resets as pattern-destructive unless re-applied deliberately.
3. Catalog value is classification + composability, not memorizing example strings.
4. Patterns will need refinement as LLM capabilities and session tooling evolve.
5. Same patterns transfer beyond software (stories, education, exploration).
6. Before reset, ask the model to list instructions/patterns that would be lost.

## Connects To
- **Ch 1 Pattern form**: Context Manager is Context Control in the classification table.
- **Ch 2 Meta Language Creation**: Session-local languages interact with resets.
- **Ch 3–6**: Re-apply stacked patterns after Context Manager wipes.
- **Related work / future**: Domain-specific catalogs; move from catalog toward pattern language.
- **Ch 6 Infinite Generation / Game Play**: Long sessions are prime candidates for Context Manager hygiene.
