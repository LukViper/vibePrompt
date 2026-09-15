# Chapter 3: Thought Generation (Chain-of-Thought Family)

## Core Idea
**Thought Generation** techniques make the model emit intermediate reasoning before the final answer. The flagship is **Chain-of-Thought (CoT)**; Zero-Shot-CoT uses thought inducers, while Few-Shot CoT shows worked reasoning exemplars. Variants add structure, contrast, complexity filters, or automatic exemplar construction.

## Frameworks Introduced
- **Chain-of-Thought (CoT)** (Wei et al., 2022b): Few-Shot exemplars include question + reasoning path + answer; at test time the model continues the pattern.
  - When to use: math, multi-step, symbolic reasoning where answer-only shots fail.
  - How: write correct, human-readable steps in each exemplar; keep final answer clearly marked for extraction.
- **Zero-Shot-CoT** (Kojima et al., 2022): append a thought inducer such as `Let's think step by step` (or searched/optimized inducers).
  - When to use: no CoT-labeled demos; need a cheap reasoning boost.
  - How: try multiple inducers (standard CoT, Plan-and-Solve, ThoT); measure—gains are not guaranteed on every suite.
- **Few-Shot CoT upgrades**: Contrastive CoT · Complexity-based Prompting · Active-Prompt · Memory-of-Thought · Auto-CoT · Analogical Prompting · Tab-CoT · Step-Back · Thread-of-Thought (ThoT).
  - When to use: plain CoT plateaus or you can invest in exemplar pipelines.
  - How: match upgrade to bottleneck (bad reasoning demos → Contrastive; hard items → Complexity; unlabeled pool → Auto-CoT / Memory-of-Thought).

## Key Concepts
- **Thought inducer**: phrase that elicits step-by-step reasoning without exemplars.
- **Contrastive CoT**: include incorrect *and* correct explanations so the model sees how not to reason.
- **Complexity-based Prompting**: choose complex annotated exemplars; at inference sample many chains and majority-vote among long chains.
- **Active-Prompt**: annotate exemplars with highest model disagreement/uncertainty.
- **Auto-CoT**: Zero-Shot-CoT over a pool → harvest chains → build Few-Shot CoT for the test item.
- **Analogical Prompting**: auto-generate exemplars that already contain CoTs (related to SG-ICL).
- **Tab-CoT**: force reasoning into a markdown table for structure.
- **Memory-of-Thought**: precompute CoT on unlabeled train set; retrieve similar instances at test time.
- **Step-Back Prompting**: step up to a higher-level principle before details (taxonomy neighbor to thought generation).

## Mental Models
- Use **Zero-Shot-CoT** when Y needs reasoning and you lack demos; escalate to **Few-Shot CoT** when Y is high-stakes or Zero-Shot-CoT is unstable.
- Prefer **Contrastive CoT** when Y fails via systematic wrong strategies you can exemplify.
- Use **Complexity-based / Self-Consistency combo** when longer chains correlate with correctness.
- Think of **Auto-CoT** as “bootstrap demos from the model, then freeze them as Few-Shot.”

## Anti-patterns
- **Anthropomorphizing “thinking”**: treat chains as useful intermediate text, not human cognition claims.
- **Assuming Zero-Shot-CoT always helps**: survey MMLU case saw Zero-Shot-CoT underperform plain Zero-Shot—validate.
- **Unextractable answers after long chains**: without answer engineering, metrics collapse.

## Worked Example
One-Shot CoT pattern (compact reconstruction of Fig 2.8):

```
Q: Jack has two baskets, each containing three balls. How many balls in total?
A: One basket has 3 balls, so two baskets have 3 * 2 = 6 balls.
Q: {QUESTION}
A:
```

Zero-Shot-CoT: `{QUESTION}\nLet's think step by step.`  
Plan-and-Solve inducer: `Let's first understand the problem and devise a plan to solve it. Then, let's carry out the plan and solve the problem step by step.`

## Key Takeaways
1. CoT = show or induce intermediate reasoning before the answer.
2. Zero-Shot-CoT is inducer search; Few-Shot CoT is exemplar+rationale design.
3. Contrastive, complexity, active, auto, analogical, tabular variants target specific failure modes.
4. Pair thought generation with clear final-answer triggers for evaluation.
5. Citation prevalence: CoT and Few-Shot dominate the survey’s usage graph—default toolkit members.

## Connects To
- **Ch 4**: Decomposition makes the breakdown explicit (Least-to-Most, ToT, PoT).
- **Ch 5**: Self-Consistency samples many CoT paths and votes.
- **Ch 6**: Self-Verification / RCoT critique or reconstruct from CoT answers.
