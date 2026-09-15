# Chapter 5: Chain of Thought (CoT)

## Core Idea
Chain of Thought prompting improves reasoning by eliciting intermediate steps before the answer — combine with few-shot for hard problems; expect more tokens, cost, and latency.

## Frameworks Introduced
- **Chain of Thought (CoT)**: Generate intermediate reasoning steps to improve answer accuracy
  - When to use: Tasks solvable by “talking through” steps (math, multi-hop, structured planning)
  - How: (1) state the question (2) require explicit intermediate steps (3) put the **final answer after** the reasoning (4) parse/extract that answer for downstream use
  - Why it works: Reasoning tokens change the context the model uses when predicting the answer, so the model conditions on its own scratch work
  - Failure mode: Longer wrong chains — always audit intermediate claims, not just the final number
- **Zero-shot CoT**: Append a cue such as “Let's think step by step” without demonstrations
  - When to use: Quick reasoning boost on off-the-shelf models; no finetune available
  - How: Add the cue after the question; keep temperature at 0 for single-answer tasks; parse answer from the end of the chain
- **Few-shot / one-shot CoT**: Show worked Q→reasoning→A examples, then the new Q
  - When to use: Zero-shot CoT still errs or uses a weak method
  - How: Demonstrate the preferred reasoning pattern (e.g. age-difference method) ending with a clear `The answer is N` cue the model can mirror

## Key Concepts
- **Interpretability**: Visible steps let you debug wrong intermediate claims
- **Robustness across model versions**: Reasoning chains often drift less than bare answers when swapping LLMs
- **Token/cost trade-off**: Reasoning tokens are billed and slower
- **No finetune required**: Works with off-the-shelf LLMs
- **Answer-after-reasoning rule**: Generation of reasoning changes the tokens available when predicting the final answer
- **Greedy decoding for CoT**: Prefer temperature **0** when there is a single correct answer
- **Good CoT candidates**: Code generation broken into steps; synthetic data from a seed title; any explainable procedure

## Mental Models
- Use **CoT** when Y can be solved by verbalizing steps a human would write.
- Prefer **few-shot CoT** when Y needs a specific solution method, not just any chain.
- Use **temperature 0** when Y has one correct answer (CoT best practice).
- Think of CoT as trading **tokens for reliability and debuggability**.

## Anti-patterns
- **Answer before reasoning**: Defeats the conditioning benefit
- **High temperature on single-answer CoT**: Injects noisy wrong paths
- **Skipping answer extraction**: Downstream systems cannot separate rationale from result
- **Using CoT for pure style tasks**: Pays cost without reasoning need

## Worked Example
**Age puzzle without CoT** (Table 11): “When I was 3, partner was 3× my age. Now I am 20. How old is partner?” → wrong `63`.

**Zero-shot CoT** (Table 12): Same question + “Let's think step by step.” → partner age 9 at the time; +17 years → **26**.

**One-shot CoT** (Table 13): First demonstrate sibling age-difference method ending in “The answer is 38.” Then ask the partner question → model mirrors difference method → **26**.

**Why it works / failure mode**: Without steps, the model pattern-matches poorly on arithmetic word problems. Failure mode: longer outputs that still hide a wrong intermediate step — always read the chain.

## Key Takeaways
1. CoT adds intermediate reasoning to raise accuracy on reasoning tasks.
2. Combine with one/few-shot when zero-shot CoT is insufficient.
3. Put the answer after the reasoning; extract it separately for pipelines.
4. Set temperature to 0 for single-correct-answer CoT.
5. Expect higher cost/latency; use when steps are explainable.

## Connects To
- **Ch 2**: Temperature 0 and token budgets
- **Ch 6**: Self-consistency samples many CoT paths; ToT explores branching paths
- **Ch 10**: CoT-specific best practices and documentation
