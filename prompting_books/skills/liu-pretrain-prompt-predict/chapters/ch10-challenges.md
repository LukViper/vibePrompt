# Chapter 10: Challenges

## Core Idea
Open problems cluster around **design** (prompts/answers for structured & many-class tasks), **systems choices** (tuning, multi-prompt, PLM pick), **science** (theory, transfer), **paradigm fusion**, and **calibration/biases** of LM probabilities under prompting.

## Frameworks Introduced
- **Prompt Design Challenges**
  - Beyond classify/generate: IE & analysis need reformulation or structured textual answers.
  - Structured inputs (trees/graphs/tables): entity marks and HTML prompts are early steps only.
  - **Entanglement**: best template × answer pair; sequential selection common, joint learning nascent (WARP).
  - When to use: Scoping research/product risk beyond TC/FP.
  - How: If outputs are structured, invent textual encodings or de-/compose prompts before declaring prompting “unfit.”
- **Answer Engineering Challenges**: combinatorial many-class *Z*; multi-token decode; multi-reference generation learning (most gen work uses one reference).
- **Tuning Strategy Selection**: Table 6 options lack FT-era systematic tradeoff studies (Peters-style analyses).
- **Multi-Prompt Challenges**
  - Ensemble cost/distillation; selecting ensemble-worthy prompts; gen ensembles rare (consider neural ensembling like Refactor).
  - **Rule of thumb**: token/span prediction → **decomposition**; span-relation → **composition**.
  - Augmentation: demo selection & order under length limits.
  - **Prompt Sharing** across tasks/domains/languages underexplored (Fig. 5 partial share).
- **PLM Selection**: conceptual §3.4 guidance exists; systematic prompt-benefit comparisons scarce.
- **Theory/Empirics**: soft prompts ease non-degeneracy assumptions for recovery (Wei et al.); classification-as-completion justifies LM pretrain (Saunshi); prompts ≈ **100s of datapoints** (Scao & Rush).
- **Transferability**: tuned-few-shot selected prompts transfer better across *similar-size* models than true-few-shot picks; size gaps hurt both (Perez et al.).
- **Paradigm Combination**: prompting rides FT-era PLMs—should pretraining be redesigned for prompting?
- **Calibration (Zhao et al.)**: majority-label, recency, common-token biases in ICL.
  - Mitigate via content-free baseline *P₀* vs real *P₁*; still imperfect; null-input choice is a hyperparam.
  - Surface-form competition: paraphrase gold sets or prior-calibrate (Holtzman et al.).

## Key Concepts
- **True few-shot vs tuned few-shot**: whether a large validation set chose prompts.
- **Content-free calibration prompt**: “N/A”/“None” style null inputs with same demos.
- **Probability mass competition** among synonymous answers (“Whirlpool bath” vs “Bathtub”).

## Mental Models
- Use **decompose vs compose rule** when structuring IE prompts.
- Assume **prompt+answer joint search** when either alone plateaus.
- Always **calibrate or paraphrase** when ranking with LM probs + demos.
- Prefer **matched model size** when transferring prompts.
- Treat “prompting worth 100s of labels” as a budgeting heuristic, not a guarantee.

## Anti-patterns
- **Uncalibrated in-context voting** after a streak of positive demos.
- **Single gold string** for generative answers with many surface forms.
- **Claiming zero-shot** after large-val prompt shopping.
- **Declaring IE out-of-scope** without trying markers / compose / decompose.

## Worked Example
**Sentiment ICL bias fix (ContxCalibrate-style)**  
1. Demos + content-free input (“N/A”) → *P₀*.  
2. Same demos + real input → *P₁*.  
3. Adjust using *P₀* to counter majority/recency/common-token bias before argmax.

**Research triage from challenges**  
High white-space: structured prompts, answer search at scale, prompt sharing, gen ensembles, pretrain-for-prompt, calib without brittle nulls.

## Key Takeaways
1. Hardest design gaps: structure, many classes, joint template–answer search.
2. Multi-prompt needs better selection, distillation, sharing.
3. Science of prompting (theory, transfer, PLM choice) lags practice.
4. Calibration failures are first-class product risks for ICL.
5. Pretraining-for-prompting is an open paradigm question.
6. Honest few-shot protocols matter as much as new templates.
7. Multi-reference prompting for generation is largely open.

## Connects To
- **Ch 4–7**: Today’s partial solutions.
- **Ch 11**: Empirical concentration explaining why some challenges persist.
- **Ch 8**: Apps that already hit these walls (IE, QA calib).
