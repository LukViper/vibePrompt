# Chapter 4: Prompt Engineering

## Core Idea
The prompt *is* the task program. Design **shape** (cloze/prefix), then choose **manual** vs **automated** templates, and **discrete (hard)** vs **continuous (soft)** prompts—static for all inputs or dynamic per input.

## Frameworks Introduced
- **Prompt Shape**: Cloze vs Prefix—align with MLM vs L2R/Enc–Dec.
  - When to use: First fork before any wording search.
  - How: Classification/probing → cloze; continuation/gen → prefix; Enc–Dec can host either as text-to-text.
- **Manual Template Engineering**: Human-written templates (LAMA cloze; GPT-3 prefixes; PET).
  - When to use: Interpretability, rapid baselines, strong domain intuition.
  - How: Draft 3–10 templates; score on a small labeled/dev slice; keep readable anchors.
  - Failure: Experienced designers still miss optima (Jiang et al.); artisanal thrashing without search.
- **Automated Discrete Prompt Search**
  - **D1 Prompt Mining (MINE)**: scrape corpus for middle words / dependency paths between *x* and *y* → `[X] middle [Z]`.
  - **D2 Prompt Paraphrasing**: round-trip MT, thesaurus, or neural rewriter (optionally after inserting *x*).
  - **D3 Gradient-based Search**: AdvTrigger / AutoPrompt iterative token search on training signals.
  - **D4 Prompt Generation**: T5 fills template spans; DRFs for domain-adaptive prefixes.
  - **D5 Prompt Scoring**: rank candidate filled prompts by unidirectional LM probability (per-input templates).
  - When to use: Manual plateau; still need textual prompts.
  - How: Start from seed templates or empty slots → search → validate; prefer D1/D2 for interpretability, D3/D4 for accuracy.
- **Continuous (Soft) Prompts** — drop “must be English words” and “must use LM embeddings only”.
  - **C1 Prefix Tuning / Prompt-Tuning**: learn continuous prefixes; freeze LM (layerwise *M* vs embedding-only tokens). Sample-dependent prefixes possible (vision→text Frozen).
  - **C2 Discrete→Continuous init**: seed soft tokens from AutoPrompt/manual, then tune (often stabler few-shot).
  - **C3 Hard–Soft Hybrid**: **P-Tuning** (BiLSTM over virtual tokens + fixed anchor words); **PTR** (logic rules compose sub-templates + tunable virtual tokens).
  - When to use: Parameter-efficient multi-task; accuracy over editability.
  - How: Freeze LM → optimize prompt params on task loss → optional discrete warm-start.
  - Failure: Init-sensitive in low data; soft prompts rarely human-manipulable or transferable as text.

## Key Concepts
- **Static vs Dynamic *f_prompt***: shared template vs input-specific template.
- **Hard vs Soft**: natural language vs embedding-space vectors.
- **Anchor tokens**: fixed lexical task cues (e.g., “capital”) inside soft templates.
- **Domain-relevant features (DRFs)**: generated keywords concatenated as prompt context.

## Mental Models
- Use **manual** for human-readable control and fast iteration.
- Use **discrete auto-search** when you need better text prompts without leaving token space.
- Use **soft prompts** when serving many tasks from one frozen LM.
- Use **hybrid/PTR** when the task has compositional structure (entity type ∧ relation).
- Prefer **discrete init → soft tune** when pure soft search is unstable.

## Anti-patterns
- **Artisanal prompt thrashing** without validation or search.
- **Assuming soft prompts transfer** across model sizes/families.
- **Ignoring init** for continuous prefixes in few-shot.
- **One static template for every domain** when dynamic/DRF prompts are warranted.

## Worked Example
**Relation `China / isCapital`**
1. Manual/discrete: `China’s capital is [MASK].` / `[MASK] is the capital of China.`
2. Mine/paraphrase alternatives; keep top-K by train accuracy (ensemble-ready).
3. Soft: replace template tokens with continuous vectors (Prompt-Tuning) or layerwise prefixes (Prefix-Tuning).
4. Hybrid PTR: sub-prompt entity typing + relation rule composition; insert tunable virtual tokens; optionally tune LM too.

**Few-shot tip:** If soft training is noisy, initialize virtual tokens from the best discrete string embeddings, then fine-tune.

## Key Takeaways
1. Shape first: cloze vs prefix.
2. Manual is strong but incomplete; automation exists for discrete and continuous spaces.
3. Soft prompts trade interpretability for optimizability and storage efficiency.
4. Discrete init often stabilizes continuous search.
5. Static vs dynamic is orthogonal to hard vs soft.
6. PTR/P-Tuning show structure + soft slots beat flat templates on compositional IE.
7. Prompt engineering quality dominates zero/few-shot accuracy.

## Connects To
- **Ch 5**: Answer side of the interface (often entangled).
- **Ch 6**: Ensembling multiple templates.
- **Ch 7**: Fixed-LM prompt tuning vs joint tuning.
