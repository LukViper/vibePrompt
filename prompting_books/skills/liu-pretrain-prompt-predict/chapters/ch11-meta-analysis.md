# Chapter 11: Meta Analysis

## Core Idea
A quantitative birds-eye view (Tabs 7–8, Fig. 6, timeline Tab. 12): research surged in **2021** (GPT-3 effect), concentrates on **text classification & factual probing**, prefers **template search over answer search**, and is shifting from **discrete → continuous** prompt search.

## Frameworks Introduced
- **Timeline Reading (Tab. 12)**: chronological map of prompt papers (NLU red / NLG blue / both green in original).
  - When to use: Orient newcomers; cite lineage (LAMA → PET → GPT-3 → Prefix-Tuning / LM-BFF / P-Tuning…).
  - How: Place a new method on the timeline by mechanism (TFP/PA/PT/etc.).
- **Trend Axes (Fig. 6)**
  - **Year**: sharp 2021 spike.
  - **Task**: TC & FP dominate; compute + easy eng. explain concentration.
  - **Prompt vs Answer auto-search**: templates researched far more than answers.
  - **Discrete vs Continuous**: progressive shift to continuous (optimizability + expressivity).

## Key Concepts
- **Why TC/FP dominate**: easy templates/answers; cheap experiments.
- **Why answer search lags**: generation uses references as answers; class words seem “obvious.”
- **Why continuous rises**: discrete combinatorial hardness vs soft gradient descent.

## Mental Models
- Use **meta trends** when prioritizing research or reading: expect denser literature on TC/FP than IE.
- Budget engineering effort toward **understudied answer search** for leverage.
- Treat **2020 GPT-3** as the few-shot multi-task inflection point.

## Anti-patterns
- **Assuming literature coverage = importance**: sparse IE/gen-ensemble papers ≠ solved.
- **Ignoring timeline context**: comparing 2019 cloze probes to 2021 soft prompts unfairly.

## Worked Example
Planning a survey extension in mid-2021:
- Saturated: manual cloze for LAMA-style FP; PET-style TC few-shot.
- Rising: Prefix-Tuning / Prompt-Tuning continuous methods; calibration; true few-shot protocol critiques.
- Thin ice: prompt sharing, gen ensembling, structured prompts—aligns with Ch 10 gaps.

## Key Takeaways
1. Field exploded post–GPT-3 (2021).
2. Empirical mass ≠ full task coverage.
3. Template automation ≫ answer automation in papers.
4. Continuous prompts are the methodological trajectory.
5. Meta stats should guide where to innovate, not only what to cite.

## Connects To
- **Ch 8 Tabs 7–8**: Underlying paper inventory.
- **Ch 10**: Gaps implied by skewed trends.
- **Ch 12**: Paradigm-shift narrative wrapping the meta view.
