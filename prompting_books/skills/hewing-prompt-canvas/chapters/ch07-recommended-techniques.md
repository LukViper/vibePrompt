# Chapter 7: Recommended Techniques

## Core Idea
After the four primary categories, the canvas **Recommended Techniques** toolbox adds tactics — iteration, delimiters, CoT/ToT, emotion cues, re-reading, and hyperparameter control — to match task difficulty.

## Frameworks Introduced
- **Iterative Optimization**: Refine with additional instructions in a feedback loop based on model responses.
  - When to use: First draft is directionally right but incomplete or off-spec.
  - How: Change one constraint at a time; compare outputs; lock what works.
- **Placeholders & Delimiters**: Placeholders for reusable slots; delimiters to segment instructions and reduce ambiguity (White).
  - When to use: Template prompts reused across cases; mixed instruction + data blobs.
  - How: Mark variables clearly; fence data (`"""` / XML-like tags / labeled sections).
- **AI as a Prompt Generator**: Ask the model to draft or refine the prompt itself.
  - When to use: Blank-page resistance or optimizing a weak prompt.
  - How: Provide goal + constraints; request an improved prompt; then run that prompt.
- **Chain-of-Thought / Tree-of-Thought**: Stepwise reasoning vs multi-perspective/branch exploration.
  - When to use: CoT for linear hard reasoning; ToT when diverse viewpoints or creative options matter.
  - How: CoT — sequential logic; ToT — analyze from multiple perspectives/personas.
- **Emotion Prompting**: Append stakes-oriented emotional phrases (Li et al.).
  - When to use: Empathetic engagement or empirically stronger effort cues.
  - How: Short coda such as career/importance framing — not a substitute for clear Task cells.
- **Rephrase and Respond / Re-Reading**: Restate the question first (RaR) or read again (RE2) to boost reasoning.
  - When to use: Misread questions, multi-constraint prompts.
  - How: Instruct paraphrase-before-answer or explicit re-read.
- **Adjusting Hyperparameters (advanced)**: Temperature, top-p, frequency/presence penalty.
  - When to use: Controlling creativity, diversity, repetition outside pure text instructions.
  - How: Raise temperature/top-p for variety; lower for focus; use penalties to curb repetition.

## Key Concepts
- **Self-Consistency**: Sample multiple CoT paths; prefer the majority answer.
- **Self-Refine**: Model critiques and improves until a stop condition.
- **Automatic Prompt Engineer (APE)**: Search/select high-performing prompt formulations.
- **Analogical Prompting / Plan-and-Solve / Thread-of-Thought**: CoT variants for examples, planning, or chunked analysis.

## Mental Models
- Use **primary canvas cells first**; pull Recommended Techniques only when a cell needs amplification.
- Prefer **delimiters** when the model mixes instructions with data.
- Use **ToT** when one persona’s CoT is too narrow.

## Anti-patterns
- **Technique stacking**: CoT + ToT + Emotion + RaR on a trivial ask.
- **Hyperparameter tweaking instead of clarifying Task/Format**.
- **Emotion phrases as a substitute for Audience/Context**.

## Worked Example
**Weak prompt**: “Write about the attached PDF.”
1. Fill primary cells (role, audience, task, steps, context, format, tone).
2. Add delimiters around PDF excerpt.
3. If reasoning stays shallow → CoT steps or Plan-and-Solve line.
4. If still brittle → RaR (“restate the brief, then draft”).
5. If exploring angles for an editorial → ToT with critic/editor/reader personas.
6. Iterate once on length/tone only.

## Key Takeaways
1. Recommended Techniques are enhancers, not a replacement for the four categories.
2. Iteration is the default optimization loop.
3. Placeholders/delimiters make prompts modular and clear.
4. CoT/ToT/RaR/RE2 target reasoning quality; emotion and hyperparameters are situational.
5. Literature synthesis (Schulhoff, Sahoo, White, Li, Deng, Xu, Yao, …) backs this toolbox.

## Connects To
- **Ch 4**: Native home for CoT-style steps.
- **Ch 8**: Tools that operationalize iteration, libraries, and arenas.
- **Ch 2**: Skills like Adaptability and Cognitive Flexibility when iterating.
