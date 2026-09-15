# Chapter 3: Strategy Dimensions and Component Types

## Core Idea
Every retained pattern has (1) a **primary prompting strategy** path `Category » Subcategory` and (2) one or more **component** annotations saying where it can be instantiated.

## Frameworks Introduced
- **Five top-level strategies**:
  - **In-Context Learning** — use, omit, or structure examples
  - **Reasoning** — elicit, structure, decompose, or reverse intermediate reasoning
  - **Output Control** — constrain form, schema, procedure, or verification of output
  - **Context Control** — role/perspective or contextual grounding
  - **Meta-Directives** — act on the prompt/query/interaction itself
- **Fourteen subcategories**: Zero-Shot, Few-Shot, Chain-of-Thought, Planning, Decomposition, Output Formatting, Schema Specification, Procedural, Verification, Role & Perspective, Context Grounding, Interaction, Enhancement, Refinement.
- **Seven components (Mao et al.)**: Profile/Role, Directive, Context, Procedural Steps, Examples, Output Format/Style, Constraints.

## Key Concepts
- **Notation**: `Category » Subcategory @ Component(s)` (paper’s compact classification line).
- **Totals (Table 1)**: Profile/Role 1 · Directive 16 · Context 3 · Procedural Steps 16 · Examples 1 · Output Format/Style 6 · Constraints 5.
- **Only Examples pattern**: FewShot (sole Examples annotation).
- **Only Profile/Role pattern**: Persona.

## Mental Models
- Use **strategy** to pick *why* you prompt; use **components** to assemble *where* text goes.
- Prefer **Output Control** when the failure mode is malformed/unusable answers; **Reasoning** when the failure mode is wrong intermediate steps; **Meta-Directives** when the failure mode is a bad question.
- Think of components as ports: multiple patterns can plug into Procedural Steps or Directive in one prompt.

## Anti-patterns
- **Treating component labels as exclusive categories**: annotations are multi-label metadata.
- **Forcing every technique into one subcategory**: introduce new subcategories only when several patterns share an unrepresented intention.
- **Confusing Template vs SchemaSpecs**: skeleton-fill vs field/value/schema constraints (boundary overlap).

## Worked Example
**Compose by strategy × component:**
| Need | Strategy pick | Pattern | Components |
|---|---|---|---|
| Expert voice | Context Control | Persona | Profile/Role, Context, Output Format/Style |
| Security-only review | Context Control | ContextManager | Context, Directive, Procedural Steps |
| JSON fields + labels | Output Control | SchemaSpecs | Output Format/Style |
| Confidence gate | Output Control | SelfCalibration | Constraints, Procedural Steps |

One prompt can host all four without contradiction if wording order is clear.

## Key Takeaways
1. Primary organization = intention (strategy); placement = components.
2. Directive and Procedural Steps dominate coverage (16 each).
3. Subcategories marked * in the paper were introduced/renamed to harmonize sources.
4. Classification is primary-one strategy even when secondary intentions exist.

## Connects To
- **Ch 4–8**: Patterns per strategy family
- **patterns.md**: Full When/How/Trade-offs for all 30
- **cheatsheet.md**: Decision tables
