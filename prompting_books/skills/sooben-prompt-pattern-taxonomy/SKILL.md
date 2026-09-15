---
name: sooben-prompt-pattern-taxonomy
description: "Knowledge base from \"A Taxonomy of Single-Turn Textual Prompt Patterns\" by Vennila Sooben and Eugene Syriani. Use when applying Sooben & Syriani's 30 canonical prompt patterns, prompting strategy categories, prompt component annotations, pattern composition, or studying the taxonomy."
---

<!-- argument-hint: [pattern name, strategy, component, or chapter number] -->

# A Taxonomy of Single-Turn Textual Prompt Patterns
**Author**: Vennila Sooben & Eugene Syriani | **Pages**: ~25 | **Chapters**: 9 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `Persona`, `SchemaSpecs`, `composition`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch05`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### What counts as a prompt pattern
Use a **prompt pattern** when you need a recurring reusable textual structure, in canonical form, instantiable inside **one** prompt for a specific intention. Prefer this over informal tips when you must compare, reuse, or report prompt designs.

**Out of scope here:** multi-turn conversational workflows, agent/tool protocols, RAG pipelines, fine-tuning, multimodal-only techniques, and preprocessing that never appears as text in the prompt.

### Two axes (always)
1. **Prompting strategy** (primary): `In-Context Learning | Reasoning | Output Control | Context Control | Meta-Directives` → subcategory.
2. **Prompt components** (annotations): Profile/Role, Directive, Context, Procedural Steps, Examples, Output Format/Style, Constraints.

Write classifications as: `Category » Subcategory @ Component(s)`.

### Use X when Y (high-leverage)
- Use **ZeroShot** when the task is clear without demonstrations; **FewShot** when I/O format must be shown.
- Use **ChainOfThought** when multi-step reasoning is required; **StructuredCoT** when steps need program-like structure; **PlanAndSolve** when planning should precede execution; **LeastToMost** when easy→hard decomposition fits; **ReverseCoT** when answers must reconcile with the original problem; **ComplexCoT** when multiple reasoning paths help.
- Use **SchemaSpecs** when fields/values matter; **Template** when a skeleton must be preserved; **OutputAutomater** when machine-readable packaging is required; **VisualizationGenerator** when tabular/visual layout is the deliverable; **Recipe** when an ordered reusable procedure is the point.
- Use **SelfVerification** / **Reflection** / **FactCheckList** / **SelfCalibration** when trust, critique, claim lists, or confidence gates matter—never treat self-confidence as calibrated probability alone.
- Use **Persona** when who speaks should shape defaults; **ContextManager** when include/exclude/scope/lens must be explicit; **MetaLanguageCreation** when shorthand needs bound semantics.
- Use **RE2** / **QuestionRefinement** / **RAR** when the question may be misread or underspecified; **InstructionSelection** when directives compete; **AlternativeApproaches** when methods should be listed; **CognitiveVerifier** when verification subquestions help; **FlippedInteraction** / **GamePlay** / **InfiniteGeneration** when interaction framing matters (always define stops); **RefusalBreaker** only for legitimate reframes.

### Composition over isolation
Prefer composing patterns across components. Example reviewer pack: **Persona** + **ContextManager** + **SchemaSpecs** + **SelfCalibration**.

Watch **tensions**: strict schemas can starve reasoning unless you reserve fields; context resets can drop Persona/constraints.

### Catalog facts
- **30** canonical patterns from five synthesis sources after dedupe/merge/scope filter (176→30).
- Component totals: Profile/Role 1 · Directive 16 · Context 3 · Procedural Steps 16 · Examples 1 · Output Format/Style 6 · Constraints 5.
- Online catalog: https://geodes.iro.umontreal.ca/promptspec-catalog/

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-scope-and-definitions.md) | Scope, Definitions, and Single-Turn Bounds | prompt pattern, template vs instance, components vs workflows |
| [ch02](chapters/ch02-taxonomy-method.md) | Taxonomy Method — From 176 Candidates to 30 Patterns | extraction, dedupe, semantic merge, scope filter |
| [ch03](chapters/ch03-strategy-and-component-axes.md) | Strategy Dimensions and Component Types | 5 strategies, 14 subcategories, 7 components |
| [ch04](chapters/ch04-in-context-learning.md) | In-Context Learning Patterns | ZeroShot, FewShot |
| [ch05](chapters/ch05-reasoning.md) | Reasoning Patterns | ChainOfThought, StructuredCoT, ComplexCoT, PlanAndSolve, LeastToMost, ReverseCoT |
| [ch06](chapters/ch06-output-control.md) | Output Control Patterns | SchemaSpecs, Template, verification quartet, Recipe, … |
| [ch07](chapters/ch07-context-control.md) | Context Control Patterns | Persona, ContextManager, MetaLanguageCreation |
| [ch08](chapters/ch08-meta-directives.md) | Meta-Directives Patterns | RE2, RAR, QuestionRefinement, RefusalBreaker, … |
| [ch09](chapters/ch09-relations-evolution-limits.md) | Pattern Relations, Evolution, and Limits | composition, specialization, tension, versioning |

## Topic Index

- **AlternativeApproaches** → ch08
- **ChainOfThought** → ch05
- **CognitiveVerifier** → ch08
- **ComplexCoT** → ch05
- **Component annotation** → ch03
- **Composition** → ch09, ch03
- **Context Control** → ch07, ch03
- **ContextManager** → ch07
- **FactCheckList** → ch06
- **FewShot** → ch04
- **FlippedInteraction** → ch08
- **GamePlay** → ch08
- **In-Context Learning** → ch04, ch03
- **InfiniteGeneration** → ch08
- **InstructionSelection** → ch08
- **LeastToMost** → ch05
- **Meta-Directives** → ch08, ch03
- **MetaLanguageCreation** → ch07
- **Output Control** → ch06, ch03
- **OutputAutomater** → ch06
- **Persona** → ch07
- **PlanAndSolve** → ch05
- **Prompt pattern (definition)** → ch01
- **QuestionRefinement** → ch08
- **RAR** → ch08
- **RE2** → ch08
- **Recipe** → ch06
- **Reasoning** → ch05, ch03
- **Reflection** → ch06
- **RefusalBreaker** → ch08
- **ReverseCoT** → ch05
- **SchemaSpecs** → ch06
- **SelfCalibration** → ch06
- **SelfVerification** → ch06
- **StructuredCoT** → ch05
- **Template** → ch06
- **Tension / boundary overlap** → ch09
- **VisualizationGenerator** → ch06
- **ZeroShot** → ch04

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all 30 techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

This skill covers the Sooben & Syriani taxonomy of single-turn textual prompt patterns only. It is a catalog of reusable structures, not evidence that each pattern improves quality in every context. For multi-turn agents, tool-use, RAG, or fine-tuning, use other skills or primary sources. Combine with project-specific tooling when implementing prompts in production.
