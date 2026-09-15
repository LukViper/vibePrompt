# Chapter 1: Scope, Definitions, and Single-Turn Bounds

## Core Idea
A **prompt pattern** is a recurring reusable textual structure you can instantiate inside one prompt—not a multi-turn workflow, tool protocol, or training method.

## Frameworks Introduced
- **Prompt vs prompt template vs prompt instance**: Use a *template* (with placeholders) to produce a *prompt instance* (fully resolved string) submitted to the model.
- **Prompt pattern (Def. 4)**: Use a named canonical structure when the same intention recurs across tasks and you need a shared vocabulary.
- **Prompting strategy (Def. 5)**: Group patterns by primary intention (examples, reasoning, output control, context, meta-directives).
- **Prompt component (Def. 6)**: Annotate where in a prompt a pattern lives (Profile/Role, Directive, Context, Procedural Steps, Examples, Output Format/Style, Constraints).

## Key Concepts
- **Single-turn textual scope**: Patterns must be expressible as text inside one prompt.
- **Prompt workflow (interaction-level)**: Sequences of prompts/responses/tools—out of scope here.
- **Procedural Steps component**: Steps *inside* one prompt; deliberately renamed from Mao et al.’s “Workflow” to avoid confusion with interaction workflows.
- **Structured prompt**: Combines components (role, task, input, constraints, format)—see code-review style prompts as composition targets.

## Mental Models
- Use **patterns** when you need reusable structure; use **guidelines** when you only need writing advice.
- Prefer **component annotations** as placement metadata, not as a second taxonomy hierarchy.
- Think of a prompt as an assembly of pattern instances across components, not as one opaque blob.

## Anti-patterns
- **Calling RAG / agents / fine-tuning “prompt patterns”**: They fail Definition 4 (not reusable textual structures inside one prompt).
- **Treating multi-turn procedures as single-turn patterns**: Cumulative/agent loops belong to workflows.
- **Equating “prompting technique” surveys with this catalog**: Surveys mix granularities; this taxonomy filters to 30 canonical textual patterns.

## Worked Example
**Vague:** `Review this code.`

**Structured (components labeled):**
```
As a senior developer, review the following {{language}} code:   # Profile/Role + Directive
{{code}}                                                         # Context / input
Consider: quality, bugs, performance, readability, security.     # Constraints / criteria
Suggest improvements with reasoning.                             # Directive
Classify as Critical / Important / Nice To Have.                 # Output Format
```
This is a *template* until placeholders resolve; chunks on the right are candidate pattern hosts.

## Key Takeaways
1. Scope = single-turn + textual + reusable structure.
2. Keep exact names (pattern ≠ technique ≠ workflow).
3. Components answer *where*; strategies answer *why*.
4. Patterns compose; they are not mutually exclusive.
5. Catalog inclusion ≠ proven quality gain on every task.

## Connects To
- **Ch 2**: How 176 candidates became 30 patterns
- **Ch 3**: Strategy × component axes
- **Online catalog**: https://geodes.iro.umontreal.ca/promptspec-catalog/
