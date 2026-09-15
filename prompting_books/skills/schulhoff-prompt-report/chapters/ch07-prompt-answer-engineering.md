# Chapter 7: Prompt Engineering & Answer Engineering

## Core Idea
**Prompt Engineering** iterates the *template/technique* until evaluation goals are met. **Answer Engineering** designs how raw LLM text becomes a precise answer via **answer shape**, **answer space**, and **answer extractor**. They run in tandem—many “prompting failures” are extraction failures.

## Frameworks Introduced
- **Meta Prompting**: ask an LLM to generate or improve a prompt/template (`Improve the following prompt: {PROMPT}`), optionally with multi-iteration scoring.
- **APE (Automatic Prompt Engineer)**: propose many instruction prompts from exemplars → score → paraphrase/vary winners → repeat to desiderata.
- **GrIPS**: mutate prompts with delete/add/swap/paraphrase (gradient-free search).
- **ProTeGi**: batch run → criticize prompt with outcomes → propose new prompts → bandit select.
- **RLPrompt / DP2O / AutoPrompt**: RL or soft-trigger optimization (survey notes some gradient methods despite hard-prompt focus elsewhere).
- **Answer Engineering triad**: Shape (token/span/modality) · Space (allowed values) · Extractor (regex, verbalizer, or separate LLM + answer trigger).

## Key Concepts
- **Verbalizer**: injective map between surface tokens (`+`/`-`) and labels (positive/negative).
- **Answer trigger**: e.g. `The answer (Yes or No) is` to force extractable endings (Kojima-style).
- **Regex first vs last match**: with CoT, last label mention often beats first.
- **Separate-LLM extractor**: when formats are too messy for regex.
- **Technique usage**: Few-Shot and CoT dominate citation-within-survey proxies; most “popular” papers propose techniques.

## Mental Models
- Use **APE/GrIPS/ProTeGi** when Y has a scored dataset and wording search is worth compute.
- Prefer **simple meta-prompting** when Y is open-ended and human-in-the-loop still judges quality.
- Design **shape/space first** for classification; only then soften for chat UIs with extractors.
- Think of **PE ≠ prompting**: PE is the outer optimization loop (Fig 1.4).

## Anti-patterns
- **Scoring free-form text without an extractor**: noisy labels poison PE search.
- **Restricting to one token too early** on tasks that need rationale (lose CoT benefits).
- **Assuming RL-found gibberish prompts are maintainable**: RLPrompt may prefer nonsensical strings—document ops risk.
- **Ignoring verbalizer choice**: `Yes/No` vs `positive/negative` changes error modes.

## Worked Example
Hate-speech template:

```
Is this "Hate Speech" or "Not Hate Speech": {TEXT}
```

Observed outputs: `It's hate speech` / `Hate Speech.` / long explanations.  
Answer engineering: space = {Hate Speech, Not Hate Speech}; shape = short span; extractor = case-insensitive regex on last label, or second LLM with `The label is`.

Meta-prompt seed:

```
Improve the following prompt: {PROMPT}
```

APE-style: generate 10 instruction variants from few labeled pairs → accuracy on holdout → paraphrase top-3 → iterate.

## Key Takeaways
1. PE = infer → evaluate → modify technique/template.
2. Answer engineering = shape + space + extractor (verbalizer/regex/LLM).
3. Automated PE (APE, GrIPS, ProTeGi, RL) searches prompt space with scores.
4. CoT makes “first match” extractors brittle—prefer last-match or explicit triggers.
5. Popularity ≠ optimality: Few-Shot/CoT are defaults; still ablate for your task.

## Connects To
- **Ch 1**: PE loop and vocabulary.
- **Ch 11**: AutoDiCoT case study = PE + contrastive rationales + extraction.
- **Ch 5**: Paraphrase mutations feed ensembles and PE.
