# Cheatsheet

## Master Decision: How to Adapt a PLM

| Situation | Prefer | Because |
|---|---|---|
| No labels, API-only LM | Tuning-free + good prompts (±PA) | Only interface is text |
| 4–64 labels/class | Fixed-prompt LM tuning or Fixed-LM prompt tuning | Few-shot sweet spot |
| Large labeled set | Promptless FT or Prompt+LM | Need expressivity |
| Many tasks, one frozen LM | Fixed-LM Prompt Tuning | Cheap per-task params, no forgetting |
| Must not forget general LM | Freeze LM (TFP or Fixed-LM PT) | Avoid catastrophic forgetting |

## Prompt Shape

| Task family | Default shape | Default PLM family |
|---|---|---|
| Classification / NLI / probing | Cloze | MLM or Enc–Dec |
| Summarization / MT / open gen | Prefix | L2R or Enc–Dec |
| Extractive/free-form QA | Prefix (unify as gen) | Enc–Dec |
| NER / tagging | Decomposed cloze per span | Enc–Dec / seq2seq |
| Relation extraction | Composed cloze (+ entity marks) | MLM + LMPT/PTR |

**Rule:** Match [Z] placement to how the LM was pretrained (cloze↔MLM, prefix↔L2R).

## Template vs Answer Effort

| Symptom | Do this |
|---|---|
| Model ignores task | Redesign template / add clearer anchors |
| Right task, wrong class words | Verbalizer search / paraphrase answers |
| Unstable across seeds/templates | Prompt ensembling or soft prompts |
| Manual templates plateau | Discrete search → then soft init |
| Soft prompts weak in few-shot | Initialize from discrete/manual prompts |

## Multi-Prompt Picker

- **Unstable single template** → Prompt Ensembling (avg / vote / KD).
- **Have a few labels, no training** → Prompt Augmentation (watch order & *k*).
- **Token/span labeling** → Prompt Decomposition.
- **Span-relation labeling** → Prompt Composition.
- **Multi-task/domain** → consider Prompt Sharing (partial share; still open research).

## In-context Learning Tells

| Tell | Likely issue | Move |
|---|---|---|
| Last demo label dominates | Recency bias | Shuffle order; calibrate |
| Always predicts majority class | Majority-label bias | Balance demos; content-free calib |
| Common words win over rare gold | Common-token / surface-form competition | Constrain *Z*; paraphrase golds; prior-calib |
| “Zero-shot” used large val to pick prompt | Tuned few-shot leakage | Report protocol (Perez et al.) |

## Tuning Strategy Card (Table 6)

| Strategy | LM | Extra prompt params | Extra tuned? |
|---|---|---|---|
| Promptless FT | Tuned | No | — |
| Tuning-free Prompting | Frozen | No | No |
| Fixed-LM Prompt Tuning | Frozen | Yes | Yes |
| Fixed-prompt LM Tuning | Tuned | No (discrete fixed) | — |
| Prompt+LM Tuning | Tuned | Yes | Yes |

## Quick Defaults

1. Start: **manual cloze + manual verbalizer** on a small dev slice.
2. If few-shot classify: try **LM-BFF/PET-style** (template±verbalizer search, fixed-prompt LM tune).
3. If frozen giant: **Prompt-Tuning/Prefix-Tuning** or **ICL** with similarity-selected demos.
4. If IE: **don’t copy sentiment templates**—add entity marks; compose/decompose.
5. Before shipping ICL classifiers: **calibrate** and check order sensitivity.
6. Treat prompts as worth **~100s of labels** when budgeting annotation vs engineering (Scao & Rush).
