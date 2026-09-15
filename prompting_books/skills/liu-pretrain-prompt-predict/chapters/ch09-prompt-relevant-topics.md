# Chapter 9: Prompt-relevant Topics

## Core Idea
Prompting overlaps adjacent literatures—ensembles, few-shot learning, larger-context learning, query reformulation, QA-as-task, controlled generation, supervised attention, data augmentation—but differs in **using prompts to specify tasks and harvest frozen/pretrained LM knowledge**.

## Frameworks Introduced
- **Ensemble Learning ↔ Prompt Ensembling**: complementarity without necessarily multi-architecture training; swap templates at inference.
- **Few-shot Learning ↔ Prompt Augmentation**: priming-based few-shot; demos prepended rather than meta-learned inner loops.
- **Larger-context Learning ↔ PA**: both add context; PA specifically adds labeled answered prompts.
- **Query Reformulation ↔ Discrete Prompt Search**: both craft queries to a black-box KB; prompting’s KB is an LM and often changes task form (classify→cloze).
- **QA-based Task Formulation ↔ Prompting**: both use questions as task specs; prompting emphasizes PLM knowledge reuse.
- **Controlled Generation ↔ Prompting for Gen**: both inject extra signals; control usually steers style/content within a task, while prompts often *define the task*; control commonly uses input-dependent signals (underexplored in prompting).
- **Supervised Attention ↔ Prompts**: both supply external focus cues.
- **Data Augmentation ↔ Prompts**: Scao & Rush—prompts ≈ worth hundreds of labeled points on average for classification.

## Key Concepts
- **Priming-based few-shot learning**: few-shot via answered prompts in context.
- **Style tokens / length / domain tags**: classic control signals vs task-specifying prompts.
- **Input-dependent vs dataset-level prompts**: control gen often per-input; many prompt methods still task-level.
- **Black-box probing**: only questions/prompts, not internal KB access.

## Mental Models
- Use **Table 11** when explaining prompting to neighboring communities.
- Borrow **demo selection / query decomposition** from few-shot and IR reformulation.
- Borrow **input-dependent control codes** when designing better generation prompts.
- Treat **prompts as ultra-compressed labeled data** when budgeting annotation vs engineering.

## Anti-patterns
- **Equating prompting with QA multitask** without the PLM-centric goal.
- **Calling every control code a prompt** when the underlying task never changes.
- **Ignoring peculiarities** in Table 11 (e.g., ensembles that retrain nets vs swap templates).

## Worked Example
Classification project with 50 labels:
- Path A: collect ~hundreds more labels (data augmentation).
- Path B: invest in verbalizer+template search (prompting).
Empirically (Prompt2Data / Scao & Rush), B can rival large annotation boosts—budget engineering time against labeling cost.

## Key Takeaways
1. Prompting sits at the intersection of several classical themes.
2. Peculiarities matter: LM-as-KB, task reformulation, train-free template diversity.
3. Cross-pollinate methods (decomposition, control signals, distillation).
4. Prompts can substitute for nontrivial amounts of labeled data.
5. Use related fields for tools, not identical problem statements.

## Connects To
- **Ch 6**: Concrete multi-prompt instantiations of these relatives.
- **Ch 8**: Where apps already blend control/QA/few-shot ideas.
- **Ch 10**: Open gaps (sharing, structured inputs, theory).
