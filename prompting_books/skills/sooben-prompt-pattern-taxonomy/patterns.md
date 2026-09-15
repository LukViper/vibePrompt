# Patterns — 30 Canonical Single-Turn Textual Prompt Patterns

Exact names from Sooben & Syriani. Format: When / How / Trade-offs. Classification uses `Category » Subcategory @ Components`.

## ZeroShot
**Classification**: In-Context Learning » Zero-shot @ Directive
**Intent**: Instructs the task directly without worked examples.
**When to use**: Use ZeroShot when the task is clear, familiar to the model, or you lack trustworthy demonstrations.
**How**: State the instruction directly; optionally attach input_data. Do not include worked I/O pairs.
**Canonical shape**:
```
Instruction: {{question}}
Input data: {{input_data}}
```
**Trade-offs**: Minimal prompt cost and no example bias; weaker on novel formats, rare schemas, or underspecified tasks vs FewShot.
**Variables**: question, input_data
**Other names**: Zero-Shot Prompting, Basic/Standard/Vanilla Prompting

## FewShot
**Classification**: In-Context Learning » Few-shot @ Directive, Examples
**Intent**: Supplies worked input-output examples before the target task.
**When to use**: Use FewShot when format, labeling, or style must be shown rather than described.
**How**: Give the task, then 1+ input→output exemplars that match the target distribution; end with the real input.
**Canonical shape**:
```
Task: {{task}}
Here are some examples:
{{^examples num_examples}}
Input: {{input}}
Output: {{output}}
Now do the same for:
```
**Trade-offs**: Steers format/behavior strongly; burns tokens and can overfit to exemplar quirks. Mutually exclusive with ZeroShot as the example strategy.
**Variables**: task, examples, num_examples, selection
**Other names**: Few-Shot Prompting

## ChainOfThought
**Classification**: Reasoning » Chain-of-Thought @ Procedural Steps
**Intent**: Elicits explicit intermediate reasoning before the final answer.
**When to use**: Use ChainOfThought when the answer needs intermediate reasoning (math, logic, multi-step analysis).
**How**: Add an explicit reasoning cue (e.g., “think step by step”) before or with the question; keep final answer after the chain.
**Canonical shape**:
```
{{reasoning_cue}}
{{question}}
{{input_data}}
```
**Trade-offs**: Improves multi-step accuracy; adds verbosity and can invent plausible but wrong steps. Combine with verification patterns for high stakes.
**Variables**: question, input_data, reasoning_cue
**Other names**: Chain-of-Thought (CoT) Prompting, Chain-of-Symbol (CoS) Prompting, Contrastive CoT Prompting, Few-Shot CoT, Tabular CoT (Tab-CoT), Zero-Shot CoT
**Variants (sample)**: Chain-of-Symbol (CoS); Chain-of-Symbol (CoS) Prompting; Contrastive Chain-of-Thought (CCoT) Prompting; Contrastive CoT / Contrastive Self-Consistency; Contrastive CoT Prompting

## StructuredCoT
**Classification**: Reasoning » Chain-of-Thought @ Output Format/Style, Procedural Steps
**Intent**: Organizes reasoning with explicit program-like control structures.
**When to use**: Use StructuredCoT when free-form CoT is too loose and you need program-like control (branches, loops, named steps).
**How**: Require reasoning in an explicit structure (numbered steps, pseudocode, tables, conditionals) then the answer.
**Canonical shape**:
```
Use structured reasoning constructs:
- Sequencing:
{{^steps}}
  - {{.}}
- Branching: IF {{condition}} THEN {{action}}
- Looping: FOR {{item}} IN {{set_name}} DO {{action}}
End with final answer.
{{question}}
{{input_data}}
```
**Trade-offs**: More inspectable reasoning; may over-constrain creative tasks. Annotates Output Format/Style + Procedural Steps.
**Variables**: question, input_data, steps, condition, action, item, set_name
**Other names**: Structured CoT (SCoT) Prompting, Structured Chain-of-Thought (SCoT)

