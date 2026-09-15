# Chapter 2: Advanced Prompting Techniques

## Core Idea
When a single instruction fails on complex reasoning, add exemplars, force intermediate reasoning, or aggregate multiple reasoning paths — Few-shot, Chain-of-Thought (CoT), Zero-Shot CoT, and Self-Consistency.

## Frameworks Introduced
- **Few-shot prompting**: Provide exemplars in the prompt to steer format and decision boundaries.
  - When to use: Task is clear but the model needs the *shape* of good answers (labels, True/False pattern).
  - How: Show several input→answer pairs, then the real query in the same format.
  - Why it works: Exemplars teach the mapping without fine-tuning (in-context learning).
  - Failure mode: Exemplars that contradict each other or omit the reasoning the model needs.

- **Chain-of-Thought (CoT) prompting**: Instruct (and/or exemplify) step-by-step reasoning before the final answer.
  - When to use: Arithmetic, logic, multi-hop questions where jumping to an answer fails.
  - How: In few-shot CoT, exemplars show intermediate steps; combine with few-shot for best results.
  - Why it works: Intermediate tokens act as scratchpad computation.
  - Failure mode: CoT with greedy decoding only — one wrong path, no recovery (see Self-Consistency).

- **Zero-Shot CoT**: Append “Let’s think step by step” when exemplars are unavailable.
  - When to use: You cannot craft few-shot CoT examples but need reasoning.
  - How: Keep the original question; add the trigger phrase; let the model expand then conclude.
  - Failure mode: Trigger alone without checking the arithmetic — still verify final counts.

- **Self-Consistency**: Sample multiple diverse CoT paths; pick the most consistent answer.
  - When to use: CoT is helpful but single greedy paths are unreliable (arithmetic, commonsense).
  - How: Few-shot CoT + sampling → many reasoning traces → majority / consistency vote on the answer.
  - Why it works: Correct answers tend to recur across diverse paths; errors diverge.
  - Failure mode: Temperature too low → paths aren’t diverse; voting collapses to one wrong answer.

## Key Concepts
- **Exemplar**: A worked input–output (or input–reasoning–output) example inside the prompt.
- **Few-shot**: Multiple exemplars before the target instance.
- **Chain-of-Thought (CoT)**: Explicit intermediate reasoning in the generation.
- **Zero-Shot CoT**: CoT elicited by a verbal trigger without exemplars (“Let’s think step by step”).
- **Reasoning path**: One sampled CoT trajectory from question to answer.
- **Consistent answer**: The answer that recurs most often across sampled paths (Self-Consistency).
- **Naive greedy decoding**: Single highest-probability continuation — the baseline Self-Consistency improves on.

## Mental Models
- Use **few-shot** when Y is “format or decision boundary is ambiguous from instructions alone.”
- Use **CoT** when Y is “the task needs multi-step reasoning,” not just classification style.
- Prefer **few-shot CoT** over zero-shot CoT when you can write even 2–3 good exemplars.
- Use **Self-Consistency** when Y is “CoT sometimes works but single runs flip between answers.”
- Prefer **sampling + vote** over **one greedy CoT** for arithmetic and commonsense benchmarks.

## Anti-patterns
- **Answer-only few-shot for hard math**: Exemplars say True/False without showing steps — model copies brevity, not method.
- **Single greedy CoT as final**: Treats one path as truth; Self-Consistency exists to fix this.
- **Zero diversity in Self-Consistency**: Sampling with near-zero temperature wastes the method.
- **Assuming CoT always helps**: For trivial lookup tasks, extra steps can add noise.

## Worked Example
**Few-shot (answer-only pattern)** — odd-number parity task:
Show several groups labeled `A: The answer is True/False`, then ask about `15, 32, 5, 13, 82, 7, 1`.

**Few-shot CoT** — same task with steps in exemplars:
```
… A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.
… A: Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.
```
(Lecture note: CoT surfaces the sum; verify parity of the sum, not of the count of odds alone.)

**Zero-Shot CoT** — apple counting:
Without trigger → wrong count (`11`). With `Let's think step by step` → start 10, give away 4 → 6, buy 5 → 11, eat 1 → **10**.

**Self-Consistency** — age puzzle:
“When I was 6 my sister was half my age. Now I’m 70 how old is my sister?”
Naive answer `35` recurs under weak prompting. Diverse CoT paths converge on **67** (sister was 3 when narrator was 6; age gap is 3 → 70 − 3).

## Key Takeaways
1. Few-shot steers with exemplars; CoT steers with intermediate reasoning.
2. Combine few-shot + CoT when accuracy on reasoning tasks matters.
3. Zero-Shot CoT is the cheap default when you lack exemplars.
4. Self-Consistency upgrades CoT by voting across sampled paths.
5. Preserve technique names — Few-shot ≠ CoT ≠ Self-Consistency.

## Connects To
- **Ch 1**: Prompt anatomy and decoding (sampling settings enable Self-Consistency).
- **Ch 3**: PAL / ReAct when text-only CoT still fails or needs tools.
- **Papers**: Wei et al. (CoT); Kojima et al. (Zero-Shot CoT); Wang et al. (Self-Consistency).
