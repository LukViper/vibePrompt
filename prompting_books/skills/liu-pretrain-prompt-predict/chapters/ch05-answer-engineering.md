# Chapter 5: Answer Engineering

## Core Idea
Answer engineering designs the **answer space *Z*** and the **map *Z→Y***. Shape (token / span / sentence) and design method (manual / discrete search / continuous) jointly determine prompting quality—often as critical as the template, and historically under-studied.

## Frameworks Introduced
- **Answer Shape**
  - **Token**: vocab or subset—classification, RE, NER type words.
  - **Span**: multi-token cloze fills.
  - **Sentence/document**: prefix generation, free-form QA, summarization.
  - When to use: Pick shape from task output granularity first.
  - How: Class labels → token/short span; open text → sentence; MC → score candidate phrases against each other.
- **Manual Answer Design**
  - Unconstrained *Z* (all tokens/spans/sequences) + identity map (probing, generation).
  - Constrained *Z*: topic/emotion word lists; NER type words; MC options.
  - When to use: Labels have clear natural-language names.
  - How: Draft synonym sets per class; ensure coverage without overlap across classes.
- **Discrete Answer Search**
  - **Answer Paraphrasing**: expand *z⁰* via back-translation; *P(y|x)=Σ_{z∈para(z⁰)} P(z|x)*.
  - **Prune-then-Search / Verbalizer learning**:
    - PET: frequency prune (≥2 alpha chars) → iterative likelihood suitability per label.
    - AutoPrompt: logistic on [Z] contextualization → top-*k* tokens.
    - LM-BFF: top-*k* by gen prob → zero-shot prune → finetune+dev select best label word.
  - **Label Decomposition** (RE): `per:city_of_death` → {person, city, death}; sum token probs.
  - When to use: Manual verbalizers plateau; large vocab; structured label strings.
  - How: Build pruned *Z⁰* → score with train/zero-shot criteria → finalize map; keep many-to-one options when useful.
- **Continuous Answer Search**: soft class tokens optimized in embedding space (WARP)—few works; do not reuse LM token embeddings necessarily.
  - When to use: Joint soft template+answer learning.
  - Failure: Less mature than soft *prompts*; harder to interpret.

## Key Concepts
- **Verbalizer**: *y → z* (or set of *z*) in Schick & Schütze terminology.
- **Many-to-one mapping**: multiple sentiment words → one class.
- **Pruned *Z⁰***: shortlist before combinatorial selection.
- **Surface-form competition**: synonyms split probability mass (ties to Ch 10 calibration).

## Mental Models
- Use **manual verbalizers** when label names are already good English.
- Use **paraphrase marginalization** when one gold word underspecifies the class.
- Use **prune-then-search** when vocab is huge but labels are few.
- Use **label decomposition** when structured label strings encode multiple cues.
- Engineer **answers with templates**—sequential “answers then templates” is common but joint search can win.

## Anti-patterns
- **Single brittle label word** for a polysemous class.
- **Shape mismatch**: sentence answers for binary labels (or token answers for long gen).
- **Copying sentiment verbalizers into RE/NER** with huge label spaces.
- **Ignoring multi-token decode** when answers are spans (non-trivial).

## Worked Example
**LM-BFF-style verbalizer search (binary sentiment)**  
1. Fill training inputs into a fixed cloze; collect top-*k* vocab words by [Z] generation probability → *Z⁰*.  
2. Keep subset with best zero-shot accuracy on train fills.  
3. For each remaining label-word mapping, run fixed-template LM tuning; pick best on development accuracy.  
Result: learned words like “great/terrible” beat naive first guesses.

**RE label decomposition**  
Label `org:founded_by` → answers {organization, founded, by} (or stemmed constituents); aggregate token likelihoods instead of inventing one awkward single-token verbalizer.

## Key Takeaways
1. Engineer *Z* and *Z→Y*, not only the template.
2. Token/span for classify & IE; sentences for generation.
3. Verbalizers are first-class objects in few-shot classification.
4. Automatic answer search is rarer than prompt search but high leverage.
5. Soft answers exist but trail soft prompts in maturity.
6. Paraphrase sets fight surface-form competition.
7. Many-class combinatorial *Z* remains an open challenge (Ch 10).

## Connects To
- **Ch 2**: Answer mapping step.
- **Ch 4**: Joint prompt+answer search (AutoPrompt, LM-BFF, WARP).
- **Ch 8**: Task-specific answer designs (NER types, RE labels).
- **Ch 10**: Entanglement of template and answer.
