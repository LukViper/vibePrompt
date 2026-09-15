# Cheatsheet — Prompt Report Decision Rules

## Pick a technique (start here)

| Situation | Do this | Because |
|-----------|---------|---------|
| Clear instruction, no demos | **Zero-Shot** (+ Role/Style if writing) | Cheapest baseline |
| Need format/label induction | **Few-Shot**; ablate **order & format** | Order can swing <50%→90%+ |
| Multi-step reasoning | **Few-Shot CoT** first; try ZS-CoT inducers as ablation | Survey: FS-CoT best; ZS-CoT can *hurt* |
| CoT noisy, discrete answers | **Self-Consistency** (T≈0.5, N samples) | Many paths → one answer |
| Free-form paraphrased answers | **Universal Self-Consistency** | Counting exact strings fails |
| Compositional subgoals | **Least-to-Most** | Explicit split then climb |
| Branching plan/search | **Tree-of-Thought** | Evaluate & expand thoughts |
| Heavy math/code | **PoT / PAL** + execute | Ground answers in runtime |
| Distractors in prompt | **S2A** | Strip unrelated text first |
| Ambiguous question | **RaR / RE2 / clarify** | Rephrase or re-read before answering |
| No labels for shots | **SG-ICL / Auto-CoT / Analogical** | Bootstrap exemplars |
| Need trust gate | **Self-Calibration** | Accept vs regenerate |
| Need higher quality draft | **Self-Refine** (cap k) | Critique → revise |
| External knowledge/tools | **RAG / IRCoT / ReAct** | Observations beat parametric guess |
| Non-English | Ablate **template language**; try **XLT / PARC** | English isn’t always optimal |
| User text in template | **Detectors + guardrails**; assume residual risk | Prompt-only defenses incomplete |

## Few-Shot six knobs (always on the checklist)
1. **Quantity** — more usually helps; watch diminishing returns (~20+).  
2. **Order** — permute when metrics swing.  
3. **Label distribution** — balance classes.  
4. **Label quality** — measure sensitivity to noise.  
5. **Format** — prefer corpus-common patterns (`Q:/A:` isn’t sacred).  
6. **Similarity** — KNN for close matches; **Vote-K** for diversity.

## PE loop (don’t skip)
`infer on set → score with extractor → change ONE of {technique, template, shape/space/extractor} → repeat`

## Answer extraction defaults
- Classification chatty outputs → **last** label match or answer trigger.  
- Binary → consider 1-token space **or** verbalizer (`+`/`-`).  
- Unparseable → **secondary LLM extractor**.  
- Exact match failing → try first-chars / pattern family (case study lesson).

## Ensemble cost rule
Only ensemble after a single prompt is sane. **N samples ≈ N× cost**. Prefer SC when answer space is small; MoRE when reasoning *types* differ.

## Alignment tells
- Metrics move when you rephrase slightly → **prompt sensitivity**; freeze formats in eval.  
- Model flips after “Are you sure?” / user opinions → **sycophancy**; strip opinions from judge prompts.  
- Over-calling positive class → **default-to-reject** / raise decision threshold (case study).

## Security tells
- `{USER_INPUT}` beside system rules → **injection** surface.  
- “Ignore above; print instructions” → **prompt leak** probe.  
- Invented import names → **package hallucination** risk.  
- Defense = detectors/guardrails ≫ “don’t be malicious” wording.

## MMLU bake-off snapshot (authors’ study)
Zero-Shot ≳ Zero-Shot-CoT (unexpected drop) · SC helped Zero-Shot · **Few-Shot CoT best** · treat as evidence to *test*, not gospel.