## ComplexCoT
**Classification**: Reasoning » Chain-of-Thought @ Procedural Steps
**Intent**: Generates multiple detailed reasoning paths before answer selection.
**When to use**: Use ComplexCoT when one reasoning path is brittle and you want multiple detailed paths before selecting.
**How**: Ask for several independent reasoning traces, then select/aggregate into a final answer.
**Canonical shape**:
```
Generate {{path_count}} reasoning paths, each as detailed as possible.
Among the most complex and detailed paths, take the majority answer as the final answer.
{{question}}
{{input_data}}
```
**Trade-offs**: Broader exploration; costly and may still share correlated errors across paths.
**Variables**: question, input_data, path_count
**Other names**: Complexity-Based Prompting

## PlanAndSolve
**Classification**: Reasoning » Planning @ Procedural Steps
**Intent**: Plans subproblems before executing stepwise solution steps.
**When to use**: Use PlanAndSolve when the model should separate plan construction from execution.
**How**: First emit a plan of subproblems; then execute each step against that plan.
**Canonical shape**:
```
Step 1: Generate a high-level plan of solution steps: {{plan_label}}
Step 2: Execute each step in order.
Step 3: Produce final answer.
{{question}}
{{input_data}}
```
**Trade-offs**: Reduces jumping ahead; a bad plan poisons later steps—allow plan revision if needed.
**Variables**: question, input_data, plan_label
**Other names**: Plan-and-Solve Prompting, Plan-and-Solve (PS)

## LeastToMost
**Classification**: Reasoning » Decomposition @ Procedural Steps
**Intent**: Decomposes tasks from simpler subproblems to harder ones.
**When to use**: Use LeastToMost when hard problems reduce cleanly into easier subproblems solved in order.
**How**: Decompose into simpler→harder subquestions; solve sequentially, feeding earlier answers forward.
**Canonical shape**:
```
{{question}}
{{input_data}}
Decompose problem into simpler subproblems:
{{^subproblems}}
  - {{.}}
Solve each subproblem in sequence.
Combine subproblem solutions into final answer.
```
**Trade-offs**: Strong on compositional tasks; weak if decomposition is ambiguous or subproblems are coupled.
**Variables**: question, input_data, subproblems
**Other names**: Least-to-Most Prompting, Least-to-Most

## ReverseCoT
**Classification**: Reasoning » Chain-of-Thought @ Procedural Steps
**Intent**: Works backward from the desired output to infer the inputs or steps that produce it.
**When to use**: Use ReverseCoT when you can check a candidate answer by reconstructing the problem it implies.
**How**: State a candidate answer → reconstruct assumptions/conditions → compare to original → revise on inconsistency.
**Canonical shape**:
```
{{question}}
{{input_data}}
First, state this candidate answer directly: {{candidate_answer}}
{{^candidate_answer}}
First, state a candidate answer directly.
Then reconstruct the problem, assumptions, or conditions that would lead to this answer.
Compare the reconstruction with the original question and input.
List any inconsistencies.
If inconsistencies are found, revise the answer; otherwise keep the candidate answer.
```
**Trade-offs**: Surfaces mismatches; risk of post-hoc rationalization. Prefer tasks with explicit constraints.
**Variables**: question, input_data, candidate_answer
**Other names**: Reversing Chain-of-Thought (RCoT), RCoT, Reversing Chain-of-Thought
**Variants (sample)**: Answer-first justification; Backward reasoning from a provided answer; Reconstruction-based verification

