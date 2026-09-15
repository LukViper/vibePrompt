# Chapter 1: Introduction to Prompt Engineering

## Core Idea
Prompt engineering is designing instructions, context, and controls so a language model reliably does the task you intend — not just generating fluent text.

## Frameworks Introduced
- **Prompt Anatomy (4 components)**: Structure every prompt as Instructions + Context + Input data + Output indicator.
  - When to use: Any non-trivial LM call (classification, QA, generation).
  - How: State the task; give relevant background; paste the instance; end with a clear completion cue (e.g. `Sentiment:`).
  - Why it works: Separates *what to do* from *what to operate on*; the output indicator anchors format.
  - Failure mode: Omitting the output indicator → free-form waffle instead of a labeled answer.

- **Decoding Controls (Temperature / Top-p)**: Tune determinism vs diversity of next-token sampling.
  - When to use: Whenever exactness or creativity matters more than the default.
  - How: Prefer sampling over greedy/beam for open-ended tasks; set temperature and top_p intentionally.
  - Why it works: Temperature sharpens/flattens the distribution; top_p truncates to a probability mass, then renormalizes.
  - Failure mode: High temperature/top_p when you need a single correct answer → unstable outputs.

## Key Concepts
- **Prompt**: Instructions and context passed to an LM to achieve a desired task.
- **Prompt engineering**: Developing and optimizing prompts to use LMs efficiently across applications.
- **In-context learning**: Steering model behavior via examples and instructions in the prompt (few-shot era; Brown et al. 2020).
- **Temperature**: Scalar (0–1) controlling sharpness of the next-token distribution; lower → sharper, more repetitive.
- **Top-p (nucleus sampling)**: Keep the smallest token set whose cumulative probability exceeds *p*; smaller *p* → more repetitive.
- **Greedy / Beam search**: Deterministic or search-based decoding; often “boring,” poor fit for dialog/storytelling.
- **Output indicator**: Trailing cue that shapes the completion format (label, JSON key, code fence start).
- **Role playing**: Prompt that sets persona/tone so the model responds in character.

## Mental Models
- Use **Prompt Anatomy** when results are inconsistent — check which of the four parts is missing before changing the model.
- Prefer **low temperature + low top_p** when you need exact answers; prefer **higher** when you need diverse creative responses.
- Prefer **sampling** over greedy/beam when the task is open-ended (dialog, storytelling).
- Think of **role playing** as fixing the *speaker*, not the *facts* — still supply domain context when accuracy matters.

## Anti-patterns
- **Prompt-without-structure**: Dumping a question with no instructions, context, or output cue — hard to evaluate and reproduce.
- **High randomness for factual/exact tasks**: Diverse decoding when you need a short correct answer.
- **Greedy decoding for creative work**: Safe but dull completions for dialog and narrative.
- **Ignoring settings when comparing prompts**: Different temperature/top_p make A/B prompt tests incomparable.

## Worked Example
**Task**: Sentiment classification with full anatomy.

```
Classify the text into neutral, negative or positive.
Text: I think the food was okay.
Sentiment:
```

→ Expected completion: `Neutral`.

**Decoding note** (from lecture demo settings): model `text-davinci-003`, temperature `0.7`, top_p `1` — fine for open generation; for this classification, lower temperature would be more appropriate if answers must stay stable.

**Task catalog (same anatomy, different instructions)**:
| Task | Instruction pattern |
|------|---------------------|
| Summarization | Context passage + “Explain in one sentence” |
| QA | “Answer from context; say Unsure if unknown” + Context + Question + `Answer:` |
| Classification | Label set + `Text:` + `Sentiment:` (or other label) |
| Role play | System persona + multi-turn Human/AI turns |
| Code generation | Schema/constraints in a docstring-like block → emit SQL/code |
| Reasoning | Explicit “break into steps” before the answer |

## Key Takeaways
1. Treat prompts as engineered artifacts: instructions, context, input, output cue.
2. Match decoding to goal — exact vs diverse — via temperature and top_p.
3. One anatomy covers summarization, QA, classification, role play, code, and reasoning.
4. Use prompt engineering to evaluate LM limits as much as to ship features.
5. Keep settings fixed when iterating on prompt wording.

## Connects To
- **Ch 2**: Advanced techniques (few-shot, CoT, Self-Consistency) layer on this anatomy.
- **Ch 3**: Tool-augmented methods still need clear instructions and output format.
- **In-context learning**: Brown et al., “Language Models are Few-Shot Learners.”
- **Decoding**: Hugging Face “How to generate” guidance for temperature / top_p.
