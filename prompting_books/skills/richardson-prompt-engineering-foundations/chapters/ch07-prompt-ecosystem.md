# Chapter 7: The Prompt Ecosystem

> **Sample note:** Full chapter body is not in the publisher excerpt. Taxonomy and process below are distilled from the preface chapter summary and TOC section headings. Category names **informative / interrogative / directive** are author-named; detailed definitions beyond the names are not in the sample body — treat as structural anchors.

## Core Idea
Prompts are an ecosystem: structure (what kind of prompt), craft (objectives, context, specificity), and iteration/evaluation — not a single magic sentence. Effective prompts raise performance; vague ones yield ambiguous or inaccurate results.

## Frameworks Introduced
- **Prompt structure triad (informative / interrogative / directive)**: Author divides prompt structures into three categories.
  - When to use: When choosing the speech-act shape of a prompt before filling in wording
  - How:
    - **Informative** — supply facts, background, or constraints the model should take as given
    - **Interrogative** — ask for an answer, analysis, or decision
    - **Directive** — instruct the model to perform a task or follow a procedure
  - Why it works / failure mode: Matching form to intent reduces ambiguity; mixing all three without hierarchy confuses priority (context vs question vs command)
- **Anatomy of a prompt**: Prompts have structural elements (TOC: structural elements → anatomy → types).
  - When to use: When debugging a weak prompt
  - How: Check objective, context/background, prior-knowledge assumptions, instruction clarity, depth/scope, examples/analogies, constraints, tone/style, edge cases
- **Prompt iteration & refinement (incl. active learning via AI feedback)**: Improve prompts using feedback loops and evaluation methods.
  - When to use: After a first draft fails quality bars
  - How: Change one dimension at a time (context vs constraints vs examples); measure; keep a revision trail
- **Craft stack from TOC**: Clear objectives → contextualization → specificity/precision → examples/analogies/constraints → tone/style/edge cases.
  - When to use: Building production prompts
  - How: Walk the stack top-down; do not skip constraints and edge cases

## Key Concepts
- **Prompt ecosystem**: End-to-end environment of creating, structuring, iterating, and evaluating prompts around AI models
- **Prompt engineering goal**: Improve AI system performance and accuracy through better inputs
- **Informative prompt**: Structure that informs (provides content the model should use)
- **Interrogative prompt**: Structure that questions (elicits answers/analysis)
- **Directive prompt**: Structure that directs (commands actions/procedures)
- **Contextualization / background**: Prior information so responses fit the situation
- **Managing prior knowledge**: Explicitly state what the model should assume vs not invent
- **Specificity and precision**: Instructional clarity; desired depth and scope
- **Constraints and limitations**: Bounds on length, format, sources, banned behaviors
- **Edge cases**: Explicit handling for unusual inputs or failure paths
- **Prompt evaluation**: Methods to assess whether prompts improve outcomes

## Mental Models
- Use **informative** when Y is grounding the model (role, facts, schema) before asking.
- Use **interrogative** when Y needs an answer, comparison, or judgment.
- Use **directive** when Y needs the model to execute a workflow (rewrite, classify, generate in a format).
- Prefer **iterate + evaluate** when Y sees inconsistent quality — do not only rephrase randomly.
- Think of the ecosystem as **shape → content → feedback**, not thesaurus swaps.

## Anti-patterns
- **Ineffective / ambiguous prompts**: Produce off-target or inaccurate outputs (author contrast with effective prompts)
- **Missing objectives**: Model invents a task you did not specify
- **Context without constraints**: Long background, no output contract
- **No edge-case plan**: Works on happy path; collapses on unusual inputs
- **One-shot forever**: Skips iteration and evaluation the TOC treats as core

## Worked Example
**Task**: Draft a customer-support reply policy summary.

1. **Informative**: “You are summarizing our refund policy. Policy facts: …; audience: frontline agents; max 120 words.”  
2. **Interrogative** (optional check): “What three agent mistakes does this summary prevent?”  
3. **Directive**: “Output: numbered bullets only; no legal advice; flag any policy gap with `GAP:`.”  

**Iteration**: If the model adds legal advice → tighten directive constraints; if it omits a fact → strengthen informative section. Evaluate against: accuracy to policy, length, forbidden content.

## Key Takeaways
1. Prompt quality is systemic: structure, elements, iteration, evaluation.
2. Author’s high-level structure categories: informative, interrogative, directive.
3. TOC craft checklist: objectives, context, prior knowledge, specificity, examples, constraints, tone, edge cases.
4. Effective vs ineffective prompts is an empirical contrast — measure, don’t assume.
5. Related deeper taxonomy (open/closed, multimodal, contextual, procedural, adaptive) lives in Ch 8 TOC — outside this sample’s body.

## Connects To
- **Ch 1–2**: Why statistical generative models need structured steering
- **Ch 8** (TOC): Prompt types in depth (open/closed, multimodal, etc.)
- **Ch 10–13** (TOC): Efficiency, syntax, techniques, quality challenges