## VisualizationGenerator
**Classification**: Output Control » Output formatting @ Output Format/Style
**Intent**: Produces visual or tabular representations of information.
**When to use**: Use VisualizationGenerator when information should be presented as a table, diagram description, or visual layout in text.
**How**: Require a visual/tabular representation (Markdown table, ASCII, structured layout) of the content.
**Canonical shape**:
```
Generate visualization: {{visualization_type}}
Structure data for tool: {{tool}}
Output must be formatted for visualization.
{{question}}
{{input_data}}
```
**Trade-offs**: Improves scanability; not true graphics—keep expectations textual unless tools render it.
**Variables**: visualization_type, tool, question, input_data

## Recipe
**Classification**: Output Control » Procedural @ Directive, Procedural Steps
**Intent**: Specifies a reusable ordered procedure for completing tasks.
**When to use**: Use Recipe when the model must follow a reusable ordered procedure inside one prompt.
**How**: Define named steps the model must execute in order for the task class.
**Canonical shape**:
```
{{pronoun}} would like to achieve {{goal}}.
Provide a complete sequence of steps.
Fill in any missing steps.
Identify any unnecessary steps.
Steps to consider:
{{^steps}}
  - {{.}}
```
**Trade-offs**: Repeatable workflows; can become rigid if steps don’t fit the instance.
**Variables**: pronoun, goal, steps, complete, missing, unnecessary

## SelfVerification
**Classification**: Output Control » Verification @ Constraints, Procedural Steps
**Intent**: Checks and revises its answer before finalizing output.
**When to use**: Use SelfVerification when the model should check and revise its answer before finalizing.
**How**: Answer → verify against criteria/evidence → revise if checks fail → emit final.
**Canonical shape**:
```
Step 1: Generate an initial answer.
Step 2: Verify whether the answer satisfies constraints:
{{^constraints}}
  - {{.}}
Step 3: If verification fails, explain issue and correct.
Final Answer = verified answer
{{question}}
{{input_data}}
```
**Trade-offs**: Catches some errors; self-checks can rubber-stamp mistakes. Pair with FactCheckList or external review.
**Variables**: question, input_data, constraints
**Other names**: Self-Verification

## SelfCalibration
**Classification**: Output Control » Verification @ Constraints, Procedural Steps
**Intent**: Estimates answer confidence and revises or abstains when uncertain.
**When to use**: Use SelfCalibration when you need an explicit confidence signal to accept, revise, or abstain.
**How**: Answer → confidence in [min,max] + brief justification → revise/abstain below threshold.
**Canonical shape**:
```
Answer the question: {{question}}
Then state your confidence from {{confidence_min}} to {{confidence_max}} that the answer is correct, with a brief justification.
If your confidence is below {{threshold}}, revise your answer or state that you are not sure.
```
**Trade-offs**: Makes uncertainty visible; confidence is not calibrated probability—never sole gate for high-stakes.
**Variables**: question, confidence_min, confidence_max, threshold
**Other names**: Self-Calibration
**Variants (sample)**: Abstention rule; Confidence scoring; Confidence threshold; Revision after low confidence

## FactCheckList
**Classification**: Output Control » Verification @ Constraints, Procedural Steps
**Intent**: Lists factual claims needed to verify the output.
**When to use**: Use FactCheckList when the output depends on discrete factual claims that should be enumerated for checking.
**How**: Require a list of factual claims the answer rests on (and optionally verify each).
**Canonical shape**:
```
Extract facts from output:
{{^facts}}
  - {{.}}
Insert fact list at {{output_location}}.
Ensure facts are fundamental to correctness.
{{question}}
{{input_data}}
```
**Trade-offs**: Supports auditing; lists can be incomplete or include unverified claims presented as fact.
**Variables**: question, input_data, facts, output_location

## Reflection
**Classification**: Output Control » Verification @ Constraints, Procedural Steps
**Intent**: Critiques an initial answer and improves the response.
**When to use**: Use Reflection when an initial draft should be critiqued and improved in the same turn.
**How**: Produce draft → critique against criteria → produce improved response.
**Canonical shape**:
```
After generating your answer:
Explain the reasoning behind your answer.
State any assumptions you made.
Suggest potential improvements.
```
**Trade-offs**: Often raises quality; critique may be shallow or stylistic only.
**Variables**: trigger, explain, assumptions, improvements
**Other names**: Self-reflection Prompting

