# Chapter 6: Multi-Prompt Learning

## Core Idea
One prompt is brittle. **Multi-prompt learning** combines or structures multiple prompts via ensembling, augmentation (in-context exemplars), composition of sub-prompts, or decomposition into per-span/subtask prompts.

## Frameworks Introduced
- **Prompt Ensembling** — multiple *unanswered* prompts → combine predictions.
  - Aggregators: **uniform averaging**, **weighted averaging** (train-fit or data-dependent weights), **majority voting**, **knowledge distillation** (PET: multi template–answer teachers annotate unlabeled data → student).
  - Generation variant: average next-token probs across prompts, or decode-per-model then rescore (Schick & Schütze) when storing many FT copies is impossible.
  - When to use: High template variance; want robustness without new architectures.
  - How: Create diverse templates (manual or auto) → filter top-K by train acc → aggregate at inference (discrete PE is cheap).
  - Why it works: Phrasings elicit complementary LM knowledge; often **no multi-train cost** unlike bagging nets.
- **Prompt Augmentation (In-context / Priming)** — prepend **answered prompts** (demonstrations).
  - When to use: Few-shot GPT-style inference; no parameter updates.
  - How: Select *k* exemplars (random or similarity, e.g. KATE) → format as answered prompts → append test prompt → decode.
  - Failure: Context length; **order sensitivity**; latency with large *k*; not the same as generic larger-context learning (must be labeled template+answer).
- **Prompt Composition** — full prompt from **sub-prompts** for subtasks.
  - Example: PTR for RE—entity characteristic sub-prompts + relation sub-prompt composed with logic rules.
  - When to use: Composable structured prediction.
  - How: Factor task → write sub-templates → compose with explicit rules/operators → optional soft tokens.
- **Prompt Decomposition** — many local prompts instead of one holistic fill.
  - Example: TemplateNER—enumerate spans; each gets “[Span] is a [Z] entity.”
  - When to use: Token/span labeling with too many joint slots.
  - How: Propose units (tokens/spans) → prompt each → aggregate labels (include “none”/non-entity).

## Key Concepts
- **Answered prompt as demonstration**: true *z* fill used as context.
- **Sub-prompt**: fragment for a subtask or span.
- **Ensemble-worthy prompt selection**: not all templates deserve a slot in the mix.
- **Prompt sharing** (preview Ch 10): partial share across tasks/domains/languages (Fig. 5)—underexplored.

## Mental Models
- Use **ensembling** when template choice is unstable.
- Use **augmentation** when you can spend context tokens but not training.
- Use **composition** when labels/tasks factor into typed parts (**span-relation → compose**).
- Use **decomposition** when prediction units are many local spans (**token/span tagging → decompose**).
- Treat ICL as **TFP + PA**, not as a separate magical mode.

## Anti-patterns
- **Dumping random demos** without selection/order checks.
- **One mega-template for NER** instead of span-wise prompts.
- **Assuming ensemble ≡ bagging nets**: prompt ensembles can be train-free.
- **Unlimited *k* demos** without measuring context/latency cost.

## Worked Example
**NER decomposition** — “Mike went to New York yesterday.”  
Spans: “Mike”, “New York”, …  
Sub-prompt: `[Span] is a [Z] entity.` with *Z*={person, location, organization, miscellaneous, none}.  
Score separately (TemplateNER-style).

**Fact-probe ensembling** — templates: `China’s capital is [Z].` / `[Z] is the capital of China.` / `The capital of China is [Z].`  
Keep top-K by train accuracy; average log-probs at [Z] (LPAQA-style).

**Arithmetic PA** — answered prompts `1+1=2`, `2+5=9`, then query `6+8=[Z]`.

## Key Takeaways
1. Multi-prompt methods attack brittleness and structure.
2. Ensembling diversifies templates; augmentation supplies exemplars.
3. Composition builds up; decomposition breaks down.
4. In-context learning = tuning-free prompting + prompt augmentation.
5. Structured IE especially needs composition/decomposition.
6. Distillation turns expensive prompt ensembles into one deployable model.
7. Demo selection and order are first-class hyperparameters.

## Connects To
- **Ch 7**: Tuning-free + PA = GPT-3 in-context recipe.
- **Ch 8**: PTR/TemplateNER applications.
- **Ch 9**: Ensemble / few-shot relatives.
- **Ch 10**: Multi-prompt open challenges (sharing, gen ensembles).
