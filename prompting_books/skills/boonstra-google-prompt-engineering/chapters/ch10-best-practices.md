# Chapter 10: Best Practices

## Core Idea
Prompt engineering is disciplined iteration: provide examples, keep prompts simple and specific, prefer instructions over constraints, control length, use variables, experiment widely, adapt to model updates, and **document every attempt**.

## Frameworks Introduced
- **Provide examples**: One/few-shot as the strongest default teaching tool
  - When to use: Almost always for style, structure, or accuracy targets
  - How: Show desired outputs so the model has a reference to imitate
- **Design with simplicity**: Concise, clear prompts; if confusing to you, confusing to the model
  - When to use: Every draft
  - How: Cut unnecessary context; use strong action verbs (Act, Classify, Extract, Generate, …)
- **Be specific about the output**: Detailed requirements beat vague asks
  - When to use: Length, structure, tone, or content must match a brief
  - How: System/context details — e.g. “3 paragraph… conversational… top 5 consoles”
- **Instructions over Constraints**: Tell what **to do**; use “don’t” mainly for safety/strict format
  - When to use: Default framing of requirements
  - How: Positive instructions first; add constraints only when necessary; avoid clashing constraint lists
- **Control max token length**: Config limit and/or request length in prose (“tweet length”)
- **Use variables in prompts**: `{city}`-style placeholders for reuse in apps
- **Experiment with input formats**: Question vs statement vs instruction; styles; shot types
- **Mix classes in few-shot classification**: Avoid order overfitting; start ~**6** examples then measure
- **Adapt to model updates**: Retest prompts on new versions/features
- **Experiment with output formats**: JSON/XML for extract/select/parse/rank tasks — structure limits hallucinations
- **Co-prompt with other engineers**: Multiple practitioners → variance under the same practices
- **CoT practices**: Answer after reasoning; extract final answer; temperature **0** for single-answer reasoning
- **Document attempts**: Full table + version, OK/NOT OK/SOMETIMES OK, feedback, Studio links; RAG fields if applicable; prompts in separate files; automate evals

## Key Concepts
- **Action verbs set**: Act, Analyze, Categorize, Classify, Contrast, Compare, Create, Describe, Define, Evaluate, Extract, Find, Generate, Identify, List, Measure, Organize, Parse, Pick, Predict, Provide, Rank, Recommend, Return, Retrieve, Rewrite, Select, Show, Sort, Summarize, Translate, Write
- **Instruction vs constraint**: Desired behavior vs forbidden behavior
- **Output variance**: Across models, sampling settings, versions — even identical prompts can differ on ties
- **Prompt doc template**: Name/version, Goal, Model, Temperature, Token Limit, Top-K, Top-P, full Prompt, Output(s)
- **RAG documentation extras**: Query, chunk settings, chunk output, other retrieval knobs
- **Operationalization**: Automated tests/evals to know generalization

## Mental Models
- Use **examples first** when Y is any non-trivial quality bar.
- Prefer **instructions over constraints** when Y is shaping content; reserve constraints when Y is safety or hard format.
- Use **JSON/XML outputs** when Y is non-creative structured data work.
- Use **variables** when Y is embedding prompts in software.
- **Document like an experiment log** when Y is long-term maintainability across model versions.

## Anti-patterns
- **Vague one-liners** (“write a blog about consoles”)
- **Long “do not” lists** that conflict or starve the model of positives
- **Few-shot classification with sorted class blocks** (all POSITIVE then all NEGATIVE)
- **Hardcoding values** that should be variables
- **Leaving prompts only in memory / chat history**
- **Skipping re-test after model upgrades**

## Worked Example
**Simplicity rewrite** (whitepaper BEFORE/AFTER):
- BEFORE: Rambling vacation context with kids, asking where to go in New York.
- AFTER: “Act as a travel guide for tourists. Describe great places to visit in New York Manhattan with a 3 year old.”

**Instructions vs constraints**:
- DO: Generate a 1-paragraph post on top 5 consoles; only discuss console, company, year, total sales.
- DO NOT: Same topic with “Do not list video game names” as the main steering.

**Documentation**: Fill the Name/Goal/Model/config/Prompt/Output sheet every iteration; save Studio links; when “close to perfect,” move prompt text into a dedicated file in the repo and attach automated evaluation.

## Key Takeaways
1. Examples are the highest-leverage practice.
2. Simple, specific, instruction-led prompts outperform vague or constraint-heavy ones.
3. Control length via config and wording; parameterize with variables.
4. Experiment with formats, styles, shot order, and output schemas; adapt when models change.
5. Document fully; iterate until metrics and tests say the prompt generalizes.

## Connects To
- **Ch 2**: Sampling and length controls as first-class practices
- **Ch 3–4**: Examples, system/context specificity
- **Ch 5–6**: CoT temperature and answer extraction rules
- **All chapters**: Documentation table used throughout the whitepaper’s examples
