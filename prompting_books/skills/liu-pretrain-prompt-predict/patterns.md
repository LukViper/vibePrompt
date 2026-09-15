# Patterns

## Three-Step Prompting Pipeline
**When to use**: Any prompt-based system design or debug.
**How**: (1) Apply template with [X]/[Z] → *x′*. (2) Search *z∈Z* by LM score of filled prompt. (3) Map *ẑ→ŷ*.
**Trade-offs**: Simple and general; hides eng. difficulty of template/*Z*/calibration.

## Cloze for Classification / Probing
**When to use**: NLU with MLM/Enc–Dec; fact or linguistic probing.
**How**: “[X] The sentiment is [Z].” Score token verbalizers; optional PE.
**Trade-offs**: Natural for MLMs; awkward for pure causal LMs without tricks.

## Prefix for Generation
**When to use**: Summarization, MT, data-to-text, free-form QA.
**How**: “Summarize: [X]\nTL;DR: [Z]” or language-tagged prefixes; L2R or Enc–Dec.
**Trade-offs**: Aligns with SLM pretraining; needs decode strategy and length control.

## Manual Template + Manual Verbalizer
**When to use**: Strong intuition, interpretability, quick baseline.
**How**: Handwrite templates and label words; validate on small set.
**Trade-offs**: Fast start; may miss optima; human cost scales with tasks.

## Discrete Auto Template Search
**When to use**: Manual prompts plateau; want text prompts.
**How**: Mine (MINE), paraphrase, gradient token search (AutoPrompt), T5 generation, or LM scoring.
**Trade-offs**: Can beat humans; brittle, compute-heavy, less interpretable.

## Continuous Prompt / Prefix Tuning
**When to use**: Frozen giant LM; many tasks; parameter-efficient adaptation.
**How**: Optimize continuous prefix/embeddings; freeze LM; optional discrete init.
**Trade-offs**: Strong few-shot/storage wins; not human-editable; init-sensitive.

## Hard–Soft Hybrid (P-Tuning / PTR)
**When to use**: Need anchors + learnable slots; compositional RE-like tasks.
**How**: Keep lexical anchors; insert virtual tokens; PTR composes sub-prompts with rules.
**Trade-offs**: Structure helps; more moving parts to tune.

## Verbalizer Search (Prune-then-Search)
**When to use**: Few-shot classification with large vocab.
**How**: Prune candidates by frequency/gen-prob/zero-shot acc; select by train/dev likelihood.
**Trade-offs**: Big accuracy lifts; needs some labels; risk of overfit to tiny sets.

## Answer Paraphrase Marginalization
**When to use**: One label word undercovers the class; QA/gen synonyms compete.
**How**: Build para(*z*); sum/marginalize LM probs; or expand gold sets.
**Trade-offs**: Reduces surface-form bias; paraphrase quality matters.

## Prompt Ensembling
**When to use**: High variance across templates.
**How**: Uniform/weighted avg, majority vote, or KD from multi-prompt teachers (PET).
**Trade-offs**: Robustness; inference cost; gen ensembles harder.

## Prompt Augmentation / In-context Learning
**When to use**: API-only or no-train few-shot.
**How**: Select & order *k* answered prompts; append test prompt; decode.
**Trade-offs**: No FT; context limits, order/recency bias, latency.

## Prompt Decomposition (Span Tasks)
**When to use**: NER/tagging with many local decisions.
**How**: Enumerate spans; per-span template “SPAN is a [Z] entity.”
**Trade-offs**: Tractable; span proposal cost; ignores some joint structure.

## Prompt Composition (Relational Tasks)
**When to use**: RE/coreference-style span relations.
**How**: Sub-prompts for entity types + relation; compose via rules (PTR).
**Trade-offs**: Injects structure; rule design required.

## Null Prompt + Answer/Partial FT
**When to use**: Want to shrink template artistry.
**How**: Use “[X][Z]”; rely on verbalizer and LM updates (Logan IV et al.).
**Trade-offs**: Simpler templates; still needs answer/LM engineering.

## Content-Free Calibration
**When to use**: ICL classification with demo-induced bias.
**How**: Estimate *P₀* on “N/A”-style input with same demos; adjust *P₁* on real input (Zhao et al.).
**Trade-offs**: Helps majority/recency/common-token bias; null-input choice is another hyperparam.

## Self-Diagnosis / Debias Prompt
**When to use**: Attribute control or safety filtering.
**How**: “The following text contains ATTR. [X][Z]” compare Yes/No; mix distributions when decoding.
**Trade-offs**: Lightweight control; imperfect and attribute-prompt sensitive.
