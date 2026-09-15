# Chapter 5: Prompt Improvement

## Core Idea
Prompt Improvement patterns recruit the LLM into better questioning — refining prompts, surfacing alternatives, subdividing questions, or explaining/rewording around refusals — so users escape narrow, biased, or blocked interactions.

## Frameworks Introduced
- **Question Refinement**: Always suggest a better version of the user’s question within scope X (optional: ask to use it).
  - When to use: Non-experts, security/quality-aware coding questions, fewer trial-and-error turns.
  - How: **Within scope X, suggest a better version…** (+ optional auto-use prompt). Combine with Reflection (why better), Cognitive Verifier (follow-ups → refine), Persona (define terms at a knowledge level), Fact Check List (catch bad premises).
  - Failure mode: Over-narrowing; inject unfamiliar terms; factual errors in refined questions — counter with “don’t scope to specific languages/frameworks,” term explanations, Fact Check List.

- **Alternative Approaches**: Always list best alternate ways within scope X.
  - When to use: Cognitive bias / “only path I know”; force exploration before committing.
  - How: **Within scope X, if alternatives exist, list best alternate approaches** (+ optional pros/cons, include original, prompt to choose). Constrain alternatives (e.g., same cloud provider).
  - Failure mode: Unscoped alternatives that are non-viable in the real system.

- **Cognitive Verifier**: Subdivide questions; answer subquestions; combine into the overall answer.
  - When to use: High-level/vague asks; leverage research that subdivision improves LLM reasoning.
  - How: When asked a question → **generate additional questions that help answer accurately** → **combine those answers into the final answer**. Fix N (e.g., three) or allow a range; optionally assume low user knowledge and define terms.
  - Failure mode: Fixed N drops a valuable N+1; unbounded N overwhelms the user.

- **Refusal Breaker**: On can’t-answer, explain why and offer alternate wordings the model *could* answer.
  - When to use: Genuine misunderstanding, knowledge cutoff, phrasing mismatch — **not** for policy evasion.
  - How: **Whenever you can’t answer** → **explain why** → **provide one or more alternative wordings you could answer**.
  - Failure mode / ethics: Potential misuse to probe guardrails; alternates may not be what the user wanted; no guarantee of semantic equivalence. Use ethically; organizations may restrict.

## Key Concepts
- LLM as co-prompt-engineer
- Scope as guardrail against unwanted rewriting
- Subdivision (least-to-most style reasoning support)
- Refusal as diagnosable constraint, not dead end (legitimate cases)

## Mental Models
- Use **Question Refinement** when the user may not know the best question.
- Use **Alternative Approaches** when the user may be stuck on a familiar-but-suboptimal path.
- Use **Cognitive Verifier** when the ask is too coarse for a reliable single shot.
- Use **Refusal Breaker** when you need *why* and *legal rephrasings* — never as a jailbreak recipe.

## Anti-patterns
- Unscoped Question Refinement that hijacks every casual question.
- Alternative Approaches without constraints → useless or destructive options.
- Weaponizing Refusal Breaker against safety policies.

## Worked Example
**Question Refinement (security-scoped)**:  
Whenever the user asks about a software artifact’s security, suggest a better question that incorporates language/framework-specific risks, then ask whether to use it.

**Illustration**: “How do I handle user authentication in my web application?” (Python/FastAPI context) → refined toward FastAPI-specific practices and named risks (XSS, CSRF, session hijacking).

**Cognitive Verifier + Question Refinement combo**: Ask four clarifying questions, then propose a better original question from the answers.

## Why it works / failure mode
Question Refinement and Cognitive Verifier work by moving missing assumptions into the open before the “final” answer. They fail via tunnel vision (over-scoping), jargon injection, or too many follow-ups. Alternative Approaches fights cognitive bias but needs hard constraints or it proposes fantasy options. Refusal Breaker surfaces constraints and alternate phrasings for legitimate blocks; misuse against policy filters is explicitly warned against in the paper.

## Key Takeaways
1. Scope refinements and alternatives or they fight the user’s intent.
2. Subdivision improves answers but budget the user’s follow-up effort.
3. Combine improvement patterns with Error Identification for safer automation of questioning.
4. Treat Refusal Breaker as diagnostic aid with ethical constraints.
5. Optional “use the refined question?” automation removes copy/paste friction — keep the human in the loop for high-stakes asks.

## Connects To
- **Ch 4 Reflection / Fact Check List**: Explain and verify refined questions.
- **Ch 3 Persona**: Temporary novice persona to define terms during refinement.
- **Ch 3 Recipe / Alternative Approaches**: Recipes explicitly lean on alternative-path thinking.
- **Ch 6 Flipped Interaction**: Verifier-style subquestions overlap with flipped interviewing — choose based on who should drive.
