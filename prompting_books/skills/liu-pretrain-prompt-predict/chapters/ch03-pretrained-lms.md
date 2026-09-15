# Chapter 3: Pre-trained Language Models

## Core Idea
PLM choice for prompting is governed by **training objective**, **noising**, **directionality**, and architecture—not just size. Match model family to prompt shape and task (NLU vs NLG).

## Frameworks Introduced
- **PLM Axes for Prompting**: main objective, text noising, auxiliary objectives, attention mask, architecture, preferred apps.
  - When to use: Selecting a backbone before prompt design.
  - How: Score candidates on each axis against cloze/prefix and gen/class needs; consult Tab.13-style comparisons.
- **Objective Flavors**
  - **Standard Language Model (SLM)**: autoregressive *P(x)*.
  - **Corrupted Text Reconstruction (CTR)**: loss only on noised parts.
  - **Full Text Reconstruction (FTR)**: loss over entire reconstructed text.
  - When to use: SLM/FTR for generation-heavy prompts; CTR for local slot fills; any objective can support classification-via-prompt.
  - How: Prefer objectives whose training-time prediction sites match your [Z] placement.
- **Four Typical Pre-training Methods** (Fig. 3 / Tab. 5)
  - **Left-to-Right LM** (GPT-family): diagonal mask, SLM → prefix prompts / NLG; often too large to FT → prompting is the practical API.
  - **Masked LM** (BERT/RoBERTa): full attention + mask noise + CTR → cloze / NLU.
  - **Prefix LM** (UniLM-style): encode with full attention, decode L2R → mixed NLU/NLG.
  - **Encoder–Decoder** (T5/BART/MASS): encode *x*, decode *y* with FTR/CTR → unified text-to-text.

## Key Concepts
- **Noising ops**: Mask, Replace, Delete, Permute, Rotate, Concatenation (cross-lingual)—noise type injects priors (e.g., entity masking).
- **Left-to-Right vs Bidirectional** representations (via attention masking).
- **Attention masks**: Full, Diagonal, Mixture (Fig. 2).
- **Auxiliary objectives**: extra pretrain losses targeting downstream skills (Appendix A.2).

## Mental Models
- Use **L2R / prefix** when the task is continuation or open generation.
- Use **MLM / cloze** when the task is slot-filling classification or fact probing.
- Use **Enc–Dec** when you want one seq2seq interface for many tasks (T5-style).
- Prefer **CTR** for local reconstruction; **FTR** when full-sequence generation quality matters.
- If the LM is closed/huge, assume **prompting > full FT** as the default interface.

## Anti-patterns
- **Forcing cloze on pure causal LMs** without reformulation or masking tricks.
- **Ignoring noise type**: Entity-focused masking helps entity-heavy tasks; random mask may not.
- **Fine-tuning giants by default**: Prompting exists partly because full FT is infeasible.
- **Picking by leaderboard size alone** without checking directionality vs prompt shape.

## Worked Example
Task: recover/predict in “Jane will ___ to New York.”
- **MLM (CTR)**: train recovers `[MASK]` → natural cloze prompting for classification/IE fills.
- **L2R**: better as prefix continuation / “TL;DR:” generation than mid-string mask fill.
- **Enc–Dec**: encode source document/question; decode answer under an instruction-like prefix.

**Selection mini-matrix**
| Need | Prefer |
|---|---|
| Fact probe cloze | MLM |
| Few-shot story/summarize | L2R or Enc–Dec + prefix |
| Unified QA formats | Enc–Dec |
| Multi-task frozen server | Large L2R/T5 + soft prompts |

## Key Takeaways
1. Match objective + directionality to prompt shape.
2. SLM ≈ prefix/NLG; MLM/CTR ≈ cloze/NLU; Enc–Dec spans both.
3. Noising is a prior: design noise to emphasize what you need to predict.
4. Attention mask pattern is the implementation of directionality.
5. Appendix Tab.13 is the systematic PLM comparison sheet.
6. Prompting popularity on L2R giants is partly an economics story (too costly to FT).

## Connects To
- **Ch 2**: Cloze vs prefix formalization.
- **Ch 4**: Continuous prompts still sit in a chosen LM embedding space.
- **Ch 7 / Ch 10**: Tuning strategy and PLM selection challenges.
