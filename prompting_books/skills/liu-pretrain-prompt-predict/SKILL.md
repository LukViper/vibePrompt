---
name: liu-pretrain-prompt-predict
description: "Knowledge base from \"Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing\" by Pengfei Liu, Weizhe Yuan, Jinlan Fu, Zhengbao Jiang, Hiroaki Hayashi, Graham Neubig. Use when applying prompt-based learning frameworks for prompt engineering, answer/verbalizer design, multi-prompt methods, tuning strategies (PET, Prefix-Tuning, in-context learning), or referencing prompting typology and challenges."
---

<!-- argument-hint: [topic, framework name, or chapter number] -->

# Pre-train, Prompt, and Predict
**Author**: Pengfei Liu, Weizhe Yuan, Jinlan Fu, Zhengbao Jiang, Hiroaki Hayashi, Graham Neubig | **Pages**: ~46 | **Chapters**: 12 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks below
- **With a topic** — e.g. `verbalizer`, `prefix tuning`, `calibration`; read the indexed chapter
- **With chapter** — ask for `ch04`; load that file
- **Browse** — ask “what chapters do you have?” for the index

When a topic is not covered in Core Frameworks, read the relevant chapter before answering.

---

## Core Frameworks & Mental Models

### Pre-train, Prompt, and Predict
Use this paradigm when you adapt tasks to LMs instead of LMs to tasks: wrap *x* in a textual **prompt**, let the LM fill **[Z]**, derive *y*. Prefer over head-based fine-tune when labels are scarce or one unsupervised LM must serve many tasks. Catch: you now engineer prompts (and answers).

**Four paradigms (Ch 1):** feature eng. → architecture eng. → objective eng. (pretrain/finetune) → **prompt eng.**

### Three-Step Prompting (Ch 2)
1. **Prompt addition**: template with **[X]** / **[Z]** → prompt *x′* (cloze if [Z] mid-string; **prefix** if [Z] at end).
2. **Answer search**: score *z∈Z* via LM on filled prompts (argmax or sample).
3. **Answer mapping**: *z→y* (identity for gen; **verbalizer** for class).

Use **constrained Z** for classification; unconstrained for open generation.

### Match PLM to Prompt Shape (Ch 3)
| Family | Objective/dir. | Prefer |
|---|---|---|
| L2R (GPT) | SLM, causal | Prefix / NLG / ICL |
| MLM (BERT) | CTR + bidirectional | Cloze / NLU / probing |
| Enc–Dec (T5/BART) | FTR/CTR seq2seq | Both; unified QA/gen |
| Prefix LM | Full encode + L2R decode | Mixed NLU/NLG |

**Rule:** Don’t fight the pretraining interface—align cloze↔MLM, prefix↔L2R.

### Prompt Engineering Toolkit (Ch 4)
- **Manual templates**: LAMA/GPT-3/PET-style; best for control & speed.
- **Discrete auto**: Mine middle words (MINE), paraphrase, gradient search (AutoPrompt), T5 span gen, LM scoring.
- **Continuous / soft**: Prefix-Tuning, Prompt-Tuning (freeze LM); init from discrete when few-shot unstable.
- **Hybrid**: P-Tuning (virtual tokens + anchors); **PTR** (logic rules over sub-templates).

Use soft prompts when interpretability < accuracy/storage; use discrete when you need editable text.

### Answer Engineering Toolkit (Ch 5)
Shape: **token / span / sentence**. Design: manual lists, **prune-then-search verbalizers**, paraphrase marginalization, label decomposition (RE), rare soft answers (WARP).

Prefer verbalizer search when class words are non-obvious; paraphrase when synonyms split probability mass.

### Multi-Prompt Methods (Ch 6)
| Method | Use when | How |
|---|---|---|
| **Prompt Ensembling** | Brittle single template | Avg/vote/KD across templates |
| **Prompt Augmentation** | Few-shot, no training | Prepend answered demos (ICL) |
| **Prompt Composition** | Relational/structured tasks | Sub-prompts + rules (PTR) |
| **Prompt Decomposition** | NER/span labeling | One prompt per span |

**Heuristic:** token/span prediction → decompose; span-relation → compose.

### Five Tuning Strategies (Ch 7, Table 6)
1. **Promptless fine-tuning** — tune LM, no prompt (classic BERT FT).
2. **Tuning-free prompting** — freeze all; prompt only (±PA = **in-context learning**).
3. **Fixed-LM prompt tuning** — freeze LM; tune soft prompt (Prefix-/Prompt-Tuning).
4. **Fixed-prompt LM tuning** — tune LM; fixed discrete template (PET, LM-BFF); try **null prompt** `[X][Z]`.
5. **Prompt+LM tuning** — tune both (P-Tuning, PTR)—max expressivity / full data.

**Defaults:** API giant → (2) or (3); 16-shot classify → (4); multi-task frozen backbone → (3); big data accuracy → (5) or (1).

