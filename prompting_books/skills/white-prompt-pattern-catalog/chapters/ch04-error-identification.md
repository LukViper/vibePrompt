# Chapter 4: Error Identification

## Core Idea
Error Identification patterns make hidden assumptions and mistakes inspectable — either as a checkable fact list or as an explicit rationale — so users can due-diligence convincing but wrong LLM text.

## Frameworks Introduced
- **Fact Check List**: Force the model to emit the fundamental facts/assumptions the answer depends on, placed for review.
  - When to use: Non-expert domains, high-risk areas (e.g., security), outputs amenable to fact-checking (versions, claims, dependencies).
  - How — fundamental statements: **Generate a set of facts contained in the output**; **insert them at a specific point** (prefer after the answer); **list fundamental facts that would undermine veracity if wrong**. Scope to topics you can’t easily verify yourself.
  - Why it works: Users can compare list ↔ output for presence/omissions; scopes cognitive load.
  - Failure mode: Not all outputs are fact-checkable (model may refuse for raw code samples); the list itself can err.

- **Reflection**: Require reasoning and assumptions behind answers.
  - When to use: Nuanced topics, prompt debugging, assessing validity, understanding interpretation chosen by the model.
  - How: **Whenever you generate an answer, explain the reasoning and assumptions** (optional: **…so I can improve my question**). Can scope to specific aspects (e.g., framework selection only) and ask for examples/evidence.
  - Why it works: Surfaces assumptions, gaps, and prompt issues.
  - Failure mode: Non-experts may not understand technical rationales; rationale can itself contain errors — combine with Fact Check List.

## Key Concepts
- **Convincing incorrectness**: Fluency ≠ accuracy (fake stats, wrong library versions).
- **Due diligence hook**: Make dependencies of the answer explicit.
- **After-output fact lists**: Read claims first, then see what must be verified.
- **Prompt debugging**: Reflection as feedback for refining questions.

## Mental Models
- Use **Fact Check List** when you are not the domain expert for the answer’s critical claims.
- Use **Reflection** when you need to know *why* the model answered that way — especially for ambiguous topics.
- Prefer **Fact Check List + Reflection** together when stakes are high and wording can smuggle false premises.

## Anti-patterns
- Trusting fluent answers without a verification surface.
- Asking for fact lists on output types the model refuses to treat as factual claims.
- Treating Reflection text as ground truth without independent checks.

## Worked Example
**Scoped Fact Check List**:  
“From now on, when you generate an answer, create a set of facts that the answer depends on that should be fact-checked and list this set of facts at the end of your output. Only include facts related to cybersecurity.”

**Effect**: A general coding answer still ends with security-relevant assumptions/versions/claims to verify — not an encyclopedic dump of every sentence.

**Reflection (code frameworks, compact)**: After answers about framework choice, explain reasoning/assumptions, support with code evidence, and call out ambiguities/limits — scoped so not every trivial token is justified.

## Why it works / failure mode
Fact Check List works because users can *cross-check presence* of listed facts in the answer and spot omissions — even if the list itself can err. It fails when the output isn’t fact-shaped (model may refuse for raw code) or when experts don’t need the overhead. Reflection works as a prompt debugger and ambiguity resolver; it fails when the audience can’t parse the rationale or when the rationale smuggles new falsehoods — hence the Fact Check List pairing.

## Key Takeaways
1. Make critical facts explicit and checkable; place them where review is easy.
2. Scope fact lists to risk/ignorance areas to reduce noise.
3. Use Reflection to expose interpretation and enable prompt repair.
4. Combine both when either list or rationale alone is insufficient.
5. Prefer after-answer fact lists when terminology may be unfamiliar.

## Connects To
- **Ch 5 Question Refinement**: Fact Check List mitigates inaccurate refined questions; Reflection explains refinements.
- **Ch 3 Output Automater**: Verify facts before running generated scripts.
- **Ch 5 Cognitive Verifier**: Sub-questions + Reflection improve answer quality under uncertainty.
- **Ch 3 Recipe**: Reflection-style justification helps users accept or reject filled-in steps.
