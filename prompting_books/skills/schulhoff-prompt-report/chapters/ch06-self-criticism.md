# Chapter 6: Self-Criticism

## Core Idea
**Self-Criticism** has the model judge, critique, verify, or revise its own outputs—either as a binary correctness check or as iterative feedback that drives refinement. Distinct from ensembling’s parallel votes: here the model *reflects* on a candidate (or reconstructs the problem) to accept, reject, or improve it.

## Frameworks Introduced
- **Self-Calibration** (Kadavath et al., 2022): answer → new prompt with question+answer+“is this correct?” for confidence gating.
  - When to use: decide when to trust, escalate, or regenerate.
  - How: threshold the yes/no (or probabilistic) judgment before shipping.
- **Self-Refine** (Madaan et al., 2023): answer → feedback prompt → improve-with-feedback; iterate until stop (max steps / quality).
  - When to use: coding, generation, reasoning that benefit from revision cycles.
  - How: separate roles in templates (generator / critic / refiner), same or different models.
- **Reversing Chain-of-Thought (RCoT)**: from answer, reconstruct the problem; diff vs original; feed inconsistencies as revision signal.
- **Self-Verification**: multiple CoT candidates; mask parts of the question; score how well the solution predicts masked content.
- **Chain-of-Verification (CoVe)**: draft answer → generate verification questions → answer them → revise final answer with that evidence.
- **Cumulative Reasoning**: propose candidate steps → accept/reject → continue until final answer or loop.

## Key Concepts
- **Judgment vs feedback**: binary correct/incorrect vs actionable critique text.
- **Reconstruction check**: RCoT’s inverse generation surfaces hidden contradictions.
- **Verification questions**: CoVe externalizes fact-checking as an explicit sub-dialog.
- **Stopping conditions**: step caps, convergence, or confidence from Self-Calibration.

## Mental Models
- Use **Self-Calibration** when Y needs a reject option more than a rewrite.
- Prefer **Self-Refine** when Y quality monotonically improves with critique loops.
- Use **CoVe / Self-Verification** when Y fails via hallucinated facts or shaky intermediate claims.
- Think of **RCoT** as “does this answer imply the same problem I asked?”

## Anti-patterns
- **Unlimited refine loops**: cost explosion and drift; always cap iterations.
- **Critic that only praises**: sycophancy (Ch 10) undermines Self-Refine—keep critique prompts strict.
- **Verification questions that restate the answer**: ask independent checks, not echoes.
- **Treating self-checks as ground truth**: calibration is imperfect; combine with tools/evals when stakes are high.

## Worked Example
Self-Refine cycle (3 templates):

1. Generate: `Solve: {Q}` → `A0`
2. Critique: `Provide specific critiques of this answer:\n{A0}` → `F`
3. Refine: `Improve the answer using the feedback.\nAnswer:\n{A0}\nFeedback:\n{F}` → `A1`; repeat ≤k.

Self-Calibration gate: after `A`, ask `Question: {Q}\nAnswer: {A}\nIs the answer correct? (Yes/No)`. If No → regenerate or escalate.

CoVe sketch: answer → “list verification questions” → answer each without seeing the original claim bias if possible → final revise.

## Key Takeaways
1. Self-criticism = judge and/or revise using the model itself.
2. Self-Calibration gates; Self-Refine iterates; CoVe/RCoT/Self-Verification stress-test facts and consistency.
3. Cumulative Reasoning mixes propose/evaluate steps like a lightweight ToT.
4. Always define stop criteria and extraction rules for “final” answers.
5. Pair with security/alignment awareness—self-checks don’t stop injection.

## Connects To
- **Ch 4**: Metacognitive Prompting overlaps the evaluate/confirm stages.
- **Ch 5**: Ensembling is parallel; self-criticism is sequential reflective.
- **Ch 9**: Reflexion agents store verbal reflections as working memory.
