# Chapter 4: Prompt Engineering Tips (CO-STAR & Iterate)

## Core Idea
**CO-STAR** (Context, Objective, Style, Tone, Audience, Response) is the playbook’s primary checklist for sharper prompts; mix-and-match components, and iterate in chat memory until the output fits.

## Frameworks Introduced
- **CO-STAR**
  - **C – Context**: Background that scopes the topic/situation. Prefer Context above Objective.
  - **O – Objective**: Explicit goal — question, rewrite, explain, generate, etc. Avoid ambiguous 2-word asks (“haiku poem” → generate vs explain?).
  - **S – Style**: Persona or writing style (career coach, CEO, teacher, marketing consultant…). Warning: expert role ≠ reliable financial/medical advice.
  - **T – Tone**: Formal, Casual, Humorous, Empathetic, Authoritative, Inspirational.
  - **A – Audience**: Who reads it (CEO vs 6-year-old) — vocabulary and examples shift.
  - **R – Response**: Length and format (short vs deep; paragraph vs numbered list vs table vs report).
  - When to use: New to prompting, or outputs feel generic.
  - How: Fill only the letters that matter; you need not use all six every time.
- **Mix and Match Your CO-STAR**: Select subsets per objective; “AI is the co-star — you remain the star.”
- **Iterate Till Perfection**: Start short, refine with follow-ups; conversation memory persists (within token limits), so don’t restate everything.

## Key Concepts
- **Context-first ordering**: Context then Objective often yields sharper results.
- **Style / persona prompting**: Mimic a famous voice or professional role.
- **Tone control**: Especially useful for speeches and public-facing drafts.
- **Audience adaptation**: Same concept, different reading level/jargon.
- **Response format steering**: “tabular form,” ranked lists, report structure.
- **Iterative brainstorming**: Model replies nudge clearer requirements.

## Mental Models
- Use **full CO-STAR** when Y = first-shot quality matters (public comms, speeches).
- Use **C+O+R only** when Y = quick factual or transform tasks.
- Use **S+T+A** when Y = voice and reader fit matter more than content discovery.
- Prefer **iterate** when Y = exploring options (trip plans, drafts) without writing a novel prompt upfront.
- Think of chat history as **working memory** — follow up (“alternative to Mt Fuji”) instead of restarting.

## Anti-patterns
- **Vague objectives**: “haiku poem” without saying explain vs write.
- **No context**: Thank-you notes or advice become generic.
- **Blind trust in expert personas**: Medical/financial “coach” replies can harm.
- **Leaving format to chance**: Then manually restructure walls of text.
- **Repeating the whole prompt** each turn when memory already holds it (wastes tokens).

## Worked Example
**Thank-you note**  
Without context → generic gratitude.  
With Context (“colleague covered my on-call during leave”) above Objective (“draft a short thank-you”) → specific, useful note.

**Audience**  
“Explain leadership to a CEO” → professional strategy language.  
“Explain leadership to a 6-year-old” → teacher/coach analogies.

**Response format**  
Ask for sci-fi history → long paragraph embedding titles.  
Follow up: rank by publication year **in a table** → structured, less controversial than “by popularity.”

**Iterate**  
Plan a Japan itinerary → then “replace Mt Fuji, I’ve already been” → refined plan without rewriting the whole brief.

## Key Takeaways
1. CO-STAR = Context, Objective, Style, Tone, Audience, Response.
2. Mix and match; C and O are the usual foundation.
3. Specify length/format (lists, tables, reports) deliberately.
4. Iteration + memory often beats one giant prompt.
5. You stay accountable; the model is the co-star.

## Connects To
- **Ch 3**: Temperature and few-shot complement CO-STAR’s R (format).
- **Ch 5–7**: Task prompts are specialized Objectives with strong R schemas.
- **Ch 8**: Roleplay Mode extends Style into multi-turn dialogue.
- **Ch 9**: Tutorials practice rewrite/extract/… with Creativity settings.
