# Chapter 8: Meta-Directives Patterns

## Core Idea
Meta-Directives patterns operate on the prompt, query, or interaction itself—refine, re-read, reframe, select instructions, or change interaction mode—rather than only solving the domain task.

## Frameworks Introduced
- **Meta-Directives (strategy)**: improve/refine/reframe the request or interaction protocol.
- **FlippedInteraction**: Makes the model ask questions to reach a goal.
  - Classification: `Meta-Directives » Interaction @ Directive`
  - When to use: Use FlippedInteraction when the model should ask questions to drive toward a goal instead of answering immediately.
  - How: State the goal; instruct the model to interview/ask clarifying questions (within one prompt’s response budget).
  - Trade-offs: Surfaces missing requirements; may over-ask or stall if no stop/answer rule is given.
  - Also known as: Flipped Interaction Prompting
- **GamePlay**: Frames the task as a rule-governed game.
  - Classification: `Meta-Directives » Interaction @ Directive`
  - When to use: Use GamePlay when framing the task as a rule-governed game improves engagement or constraint following.
  - How: Define game rules, roles, win/stop conditions; map the real task onto legal moves.
  - Trade-offs: Can increase adherence to rules; game fiction may distract from the real objective.
- **InfiniteGeneration**: Continues generating repeated outputs until a stop condition.
  - Classification: `Meta-Directives » Interaction @ Directive`
  - When to use: Use InfiniteGeneration when you need repeated outputs until an explicit stop condition.
  - How: Specify the generation unit and the stop condition (count, sentinel, quality gate).
  - Trade-offs: Useful for lists/variants; unbounded stops burn tokens—always define a halt.
- **QuestionRefinement**: Improves or reformulates the user query for clarity.
  - Classification: `Meta-Directives » Enhancement @ Directive`
  - When to use: Use QuestionRefinement when the user query is unclear and should be improved before solving.
  - How: Rewrite/clarify the query (optionally list ambiguities) then answer the refined form—or return the refined query only.
  - Trade-offs: Fixes underspecification; may change user intent if refinement is unchecked.
- **RAR**: Rephrases and expands the question before answering it.
  - Classification: `Meta-Directives » Refinement @ Directive, Procedural Steps`
  - When to use: Use RAR (Rephrase and Respond) when expanding/rephrasing the question before answering improves understanding.
  - How: Rephrase + expand the question, then answer the rephrased version.
  - Trade-offs: Often clarifies; expansion can inject assumptions not in the original.
  - Also known as: Rephrase and Respond (RaR) Prompting, Rephrase and Respond (RaR)
- **AlternativeApproaches**: Lists multiple viable approaches to the same task.
  - Classification: `Meta-Directives » Enhancement @ Directive, Procedural Steps`
  - When to use: Use AlternativeApproaches when multiple viable methods should be listed before committing.
  - How: Enumerate distinct approaches with brief pros/cons; optionally pick one to execute.
  - Trade-offs: Avoids tunnel vision; can delay action or drown the user in options.
- **RE2**: Re-reads the question before producing an answer.
  - Classification: `Meta-Directives » Refinement @ Directive`
  - When to use: Use RE2 when the model should re-read the question before answering to reduce miss-read errors.
  - How: Instruct an explicit re-read/restatement of the question, then produce the answer.
  - Trade-offs: Cheap attention reset; limited help if the question itself is wrong.
  - Also known as: Re-reading (RE2)
- **RefusalBreaker**: Reframes refused requests into answerable alternative phrasings.
  - Classification: `Meta-Directives » Enhancement @ Constraints, Directive`
  - When to use: Use RefusalBreaker when a refused or blocked ask should be reframed into a legitimate answerable form.
  - How: Acknowledge refusal reasons; rephrase into allowed alternative phrasings that preserve lawful/helpful intent.
  - Trade-offs: Recovers useful help within policy; must not be used to circumvent genuine safety constraints.
- **InstructionSelection**: Selects among candidate instructions before executing the task.
  - Classification: `Meta-Directives » Refinement @ Directive, Procedural Steps`
  - When to use: Use InstructionSelection when several candidate instructions compete and one should be chosen first.
  - How: List candidates → select the best for the goal → execute only the selected instruction.
  - Trade-offs: Reduces conflicting directives; selection rationale may be shallow.
- **CognitiveVerifier**: Generates subquestions whose answers support final verification.
  - Classification: `Meta-Directives » Enhancement @ Directive, Procedural Steps`
  - When to use: Use CognitiveVerifier when subquestions should be generated whose answers support verifying the final result.
  - How: Generate verification subquestions → answer them → use results to confirm/revise the main answer.
  - Trade-offs: Structured self-check; weak subquestions give false assurance.

## Key Concepts
- **Enhancement**: subcategory hosting ['QuestionRefinement', 'AlternativeApproaches', 'RefusalBreaker', 'CognitiveVerifier']
- **Interaction**: subcategory hosting ['FlippedInteraction', 'GamePlay', 'InfiniteGeneration']
- **Refinement**: subcategory hosting ['RAR', 'RE2', 'InstructionSelection']

## Mental Models
- Use **QuestionRefinement** / **RAR** / **RE2** when Y = the question may be wrong, fuzzy, or misread.
- Use **InstructionSelection** when Y = competing instructions.
- Use **AlternativeApproaches** / **CognitiveVerifier** when Y = explore methods or verify via subquestions.
- Use **FlippedInteraction** / **GamePlay** / **InfiniteGeneration** when Y = interaction framing matters.
- Use **RefusalBreaker** only to rephrase into legitimate alternatives—not to bypass real safety limits.

## Anti-patterns
- **Unbounded InfiniteGeneration**: always set a stop condition.
- **Refinement that silently changes intent**: show the refined question.
- **Weaponizing RefusalBreaker**: out of ethical/scope use.

## Worked Example
**Composition sketch (meta + task):**
```
Re-read the question carefully (RE2).
If the ask is ambiguous, refine it (QuestionRefinement), then answer.
If multiple methods exist, list AlternativeApproaches and pick one.
Finally answer the task.
```
Meta-Directives operate on the request itself before/while solving the domain task.

## Key Takeaways
1. Ten patterns—Interaction, Enhancement, Refinement subcategories.
2. Most are Directive-primary; several add Procedural Steps.
3. RefusalBreaker uniquely pairs Constraints + Directive in this family.
4. Meta patterns compose cleanly in front of domain patterns.

## Connects To
- **Ch 9**: Composition / tension relations
- **Ch 1**: Still must remain single-turn textual structures
