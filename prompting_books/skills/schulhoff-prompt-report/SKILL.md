---
name: schulhoff-prompt-report
description: "Knowledge base from \"The Prompt Report\" by Schulhoff et al. Use when applying the survey's prompting taxonomy (Zero-Shot, Few-Shot, CoT, Decomposition, Ensembling, Self-Criticism), multilingual/multimodal extensions, PE/answer engineering, agents/RAG, or security best practices."
---

<!-- argument-hint: [topic, technique name, or chapter number] -->

# The Prompt Report: A Systematic Survey of Prompt Engineering Techniques
**Author**: Sander Schulhoff et al. | **Pages**: ~80 | **Chapters**: 11 (skill) | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core taxonomy & decision rules below
- **With a topic** — e.g. `Self-Consistency`, `injection`, `AutoDiCoT`; read the matching chapter
- **With chapter** — ask for `ch05`; load that file
- **Browse** — ask "what chapters do you have?" for the index

When a topic is not in Core Frameworks, read the relevant chapter before answering.

---

## Core Frameworks & Mental Models

### Taxonomy map (58 text techniques)
Use this ladder when choosing a method:

1. **Zero-Shot / Few-Shot (ICL)** — instructions and/or exemplars, no weight updates.
2. **Thought Generation** — CoT, Zero-Shot-CoT inducers, Contrastive/Complexity/Active/Auto-CoT, Tab-CoT, Analogical.
3. **Decomposition** — Least-to-Most, DECOMP, Plan-and-Solve, ToT, PoT/Faithful CoT, Skeleton/Recursion-of-Thought, Metacognitive.
4. **Ensembling** — Self-Consistency, Universal SC, MoRE, DiVeRSe, COSP/USP, Prompt Paraphrasing.
5. **Self-Criticism** — Self-Calibration, Self-Refine, CoVe, RCoT, Self-Verification, Cumulative Reasoning.

Multilingual/multimodal ≈ same ladder + language/modality controls. Agents/RAG wrap the ladder with tools, code, retrieval, memory.

### Vocabulary (precision matters)
- **Prompt** vs **Prompt Template** vs **instance** (filled template).
- **Prompting Technique** = architecture blueprint; **Prompt Engineering** = iterate technique/template with evaluation.
- **Prompt Chain** = sequential templates; **Answer Engineering** = shape + space + extractor (verbalizer/regex/LLM).
- Prefer **Additional Information** over overloaded “context.” Survey scope: **hard discrete prefix** prompts.

### Decision rules (“Use X when Y”)
- Use **Few-Shot** when Y needs format/label induction; ablate **order** (can swing <50%→90%+) and **format**.
- Use **Zero-Shot Role/Style** when Y is open-ended quality; use **Emotion** phrases when Y responds to stakes wording.
- Use **S2A / SimToM** when Y is polluted by irrelevant or privileged facts; **RaR/RE2/Self-Ask** when Y is ambiguous or needs follow-ups.
- Use **Few-Shot CoT** when Y is multi-step reasoning *and* you can write rationales; do **not** assume Zero-Shot-CoT helps (authors’ MMLU: ZS-CoT dropped vs Zero-Shot).
- Use **Self-Consistency** when Y has discrete answers and noisy CoT (T>0); **Universal SC** when Y answers paraphrase.
- Use **Least-to-Most** when Y is compositional; **ToT** when Y needs search/planning; **PoT/PAL** when Y is calculation/code.
- Use **Self-Calibration** to gate; **Self-Refine/CoVe** to revise/verify—always cap loops.
- Use **APE/GrIPS/ProTeGi** when Y has a scored dataset worth prompt search; always co-design the **extractor**.
- Use **ReAct/RAG/IRCoT** when Y needs tools or external knowledge; **Reflexion** when Y repeats fixable mistakes.
- Use **detectors+guardrails** when Y accepts untrusted user text—**prompt-only defenses never fully stop injection/jailbreaks**.
- Prefer omit **user opinions** in judge prompts—**sycophancy** otherwise.

### Few-Shot six knobs
Quantity · Ordering · Label distribution · Label quality · Format · Similarity (KNN vs Vote-K diversity) · (+ instruction selection: exemplars can carry the task).

