# Chapter 1: Vocabulary & Prompt Anatomy

## Core Idea
A **prompt** is any GenAI input that guides output; a **prompt template** is a parameterized function that becomes a prompt when variables are filled. Clear vocabulary (prompting vs prompt engineering vs technique) is required before selecting among the survey’s 58 text techniques.

## Frameworks Introduced
- **Prompt Template → Prompt Instance**: Template holds slots (`{TWEET}`, `{USER_INPUT}`); each fill is one inference-ready prompt.
  - When to use: any repeated task over a dataset or user stream.
  - How: write the fixed skeleton once; bind variables per example.
- **Prompt Engineering Loop** (Fig 1.4): (1) infer over a dataset with a template, (2) evaluate with a utility/extractor, (3) modify technique or template until desiderata are met.
  - When to use: production or research setups where one-shot wording is insufficient.
  - How: treat PE as iteration, not a single clever sentence; keep answer extraction in the loop.
- **Seven Core Categories** (Fig 1.1): Text techniques → Multilingual / Multimodal extensions → Agents → Evaluation / Safety / Security intertwined throughout.
  - When to use: navigating the survey or choosing where a new idea belongs.
  - How: start from text taxonomy; lift to other modalities or agents only when needed.

## Key Concepts
- **Directive**: instruction or question stating intent (explicit or implicit via exemplars).
- **Exemplar / Shot**: demonstration pair guiding the task; One-Shot = one exemplar.
- **Output Formatting**: structural (CSV, XML, Markdown) or stylistic shaping of answers.
- **Role / Persona**: assigned identity that steers tone and framing.
- **Additional Information**: task facts (name, constraints); prefer this term over overloaded “context.”
- **Prompting**: act of providing a prompt and receiving a response.
- **Prompt Chain**: ≥2 templates in succession; prior output parameterizes the next.
- **Prompting Technique**: blueprint for structuring one or more (possibly branched/parallel) prompts.
- **Prompt Engineering Technique**: strategy for *iterating* prompts (often automated).
- **Scope of study**: hard/discrete prefix prompts; task-agnostic; no soft prompts or gradient fine-tuning focus.

## Mental Models
- Use **template vs prompt** when debugging “what the model saw” vs “what you designed.”
- Think of **prompting technique** as architecture (shots, chains, ensembles), not wording polish.
- Prefer **Additional Information** when Y is facts the model must use—not conversational filler labeled “context.”
- Use **extractor-in-the-loop** when free-form model text must map to labels or metrics.

## Anti-patterns
- **Conflating PE with one magic prompt**: PE is evaluate → revise technique/template.
- **Calling every string “context”**: blurs context window, priming, and task facts.
- **Ignoring answer engineering**: good prompts still fail if labels can’t be extracted reliably.

## Worked Example
Binary tweet classification template:

```
Classify the tweet as positive or negative: {TWEET}
```

Fill `{TWEET}` per row → each fill is a prompt instance. After inference, run an **extractor** (e.g. first token / regex / verbalizer) so “This is positive.” maps to `positive`. If F1 is low, change technique (add shots, CoT) *or* tighten shape/space/extractor—not only the English wording.

## Key Takeaways
1. Separate **template design** from **instance filling** and from **answer extraction**.
2. Memorize the vocabulary: prompting, technique, PE, chain, exemplar, directive, role.
3. Survey scope = discrete prefix prompts → techniques here transfer to ChatGPT-class APIs.
4. Multilingual/multimodal/agent methods usually extend this same text taxonomy.
5. Iterate with a utility function; don’t declare success from a single cherry-picked reply.

## Connects To
- **Ch 2**: Zero-/Few-Shot realize directives via exemplars or instructions alone.
- **Ch 7**: Answer shape/space/extractor formalize the PE loop’s evaluation step.
- **Ch 11**: Case study shows PE as multi-week technique search, not one edit.
