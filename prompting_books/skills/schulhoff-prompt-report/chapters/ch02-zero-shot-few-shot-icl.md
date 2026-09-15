# Chapter 2: Zero-Shot, Few-Shot & In-Context Learning

## Core Idea
**In-Context Learning (ICL)** lets GenAIs acquire or specify tasks from exemplars and/or instructions inside the prompt—without weight updates. **Few-Shot** supplies exemplars; **Zero-Shot** uses none. Six exemplar design decisions dominate Few-Shot quality.

## Frameworks Introduced
- **Few-Shot Prompting** (Brown et al., 2020): learn the task from a small set of input→output exemplars in-context.
  - When to use: labeled demos exist; format/label space is non-obvious from instructions alone.
  - How: build `{Exemplars}` then append the test input; tune quantity, order, labels, format, similarity.
- **Six Exemplar Design Decisions**: Quantity · Ordering · Label Distribution · Label Quality · Format · Similarity (+ Instruction Selection).
  - When to use: any Few-Shot deployment or ablation.
  - How: treat each as a hyperparameter; order alone can swing accuracy from <50% to 90%+.
- **Zero-Shot family**: Role, Style, Emotion, S2A, SimToM, RaR, RE2, Self-Ask (standalone; CoT variants in Ch 3).
  - When to use: no labeled demos, or open-ended generation where persona/style matter.
  - How: pick the lightest transform that targets the failure (noise → S2A; multi-agent belief → SimToM; ambiguity → RaR/RE2).

## Key Concepts
- **ICL**: skills/tasks from exemplars and/or instructions in the prompt (may be recall of training knowledge, not “new learning”).
- **Exemplar Quantity**: more usually helps; gains may flatten ~20+; long-context models can keep scaling.
- **Exemplar Ordering**: highly sensitive; permute when debugging swings.
- **Label Distribution / Quality**: class imbalance biases outputs; wrong labels sometimes OK (esp. large models)—test under your setup.
- **Exemplar Format**: e.g. `Q: … A: …`; prefer formats frequent in pretraining.
- **Exemplar Similarity vs Diversity**: KNN-like similarity often helps; Vote-K pushes diversity/representativeness.
- **KNN / Vote-K / SG-ICL / Prompt Mining**: selection or generation of exemplars/templates.
- **Role / Style / Emotion Prompting**: persona, tone/genre, or psychologically charged phrases.
- **S2A**: rewrite prompt to drop unrelated info, then answer.
- **SimToM**: establish one agent’s known facts, answer only from those.
- **RaR / RE2**: rephrase+expand, or re-read+repeat the question.
- **Self-Ask**: decide whether follow-ups are needed; ask/answer them; then final answer.

## Mental Models
- Use **Few-Shot** when Y needs format induction or fragile label mapping; use **Zero-Shot** when Y is instruction-clear or demos are costly.
- Prefer **similar exemplars** when local analogy helps; prefer **diverse (Vote-K)** when coverage beats nearest neighbors.
- Use **S2A / SimToM** when irrelevant or privileged information pollutes reasoning.
- Think of **instruction before shots** as optional for accuracy—but useful for style constraints.

## Anti-patterns
- **Fixed exemplar order forever**: order is a first-class lever.
- **Unbalanced class counts in shots**: silent prior toward the majority label.
- **Assuming wrong labels always hurt**: measure; don’t assume Min et al. or Yoo et al. results transfer blindly.
- **Heavy Role Prompting for pure accuracy tasks**: strongest for open-ended quality; accuracy gains are case-by-case.

## Worked Example
One-Shot translation-style ICL (implicit directive):

```
Night: Noche
Morning:
```

Few-Shot arithmetic CoT-ready skeleton (format choice):

```
2+2: four
4+5: nine
8+0:
```

Zero-Shot RaR add-on: append `Rephrase and expand the question, and respond` (single pass) or rephrase then second call. Zero-Shot RE2: repeat the question plus `Read the question again:`.

## Key Takeaways
1. ICL = exemplars and/or instructions; “learn” may mean specify or recall.
2. Six design decisions make Few-Shot a search problem, not a template paste.
3. Similarity selection (KNN) vs diversity (Vote-K) vs generation (SG-ICL) are distinct tools.
4. Zero-Shot toolkit targets persona, style, emotion, decluttering, theory-of-mind, rephrasing, rereading, follow-ups.
5. Prompt Mining: mid-phrase templates that match corpus frequency can beat naive `Q:/A:`.

## Connects To
- **Ch 3**: Few-Shot CoT / Zero-Shot-CoT add reasoning paths to ICL.
- **Ch 5**: Ensembling often wraps multiple Few-Shot variants.
- **Ch 10**: Ordering and wording sensitivity are alignment/robustness issues.