### PE loop
Infer → evaluate (utility + extractor) → modify **one** of technique/template/answer-engineering → repeat. Case study: Zero-Shot+Context → shots → **AutoDiCoT** → extraction/ensembles/default-to-reject.

### Best-practice snapshot
Technique choice ≈ hyperparameter search. Authors: **Few-Shot CoT** strongest on their MMLU slice; SC helped Zero-Shot; report extractor rules; expect run-to-run metric jitter even at T=0.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-vocabulary-prompt-anatomy.md) | Vocabulary & Prompt Anatomy | Prompt/Template, PE loop, 7 categories |
| [ch02](chapters/ch02-zero-shot-few-shot-icl.md) | Zero-Shot, Few-Shot & ICL | Six exemplar decisions, Role/Style/S2A/RaR/… |
| [ch03](chapters/ch03-thought-generation.md) | Thought Generation | CoT, ZS-CoT, Contrastive, Auto-CoT, … |
| [ch04](chapters/ch04-decomposition.md) | Decomposition | Least-to-Most, DECOMP, ToT, PoT, Skeleton |
| [ch05](chapters/ch05-ensembling.md) | Ensembling | Self-Consistency, MoRE, DiVeRSe, COSP/USP |
| [ch06](chapters/ch06-self-criticism.md) | Self-Criticism | Self-Refine, CoVe, RCoT, Self-Calibration |
| [ch07](chapters/ch07-prompt-answer-engineering.md) | Prompt & Answer Engineering | Meta/APE/GrIPS, shape/space/extractor |
| [ch08](chapters/ch08-multilingual-multimodal.md) | Multilingual & Multimodal | XLT, PARC, MAPS, MM CoT, CoI, DDCoT |
| [ch09](chapters/ch09-agents-rag-evaluation.md) | Agents, RAG & Evaluation | ReAct, Reflexion, RAG, IRCoT, PAL |
| [ch10](chapters/ch10-security-alignment.md) | Security & Alignment | Injection, jailbreak, sycophancy, bias |
| [ch11](chapters/ch11-benchmarking-best-practices.md) | Benchmarking & Best Practices | MMLU bake-off, AutoDiCoT case study |

## Topic Index

- **Active-Prompt / Auto-CoT / Analogical / Tab-CoT** → ch03
- **Answer extractor / verbalizer / APE / GrIPS / ProTeGi** → ch07
- **AutoDiCoT / MMLU bake-off** → ch11
- **Chain-of-Thought / Zero-Shot-CoT / Plan-and-Solve** → ch03, ch04
- **DECOMP / Least-to-Most / Tree-of-Thought / PoT** → ch04
- **Emotion / Role / Style Prompting** → ch02
- **Few-Shot design decisions / KNN / Vote-K / SG-ICL** → ch02
- **Jailbreak / Prompt Injection / Prompt Leaking** → ch10
- **Meta Prompting / Prompt Engineering loop** → ch01, ch07
- **MoRE / Self-Consistency / Universal SC / COSP** → ch05
- **Multilingual (XLT, PARC, MAPS) / Multimodal CoT** → ch08
- **Prompt / Template / Directive / Exemplar** → ch01
- **RaR / RE2 / S2A / SimToM / Self-Ask** → ch02
- **RAG / ReAct / Reflexion / IRCoT** → ch09
- **Self-Refine / Self-Calibration / CoVe / RCoT** → ch06
- **Sycophancy / Prompt sensitivity / Bias** → ch10

## Supporting Files

- [glossary.md](glossary.md) — taxonomy terms with chapter refs
- [patterns.md](patterns.md) — techniques with when/how/trade-offs
- [cheatsheet.md](cheatsheet.md) — decision tables and PE/security rules

---

## Scope & Limits

Covers Schulhoff et al., *The Prompt Report* (arXiv:2406.06608): discrete prefix-prompting taxonomy, PE/answer engineering, multilingual/multimodal extensions, agents/RAG, security/alignment, and the paper’s benchmarks/case study. Does not replace model/provider docs or live eval on your data—technique rankings are task-specific.