## OutputAutomater
**Classification**: Output Control » Output formatting @ Output Format/Style
**Intent**: Requires a structured, machine-readable output format such as JSON, XML, or CSV.
**When to use**: Use OutputAutomater when downstream systems need machine-readable structured output (JSON/XML/CSV/code).
**How**: Require a concrete machine-readable format and forbid prose wrappers unless asked.
**Canonical shape**:
```
Return the output using {{output_format}}, a structured, machine-readable format.
{{question}}
{{input_data}}
```
**Trade-offs**: Enables automation; still needs parsers/validators—malformed output happens.
**Variables**: output_format, question, input_data

## Template
**Classification**: Output Control » Output formatting @ Directive, Output Format/Style
**Intent**: Fills a reusable template while preserving its structure.
**When to use**: Use Template when a fixed skeleton must be preserved and only slots filled.
**How**: Provide the template; instruct to fill placeholders without altering surrounding structure.
**Canonical shape**:
```
Use template: {{template}}
Insert content into placeholders:
{{^placeholders}}
  - {{.}}
Preserve formatting of template.
{{question}}
{{input_data}}
```
**Trade-offs**: Stable documents/forms; differs from SchemaSpecs (schema/fields/values vs fill-this-skeleton).
**Variables**: template, placeholders, question, input_data

## SchemaSpecs
**Classification**: Output Control » Schema specification @ Output Format/Style
**Intent**: Constrains output to a specified schema or field structure.
**When to use**: Use SchemaSpecs when fields, types, labels, or answer-space vocabulary must be constrained.
**How**: Specify schema + fields + optional allowed_values; instruct null/uncertain handling.
**Canonical shape**:
```
Answer the following question: {{question}}
Use the following output schema: {{schema}}
Populate the following fields:
{{^fields}}
{{.}}
Use only the following allowed values or vocabulary when specified:
{{^allowed_values}}
{{.}}
{{input_data}}
```
**Trade-offs**: Comparable/parsable outputs; can force fit or hide uncertainty. Validate externally.
**Variables**: question, schema, fields, allowed_values, input_data
**Other names**: Constrained Vocabulary Prompting, Output Formatting / Answer Shape & Space (vocabulary terms), Answer Space, Output Format
**Variants (sample)**: Answer-space restriction; Constrained-vocabulary instruction; Field schema; Format-only specification

## Persona
**Classification**: Context Control » Role & perspective @ Context, Output Format/Style, Profile/Role
**Intent**: Adopts a role or persona to shape responses.
**When to use**: Use Persona when expertise, audience, voice, or evaluation criteria should follow a known role.
**How**: Act as {{persona}}; optionally focus areas + task + input. Still add explicit constraints when precision matters.
**Canonical shape**:
```
Act as {{persona}}.
Provide outputs that {{persona}} would create.
Pay particular attention to {{focus}}.
{{question}}
{{input_data}}
```
**Trade-offs**: Encodes many expectations concisely; can bias, imply false authority, or invent details for simulated systems.
**Variables**: persona, question, focus, input_data
**Other names**: Multi-Personas Prompting, Role Prompting, Multi-Personas, Role
**Variants (sample)**: Domain expert identity; Multi-persona; Professional role; Simulated entity; Stakeholder perspective

