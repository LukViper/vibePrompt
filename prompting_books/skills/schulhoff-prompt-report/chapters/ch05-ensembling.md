# Chapter 5: Ensembling

## Core Idea
**Ensembling** improves reliability by combining multiple prompts, reasoning paths, or specialized experts, then aggregating (vote, LLM-as-judge, scored paths). Flagship: **Self-Consistency**—sample diverse CoTs at T>0 and majority-vote the answer.

## Frameworks Introduced
- **Self-Consistency** (Wang et al., 2022): run CoT many times with nonzero temperature; select the majority final answer.
  - When to use: arithmetic/commonsense/symbolic tasks where many paths can share one answer.
  - How: sample N chains; extract answers; majority vote. Survey MMLU used T=0.5 for SC runs.
- **Universal Self-Consistency**: put all free-form outputs into a prompt that picks the majority-like answer (handles paraphrased equivalents).
- **Meta-Reasoning over Multiple CoTs**: generate several chains (not necessarily answers); one meta-prompt synthesizes the final answer.
- **DiVeRSe**: multiple prompt variants × Self-Consistency; score paths step-aware; pick best.
- **Mixture of Reasoning Experts (MoRE)**: specialized prompts per reasoning type (retrieval for factual, CoT for multi-hop/math, generated knowledge for commonsense); choose by agreement score.
- **COSP / USP**: build Few-Shot CoT exemplars from high-agreement Zero-Shot-CoT+SC (COSP) or unlabeled scoring without SC (USP).
- **Prompt Paraphrasing**: meaning-preserving rewords as ensemble members / PE search neighbors.
- **DENSE / Max Mutual Information / Uncertainty-Routed Meta-CoT**: additional ensemble routing/selection variants in the taxonomy tree.

## Key Concepts
- **Path diversity**: temperature and prompt paraphrases create disagreeing intermediates that may converge on answers.
- **Programmatic vs LLM aggregation**: exact string vote vs Universal SC / meta-reasoner for open text.
- **Expert specialization**: MoRE assigns technique to reasoning genre rather than one global prompt.
- **Exemplar bootstrapping via agreement**: COSP keeps only high-consensus generated rationales as shots.

## Mental Models
- Use **Self-Consistency** when Y has a discrete answer space and CoT helps but is noisy.
- Prefer **Universal Self-Consistency** when Y answers are semantically equal but lexically different.
- Use **MoRE** when Y mixes factual lookup, math, and commonsense in one benchmark.
- Think of **Prompt Paraphrasing** as cheap ensemble axes and as PE mutation operator (APE/GrIPS).

## Anti-patterns
- **SC at temperature 0**: no diversity → wasted spend.
- **Majority vote on free-form essays without Universal SC**: ties and near-duplicates break counting.
- **Ensembling instead of fixing a broken template**: amplify consistent errors.
- **Ignoring cost**: N samples ≈ N× latency/price—budget explicitly.

## Worked Example
Self-Consistency loop:

1. Prompt: `{Q}\nLet's think step by step.` with T=0.5, N=5–40.
2. Extract final numeric/choice answers.
3. Return mode; optional: keep only chains longer than a length threshold (Complexity-based hybrid).

Universal SC: concatenate outputs into `Which answer is the majority consensus?` and let the LLM pick.

COSP sketch: Zero-Shot-CoT+SC on unlabeled pool → keep high-agreement (q, rationale, a) as Few-Shot CoT exemplars → SC again at test time.

## Key Takeaways
1. Ensemble = multiple generations or experts + aggregation rule.
2. Self-Consistency is the default reliability booster for CoT.
3. Universal/meta variants handle open-ended answer equivalence.
4. MoRE / DiVeRSe diversify *how* you ask, not only sample noise.
5. COSP/USP turn ensemble agreement into better Few-Shot libraries.

## Connects To
- **Ch 3**: SC assumes CoT (or thoughty) paths.
- **Ch 7**: APE uses paraphrase ensembles inside PE search.
- **Ch 11**: MMLU study—SC helped Zero-Shot more than some CoT variants.
