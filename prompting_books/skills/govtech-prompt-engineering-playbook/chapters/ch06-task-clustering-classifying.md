# Chapter 6: Task-Clustering & Task-Classifying

## Core Idea
**Clustering** groups items by similarity (with or without stated criteria); **Classifying** assigns items to predefined labels (sentiment, issue type, A/B/C). Low temperature and clear label definitions keep results stable; correct the model in follow-ups when it slips.

## Frameworks Introduced
- **Task – Clustering**: Group similar items by characteristics.
  - When to use: Taxonomies from free lists, org charts from bios, bucket meetings by theme.
  - How: Optionally name criteria (“by job role” vs “by performance grade”); ask for list/table groups; add an “unsure → Group N” bucket.
- **Task – Classifying**: Label text into categories you define.
  - When to use: Sentiment, routing (Littering/Noise/Smell), custom A/B/C schemas.
  - How: Define labels and meanings; optionally few-shot; allow multi-label when true; follow up to fix errors.

## Key Concepts
- **Unsupervised-style clustering in-prompt**: Model infers categories if you don’t specify.
- **Criterion switching**: Same data, different grouping axis on demand.
- **Sentiment classification**: Positive/negative/neutral (or custom scales).
- **Issue routing**: Map feedback to departments via label definitions.
- **Abstract categories (A/B/C)**: Encode definitions in the prompt; model may miss multi-membership (e.g. Tennis as round + sport).
- **Conversational correction**: Tell the model what it got wrong; it can revise.

## Mental Models
- Use **clustering** when Y = discover structure; use **classifying** when Y = apply a known taxonomy.
- Use **Low temperature** when Y = deterministic buckets for ops/analytics.
- Prefer **named groups + leftover bin** when Y = noisy lists (Tutorial 3 pattern).
- Prefer **explicit department/label glossary** when Y = routing work.
- Think **classify then summarize** when Y = feedback analytics (see Ch 7 / Tutorial 5).

## Anti-patterns
- **Assuming single-label purity**: Items can fit multiple categories; prompt for multi-label if needed.
- **High creativity on routing**: Inconsistent department assignment.
- **Labels without definitions**: Ambiguous A/B/C causes silent misfires.
- **No human audit**: Tennis-as-only-sport style mistakes slip into dashboards.

## Worked Example
**Clustering – personnel**: List of people with job + grade → cluster by role; re-prompt to cluster by performance grade instead.

**Classifying – custom A/B/C**: Define geometric/sport categories; model misses that Tennis is also round → follow-up correction → model admits and re-labels.

**Classifying – sentiment**: Short feedback lines → positive/negative labels; extend to civic categories Littering / Noise / Smell for department handoff.

## Key Takeaways
1. Clustering invents or applies grouping axes; classifying applies your labels.
2. Spell out criteria and label meanings.
3. Low temperature for reproducible analytics.
4. Multi-label and leftover groups prevent forced errors.
5. Follow-up prompts can repair mistakes — keep the thread.

## Connects To
- **Ch 5**: Extract fields first, then cluster/classify.
- **Ch 7**: Summarize each cluster after grouping.
- **Ch 9 Tutorials 3–4**: Clustering and classifying practice sets.
- **Ch 3 Few-shot**: Teach idiosyncratic label vocabularies.
