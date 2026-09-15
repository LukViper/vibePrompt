# Chapter 5: Task-Rewriting & Task-Extracting

## Core Idea
LLMs are a Swiss-army knife — not only generators. **Task-Rewriting** reshapes existing text; **Task-Extracting** pulls structured fields or key points from messy prose. Mix tasks freely.

## Frameworks Introduced
- **Task-Specific Prompts (six families)**: Rewriting, Extracting, Classifying, Clustering, Summarising, Generating — categories, not hard walls.
- **Task-Rewriting**: New wording, same meaning — paraphrase, style/tone shift, translate, simplify, correct, enhance notes into full prose.
  - When to use: Clarity, grammar, audience level, multilingual drafts, email expansion from bullets.
  - How: Paste source + say the transform (simplify / correct / translate to X / expand into professional emails).
  - Subtypes: **Simplification**, **Correction**, **Translation**, **Enhancement**.
- **Task-Extracting**: Identify and pull specific details from larger text.
  - When to use: Ingredients, entities, key points, fixed schemas from reports.
  - How: Name fields/format explicitly; Creativity can change what “key” means — constrain when it matters.

## Key Concepts
- **Paraphrase / style shift**: Same meaning, different expression.
- **Simplification**: Hard prose (e.g. Shakespearean) → plain language.
- **Correction**: Grammar and sentence improvement.
- **Translation**: Cross-language rewrite; verify with native speakers when stakes are high.
- **Enhancement**: Bullets → polished emails/docs.
- **Entity extraction**: Names, amounts, ingredients, schema fields.
- **Key-point extraction**: Model chooses salient sentences unless you specify criteria.

## Mental Models
- Use **rewriting** when Y = you already have content that must change form, not invent facts.
- Use **extracting** when Y = structure or zoom-in beats reading the whole blob.
- Prefer **explicit field lists** when Y = extraction must be consistent across documents.
- Prefer **Low/Balanced creativity** when Y = correction, translation checks, or stable schemas.
- Mix **extract → rewrite → generate** when Y = pipeline (pull facts, polish, draft).

## Anti-patterns
- **Shipping translations without native review**: One wrong word can invert meaning (Singapore Pledge demo: decent but not authority).
- **Vague “extract key points” for compliance**: Model’s salience ≠ your salience.
- **High creativity on corrections**: Unnecessary paraphrase when you only wanted typos fixed.
- **Treating enhancement as factual ground truth**: Expanded emails may invent soft commitments — edit before send.

## Worked Example
**Rewriting – Enhancement**: Meeting bullets for Bernard/Claire/Denise → prompt to expand into professional task emails → parallelized follow-ups in polished English.

**Extracting – Recipe**: Disorganized recipe text → “list all ingredients as bullets” → clean inventory.

**Extracting – Controlled schema**: Long passage → instruct exact fields to pull (not open-ended “important bits”) → reproducible rows for analysis.

## Key Takeaways
1. Six task families; combine them.
2. Rewriting covers simplify, correct, translate, enhance.
3. Always verify high-stakes translation.
4. Extraction quality jumps when you name fields and format.
5. Creativity influences which “key points” appear — constrain for ops work.

## Connects To
- **Ch 4**: Objective + Response format drive these tasks.
- **Ch 6**: Clustering/Classifying label or group after extraction.
- **Ch 7**: Summarizing vs extracting key points; generating after rewrite.
- **Ch 9 Tutorials 1–2**: Hands-on rewrite and extract drills.