### Application Routing (Ch 8)
- **Probing**: cloze + freeze LM; discrete/soft templates; ensembles.
- **Classify/NLI**: cloze + verbalizer; few-shot fixed-prompt LM tune.
- **IE**: don’t copy sentiment templates—entity marks, composition (RE), decomposition (NER).
- **Gen/QA**: prefix; unify formats as generation; don’t trust raw probs as confidence.
- **Meta**: self-diagnosis debias; DRF domain adapt; instruction dataset construction.

### Calibration & Protocol Pitfalls (Ch 10)
ICL biases: **majority label**, **recency**, **common token**. Mitigate with content-free baseline calibration (Zhao et al.) and answer paraphrases / prior calibration (Holtzman). Report **true few-shot** vs **tuned few-shot** (Perez)—val-driven prompt shopping isn’t zero-shot. Soft prompts ≈ easier label recovery; prompts empirically worth **~100s of labeled points** (Scao & Rush).

### Decision Rules (compressed)
- Prefer **Task→LM** when labels scarce; **LM→Task** when data abundant and stability matters.
- Engineer **template and verbalizer together**—they are entangled.
- Ensemble before endlessly hand-tuning one magic string.
- Calibrate before shipping demo-conditioned classifiers.
- For research novelty, avoid saturated TC/FP template tweaks; attack structured IE, sharing, gen ensembles, pretrain-for-prompt (Ch 10–11).

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-two-sea-changes.md) | Two Sea Changes in NLP | Four paradigms; Task↔LM flip; prompt eng. as catch |
| [ch02](chapters/ch02-formal-prompting.md) | Formal Description of Prompting | Three-step pipeline; cloze/prefix; [X]/[Z] notation |
| [ch03](chapters/ch03-pretrained-lms.md) | Pre-trained Language Models | SLM/CTR/FTR; L2R/MLM/Prefix/Enc–Dec |
| [ch04](chapters/ch04-prompt-engineering.md) | Prompt Engineering | Manual/discrete/continuous; Prefix-Tuning; P-Tuning; PTR |
| [ch05](chapters/ch05-answer-engineering.md) | Answer Engineering | Answer shapes; verbalizers; prune-then-search |
| [ch06](chapters/ch06-multi-prompt-learning.md) | Multi-Prompt Learning | PE, PA/ICL, composition, decomposition |
| [ch07](chapters/ch07-training-strategies.md) | Training Strategies | Five update strategies; zero/few/full |
| [ch08](chapters/ch08-applications.md) | Applications | Probing, CLS, IE, reasoning, QA, gen, multimodal |
| [ch09](chapters/ch09-prompt-relevant-topics.md) | Prompt-relevant Topics | Ensembles, few-shot, QA-form, controlled gen, aug. |
| [ch10](chapters/ch10-challenges.md) | Challenges | Design gaps; transfer; calibration; prompt sharing |
| [ch11](chapters/ch11-meta-analysis.md) | Meta Analysis | Timeline; TC/FP dominance; discrete→continuous |
| [ch12](chapters/ch12-conclusion.md) | Conclusion | Paradigm lens; research agenda |

## Topic Index

- **Answer engineering / verbalizer** → ch05, ch02
- **AutoPrompt / discrete search** → ch04
- **Calibration / ICL bias** → ch10, ch07
- **Cloze vs prefix** → ch02, ch03, ch04
- **Encoder–Decoder / T5 / BART** → ch03, ch08
- **Few-shot / PET / LM-BFF** → ch07, ch08
- **In-context learning / prompt augmentation** → ch06, ch07
- **LAMA / factual probing** → ch08, ch04
- **Multi-prompt / ensembling** → ch06
- **NER / TemplateNER / decomposition** → ch06, ch08
- **Null prompt** → ch07
- **P-Tuning / soft prompts** → ch04, ch07
- **Paradigms of NLP** → ch01, ch12
- **PLM selection / SLM CTR FTR** → ch03, ch10
- **Prefix-Tuning / Prompt-Tuning** → ch04, ch07
- **PTR / prompt composition / RE** → ch04, ch06, ch08
- **Prompt engineering** → ch04
- **Prompt sharing** → ch10
- **Relation extraction** → ch08, ch05
- **Self-diagnosis / debias** → ch08
- **Three-step prompting** → ch02
- **Transferability / true few-shot** → ch10
- **Tuning strategies (Table 6)** → ch07
- **WARP / continuous answers** → ch05, ch04

## Supporting Files

- [glossary.md](glossary.md) — key terms with definitions
- [patterns.md](patterns.md) — techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — decision rules and tables

---

## Scope & Limits

This skill covers the 2021 Liu et al. survey (arXiv:2107.13586v1) only—typology and methods through mid-2021. It does not include later instruction-tuning / chat / tool-use literature. For implementation in a codebase, combine with project-specific tools and current model docs. Source figures/tables were text-extracted; no images were dropped (`images_dropped: 0`).
