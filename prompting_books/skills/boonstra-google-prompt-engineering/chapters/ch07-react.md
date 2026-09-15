# Chapter 7: ReAct (Reason & Act)

## Core Idea
ReAct interleaves verbal **reasoning** with **actions** (tools/APIs) in a thought–action–observation loop — a step toward agent modeling when the model must fetch external information.

## Frameworks Introduced
- **ReAct (Reason & Act)**: Combine natural-language reasoning with external tools (search, code interpreter, APIs)
  - When to use: Facts not in the prompt/weights; multi-step tool use; agent-style workflows
  - How: Loop — Thought → Action (+ Action Input) → Observation → updated Thought → … → Final Answer
  - Why it works: Mimics human verbal reasoning plus information-gathering actions; outperforms prompt-only methods when the world must be queried
  - Failure mode: Bad observations (noisy search) poison later thoughts; unbounded generation after the useful answer
- **Thought–action loop**: Plan, act, observe, revise until solved
  - When to use: Problems decomposable into searchable sub-questions
  - How: (1) provide tool schema/examples (2) keep full prior Thought/Action/Observation history (3) trim junk tokens (4) enforce Final Answer stop (5) set low temp + tight max tokens
- **LangChain ZERO_SHOT_REACT_DESCRIPTION pattern** (whitepaper sample): VertexAI LLM + SerpAPI search tool via `initialize_agent`
  - When to use: Prototyping ReAct with Google search observations
  - How: Load serpapi tool, temp≈0.1, `verbose=True` to inspect the chain

## Key Concepts
- **Agent modeling**: LLM decides which tool calls to make
- **Observation**: Tool result injected back into context
- **Human analogy**: Reason verbally, then take actions to gain information
- **Output length sensitivity**: Without limits, model may emit useless tokens after the needed response
- **Practical plumbing**: Continuously resend previous prompts/responses; trim extras; provide examples/instructions for the action format
- **ZERO_SHOT_REACT_DESCRIPTION** (LangChain example): Agent type used with VertexAI + SerpAPI search in the whitepaper snippet

## Mental Models
- Use **ReAct** when Y needs live external data the weights cannot reliably supply.
- Prefer a **strict action schema** (Action / Action Input / Observation) when Y is tool calling.
- Use **low temperature** (e.g. 0.1 in the sample) when Y is factual tool-chaining, not creative prose.
- Cap **max tokens** when Y is looped generation that tends to ramble past the answer.

## Anti-patterns
- **No tool observations in context**: Breaks the reason–act cycle
- **Unbounded generation**: Wastes tokens after Final Answer
- **Skipping trim/resend discipline**: Context bloat or lost state
- **Treating ReAct as pure CoT**: Missing the act/observe half

## Worked Example
**Metallica kids count** (Snippets 1–2, reconstructed compactly):
1. Prompt: “How many kids do the band members of Metallica have?”
2. Agent (LangChain + VertexAI temp 0.1 + SerpAPI) reasons Metallica has 4 members.
3. Sequential Search actions: Hetfield → 3; Ulrich → 3; Hammett → 2; Trujillo → 2.
4. Running totals in Thoughts; **Final Answer: 10**.

**Why it works**: External search supplies facts; thoughts accumulate partial sums. Failure mode: bad search snippets or identity ambiguity → wrong observations; still needs human verification.

## Key Takeaways
1. ReAct = reasoning + tool actions in a loop until Final Answer.
2. It outperforms prompt-only methods when external info is required.
3. Production ReAct needs history resend, trimming, examples, and token limits.
4. Prefer low temperature for factual agent traces.
5. First step toward agent systems, not just static prompting.

## Connects To
- **Ch 2**: Output length critically important for ReAct
- **Ch 5–6**: Internal reasoning methods without tools
- **Ch 9**: Code as both artifact and potential tool target
- **Ch 10**: Document agent traces like any other prompt attempt
