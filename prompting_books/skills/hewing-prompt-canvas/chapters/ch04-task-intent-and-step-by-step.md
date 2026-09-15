# Chapter 4: Task/Intent and Step-by-Step

## Core Idea
**Task and Intent** name the objective with action verbs; **Step-by-Step** decomposes how to get there — precision here drives output usefulness more than decorative wording.

## Frameworks Introduced
- **Task and Intent (canvas cell)**: Describe the task precisely, starting with action verbs; state the objective you are pursuing.
  - When to use: Every prompt; especially when outputs feel unfocused.
  - How: (1) Action verb. (2) Object of work. (3) Focus constraints. (4) Intent/objective sentence (“goal is…”).
  - Why it works: Goal orientation (Sasson Lazovsky) and White’s Task/Goal pattern (“Create…”, “I would like to achieve X”) force a success definition before wording polish.
- **Step-by-Step (canvas cell)**: Break the task into clear sequential steps for completion.
  - When to use: Multi-part work, reasoning, editing pipelines, or exploratory inquiry.
  - How: Numbered procedure (Read and Understand → Identify Key Points → Draft Summary → Edit for Clarity → Check Completeness) *or* Zero-shot CoT cue (“Let’s think step by step”).
  - Why it works / failure mode: CoT decomposes problems so outputs stay coherent; failure mode is CoT on trivial lookup—adds latency without quality.
- **Chain-of-Thought family**: CoT Zero-shot, Plan-and-Solve, Thread-of-Thought, Analogical Prompting, Self-Consistency, Tree-of-Thoughts.
  - When to use: Complex reasoning, planning, or multi-perspective analysis.
  - How: Embed sequential logic; Plan-and-Solve = understand → plan → execute; ThoT = walk context in manageable parts; ToT = explore branches/personas; Self-Consistency = majority over multiple CoT runs.

## Key Concepts
- **Task/Goal pattern** (White): “Create a game…” / “I would like to achieve X.”
- **Procedure pattern** (White): “When asked… follow these rules…” / “Explain reasoning and assumptions.”
- **Goal orientation** (skill): Elicit responses aligned with intended purpose.
- **Zero-shot vs Few-shot CoT**: Step cues alone vs steps plus worked demonstrations.

## Mental Models
- Use **action-verb tasks** when the model digresses into commentary.
- Use **explicit steps** when coherence breaks on complex work; use **“Let’s think step by step”** when you want lightweight CoT without a custom procedure.
- Prefer **Plan-and-Solve** when the model jumps to answers without planning.

## Anti-patterns
- **Noun-phrase goals**: “A summary of the doc” without verbs or success criteria.
- **Steps without intent**: Procedure theater that never states the objective.
- **CoT on trivial lookup**: Forcing step-by-step when a direct answer is enough.

## Worked Example
**Canvas fill — Task + Steps** for the Art Horizon article:

**Task and Intent fill**: “Summarize the key points of the attached document, focusing on the main arguments and supporting evidence. The goal is to provide a concise and accurate article that captures the essence of the document, making it easy for readers to understand the core message quickly.”

**Step-by-Step fill (explicit)**: Follow these steps — Read and Understand → Identify Key Points → Draft the Summary → Edit for Clarity → Check for Completeness.

**Step-by-Step fill (Zero-shot CoT alternative)**: “Let’s think step by step.” Use when you want reasoning without authoring a custom procedure.

**Decision**: Prefer the five-step editorial pipeline for publication tasks; prefer Plan-and-Solve if the doc implies a problem to solve, not merely summarize.

## Key Takeaways
1. Start tasks with action verbs and state intent explicitly.
2. Step-by-Step is the canvas home for CoT-style reasoning.
3. White’s Task/Goal and Procedure patterns map directly here.
4. Clear intent enables creative/open-ended inquiry, not only closed tasks.
5. Pair this category with Persona so the right agent executes the steps.

## Connects To
- **Ch 3**: Who performs the task and for whom.
- **Ch 5**: Context/references the steps should consume.
- **Ch 7**: ToT, Self-Consistency, Self-Refine as advanced step variants.
