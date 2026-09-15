# Chapter 3: Zero-Shot, One-Shot & Few-Shot

## Core Idea
Zero-shot gives only the task; one-shot and few-shot add demonstrations so the model can imitate structure and pattern — escalate to examples when zero-shot fails.

## Frameworks Introduced
- **Zero-shot (general prompting)**: Task description + starting text; **no examples**
  - When to use: Simple, well-known tasks; first baseline
  - How: State the task clearly; cue the answer format (e.g. end with `Sentiment:`)
- **One-shot**: Single example the model can imitate
  - When to use: Need a specific structure/pattern but want a short prompt
  - How: Show one complete input→output pair, then the real query
- **Few-shot**: Multiple examples revealing the pattern
  - When to use: Structured extraction, uncommon formats, or when one-shot is weak
  - How: Rule of thumb **3–5 examples** (more if complex; fewer if context window tight)

## Key Concepts
- **Demonstration / example**: Teaching signal for desired output shape
- **Pattern following**: Few-shot increases chance the model continues the shown schema
- **Example quality**: Relevant, diverse, high-quality, well-written — one mistake can derail output
- **Edge cases in examples**: Include unusual inputs if you need robustness
- **Prompt documentation table**: Name, Goal, Model, Temperature, Token Limit, Top-K, Top-P, Prompt, Output
- **Classification cue**: Explicit label set (POSITIVE/NEUTRAL/NEGATIVE) + trailing field name

## Mental Models
- Use **zero-shot first** when Y is a standard task; escalate to shots when Y needs a custom schema.
- Prefer **few-shot for JSON/schema imitation** when Y is parsing into a fixed shape (e.g. pizza order → JSON).
- Think of examples as **specification-by-demonstration**, not decoration — bad examples teach bad behavior.
- Use **low temperature** when Y is classification or structured parse with no creativity needed.

## Anti-patterns
- **Sloppy or inconsistent examples**: Confuses the pattern
- **Homogeneous examples only**: Fails on edge cases
- **Too few shots on complex tasks** / **too many for the context window**
- **High temperature on label tasks**: Adds unwanted variation

## Worked Example
**Zero-shot movie sentiment** (whitepaper Table 1 pattern):
- Temp 0.1, token limit 5, top-P effectively open
- Prompt: classify as POSITIVE/NEUTRAL/NEGATIVE; review mixes “disturbing” and “masterpiece”; ends with `Sentiment:`
- Output: `POSITIVE`

**Few-shot pizza → JSON** (Table 2 pattern):
1. Example: small pizza with cheese/tomato/pepperoni → JSON with `size`, `type`, `ingredients`
2. Example: large with tomato/basil/mozzarella → same schema
3. Query: large half-and-half order → model emits `type: half-half` and two ingredient lists

**Teaching point**: Demonstrations encode schema (`half-half`) that zero-shot would not invent reliably.

## Key Takeaways
1. Zero-shot = no examples; escalate when it fails.
2. One-shot teaches imitation; few-shot teaches a pattern (aim for 3–5).
3. Example quality and diversity beat example count.
4. Document every attempt in the Name/Goal/Model/config/Prompt/Output table.
5. For classification, keep creativity low and labels explicit.

## Connects To
- **Ch 2**: Sampling presets for deterministic vs creative tasks
- **Ch 4**: System prompting can demand label-only or JSON without many shots
- **Ch 5**: Few-shot CoT pairs reasoning examples with the query
- **Ch 10**: Mix class order in few-shot classification; provide examples as top practice
