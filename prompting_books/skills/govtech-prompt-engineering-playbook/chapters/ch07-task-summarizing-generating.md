# Chapter 7: Task-Summarizing & Task-Generating

## Core Idea
**Summarizing** compresses source text (shortener, key points, merge notes); **Generating** creates new drafts (speeches, marketing, appraisals, quizzes) — highest hallucination risk, best as a first draft under a clear frame.

## Frameworks Introduced
- **Task – Summarizing**: Condense longer text into shorter form preserving main ideas.
  - When to use: Long articles, stories, multi-author notes.
  - How / subtypes:
    - **Shortener**: N paragraphs → one tight paragraph.
    - **Key Points**: Story/article → one-liner or bullet essentials (model may overshoot length).
    - **Merging Summary**: Combine Alan’s and Bernice’s meeting notes into one reconciled summary.
- **Task-Generating**: Produce new coherent text from prompt/context.
  - When to use: Overcome blank page; brainstorm variants; structured drafts from bullet frames.
  - How / subtypes: **Speech writing**, **Marketing** (multi-channel), **Commendation / Testimonial**, **Test Questions**.
  - Why it works / failure: Autocomplete shines with seed phrases + structure; fails when treated as verified fact or perfect instruction-follower.

## Key Concepts
- **Shortener vs key points**: Prose condensation vs atomic takeaways.
- **Merging summary**: Multi-source reconciliation.
- **Framed generation**: Key points / variables (Start Term, End Term) shape outputs better than bare openers.
- **Creativity High for variants**: Re-run for alternate speeches/taglines.
- **Variable injection**: Declare fields and where they must appear (start/end sentences).
- **Quiz generation from corpus**: Company blurb or Newton laws → MCQs; always teacher-verify.
- **Prior context dependency**: Many generate prompts assume the source text is already in the thread.

## Mental Models
- Use **summarizing** when Y = source-faithful compression; use **generating** when Y = new wording/ideas.
- Prefer **Low/Balanced** for merge summaries and factual digests; **High** for marketing taglines and creative speeches.
- Prefer **structure + bullets** when Y = speeches or appraisals that must hit mandated points.
- Prefer **iterate with rewriting** when Y = marketing draft needs brand voice.
- Never use **raw quiz/appraisal output** when Y = high-stakes assessment without human review.

## Anti-patterns
- **Summarizing without “do not invent”**: Especially when merging or ministry follow-ups.
- **Blank-page generate with no frame**: Generic fluff.
- **Assuming exact compliance**: Variable/end-sentence instructions may be partially ignored — quirk of LLMs.
- **Unverified test questions**: Wrong physics/company facts enter classrooms/HR events.
- **Confusing generation with knowledge**: Hallucination is most obvious here.

## Worked Example
**Summarizing – Three Little Pigs**: Four paragraphs → one paragraph retaining straw/sticks vs brick + wolf outcome; or compress to a single key-point line.

**Merging**: Alan + Bernice notes → one combined meeting summary capturing shared and unique points.

**Generating – framed speech**: Graduation ceremony bullets → draft speech; follow up to expand sections.

**Generating – appraisal with variables**: ~76-word prompt with role highlights → ~181-word polished appraisal; teacher testimonial uses Start/End Term variables (model may miss the exact closing line — edit manually).

**Generating – pop quiz**: Paste fictional XYZ Synapse company profile (already in context) → ask for Q&A with 4 options; same pattern for Newtonian laws practice set — verify every answer.

## Key Takeaways
1. Summarize to shorten, extract key points, or merge sources.
2. Generate with seed + structure; High creativity for alternatives.
3. Variables and mandated open/close lines improve control but aren’t guarantees.
4. Generation is draft fuel — fact-check quizzes, bios, and claims.
5. Chain prior context: paste corpus first, then the generate instruction.

## Connects To
- **Ch 3**: Hallucination peak in generate tasks.
- **Ch 5**: Rewrite marketing drafts after generate.
- **Ch 6**: Cluster then summarize groups (Tutorial 5 Q2 pattern).
- **Ch 9 Tutorials 5–6**: Summary and generate drills.
