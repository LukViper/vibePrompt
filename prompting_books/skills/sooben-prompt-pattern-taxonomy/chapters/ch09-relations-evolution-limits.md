# Chapter 9: Pattern Relations, Evolution, and Limits

## Core Idea
Patterns are primary-classified but not exclusive: they compose, specialize, combine, overlap at boundaries, and sometimes tension. The taxonomy is versioned and intentionally incomplete relative to all of prompt engineering.

## Frameworks Introduced
- **Five relation types**:
  1. **Composition** — several patterns in one prompt (different components)
  2. **Specialization** — narrower form of a parent (multi-persona ⊂ Persona; constrained vocabulary ⊂ SchemaSpecs)
  3. **Combination** — reported techniques that fuse patterns (few-shot CoT); avoid new canonical entries unless intention is distinct
  4. **Boundary overlap** — similar surface, different intention (Persona vs ContextManager; SchemaSpecs vs Template)
  5. **Tension** — patterns that constrain each other (strict schema vs long reasoning; context reset vs prior Persona)
- **Evolution outcomes for new candidates**: retain as new pattern · record as alias · record as variant.
- **Conservative category growth**: new subcategory only when several patterns share an unrepresented intention; new top-level only when families cannot fit.

## Key Concepts
- **Threats to validity**: non-exhaustive sources; narrow Definition 4; model/domain variance; subjective merges/classifications (dual-author validation).
- **Versioning needs**: document adds, aliases, variants, merges, exclusions, renames, reclassifications, component changes.
- **Component annotations as metadata**: revising them does not change pattern identity.
- **Online catalog**: inspectable companion for reuse/extension.

## Mental Models
- Use **composition** when needs map to different components.
- Prefer **alias/variant** over new top-level names when intention is unchanged.
- When patterns tension, specify **order, wording, and scope** explicitly.

## Anti-patterns
- **Reading the taxonomy as performance claims**: it catalogs structures, not universal quality gains.
- **Exploding categories** for every paper name: prefer variants.
- **Ignoring single-turn bound** when adopting new “patterns” from agent literature.

## Worked Example
**Composition (paper’s code-review stack):**
- Persona → security reviewer
- ContextManager → security-only scope
- SchemaSpecs → structured findings
- SelfCalibration → per-finding confidence

**Tension control:** if SchemaSpecs forbids free text, reserve a `rationale` field so Reflection/CoT have somewhere legal to live.

## Key Takeaways
1. One primary strategy per pattern; many patterns per prompt.
2. Evolve patterns faster than categories.
3. Cite a catalog version in empirical studies.
4. Out of scope ≠ unimportant—just not a textual single-turn pattern here.

## Connects To
- **Ch 2**: Construction method and exclusions
- **Ch 3**: Axes used when reclassifying
- **cheatsheet.md**: Quick composition picks
