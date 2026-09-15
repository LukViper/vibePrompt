# Chapter 6: Output Control Patterns

## Core Idea
Output Control patterns constrain how answers look, which schema they follow, which procedure they obey, or how they are verified before finalization.

## Frameworks Introduced
- **Output Control (strategy)**: form, schema, procedure, or verification of generated output (White: Output Customization).
- **VisualizationGenerator**: Produces visual or tabular representations of information.
  - Classification: `Output Control » Output formatting @ Output Format/Style`
  - When to use: Use VisualizationGenerator when information should be presented as a table, diagram description, or visual layout in text.
  - How: Require a visual/tabular representation (Markdown table, ASCII, structured layout) of the content.
  - Trade-offs: Improves scanability; not true graphics—keep expectations textual unless tools render it.
- **Recipe**: Specifies a reusable ordered procedure for completing tasks.
  - Classification: `Output Control » Procedural @ Directive, Procedural Steps`
  - When to use: Use Recipe when the model must follow a reusable ordered procedure inside one prompt.
  - How: Define named steps the model must execute in order for the task class.
  - Trade-offs: Repeatable workflows; can become rigid if steps don’t fit the instance.
- **SelfVerification**: Checks and revises its answer before finalizing output.
  - Classification: `Output Control » Verification @ Constraints, Procedural Steps`
  - When to use: Use SelfVerification when the model should check and revise its answer before finalizing.
  - How: Answer → verify against criteria/evidence → revise if checks fail → emit final.
  - Trade-offs: Catches some errors; self-checks can rubber-stamp mistakes. Pair with FactCheckList or external review.
  - Also known as: Self-Verification
- **SelfCalibration**: Estimates answer confidence and revises or abstains when uncertain.
  - Classification: `Output Control » Verification @ Constraints, Procedural Steps`
  - When to use: Use SelfCalibration when you need an explicit confidence signal to accept, revise, or abstain.
  - How: Answer → confidence in [min,max] + brief justification → revise/abstain below threshold.
  - Trade-offs: Makes uncertainty visible; confidence is not calibrated probability—never sole gate for high-stakes.
  - Also known as: Self-Calibration
- **FactCheckList**: Lists factual claims needed to verify the output.
  - Classification: `Output Control » Verification @ Constraints, Procedural Steps`
  - When to use: Use FactCheckList when the output depends on discrete factual claims that should be enumerated for checking.
  - How: Require a list of factual claims the answer rests on (and optionally verify each).
  - Trade-offs: Supports auditing; lists can be incomplete or include unverified claims presented as fact.
- **Reflection**: Critiques an initial answer and improves the response.
  - Classification: `Output Control » Verification @ Constraints, Procedural Steps`
  - When to use: Use Reflection when an initial draft should be critiqued and improved in the same turn.
  - How: Produce draft → critique against criteria → produce improved response.
  - Trade-offs: Often raises quality; critique may be shallow or stylistic only.
  - Also known as: Self-reflection Prompting
- **OutputAutomater**: Requires a structured, machine-readable output format such as JSON, XML, or CSV.
  - Classification: `Output Control » Output formatting @ Output Format/Style`
  - When to use: Use OutputAutomater when downstream systems need machine-readable structured output (JSON/XML/CSV/code).
  - How: Require a concrete machine-readable format and forbid prose wrappers unless asked.
  - Trade-offs: Enables automation; still needs parsers/validators—malformed output happens.
- **Template**: Fills a reusable template while preserving its structure.
  - Classification: `Output Control » Output formatting @ Directive, Output Format/Style`
  - When to use: Use Template when a fixed skeleton must be preserved and only slots filled.
  - How: Provide the template; instruct to fill placeholders without altering surrounding structure.
  - Trade-offs: Stable documents/forms; differs from SchemaSpecs (schema/fields/values vs fill-this-skeleton).
- **SchemaSpecs**: Constrains output to a specified schema or field structure.
  - Classification: `Output Control » Schema specification @ Output Format/Style`
  - When to use: Use SchemaSpecs when fields, types, labels, or answer-space vocabulary must be constrained.
  - How: Specify schema + fields + optional allowed_values; instruct null/uncertain handling.
  - Trade-offs: Comparable/parsable outputs; can force fit or hide uncertainty. Validate externally.
  - Also known as: Constrained Vocabulary Prompting, Output Formatting / Answer Shape & Space (vocabulary terms), Answer Space, Output Format

## Key Concepts
- **Output formatting**: subcategory hosting ['VisualizationGenerator', 'OutputAutomater', 'Template']
- **Procedural**: subcategory hosting ['Recipe']
- **Schema specification**: subcategory hosting ['SchemaSpecs']
- **Verification**: subcategory hosting ['SelfVerification', 'SelfCalibration', 'FactCheckList', 'Reflection']

## Mental Models
- Use **SchemaSpecs** / **Template** / **OutputAutomater** / **VisualizationGenerator** when Y = shape/usability of the artifact.
- Use **Recipe** when Y = ordered procedure for completing tasks.
- Use **SelfVerification** / **SelfCalibration** / **FactCheckList** / **Reflection** when Y = trust/calibration of content.
- Prefer **Template** to fill a skeleton; **SchemaSpecs** to constrain fields/values; **OutputAutomater** to demand machine-readable packaging.

## Anti-patterns
- **Schema without null/uncertain policy**: forces hallucinated fields.
- **SelfCalibration as sole safety gate**: confidence ≠ calibrated probability.
- **Equating Template with SchemaSpecs**: different primary intentions (boundary overlap).

## Worked Example
**SchemaSpecs (bug triage):**
```
Classify the bug report.
Use JSON with fields:
- summary: string
- severity: one of [low, medium, high, critical]
- category: one of [bug, enhancement, question]
- rationale: string
Use null when a field cannot be determined.
Bug report: {{bug_report}}
```
**SelfCalibration add-on:** for each issue, confidence 0–100% + revise/abstain below 60%.

## Key Takeaways
1. Nine patterns—largest family.
2. Verification quartet shares Constraints + Procedural Steps.
3. Formatting trio + SchemaSpecs anchor Output Format/Style.
4. Always validate machine-readable outputs externally.

## Connects To
- **Ch 7**: Persona/ContextManager often compose with schemas
- **cheatsheet.md**: format vs verify decisions
