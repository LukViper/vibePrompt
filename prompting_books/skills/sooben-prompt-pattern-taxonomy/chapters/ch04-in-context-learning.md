# Chapter 4: In-Context Learning Patterns

## Core Idea
In-Context Learning patterns control whether and how examples steer the model—omit them (ZeroShot) or supply demonstrations (FewShot).

## Frameworks Introduced
- **In-Context Learning (strategy)**: patterns that use, omit, or structure examples to guide responses.
- **ZeroShot**: Instructs the task directly without worked examples.
  - Classification: `In-Context Learning » Zero-shot @ Directive`
  - When to use: Use ZeroShot when the task is clear, familiar to the model, or you lack trustworthy demonstrations.
  - How: State the instruction directly; optionally attach input_data. Do not include worked I/O pairs.
  - Trade-offs: Minimal prompt cost and no example bias; weaker on novel formats, rare schemas, or underspecified tasks vs FewShot.
  - Also known as: Zero-Shot Prompting, Basic/Standard/Vanilla Prompting
- **FewShot**: Supplies worked input-output examples before the target task.
  - Classification: `In-Context Learning » Few-shot @ Directive, Examples`
  - When to use: Use FewShot when format, labeling, or style must be shown rather than described.
  - How: Give the task, then 1+ input→output exemplars that match the target distribution; end with the real input.
  - Trade-offs: Steers format/behavior strongly; burns tokens and can overfit to exemplar quirks. Mutually exclusive with ZeroShot as the example strategy.
  - Also known as: Few-Shot Prompting

## Key Concepts
- **Few-shot**: subcategory hosting ['FewShot']
- **Zero-shot**: subcategory hosting ['ZeroShot']

## Mental Models
- Use **ZeroShot** when Y = clear task + no good exemplars.
- Use **FewShot** when Y = format/label/style must be demonstrated.
- Think of examples as soft training inside the prompt—powerful and biasing.

## Anti-patterns
- **Mixing conflicting exemplars**: teaches contradiction.
- **Assuming more shots always help**: poor selection can hurt.
- **Calling every instruction “few-shot”**: without I/O pairs it is ZeroShot.

## Worked Example
**ZeroShot:** `Translate the following English word into French: Morning`

**FewShot:**
```
Translate English to French.
Examples:
Input: Night → Output: Nuit
Input: Morning → Output: Matin
Now apply to: Winter
```
Choose FewShot when the mapping style must be shown; ZeroShot when the instruction alone is enough.

## Key Takeaways
1. Only two canonical patterns in this family.
2. FewShot is the sole pattern annotated with Examples.
3. Both also live on Directive.
4. Few-shot CoT is a *combination*, not a separate top-level pattern here.

## Connects To
- **Ch 5**: Combining examples with reasoning (variants)
- **Ch 3**: Examples component rarity
