# Chapter 5: Context and References

## Core Idea
**Context** supplies the situation the model cannot reliably invent; **References** attach facts, files, policies, and exemplars so outputs stay grounded and decision-aware.

## Frameworks Introduced
- **Context (canvas cell)**: Give detailed information about the current situation and background; the model may “know almost everything,” but performs best on what you tell it.
  - When to use: Domain work, internal decisions, anything with hidden constraints.
  - How: (1) Setting/publication. (2) Mission and house style cues. (3) Stakeholders. (4) Constraints/prior decisions.
  - Why it works: Explicit context raises reliability (Braun); generic pre-training ≠ your situation.
- **References (canvas cell)**: Share essential data, facts, figures; point to documents, reports, policies, past events; attach files or examples.
  - When to use: Academic/professional accuracy, brand consistency, evidence-based answers.
  - How: (1) List must-use sources. (2) Say *how* to use each (align / quote / emulate). (3) Note ignore-rules (White: “Ignore Z”).
  - Why it works / failure mode: External refs and prior decisions ground outputs (Schulhoff; Sasson Lazovsky); failure mode is attachments with no usage instruction.
- **Information space** (Braun): Not defined / Explicit internal / Explicit external context.
  - When to use: Choosing whether to paste knowledge vs point outward.
  - How: Prefer explicit internal/external over “not defined” whenever accuracy matters.

## Key Concepts
- **Situational context**: Background that reduces ambiguity.
- **External references / historical data**: Guidance material recommended in survey literature (Schulhoff).
- **Critical dependencies**: Prior decisions/docs that outputs must respect (Sasson Lazovsky).
- **Context pattern** (White): “When I say X, I mean…”, “Consider Y”, “Ignore Z.”

## Mental Models
- Use **Context** when answers feel generic; use **References** when answers feel ungrounded.
- Think “**best what you tell the AI**” even if the model has broad pre-training.
- Prefer **attach + instruct how to use** (e.g. align with survey feedback) over dumping files without a job.

## Anti-patterns
- **Context dumping without a task**: Walls of background with no intent.
- **References without instructions**: Attachments the model is never told to use.
- **Assuming world knowledge replaces private facts**: Skipping policies, numbers, or house style.

## Worked Example
**Art Horizon prompt grounding**:

**Context fill**: You are writing for *Art Horizon*, a cutting-edge online art magazine dedicated to exploring emerging trends, groundbreaking movements, and cultural phenomena in the global art world; known for vibrant design and engaging storytelling.

**References fill**: Incorporate the attached survey feedback into content creation to align with audience preferences; additionally use the provided example article as a reference; optionally require quotes/sources from the source document.

**Before/after**: Same Task (“summarize the doc”) without these cells → generic synopsis. With Context+References → magazine-situated piece that mirrors house examples and stated reader prefs.

## Key Takeaways
1. Context reduces ambiguity; references add factual and stylistic anchors.
2. Explicit internal/external context beats undefined information space.
3. Link prompts to prior decisions and documents when continuity matters.
4. White’s Consider/Ignore/Define-X patterns belong in this category.
5. Professional settings almost always need this pair filled.

## Connects To
- **Ch 4**: Steps that operate on the provided context.
- **Ch 6**: Format/tone that must match referenced brand examples.
- **Ch 8**: Custom GPTs / APIs as ways to institutionalize references.
