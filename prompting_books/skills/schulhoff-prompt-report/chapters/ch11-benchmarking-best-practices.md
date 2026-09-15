# Chapter 11: Benchmarking & Prompt Engineering Best Practices

## Core Idea
Technique choice is a **hyperparameter search**. On a controlled MMLU slice, complexity often helped but **Zero-Shot-CoT underperformed Zero-Shot**, while **Few-Shot CoT** won; Self-Consistency mainly stabilized/improved Zero-Shot. The **entrapment case study** shows professional PE: context, shots, AutoDiCoT, extraction, ensembles, and defaults-to-reject—iterated with measured F1.

## Frameworks Introduced
- **Controlled technique bake-off**: shared template slots `{BASE_INSTRUCTION}`, `{EXEMPLARS}`, `{QUESTION}`, `{THOUGHT_INDUCER}`; ablate question formats; T=0 except SC at T=0.5.
- **Variants tested**: Zero-Shot · Zero-Shot-CoT (multiple inducers incl. ThoT, Plan-and-Solve) · Few-Shot · Few-Shot CoT · each ± Self-Consistency.
- **AutoDiCoT (Automatic Directed CoT)**: auto-generate CoTs + direct reasoning with contrastive/bad-reasoning exemplars + task context; generalize to labeling tasks.
- **PE practice pattern** (case study): start Zero-Shot+Context → improve extraction → add shots → AutoDiCoT → more shots/context → ensembles → anonymization / default-to-reject / extraction prompts.

## Key Concepts
- **Thought inducer ablation**: “Let’s think step by step” is one of many; measure each.
- **Question format sensitivity**: two layouts changed behavior—format is a factor.
- **Answer pattern matching**: accept only structured cues (“The correct answer is”, sole `(A)`–`(D)`).
- **Metric variance**: even T=0 runs can move F1 ~0.04 across repeats—report carefully.
- **Default to reject**: when false positives dominate (over-calling the positive class), bias the policy toward abstain/negative.
- **Full context vs de-dupe vs anonymize**: what private/PII-laden text you put in prompts changes both ethics and scores.

## Mental Models
- Use **Few-Shot CoT** when Y is hard reasoning *and* you can author good rationales; don’t assume Zero-Shot-CoT helps.
- Prefer **SC on Zero-Shot** when Y needs cheap variance reduction without writing exemplars.
- Treat **PE as an experiment log**: each change one axis (extractor, shots, inducer, context).
- Use **AutoDiCoT** when Y is labeling and you can harvest directed rationales automatically.
- Think of **best practices** as: measure, ablate format, engineer answers, escalate complexity only when metrics move.

## Anti-patterns
- **Declaring a global best technique**: survey results are task/model specific; CoT can hurt.
- **Changing five prompt parts at once**: uninterpretable gains.
- **Exact-match extractors on chatty models**: prefer first-chars/triggers then LLM extractors.
- **Chasing leaderboard complexity** when a clearer directive + context wins early (case study start).

## Worked Example
MMLU-style template (compact):

```
{BASE_INSTRUCTION}
{EXEMPLARS}
{QUESTION}
{THOUGHT_INDUCER}
```

Question format example: `Problem {Q} Options (A)::{A} ... Answer` vs inline `OPTIONS:: (A): ... ANSWER::`.

Case-study progression (names preserved): Zero-Shot+Context → 10-Shot+Context → 1-/10-/20-Shot AutoDiCoT → +extraction / ensemble / default-to-reject → anonymized email variants; track Max F1 (study cites rises toward ~0.53 through iteration).

AutoDiCoT idea: generate CoT labels automatically; include examples of *incorrect* reasoning directions (Contrastive CoT spirit); add project context email; discourage over-positive labeling.

## Key Takeaways
1. Prompting techniques behave like hyperparameters—run bake-offs.
2. On their MMLU setup: Few-Shot CoT best; Zero-Shot-CoT can regress vs Zero-Shot.
3. Self-Consistency: lower spread; accuracy help was strongest for Zero-Shot there.
4. Professional PE spends most time on technique+extraction, not synonym swaps.
5. Encode safety/defaults (reject, anonymize) when errors are asymmetric.

## Connects To
- **Ch 2–6**: every technique in the bake-off maps to the taxonomy.
- **Ch 7**: extractors decided whether runs were scorable.
- **Ch 10**: real deployments add hacking and sycophancy constraints on top of F1.