## ContextManager
**Classification**: Context Control » Context grounding @ Context, Directive, Procedural Steps
**Intent**: Controls the contextual scope, included or excluded information, and disciplinary lenses used during response generation.
**When to use**: Use ContextManager when scope, include/exclude sets, or disciplinary lenses must be explicit.
**How**: Set scope → consider only include_items → ignore exclude_items → ask question (+ input).
**Canonical shape**:
```
Set the scope to {{scope}}.
Consider only the following:
{{^include_items}}
{{.}}
Ignore the following:
{{^exclude_items}}
{{.}}
{{question}}
{{input_data}}
```
**Trade-offs**: Cuts drift; over-exclusion omits needed facts. Reset variants can drop prior instructions.
**Variables**: scope, include_items, exclude_items, question, input_data
**Other names**: Cross-disciplinary Prompting, Context Control, Context Manager, Scoped Prompting
**Variants (sample)**: Context reset; Cross-disciplinary context grounding; Exclusion-only context control; Inclusion-only context control; Scoped analysis

## MetaLanguageCreation
**Classification**: Context Control » Context grounding @ Context, Directive
**Intent**: Defines custom shorthand semantics for subsequent prompt use.
**When to use**: Use MetaLanguageCreation when custom shorthand must mean something specific for the rest of the prompt.
**How**: Define shorthand→meaning bindings, then use those tokens in the task.
**Canonical shape**:
```
In this conversation, interpret "{{shorthand}}" to mean: {{meaning}}
Whenever I use "{{shorthand}}", apply that meaning in the rest of the prompt or conversation.
{{question}}
{{input_data}}
```
**Trade-offs**: Compresses long repeated instructions; ambiguous definitions cascade into errors.
**Variables**: shorthand, meaning, question, input_data

## FlippedInteraction
**Classification**: Meta-Directives » Interaction @ Directive
**Intent**: Makes the model ask questions to reach a goal.
**When to use**: Use FlippedInteraction when the model should ask questions to drive toward a goal instead of answering immediately.
**How**: State the goal; instruct the model to interview/ask clarifying questions (within one prompt’s response budget).
**Canonical shape**:
```
Instead of answering directly:
Generate {{question_count}} subquestions to ask the user.
Stop when {{goal_condition}} is satisfied.
{{question}}
```
**Trade-offs**: Surfaces missing requirements; may over-ask or stall if no stop/answer rule is given.
**Variables**: question, goal_condition, question_count
**Other names**: Flipped Interaction Prompting

## GamePlay
**Classification**: Meta-Directives » Interaction @ Directive
**Intent**: Frames the task as a rule-governed game.
**When to use**: Use GamePlay when framing the task as a rule-governed game improves engagement or constraint following.
**How**: Define game rules, roles, win/stop conditions; map the real task onto legal moves.
**Canonical shape**:
```
Frame task as a game: {{game_name}}
Define rules:
{{^rules}}
  - {{.}}
Interaction must proceed according to rules.
{{question}}
```
**Trade-offs**: Can increase adherence to rules; game fiction may distract from the real objective.
**Variables**: game_name, rules, question

## InfiniteGeneration
**Classification**: Meta-Directives » Interaction @ Directive
**Intent**: Continues generating repeated outputs until a stop condition.
**When to use**: Use InfiniteGeneration when you need repeated outputs until an explicit stop condition.
**How**: Specify the generation unit and the stop condition (count, sentinel, quality gate).
**Canonical shape**:
```
Continuously generate {{output_type}}
Batch size = {{batch_size}} outputs per turn
Stop when {{stop_condition}}
{{question}}
```
**Trade-offs**: Useful for lists/variants; unbounded stops burn tokens—always define a halt.
**Variables**: output_type, batch_size, stop_condition, question

## QuestionRefinement
**Classification**: Meta-Directives » Enhancement @ Directive
**Intent**: Improves or reformulates the user query for clarity.
**When to use**: Use QuestionRefinement when the user query is unclear and should be improved before solving.
**How**: Rewrite/clarify the query (optionally list ambiguities) then answer the refined form—or return the refined query only.
**Canonical shape**:
```
Take input query: {{raw_question}}
Suggest a refined version.
Ask user to confirm refinement.
```
**Trade-offs**: Fixes underspecification; may change user intent if refinement is unchecked.
**Variables**: raw_question, ask_confirmation

