# Chapter 6: Output/Format and Tonality

## Core Idea
**Output** (length, structure, medium) and **Tonality** (attributes, brand/style inspiration) make the response fit the delivery channel — content quality without presentation fit still fails the user.

## Frameworks Introduced
- **Output / Format (canvas cell)**: Tell the model how long the response should be; choose structure and format (table, text, markdown, code); require quotes or sources when needed.
  - When to use: Any deliverable with shape constraints (briefs, tables, code, markdown docs).
  - How: (1) Length limit. (2) Section skeleton. (3) Medium (Markdown/table/code). (4) Optional quote/source rule. (5) “Preserve my template” when a layout already exists (White Output pattern).
  - Why it works: Explicit output specification aligns with user/domain needs (Sahoo; Braun).
- **Tonality (canvas cell)**: Choose attributes to communicate (luxury, quality, authenticity, sophistication…); optionally specify a brand/author/magazine style to emulate.
  - When to use: Brand writing, customer comms, audience-sensitive prose.
  - How: (1) Pick 2–3 attributes. (2) Optional style inspiration. (3) Require reflection of attributes throughout—not a single decorative sentence.
  - Why it works / failure mode: Brand-aligned tonality keeps communications consistent; failure mode is conflicting attributes (“playful + austere luxury”) without priority.
- **Output specification & refinement** (Sahoo; Braun): Align outputs to technical/domain needs via explicit format control.
  - When to use: Downstream parsing, templates, multi-channel publishing.
  - How: Prefer machine-checkable formats when systems consume the result; iterate Format/Tonality separately from Task.

## Key Concepts
- **Output pattern** (White): “Preserve the formatting and overall template I provide.”
- **Termination condition** (White): Stop asking / stop iterating when a goal or condition is met — pairs with iterative output refinement.
- **Brand-aligned tonality**: Consistency across organizational communications.
- **Style prompting**: Directing tone/register as a first-class prompt dimension (Braun).

## Mental Models
- Use **Format** when structure fails; use **Tonality** when vibe/brand fails.
- Prefer **template preservation** when the user already has a house layout.
- Think **attributes before adjectives**: “authenticity + sophistication” guides better than “nice writing.”

## Anti-patterns
- **Format-only prompts**: Perfect Markdown with wrong voice for the audience.
- **Tone-only prompts**: Lovely voice that ignores length/section requirements.
- **Unstated channel assumptions**: Expecting a slide outline but asking for “a write-up.”

## Worked Example
**Art Horizon output cell**:

**Output fill**: “The text should be no more than 200 words and divided into three main sections: Introduction, Core Content and Conclusions. Write the text in Markdown format.” Optionally require quotes/sources.

**Tonality fill**: Write in the style of the chosen magazine/brand, capturing distinctive tone and approach; adapt tone, structure, and language accordingly; write with authenticity and sophistication and reflect those attributes throughout.

**Acceptance check**: If draft >200 words or missing section headings → iterate Output only. If length OK but voice wrong → iterate Tonality/Audience, not Task.

## Key Takeaways
1. Specify length, structure, and medium explicitly.
2. Tonality covers attributes and optional style inspirations.
3. Format control is essential for domain/technical needs.
4. White’s Output and Termination patterns support refinement loops.
5. Format + Tonality is the last primary category in the canvas flow.

## Connects To
- **Ch 3**: Audience expectations drive tone.
- **Ch 5**: Example articles as tone/format references.
- **Ch 7**: Iterative Optimization to refine format/tone after first drafts.
