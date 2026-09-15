# Cheatsheet — Mausam Prompt Engineering Lecture

## Technique picker

| Situation | Prefer | Because |
|-----------|--------|---------|
| Format/labels unclear | Few-shot | Exemplars teach the mapping |
| Multi-step reasoning | CoT (+ few-shot if possible) | Scratchpad steps |
| No exemplars, need reasoning | Zero-Shot CoT (“Let’s think step by step”) | Cheap elicitation |
| CoT answers flip across runs | Self-Consistency | Vote across diverse paths |
| Missing background facts | Generate Knowledge | Context then confidence pick |
| Arithmetic/logic brittle in text | PAL | Interpreter does the math |
| Need search/KB/tools | ReAct | Reason + act interleaved |
| Can’t fine-tune main LLM; need steering | Directional Stimulus | Policy hints → frozen LLM |
| Exact factual/class answer | Low temperature & top_p | Sharper, less drift |
| Dialog/story creativity | Sampling; higher temp/top_p | Avoid boring greedy/beam |

## Decoding defaults

| Goal | Temperature | Top-p | Decoding |
|------|-------------|-------|----------|
| Exact / evaluable | Low | Low | Sampling OK but keep sharp |
| Diverse / creative | Higher | Higher | Sampling; not greedy/beam |
| Self-Consistency | High enough for path diversity | Moderate–high | Multiple samples + vote |

**Rule**: When X = comparing prompts, keep decoding settings fixed — else you confound wording with randomness.

## Prompt assembly checklist
1. Instructions (task + constraints)  
2. Context (background)  
3. Input data (instance)  
4. Output indicator (`Label:`, `Answer:`, …)  
5. Optional: exemplars / CoT / tools  

## Escalation ladder (reasoning quality)
1. Zero-shot instruction  
2. Few-shot  
3. CoT / Zero-Shot CoT  
4. Self-Consistency  
5. Generate Knowledge **or** PAL **or** ReAct (pick by failure mode)

**Pick by failure mode**:
- Wrong *format* → few-shot  
- Wrong *steps* → CoT  
- Unstable *answer* → Self-Consistency  
- Missing *facts* → Generate Knowledge or ReAct  
- Bad *math* → PAL  

## Risk tells

| Smell | Likely issue | Do |
|-------|--------------|-----|
| User text concatenated into system instructions | Prompt Injection | Isolate untrusted data |
| User asks to repeat/encode “your instructions” | Prompt Leaking | Secrets out of prompt |
| Goal is bypassing safety, not the product task | Jailbreaking | Layered moderation + monitoring |
| Tool-calling agent + raw user strings | Amplified injection | Strongest trust boundaries |

## Task quick map
- Summarize → short instruction over context  
- QA → answer-from-context + Unsure fallback  
- Classify → label set + output cue  
- Role play → persona + turns  
- Code → schema/constraints → emit code  
- Reason → steps first, then answer  

## One-liners
- Use X when Y: **Self-Consistency** when **single CoT paths disagree**.  
- Prefer **PAL** over **verbal CoT** because **runtimes compute reliably**.  
- Prefer **ReAct** over **parametric-only answers** when **external evidence is required**.  
- Prefer **low temp/top_p** over **high** when **you need exact answers**.
