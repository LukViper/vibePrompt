# Chapter 1: Introduction & Prompt Pattern Form

## Core Idea
Prompt patterns are reusable solutions for LLM output and interaction problems, documented like software patterns — with name, classification, intent, motivation, structure (fundamental contextual statements), example, and consequences — so prompts transfer across domains instead of living as one-off examples.

## Frameworks Introduced
- **Prompt**: A set of instructions that programs an LLM by customizing, enhancing, or refining capabilities; it sets context, priorities, and desired output form.
  - When to use: Any time you need rules, interaction shape, or output constraints to persist across turns — not only one-shot generation.
  - How: State context, what matters, desired form/content; optionally chain into quizzes, terminal simulation, or self-adapting follow-ups.
- **Prompt engineering**: Programming LLMs via prompts — beyond “generate X” into new interaction paradigms (quizzes, terminal simulation, self-adapting prompts).
- **Prompt pattern**: Codified reusable approach for systematically engineering output and interaction goals with conversational LLMs.
  - When to use: The same interaction/output problem recurs across tasks or teammates.
  - How: Name it, classify it, state intent/motivation, list fundamental contextual statements, show an example, record consequences.
- **Prompt pattern form** (adapted from software patterns):
  - Name and classification
  - Intent and context
  - Motivation
  - Structure and key ideas
  - Example implementation
  - Consequences
- **Fundamental contextual statements**: Written descriptions of the important ideas to communicate in a prompt; wording may vary, but the core statements must remain. Prefer these over formal grammars for documenting structure.
  - Why over grammars: Audiences include non-programmers; many valid phrasings; ideas outrank tokens; LLMs can invent new symbology grammars can’t foresee.
- **Classification categories** (Table I): Input Semantics, Output Customization, Error Identification, Prompt Improvement, Interaction, Context Control.

## Key Concepts
- **Software pattern analogy**: Name/classification, intent, motivation, structure/participants, example, consequences → prompt pattern equivalents.
- **Composable prompts**: Patterns combine into richer capabilities (pattern sequences / pattern language aspiration).
- **Domain-independent first**: Catalog emphasizes transferable structures; domain-specific catalogs are expected later.
- **Forces**: Clarity for non-programmers; many phrasings of one idea; ideas > tokens; LLMs can invent new semantics for symbols.

## Mental Models
- Use **prompt patterns** when you need a reusable solution to a recurring LLM interaction/output problem — not a clever one-shot string.
- Think of a prompt as **programming the conversation**, not merely requesting text.
- Prefer **fundamental contextual statements** when documenting how a prompt works: capture the idea (“when I say X, mean Y”) so others can rephrase without losing structure.
- Prefer **pattern catalogs over example dumps** when transferring knowledge across teams or domains.

## Anti-patterns
- **Example-only prompting lore**: Sharing interesting prompts without naming intent, forces, structure, or trade-offs — blocks reuse and adaptation.
- **Grammar-first documentation**: Formal grammars that can’t capture nuance, new symbology, or non-CS audiences.
- **Treating prompts as static Q&A**: Ignoring interaction, automation, and multi-pattern composition.

## Worked Example
**Problem**: Automate cloud deployment questioning without hand-driving every detail.

**Prompt (Flipped Interaction seed from the paper)**:  
“From now on, I would like you to ask me questions to deploy a Python application to AWS. When you have enough information to deploy the application, create a Python script to automate the deployment.”

**What the form captures**:
- Intent: LLM drives questions until it can produce automation.
- Structure: goal + termination condition (+ optional question batching).
- Why it matters: Shows prompt engineering beyond “write a function.”

## Key Takeaways
1. Document prompts as patterns: name, classify, state intent, list fundamental statements, show an example, note consequences.
2. Classify by interaction goal (semantics, output shape, errors, prompt quality, turn-taking, context).
3. Capture ideas as fundamental contextual statements so wording can adapt without losing the pattern.
4. Expect composition: most powerful uses stack multiple patterns.
5. Tested in the paper primarily with ChatGPT; structure aims to generalize across LLMs.

## Connects To
- **Ch 2–7**: Each category instantiates this form for 16 named patterns.
- **Software patterns (Gamma et al.; POSA)**: Design/architecture knowledge-transfer lineage.
- **Pattern languages**: Authors note catalog → language as future work.
