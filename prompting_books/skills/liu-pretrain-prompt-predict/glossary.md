# Glossary

**Answer (*z*)** — Token, span, or sentence filling [Z]; may map to output *y*. (Ch 2, 5)

**Answer Engineering** — Design of answer space *Z* and map *Z→Y*. (Ch 5)

**Answer Mapping** — Convert highest-scoring *z* to task output *y* (identity or verbalizer). (Ch 2)

**Answer Paraphrasing** — Expand answers via paraphrase (e.g., back-translation); marginalize probabilities. (Ch 5)

**Answered Prompt** — Prompt whose [Z] is filled with a true answer. (Ch 2)

**Attention Masking** — Controls left-to-right vs bidirectional vs mixed conditioning. (Ch 3)

**Cloze Prompt** — Template with [Z] in the middle of the text. (Ch 2, 4)

**Continuous / Soft Prompt** — Prompt parameters in embedding space, not necessarily natural-language tokens. (Ch 4)

**Corrupted Text Reconstruction (CTR)** — Denoising loss only on noised positions. (Ch 3)

**Discrete / Hard Prompt** — Natural-language token string template. (Ch 4)

**Encoder–Decoder LM** — Seq2seq PLM (T5, BART, MASS) for NLU+NLG. (Ch 3)

**Filled Prompt** — Prompt with [Z] filled by any candidate *z*. (Ch 2)

**Fixed-LM Prompt Tuning** — Freeze LM; tune prompt parameters (Prefix-Tuning, Prompt-Tuning). (Ch 7)

**Fixed-prompt LM Tuning** — Tune LM; keep discrete template fixed (PET, LM-BFF). (Ch 7)

**Full Text Reconstruction (FTR)** — Denoising loss over entire reconstructed text. (Ch 3)

**In-context Learning** — Tuning-free prompting + prompt augmentation with demonstrations. (Ch 6, 7)

**Label Decomposition** — Split structured labels into constituent answer tokens (RE). (Ch 5)

**Left-to-Right (L2R) LM** — Autoregressive causal LM (GPT family); prefers prefix prompts. (Ch 3)

**Masked Language Model (MLM)** — Bidirectional CTR with masks (BERT); prefers cloze. (Ch 3)

**Null Prompt** — Minimal template “[X][Z]” without extra template words. (Ch 7)

**Prefix Prompt** — Input entirely precedes [Z]; continuation-style. (Ch 2, 4)

**Prefix Tuning** — Learnable continuous prefixes; frozen LM (often layerwise). (Ch 4, 7)

**Prompt (*x′*)** — Templated text after inserting *x* into [X], with open [Z]. (Ch 2)

**Prompt Addition** — *x′ = f_prompt(x)* via template application. (Ch 2)

**Prompt Augmentation (PA)** — Prepend answered prompts (demonstrations). (Ch 6)

**Prompt Composition (PC)** — Build full prompt from sub-prompts/rules (PTR). (Ch 6)

**Prompt Decomposition (PD)** — Split into per-span/subtask prompts (TemplateNER). (Ch 6)

**Prompt Engineering** — Choosing/learning *f_prompt* / templates. (Ch 4)

**Prompt Ensembling (PE)** — Combine predictions from multiple unanswered prompts. (Ch 6)

**Prompt Mining (MINE)** — Mine middle words/dependency paths as templates. (Ch 4)

**Prompt Sharing** — Partial/shared prompts across tasks, domains, or languages. (Ch 10)

**Prompt+LM Tuning (LMPT)** — Update both prompt params and LM params. (Ch 7)

**Promptless Fine-tuning** — Classic FT without prompts. (Ch 7)

**P-Tuning** — Hybrid hard/soft templates with trainable embeddings (often BiLSTM). (Ch 4)

**PTR (Prompt Tuning with Rules)** — Compose sub-templates via logic rules + virtual tokens. (Ch 4, 6)

**Pre-train, Prompt, and Predict** — Paradigm: reformulate tasks as LM fills via prompts. (Ch 1)

**Standard Language Model (SLM)** — Autoregressive *P(x)* objective. (Ch 3)

**Template** — String with [X] input slots and [Z] answer slots. (Ch 2)

**True vs Tuned Few-shot** — Tiny train-only vs allowing larger val for prompt selection (Perez et al.). (Ch 10)

**Tuning-free Prompting (TFP)** — No parameter updates; prompt-only inference. (Ch 7)

**Verbalizer** — Map from class label *y* to answer token(s) *z*. (Ch 5)

**Zero-shot Prompting** — No task training examples for the downstream model (prompt selection caveats apply). (Ch 7)
