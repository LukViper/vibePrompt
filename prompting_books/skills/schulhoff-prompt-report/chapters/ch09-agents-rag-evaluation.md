# Chapter 9: Agents, RAG & Evaluation

## Core Idea
When prompts call **tools**, browse, execute code, or retrieve documents, the survey labels them **agents**. Core patterns: tool-use, code-generation, observation loops (ReAct/Reflexion), and **RAG**. Separately, **evaluation** of prompt/agent outputs needs techniques, formats, and frameworks—not only accuracy metrics.

## Frameworks Introduced
### Agents
- **Tool-use agents**: MRKL, CRITIC—route to calculators, search, critics, external modules.
- **Code-generation agents**: PAL, ToRA, TaskWeaver—reason via generated programs and runtimes.
- **ReAct** (Yao et al., 2022): Thought → Action → Observation loop; history stays in the prompt as memory.
- **Reflexion** (Shinn et al., 2023): ReAct trajectory + success/fail signal → verbal reflection stored in working memory → retry.
- **Lifelong learning agents**: Voyager, GITM—skill libraries / persistent memory across tasks.
- **RAG family**: Retrieval-Augmented Generation; DSP; Verify-and-Edit; Iterative Retrieval Augmentation; IRCoT (interleave retrieval with CoT).

### Evaluation (Sec 4.2)
- Evaluate with prompting techniques (incl. CoT-as-judge), constrained output formats, dedicated prompting frameworks, and other methodologies (human, metrics, model-based).

## Key Concepts
- **Observation**: tool result appended so the next thought conditions on reality.
- **Working memory**: Reflexion reflections and ReAct traces as prompt state.
- **Retrieval as exemplar/context supplier**: RAG supplies Additional Information, not weights.
- **Verify-and-Edit**: retrieve to check/edit draft claims.
- **IRCoT**: retrieve ↔ reason cycles for multi-hop QA.

## Mental Models
- Use **ReAct** when Y needs external facts or actions mid-reasoning.
- Prefer **Reflexion** when Y fails with repeatable mistakes you can verbalize.
- Use **PAL/ToRA** when Y is math/code and execution can verify.
- Prefer **RAG / IRCoT** when Y is knowledge-grounded and parametric memory is stale.
- Think of **agents as prompting techniques with I/O side effects**, still built from Ch 2–6 primitives.

## Anti-patterns
- **Tool calls without grounded observations in-prompt**: model hallucinates tool results.
- **Unbounded agent loops**: always cap steps; log actions.
- **RAG dump without instructions**: huge contexts need S2A-like focus or citations.
- **Eval by vibes only**: pair automatic extractors (Ch 7) with judge prompts carefully (bias/sycophancy).

## Worked Example
ReAct skeleton:

```
Question: {Q}
Thought 1: ...
Action 1: Search[...]
Observation 1: ...
Thought 2: ...
Action 2: Finish[answer]
```

Reflexion add-on: after failure signal, `Reflect on what went wrong:` → prepend reflection to next attempt’s prompt.

IRCoT: CoT step → retrieve with step as query → continue CoT with passages → answer.

## Key Takeaways
1. Agents = prompting + tools/code/retrieval/memory.
2. ReAct = think-act-observe; Reflexion adds verbal RL-like memory.
3. RAG variants differ by when/how retrieval edits reasoning.
4. Evaluating agents needs the same answer-engineering discipline as static prompts.
5. Most agent tricks compose Zero/Few-Shot, CoT, decomposition, self-criticism.

## Connects To
- **Ch 4**: DECOMP functions ≈ tool routers.
- **Ch 6**: Reflexion ≈ self-criticism with persistence.
- **Ch 10**: Tool-using apps expand injection/privacy surface.
