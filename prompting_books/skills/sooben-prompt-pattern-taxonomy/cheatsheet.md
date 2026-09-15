# Cheatsheet — Decision Rules for Prompt Pattern Selection

## Pick a strategy first
| If the failure mode is… | Prefer strategy | Start with |
|---|---|---|
| Wrong/missing format or unusable artifact | Output Control | SchemaSpecs, Template, OutputAutomater, VisualizationGenerator |
| Wrong intermediate reasoning | Reasoning | ChainOfThought → StructuredCoT / PlanAndSolve / LeastToMost |
| Model ignores who/what context matters | Context Control | Persona and/or ContextManager |
| Bad question / wrong interaction mode | Meta-Directives | RE2, QuestionRefinement, RAR, FlippedInteraction |
| Need demonstrations of I/O behavior | In-Context Learning | FewShot (else ZeroShot) |

## Use X when Y
- Use **FewShot** when Y = format/labels must be shown; use **ZeroShot** when Y = instruction suffices.
- Use **PlanAndSolve** when Y = planning errors dominate; **LeastToMost** when Y = easy→hard decomposition.
- Use **ReverseCoT** when Y = answers must reconcile with the original problem statement.
- Use **SelfCalibration** when Y = you will act on confidence; never as sole high-stakes gate.
- Use **SchemaSpecs** when Y = fields/values; **Template** when Y = preserve a skeleton; **OutputAutomater** when Y = machine-readable packaging.
- Use **Persona** when Y = who speaks; **ContextManager** when Y = what context is in/out.
- Use **RefusalBreaker** only when Y = legitimate reframing—not policy evasion.

## Component placement (Table 1 instincts)
| Component | Almost always means | Canonical hosts |
|---|---|---|
| Profile/Role | identity assignment | Persona only |
| Examples | demonstrations present | FewShot only |
| Procedural Steps | in-prompt procedure/reasoning | Reasoning family; Recipe; verification quartet; several Meta-Directives |
| Output Format/Style | shape of artifact | SchemaSpecs, Template, OutputAutomater, VisualizationGenerator, StructuredCoT, Persona |
| Constraints | restrictions/checks | SelfVerification, SelfCalibration, FactCheckList, Reflection, RefusalBreaker |
| Context | grounding frame | Persona, ContextManager, MetaLanguageCreation |
| Directive | main ask | Zero/FewShot, many Meta-Directives, Recipe, Template, ContextManager |

## Composition recipes
1. **Reviewer pack**: Persona + ContextManager + SchemaSpecs + SelfCalibration
2. **Hard reasoning pack**: ChainOfThought or StructuredCoT + SelfVerification (+ FactCheckList if factual)
3. **Fuzzy ask pack**: RE2 → QuestionRefinement/RAR → domain pattern
4. **Automation pack**: SchemaSpecs or OutputAutomater + explicit null/uncertain policy
5. **Method shopping**: AlternativeApproaches → InstructionSelection → execute chosen path

## Tells & smells
- If exemplars disagree → fix FewShot set before adding CoT.
- If JSON keeps drifting → SchemaSpecs fields + allowed_values + null policy (not more Persona).
- If answers sound expert but ungrounded → drop reliance on Persona; add ContextManager + verification.
- If the model solves the wrong question → Meta-Directives first (RE2/RAR/QuestionRefinement).
- If steps are fluent but wrong → add ReverseCoT or SelfVerification; don’t only lengthen CoT.
- If generation never stops → InfiniteGeneration missing stop condition.

## Evolution micro-rules
- New paper name, same intention → **alias**
- Same intention, specialized form → **variant**
- Distinct recurring single-turn textual intention → **new pattern**
- Needs tools/multi-turn/RAG/finetune → **exclude** from this catalog

## Defaults
- Prefer **single-turn encoding** of multi-step checks (answer→verify→revise in one prompt).
- Prefer **explicit components** over hoping Persona implies them.
- Prefer **external validation** for SchemaSpecs/OutputAutomater outputs.