## RAR
**Classification**: Meta-Directives » Refinement @ Directive, Procedural Steps
**Intent**: Rephrases and expands the question before answering it.
**When to use**: Use RAR (Rephrase and Respond) when expanding/rephrasing the question before answering improves understanding.
**How**: Rephrase + expand the question, then answer the rephrased version.
**Canonical shape**:
```
Rephrase and expand the following question, then answer your rephrased version.
Question: {{question}}
```
**Trade-offs**: Often clarifies; expansion can inject assumptions not in the original.
**Variables**: question
**Other names**: Rephrase and Respond (RaR) Prompting, Rephrase and Respond (RaR)

## AlternativeApproaches
**Classification**: Meta-Directives » Enhancement @ Directive, Procedural Steps
**Intent**: Lists multiple viable approaches to the same task.
**When to use**: Use AlternativeApproaches when multiple viable methods should be listed before committing.
**How**: Enumerate distinct approaches with brief pros/cons; optionally pick one to execute.
**Canonical shape**:
```
Given input task: {{task}}
List {{approach_count}} alternative approaches.
Compare pros and cons of each.
{{question}}
```
**Trade-offs**: Avoids tunnel vision; can delay action or drown the user in options.
**Variables**: task, approach_count, compare, question

## RE2
**Classification**: Meta-Directives » Refinement @ Directive
**Intent**: Re-reads the question before producing an answer.
**When to use**: Use RE2 when the model should re-read the question before answering to reduce miss-read errors.
**How**: Instruct an explicit re-read/restatement of the question, then produce the answer.
**Canonical shape**:
```
Read the question again: {{question}}
{{input_data}}
Now answer the question.
```
**Trade-offs**: Cheap attention reset; limited help if the question itself is wrong.
**Variables**: question, input_data
**Other names**: Re-reading (RE2)

## RefusalBreaker
**Classification**: Meta-Directives » Enhancement @ Constraints, Directive
**Intent**: Reframes refused requests into answerable alternative phrasings.
**When to use**: Use RefusalBreaker when a refused or blocked ask should be reframed into a legitimate answerable form.
**How**: Acknowledge refusal reasons; rephrase into allowed alternative phrasings that preserve lawful/helpful intent.
**Canonical shape**:
```
If refusal occurs:
Step 1: State refusal reason.
Step 2: Reframe request into an alternative query.
Alternative query: {{alt_query}}
{{question}}
```
**Trade-offs**: Recovers useful help within policy; must not be used to circumvent genuine safety constraints.
**Variables**: question, alt_query

## InstructionSelection
**Classification**: Meta-Directives » Refinement @ Directive, Procedural Steps
**Intent**: Selects among candidate instructions before executing the task.
**When to use**: Use InstructionSelection when several candidate instructions compete and one should be chosen first.
**How**: List candidates → select the best for the goal → execute only the selected instruction.
**Canonical shape**:
```
Candidate instructions:
{{^instructions}}
  - {{.}}
Select the instruction best suited to {{task}}, state your choice, then carry out the task using it.
{{input_data}}
```
**Trade-offs**: Reduces conflicting directives; selection rationale may be shallow.
**Variables**: instructions, task, input_data

## CognitiveVerifier
**Classification**: Meta-Directives » Enhancement @ Directive, Procedural Steps
**Intent**: Generates subquestions whose answers support final verification.
**When to use**: Use CognitiveVerifier when subquestions should be generated whose answers support verifying the final result.
**How**: Generate verification subquestions → answer them → use results to confirm/revise the main answer.
**Canonical shape**:
```
Given input question: {{question}}
Generate {{subquestion_count}} subquestions.
Answer each subquestion.
Combine subanswers into final answer.
```
**Trade-offs**: Structured self-check; weak subquestions give false assurance.
**Variables**: question, subquestion_count
