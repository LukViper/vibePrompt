---
name: white-prompt-pattern-catalog
description: "Knowledge base from \"A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT\" by White et al. Use when applying White's prompt patterns for Persona, Recipe, Template, Fact Check List, Reflection, Flipped Interaction, Meta Language Creation, and related catalog patterns, studying the paper, or composing multi-pattern prompts."
---

<!-- argument-hint: [topic, pattern name, or chapter number] -->

# A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT
**Author**: Jules White, Quchen Fu, Sam Hays, Michael Sandborn, Carlos Olea, Henry Gilbert, Ashraf Elnashar, Jesse Spencer-Smith, Douglas C. Schmidt | **Pages**: ~19 | **Chapters**: 7 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `Persona`, `Recipe`, `Fact Check List`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch03`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### Prompt patterns as software-pattern cousins
Use a **prompt pattern** when you need a reusable solution to a recurring LLM output/interaction problem. Document: **name + classification**, **intent/context**, **motivation**, **structure via fundamental contextual statements**, **example**, **consequences**. Prefer capturing *ideas* (“When I say X, I mean Y”) over brittle token grammars.

### Classification toolkit (16 patterns)
| Category | Patterns |
|---|---|
| **Input Semantics** | Meta Language Creation |
| **Output Customization** | Output Automater, Persona, Visualization Generator, Recipe, Template |
| **Error Identification** | Fact Check List, Reflection |
| **Prompt Improvement** | Question Refinement, Alternative Approaches, Cognitive Verifier, Refusal Breaker |
| **Interaction** | Flipped Interaction, Game Play, Infinite Generation |
| **Context Control** | Context Manager |

### Use X when Y
- Use **Meta Language Creation** when English is a poor medium — bind “When I say X, I mean Y”; one meta-language per fresh session; don’t remap articles/commas.
- Use **Output Automater** when outputs imply manual steps — demand a *concrete* artifact type (script), not vague “automate.”
- Use **Persona** when you know the role better than the checklist — “Act as X; provide outputs X would create” (+ I/O map for non-humans).
- Use **Template** when shape is non-negotiable; use **Recipe** when you have goal + partial ingredients and need full ordered steps (fill gaps; flag unnecessary).
- Use **Visualization Generator** when you need tool-Y payloads (Graphviz/DALL·E), not pretend pixels.
- Use **Fact Check List** when you’re not the expert on critical claims — list fundamental dependent facts (often at end), scoped to risk.
- Use **Reflection** when you need reasoning/assumptions (prompt debugging); pair with Fact Check List if rationale can err.
- Use **Question Refinement** within scope X to co-engineer better asks; watch over-narrowing.
- Use **Alternative Approaches** within hard constraints to dissolve familiarity bias.
- Use **Cognitive Verifier** when subdividing questions should improve the combined answer — bound follow-up count.
- Use **Refusal Breaker** only to explain refusals and suggest legitimate rewordings — not to evade safety policy.
- Use **Flipped Interaction** when the model should ask until goal X (set stop + engagement).
- Use **Game Play** when rules are narrow and content should be wide; stack **Persona** to hide spoilers.
- Use **Infinite Generation** to reuse a generator without retyping — rate-limit; watch context drift.
- Use **Context Manager** to consider Y / ignore Z / start over — resets can wipe prior patterns; inventory losses first.

### Composition defaults
Prefer stacks over megaprompts: **Infinite Generation + Template**; **Game Play + Persona** (+ Visualization); **Question Refinement + Reflection + Fact Check List**; **Flipped Interaction + Output Automater**; **Recipe** leaning on Alternative Approaches / Reflection ideas.

### Operator rules of thumb
Prefer patterns over example-string folklore. Read before running automations. Scope refinements/alternatives/fact lists. Treat “start over” as deliberate de-patterning.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction-and-pattern-form.md) | Introduction & Prompt Pattern Form | Prompt, Prompt Pattern Form, Fundamental Contextual Statements |
| [ch02](chapters/ch02-input-semantics.md) | Input Semantics | Meta Language Creation |
| [ch03](chapters/ch03-output-customization.md) | Output Customization | Output Automater, Persona, Visualization Generator, Recipe, Template |
| [ch04](chapters/ch04-error-identification.md) | Error Identification | Fact Check List, Reflection |
| [ch05](chapters/ch05-prompt-improvement.md) | Prompt Improvement | Question Refinement, Alternative Approaches, Cognitive Verifier, Refusal Breaker |
| [ch06](chapters/ch06-interaction.md) | Interaction | Flipped Interaction, Game Play, Infinite Generation |
| [ch07](chapters/ch07-context-control.md) | Context Control & Composition Lessons | Context Manager, Pattern Composition |

## Topic Index

- **Alternative Approaches** → ch05
- **Cognitive Verifier** → ch05
- **Context Control** → ch07
- **Context Manager** → ch07
- **Error Identification** → ch04
- **Fact Check List** → ch04
- **Flipped Interaction** → ch06
- **Fundamental contextual statements** → ch01
- **Game Play** → ch06
- **Infinite Generation** → ch06
- **Input Semantics** → ch02
- **Interaction** → ch06
- **Meta Language Creation** → ch02
- **Output Automater** → ch03
- **Output Customization** → ch03
- **Pattern composition** → ch07, ch01
- **Persona** → ch03
- **Prompt / Prompt engineering** → ch01
- **Prompt Improvement** → ch05
- **Prompt pattern form** → ch01
- **Question Refinement** → ch05
- **Recipe** → ch03
- **Reflection** → ch04
- **Refusal Breaker** → ch05
- **Software patterns analogy** → ch01
- **Template** → ch03
- **Visualization Generator** → ch03

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

This skill covers the White et al. prompt-pattern catalog (arXiv:2302.11382) only — pattern form, six categories, sixteen named patterns, and composition lessons. Examples were developed primarily against ChatGPT; adapt wording to your host model. For hands-on implementation in your codebase, combine with project-specific tools. For topics beyond this paper, check related skills or ask the agent directly.
