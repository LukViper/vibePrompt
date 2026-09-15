# Patterns — Mausam Prompt Engineering Lecture

## Prompt Anatomy
**When to use**: Any structured LM task (classify, QA, summarize, code, reason).  
**How**: Compose Instructions → Context → Input data → Output indicator.  
**Trade-offs**: Slightly longer prompts; much higher format control and evaluability.

## Decoding: Temperature & Top-p
**When to use**: Always choose deliberately for the task.  
**How**: Low temperature/top_p for exact answers; higher for diverse creative output; prefer sampling over greedy/beam for open-ended dialog/story.  
**Trade-offs**: Low randomness → stable but repetitive; high → creative but unstable.

## Few-shot Prompting
**When to use**: Instructions alone don’t lock format or decision boundary.  
**How**: Add several exemplars in the same schema as the target query.  
**Trade-offs**: Uses context window; bad exemplars teach the wrong mapping.

## Chain-of-Thought (CoT)
**When to use**: Multi-step arithmetic, logic, or reasoning tasks.  
**How**: Show or request intermediate steps before the final answer; combine with few-shot when possible.  
**Trade-offs**: Longer outputs; single greedy path can still be wrong.

## Zero-Shot CoT
**When to use**: Need reasoning but no exemplars ready.  
**How**: Append “Let’s think step by step” to the original prompt.  
**Trade-offs**: Weaker than good few-shot CoT; still verify the conclusion.

## Self-Consistency
**When to use**: CoT helps but single runs disagree on arithmetic/commonsense.  
**How**: Few-shot CoT + sample diverse paths → vote for the most consistent answer.  
**Trade-offs**: Higher compute/latency; needs enough temperature for diversity.

## Generate Knowledge Prompting
**When to use**: Commonsense/factual items where missing background hurts.  
**How**: Generate knowledge samples → knowledge-augmented questions → pick highest-confidence prediction.  
**Trade-offs**: Extra generations; low-quality knowledge can still mislead.

## PAL (Program-aided Language Models)
**When to use**: CoT text math/logic is unreliable.  
**How**: Prompt for an intermediate program; execute in Python (or similar); return runtime result.  
**Trade-offs**: Needs a sandbox/runtime; code gen errors replace arithmetic errors.

## ReAct
**When to use**: Task needs external KB, tools, or environment feedback.  
**How**: Interleave reasoning traces (plan/update/exceptions) with actions (tool calls) and observations.  
**Trade-offs**: Tool latency/cost; must secure tool surfaces against injection.

## Directional Stimulus Prompting
**When to use**: Frozen black-box LLM; you can train a smaller policy to emit hints (e.g. for summarization).  
**How**: Train policy LM to generate directional stimuli; pass hints + task to frozen LLM.  
**Trade-offs**: Extra training stack; hints may bias content.

## Task Prompt Patterns (Intro Catalog)
**When to use**: Standard NLP/app tasks.  
**How**:
- Summarization — passage + “one sentence” instruction  
- QA — context + short answer + “Unsure” fallback  
- Classification — label set + text + label cue  
- Role play — persona + dialogue turns  
- Code generation — schema/constraints → emit query/code  
- Reasoning — “break into steps” before answer  
**Trade-offs**: Task-specific; swap in few-shot/CoT when quality plateaus.

## Prompt Injection Defense Mindset
**When to use**: Any user text concatenated into a prompt.  
**How**: Treat user content as untrusted data; isolate from instructions; constrain outputs.  
**Trade-offs**: More engineering than a single “ignore attacks” line.

## Prompt Leaking Defense Mindset
**When to use**: System prompts hold proprietary or sensitive text.  
**How**: Don’t put secrets in prompts; detect exfil-style asks; minimize confidential context.  
**Trade-offs**: May require moving logic out of prompt into code/policy services.

## Jailbreak Awareness
**When to use**: Public or API models with moderation.  
**How**: Assume static systems are probeable; layer filters, monitoring, and least-privilege tools.  
**Trade-offs**: No single prompt fix; ongoing adversarial pressure.
