# Chapter 2: Input Semantics

## Core Idea
Input Semantics patterns change how the LLM interprets what you type — teaching it a custom language or notation when English (or the default language) is too verbose, ambiguous, or unfit for the idea.

## Frameworks Introduced
- **Meta Language Creation**: Explain alternate-language semantics so future prompts can use that language.
  - When to use: Graphs, state machines, command shorthand, or any structure clearer in notation than prose; also when a trained symbol has multiple meanings and you must scope which one applies.
  - How — fundamental contextual statement: **When I say X, I mean Y (or would like you to do Y)**. Bind symbols/words to semantics for the rest of the conversation; can be simple translation (“X means Y”) or command→action bindings (“when I say X, do …”).
  - Steps: (1) invent unambiguous notation, (2) define it once with examples, (3) use only that notation afterward, (4) keep one language per session.
  - Why it works: Concise, unambiguous expression; LLM can reuse trained notations with scoped meaning (e.g., `→` as graph edge vs. implication).
  - Failure mode: Ambiguous or overloaded symbols (e.g., remapping “a” or commas) confuse the model; it may refuse or degrade. Conflicting meta-languages in one long chat produce unexpected semantics.

## Key Concepts
- **Alternate language**: Textual shorthand, state/transition descriptions, automation command sets.
- **Semantic binding**: Map symbol/phrase → meaning or action for subsequent turns.
- **Session hygiene**: Prefer one meta-language per conversation; start fresh sessions for new languages.
- **Scoping trained symbols**: When a symbol already has meanings, Meta Language Creation scopes which meaning applies.

## Mental Models
- Use **Meta Language Creation** when the default language is ill-suited to express the idea you need the LLM to consume.
- Prefer **unambiguous notation** over remapping common words/punctuation.
- Think of Meta Language Creation as **teaching a DSL for this chat**, not as a permanent global remapping.

## Anti-patterns
- **Remapping high-frequency tokens**: “Whenever I say ‘a’…” — conflicts with articles and training priors.
- **Comma/punctuation hijacking**: Redefining commas as ordering operators while still writing English.
- **Stacking conflicting meta-languages** in one long session.

## Worked Example
**Graph shorthand prompt (reconstructed compactly)**:  
“From now on, whenever I type two identifiers separated by `→`, I am describing a graph. Example: `a → b` means nodes a,b with an edge. If I write `a -[w:2, z:3]→ b`, those are edge properties (weight/label).”

**Usage**: Later type `svcA → svcB -[latency:40]→ cache` instead of paragraphs describing topology.

**Contrast failure**: “Whenever I say ‘a’, I mean Marie Antoinette” — model warns that “a” as indefinite article creates confusion.

## Why it works / failure mode
Works because LLMs already know many notations; Meta Language Creation *scopes* which meaning applies (graph edge vs. implication). Fails when the new language collides with high-frequency English or punctuation — confusion compounds on every later turn. Best practice from the paper: new conversation sessions for new languages; avoid stacking conflicting meta-languages.

## Key Takeaways
1. Teach semantics explicitly before using the shorthand.
2. Prefer symbols with existing related meanings, then scope them.
3. Keep meta-languages session-local and singular when possible.
4. Ambiguity in the language definition becomes ambiguity in every later output.
5. If the model warns about confusion, redesign the notation — don’t force overloaded bindings.

## Connects To
- **Ch 3 Template / Visualization Generator**: Custom notations often feed structured or visual pipelines (e.g., graph shorthand → Dot).
- **Ch 7 Context Manager**: Reset or ignore prior meta-language bindings when switching domains.
- **Ch 1 Fundamental contextual statements**: Meta Language Creation is the exemplar of idea-over-tokens documentation.
- **Ch 6 Infinite Generation**: A stable meta-language amortizes well across repetitive generation — if it stays unambiguous.
