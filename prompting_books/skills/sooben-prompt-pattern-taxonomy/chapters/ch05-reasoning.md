# Chapter 5: Reasoning Patterns

## Core Idea
Reasoning patterns elicit, structure, plan, decompose, or reverse intermediate thinking before the final answer—almost always on Procedural Steps.

## Frameworks Introduced
- **Reasoning (strategy)**: elicit/structure/decompose/separate intermediate reasoning.
- **ChainOfThought**: Elicits explicit intermediate reasoning before the final answer.
  - Classification: `Reasoning » Chain-of-Thought @ Procedural Steps`
  - When to use: Use ChainOfThought when the answer needs intermediate reasoning (math, logic, multi-step analysis).
  - How: Add an explicit reasoning cue (e.g., “think step by step”) before or with the question; keep final answer after the chain.
  - Trade-offs: Improves multi-step accuracy; adds verbosity and can invent plausible but wrong steps. Combine with verification patterns for high stakes.
  - Also known as: Chain-of-Thought (CoT) Prompting, Chain-of-Symbol (CoS) Prompting, Contrastive CoT Prompting, Few-Shot CoT, Tabular CoT (Tab-CoT), Zero-Shot CoT
- **StructuredCoT**: Organizes reasoning with explicit program-like control structures.
  - Classification: `Reasoning » Chain-of-Thought @ Output Format/Style, Procedural Steps`
  - When to use: Use StructuredCoT when free-form CoT is too loose and you need program-like control (branches, loops, named steps).
  - How: Require reasoning in an explicit structure (numbered steps, pseudocode, tables, conditionals) then the answer.
  - Trade-offs: More inspectable reasoning; may over-constrain creative tasks. Annotates Output Format/Style + Procedural Steps.
  - Also known as: Structured CoT (SCoT) Prompting, Structured Chain-of-Thought (SCoT)
- **ComplexCoT**: Generates multiple detailed reasoning paths before answer selection.
  - Classification: `Reasoning » Chain-of-Thought @ Procedural Steps`
  - When to use: Use ComplexCoT when one reasoning path is brittle and you want multiple detailed paths before selecting.
  - How: Ask for several independent reasoning traces, then select/aggregate into a final answer.
  - Trade-offs: Broader exploration; costly and may still share correlated errors across paths.
  - Also known as: Complexity-Based Prompting
- **PlanAndSolve**: Plans subproblems before executing stepwise solution steps.
  - Classification: `Reasoning » Planning @ Procedural Steps`
  - When to use: Use PlanAndSolve when the model should separate plan construction from execution.
  - How: First emit a plan of subproblems; then execute each step against that plan.
  - Trade-offs: Reduces jumping ahead; a bad plan poisons later steps—allow plan revision if needed.
  - Also known as: Plan-and-Solve Prompting, Plan-and-Solve (PS)
- **LeastToMost**: Decomposes tasks from simpler subproblems to harder ones.
  - Classification: `Reasoning » Decomposition @ Procedural Steps`
  - When to use: Use LeastToMost when hard problems reduce cleanly into easier subproblems solved in order.
  - How: Decompose into simpler→harder subquestions; solve sequentially, feeding earlier answers forward.
  - Trade-offs: Strong on compositional tasks; weak if decomposition is ambiguous or subproblems are coupled.
  - Also known as: Least-to-Most Prompting, Least-to-Most
- **ReverseCoT**: Works backward from the desired output to infer the inputs or steps that produce it.
  - Classification: `Reasoning » Chain-of-Thought @ Procedural Steps`
  - When to use: Use ReverseCoT when you can check a candidate answer by reconstructing the problem it implies.
  - How: State a candidate answer → reconstruct assumptions/conditions → compare to original → revise on inconsistency.
  - Trade-offs: Surfaces mismatches; risk of post-hoc rationalization. Prefer tasks with explicit constraints.
  - Also known as: Reversing Chain-of-Thought (RCoT), RCoT, Reversing Chain-of-Thought

## Key Concepts
- **Chain-of-Thought**: subcategory hosting ['ChainOfThought', 'StructuredCoT', 'ComplexCoT', 'ReverseCoT']
- **Decomposition**: subcategory hosting ['LeastToMost']
- **Planning**: subcategory hosting ['PlanAndSolve']

## Mental Models
- Use **ChainOfThought** when Y = multi-step problem and free-form steps are enough.
- Use **StructuredCoT** when Y = you need inspectable control structure.
- Use **PlanAndSolve** when Y = planning errors dominate execution errors.
- Use **LeastToMost** when Y = compositional difficulty gradient.
- Use **ReverseCoT** when Y = answers must reconcile with the original problem.
- Use **ComplexCoT** when Y = single-path reasoning is brittle.

## Anti-patterns
- **CoT on purely stylistic tasks**: noise without benefit.
- **Trusting long chains as proof**: fluency ≠ correctness.
- **Multi-prompt reconstruction loops**: out of single-turn scope—keep ReverseCoT in one prompt.

## Worked Example
**ReverseCoT (security findings):**
```
Review the following code for potential security issues:
{{source_code}}
First, state the candidate security findings directly.
For each finding, reconstruct the code path/inputs/assumptions that would make it valid.
Compare with the original code; list inconsistencies.
If inconsistencies are found, revise or remove the finding; otherwise keep it.
```
Use ReverseCoT when forward CoT alone may invent unsupported findings.

## Key Takeaways
1. Six patterns: four CoT-family + Planning + Decomposition.
2. StructuredCoT uniquely adds Output Format/Style among reasoning patterns.
3. Many published CoT variants collapse into ChainOfThought variants.
4. Pair reasoning with Output Control verification for high stakes.

## Connects To
- **Ch 6**: SelfVerification / SelfCalibration / Reflection
- **patterns.md**: Variant lists (esp. ChainOfThought)
