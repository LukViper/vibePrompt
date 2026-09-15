# Chapter 1: Two Sea Changes in NLP

## Core Idea
NLP engineering focus shifted twice: from features/architectures to **pre-train & fine-tune** (objective engineering), then to **pre-train, prompt, and predict**—reformulating tasks to look like LM training via prompts.

## Frameworks Introduced
- **Four NLP Paradigms** (Table 1): Fully supervised + feature eng. → fully supervised + architecture eng. → pre-train/fine-tune + objective eng. → pre-train/prompt/predict + prompt eng.
  - When to use: Diagnose where your system spends design effort (features vs nets vs losses vs prompts).
  - How: Map your pipeline to one paradigm; if you change prompts instead of heads/objectives, you are in paradigm (d).
  - Why it works / failure: Each paradigm relocates inductive bias to the cheapest abundant resource (experts → data → unlabeled text → prompt suites); failure mode is applying a new paradigm’s rhetoric while still bottlenecked on an old lever (e.g., “prompting” that secretly needs full FT).
- **Task↔LM Direction Flip**: “LM→Task” (adapt LM objectives to tasks) vs “Task→LM” (adapt task formulations to LMs).
  - When to use: Choosing fine-tuning vs prompting.
  - How: Prefer Task→LM when you want one unsupervised LM to cover many tasks with few/no labels; prefer LM→Task when you have task data and need a specialized head/objective.
- **Prompt Engineering as the Catch**: Suites of prompts unlock multi-task use of one LM, but require finding the right prompt—accuracy *and which task is performed* hinge on that choice.

## Key Concepts
- **Feature engineering**: Hand-built inductive bias from domain knowledge.
- **Architecture engineering**: Bias via network structure (CNN/RNN/attention).
- **Objective engineering**: Design pretrain/finetune losses (e.g., salient-sentence prediction for summarization).
- **Pre-train, prompt, and predict**: Reformulate downstream tasks with textual prompts so the LM fills slots.
- **Cloze / prefix intuition**: Emotion fill-in (“I felt so ___”) vs translation prefix (“English: … French:”).

## Mental Models
- Use **paradigm table** when debating “do we need a new head?” vs “do we need a better prompt?”
- Think of **prompts as task adapters made of text** when labels are scarce.
- Use **single-LM multi-task** framing when one unsupervised model must serve many downstream jobs.

## Anti-patterns
- **Assuming fine-tune is obsolete**: Prompting coexists; full data still often favors parameter updates.
- **Ignoring prompt cost**: “Zero labels” can hide heavy prompt search/validation effort.
- **Treating prompts as free magic**: Wrong prompt can change which task the model performs.

## Worked Example
Input: “I missed the bus today.”
- Emotion prompt: continue with “I felt so ___” → LM fills emotion word.
- Translation prompt: “English: I missed the bus today. French: ___” → LM fills French.
Same LM, different prompts → different tasks, no task-specific head required.

**Paradigm checklist for a product team**
1. Are you hand-building features? → paradigm (a).
2. Designing a new net for the task? → (b).
3. Pretraining then adding a classification head / task loss? → (c).
4. Reformulating the task as cloze/prefix for a frozen or lightly adapted LM? → (d).

## Key Takeaways
1. Engineering locus moved from features → architectures → objectives → prompts.
2. Prompting flips adaptation: make the *task* look like language modeling.
3. One LM + prompt suite can cover many tasks, including few/zero-shot.
4. The price of admission is prompt (and later answer) engineering.
5. Survey roadmap: formalize (§2), PLMs (§3), engineer prompts/answers (§4–5), multi-prompt & training (§6–7), apps & open problems (§8–10).
6. Wrong prompts don’t just lower accuracy—they can change the performed task.

## Connects To
- **Ch 2**: Formal three-step prompting (add → search → map).
- **Ch 4–5**: Where engineering effort now concentrates.
- **Ch 7**: When you still tune LM/prompt parameters.
