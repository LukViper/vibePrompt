# Chapter 2: Taxonomy Method — From 176 Candidates to 30 Patterns

## Core Idea
The catalog is the output of an inspectable reduction pipeline: extract named concepts → dedupe names → merge semantic overlaps → filter to single-turn textual patterns → classify by strategy and components.

## Frameworks Introduced
- **Candidate pattern**: Any named prompting concept from sources—not yet a pattern under Definition 4.
- **Name deduplication**: Collapse exact/near-exact names (e.g., Chain-of-Thought / CoT).
- **Semantic consolidation**: Merge aliases (Persona / Role / Multi-Personas) and demote combinations to variants.
- **Scope filtering**: Drop multi-turn (74) and other out-of-scope (19) candidates.

## Key Concepts
- **Source corpus (5)**: White et al.; Schulhoff et al.; Sahoo et al.; Vatsal & Dubey; Fagbohun et al.
- **Extraction yield**: 176 → 163 distinct names → 123 after merges → 49 single-turn → **30** retained.
- **Out-of-scope buckets**: preprocessing; prompt attributes (e.g., Style Prompting); task-specific examples; non-textual/training concepts.
- **Dual organization**: primary = prompting strategy; secondary = component annotation(s).

## Mental Models
- Use **alias** when only the name differs; **variant** when intention stays and form specializes; **new pattern** only for a distinct recurring intention.
- Prefer recording combinations (e.g., Contrastive CoT) as variants of broader patterns unless the combo has a stable unique intention.

## Anti-patterns
- **Mixing granularities in one catalog**: components + workflows + fine-tuning in one list.
- **Hidden merge decisions**: always keep source names, aliases, variants for auditability.
- **Assuming exhaustiveness**: five synthesis sources, not a full SLR of all primary studies.

## Worked Example
**Pipeline arithmetic (Figure 1):**
1. Extract 176 named candidates across five surveys/catalogs.
2. Remove 13 name duplicates → 163.
3. Merge 40 semantic overlaps → 123.
4. Exclude 74 multi-turn → 49.
5. Exclude 19 non-patterns → **30 textual single-turn patterns**.

## Key Takeaways
1. Reproducibility requires recording retain / alias / variant / exclude decisions.
2. Strategy categories were synthesized from recurring distinctions across sources.
3. Component labels follow Mao et al., with Workflow → Procedural Steps rename.
4. Two authors validated scope, merges, variants, and classifications.

## Connects To
- **Ch 3**: Resulting 5×14 strategy tree and 7 components
- **Ch 9**: Evolution rules for new candidates
