# Chapter 6: Self-Consistency & Tree of Thoughts (ToT)

## Core Idea
Self-consistency samples diverse CoT paths (high temperature) and majority-votes the answer; Tree of Thoughts generalizes CoT by exploring multiple branching reasoning paths in a tree — both buy accuracy with compute.

## Frameworks Introduced
- **Self-consistency**: Sample many reasoning trajectories; extract answers; take the most common
  - When to use: Ambiguous classification/reasoning where a single greedy CoT is brittle (sarcasm, mixed signals, competing heuristics)
  - How: (1) same prompt N times at **high temperature** (2) extract each discrete answer label/value (3) majority vote (4) optionally treat vote share as a consistency heuristic, not a calibrated probability
  - Why it works: CoT alone uses greedy decoding — one path; sampling surfaces alternate perspectives and the modal answer is more often correct
  - Failure mode: High cost (N×); if extraction fails, votes are garbage; temp too low → duplicate paths
- **Tree of Thoughts (ToT)**: Maintain a tree of intermediate “thoughts”; branch and explore paths in parallel rather than one linear chain
  - When to use: Complex tasks needing exploration, search, or backtracking among partial solutions
  - How: Generate candidate thoughts as nodes; expand promising branches; compare paths (see ToT paper / GoogleCloud notebooks for search controllers)
  - Relation to CoT: ToT **generalizes** linear CoT — multiple coherent intermediate sequences instead of one chain

## Key Concepts
- **Greedy CoT limitation**: Single path under-samples alternative reasonings
- **Diverse reasoning paths**: High temperature encourages different perspectives
- **Pseudo-probability via vote frequency**: Consistency ≈ confidence proxy, not calibrated probability
- **High cost**: N generations (self-consistency) or tree expansion (ToT) multiply spend
- **Answer extraction**: Required to vote across free-form rationales
- **Thought (ToT)**: Coherent language sequence as an intermediate problem-solving step

## Mental Models
- Use **self-consistency** when Y is “one answer, many plausible justifications” and a single CoT flip-flops.
- Prefer **majority vote over the best-sounding prose** when Y is accuracy under ambiguity.
- Use **ToT** when Y needs exploring alternatives, not just deepening one chain.
- Think of self-consistency as **ensemble over reasonings**; ToT as **search over reasonings**.

## Anti-patterns
- **Self-consistency at temperature 0**: Paths collapse; vote is meaningless
- **No extraction step**: Cannot tally answers buried in prose
- **Ignoring cost**: Running large N on every cheap query
- **Treating vote share as true probability**: It is a heuristic consistency signal

## Worked Example
**Email IMPORTANT vs NOT IMPORTANT** (Table 14 pattern):
- Zero-shot CoT on a sarcastic “Harry the Hacker” bug-report email (friendly tone, XSS-ish alert, “leave the bug”).
- **Attempt 1**: Security impact → IMPORTANT
- **Attempt 2**: No urgency / non-critical tone → NOT IMPORTANT
- **Attempt 3**: Security risk + unknown credibility → IMPORTANT
- **Self-consistency**: Majority **IMPORTANT** wins over the outlier.

**Teaching point**: Tone and sarcasm can flip a single CoT; voting stabilizes the security-critical reading.

## Key Takeaways
1. Self-consistency = diverse CoTs + majority vote; improves coherence/accuracy at high cost.
2. Raise temperature to diversify paths; extract answers before voting.
3. ToT explores multiple paths simultaneously — suited to hard exploratory tasks.
4. Both methods trade compute for reliability over greedy CoT.
5. Use when single-path reasoning is unstable under ambiguity.

## Connects To
- **Ch 5**: Builds directly on CoT
- **Ch 2**: High temp for diversity vs temp 0 for single CoT
- **Ch 7**: ReAct adds external actions beyond internal search
- **Ch 10**: Extract final answer separately for CoT/self-consistency
