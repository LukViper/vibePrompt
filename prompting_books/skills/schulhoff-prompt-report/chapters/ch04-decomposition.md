# Chapter 4: Decomposition

## Core Idea
**Decomposition** explicitly breaks a hard problem into simpler sub-problems (solved sequentially, via tools/functions, search trees, code, or parallel skeletons). Related to CoT’s natural breakdown, but the split is first-class architecture—not only free-form prose steps.

## Frameworks Introduced
- **Least-to-Most Prompting** (Zhou et al., 2022a): (1) list sub-problems without solving; (2) solve sequentially, appending each solution into the next prompt until the final answer.
  - When to use: compositional, symbolic, multi-hop math where order of subgoals matters.
  - How: two-phase templates; never skip logging prior sub-answers into context.
- **Decomposed Prompting (DECOMP)** (Khot et al., 2022): Few-Shot teaches callable “functions” (string ops, search, separate LLM calls); router splits work across them.
  - When to use: heterogeneous sub-skills; need tool-like handlers.
  - How: demonstrate function APIs in shots; dispatch sub-problems; stitch results.
- **Plan-and-Solve**: Zero-Shot inducer that forces plan-then-execute (also a thought-generation bridge).
- **Tree-of-Thought (ToT)** (Yao et al., 2023b / Long, 2023): generate multiple candidate thoughts; evaluate progress; expand promising branches (search/planning).
  - When to use: puzzles/planning with branching decisions and backtracking value.
  - How: define thought generator + state evaluator + search policy (BFS/DFS-like).
- **Program-of-Thoughts (PoT)** / **Faithful CoT**: emit executable code (and/or mixed symbolic languages) as reasoning; run an interpreter for the answer.
  - When to use: math/code-heavy tasks; less ideal for pure semantic QA.
- **Recursion-of-Thought**: mid-chain hard subproblems spawn nested LLM calls; results splice back (context-length friendly).
- **Skeleton-of-Thought**: draft answer skeleton (sub-questions), answer parts in parallel, concatenate.
- **Metacognitive Prompting**: five-stage chain (clarify → preliminary judgment → evaluate → confirm → confidence).

## Key Concepts
- **Sub-problem list vs solve**: Least-to-Most separates planning from execution across calls.
- **Function-as-handler**: DECOMP treats capabilities as routed tools, often separate prompts.
- **Search over thoughts**: ToT treats intermediate steps as nodes with heuristic values.
- **Symbolic fidelity**: PoT/Faithful CoT ground answers in execution, not only fluent text.
- **Parallel skeleton**: latency optimization via concurrent sub-answers.

## Mental Models
- Use **Least-to-Most** when Y is “reduce then climb”; use **ToT** when Y needs explore-and-prune.
- Prefer **PoT** when Y is calculation-sensitive; prefer natural-language CoT when Y is semantic.
- Use **Skeleton-of-Thought** when Y is long-form latency-bound, not when steps have strict dependencies.
- Think of **DECOMP** as prompt-native microservices for sub-skills.

## Anti-patterns
- **Decomposing trivial tasks**: extra calls add cost/noise without gain.
- **Losing intermediate state**: forgetting to append sub-answers breaks Least-to-Most.
- **ToT without an evaluator**: branching without progress checks is expensive random search.
- **PoT on non-codeable reasoning**: interpreter can’t save a wrong semantic plan.

## Worked Example
Least-to-Most (two calls, compact):

1. `Break the problem into sub-problems. Do not solve yet.\nProblem: {P}` → `S1, S2, S3`
2. For each `Si`, prompt: `Previous answers: …\nSolve: {Si}` → append; final call synthesizes.

Plan-and-Solve one-liner inducer: understand → plan → execute step by step (single Zero-Shot call).

ToT sketch: propose 3 next thoughts → score each (“sure/maybe/impossible”) → expand top-k until terminal answer.

## Key Takeaways
1. Explicit decomposition > hoping CoT silently factors the task.
2. Least-to-Most = sequential append; DECOMP = routed functions; ToT = tree search.
3. PoT/Faithful CoT trade fluency for executable correctness on math/code.
4. Skeleton-of-Thought trades sequential dependence for speed.
5. Metacognitive chains add explicit self-monitoring stages—overlap with Ch 6.

## Connects To
- **Ch 3**: CoT is the soft precursor; Plan-and-Solve straddles both chapters.
- **Ch 5**: MoRE / DiVeRSe ensemble diverse decomposition styles.
- **Ch 9**: Agents (ReAct, tools) operationalize DECOMP-like function calls.
