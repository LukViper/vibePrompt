# Chapter 2: A Formal Description of Prompting

## Core Idea
Prompting turns supervised *P(y|x)* into LM-based prediction: wrap *x* in a template with slots, score candidate answers *z* with the LM, then map *z* → *y*. This is the survey’s shared notation for every later method.

## Frameworks Introduced
- **Three-Step Prompting Pipeline**
  1. **Prompt Addition**: *x′ = f_prompt(x)* via a *template* with input slot **[X]** and answer slot **[Z]**; fill [X] with *x*.
  2. **Answer Search**: *ẑ = search_{z∈Z} P(f_fill(x′; z))* (argmax or sampling).
  3. **Answer Mapping**: *ẑ → ŷ* (identity for generation; many-to-one verbalizer for classification).
  - When to use: Designing, debugging, or comparing any prompt system.
  - How: (a) write template string(s); (b) choose cloze vs prefix; (c) define permissible *Z*; (d) pick search; (e) define *z→y* map; (f) validate on a tiny held-out slice.
  - Why it works / failure: Reuses LM *P(text)* so labels aren’t required to learn *P(y|x)* from scratch; fails when template/*Z* misspecify the task or when [Z] shape mismatches the LM.
- **Cloze Prompt vs Prefix Prompt**
  - Cloze: [Z] mid-string (MLM-friendly).
  - Prefix: entire *x* before [Z] (autoregressive/generation-friendly).
  - When to use: Choose by PLM family and whether the “answer” is a slot fill vs continuation.
  - How: Place [Z] where the pretraining objective expects prediction; allow multiple [X]/[Z] if the task needs them (NLI pairs, multi-span).
- **Filled Prompt vs Answered Prompt**: Any *z* fill vs a *true* answer fill (needed later for prompt augmentation).
- **Five Design Considerations** (survey roadmap): PLM choice → prompt eng. → answer eng. → multi-prompt expansion → prompt-aware training.

## Key Concepts
- **Input *x* / Output *y* / Answer *z***: Raw text; task label or text; LM-facing fill unit.
- **Prompting function *f_prompt***: Maps *x* → prompt *x′*.
- **Template**: Textual string with [X]/[Z]; may use virtual/non-natural tokens later (§4.3.2).
- **Verbalizer / mapping**: e.g. {excellent, fabulous, wonderful} → class “++”.
- **Permissible set *Z***: Full language, fixed-length spans, or tiny label-word set.

## Mental Models
- Use **Task→LM** when you lack large *y*-labeled sets but have a strong *P(x)* model.
- Think of **[Z] as the prediction interface** and the template as the task program.
- Use **constrained *Z*** for classification; unconstrained *Z* for open generation.
- Use **answered prompts** as “labeled context atoms” when moving to in-context learning.

## Anti-patterns
- **Forgetting mapping**: Treating top token as class when labels ≠ words.
- **Shape mismatch**: Cloze-only recipes on pure L2R LMs (or prefix-only on pure MLMs) without adaptation.
- **Calling it zero-shot after using labels to pick prompts**: Perez et al.—prompt selection often consumes labels.
- **One [Z] for multi-decision tagging**: Forces impossible joint fills; prefer decomposition later.

## Worked Example
**Sentiment (Table 2/3 style)**  
*x* = “I love this movie.”  
Template: `[X] Overall, it was a [Z] movie.`  
*x′* = “I love this movie. Overall, it was a [Z] movie.”  
*Z* = {excellent, good, OK, bad, horrible} ↔ *Y* = {++, +, ~, -, --}.  
For each *z*, form filled prompt, score with LM, take argmax, map to *y*.

**Other Table 3 sketches (compact)**  
- Topics: `[X] The text is about [Z].`  
- NLI: `[X1]? [Z], [X2]` with *Z*∈{Yes, No, Maybe}.  
- NER span: `[X1][X2] is a [Z] entity.`  
- MT: `Finnish: [X] English: [Z]` (identity map).  
- Summarization: `[X] TL;DR: [Z]`.

## Key Takeaways
1. Prompting = template + LM fill + optional answer→label map.
2. Distinguish cloze vs prefix by [Z] placement.
3. *Z* can be full language or a tiny label-word set.
4. Five design considerations structure the rest of the survey.
5. Table 2 notation is the shared vocabulary for later methods.
6. Filled ≠ answered—augmentation depends on the distinction.
7. Slot counts are flexible; tasks can use multiple [X]/[Z].

## Connects To
- **Ch 3**: Which PLM fits cloze vs prefix.
- **Ch 4–5**: Engineering *f_prompt* and *Z*.
- **Ch 6–7**: Expanding beyond the basic three steps.
