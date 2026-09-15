# Chapter 1: Introduction & Prompt Engineering

## Core Idea
Prompt engineering is iterative design of inputs that set an LLM up to predict the right next-token sequence — word choice, structure, context, model choice, and output config all matter.

## Frameworks Introduced
- **Prompt as next-token setup**: An LLM is a prediction engine; each predicted token is appended and used for the next prediction.
  - When to use: Before blaming the model for a bad answer
  - How: Ask whether the prompt (and configs) made the desired continuation the most likely path
- **Prompt engineering loop**: Design → tinker (length, style, structure) → evaluate against the task
  - When to use: Any production or high-stakes prompt work
  - How: Treat prompts as versioned artifacts; re-test when the model or config changes
- **API / Vertex AI prompting vs chatbot**: Direct model access exposes temperature and sampling controls that chat UIs often hide
  - When to use: When you need reproducible or tunable output
  - How: Prompt via API or Vertex AI Studio rather than only a consumer chatbot

## Key Concepts
- **Prompt**: Input that conditions the model’s response or prediction
- **Token**: Atomic unit the model predicts sequentially
- **Prompt efficacy factors**: Model, training data, configs, word choice, style/tone, structure, context
- **Inadequate prompt**: Ambiguous or inaccurate responses; weak ability to produce useful output
- **Task families**: Summarization, extraction, Q&A, classification, translation, code gen/docs/reasoning
- **Model-specific optimization**: Same intent may need different wording per Gemini, GPT, Claude, Gemma, LLaMA, etc.
- **Iteration**: Crafting the best prompt is rarely one-shot

## Mental Models
- Use **prediction-engine framing** when diagnosing failures: the model did not “refuse to understand”; it continued the most likely path given your tokens.
- Prefer **API-level prompting** when Y is controlling temperature/top-K/top-P or logging exact configs.
- Think of prompt engineering as **search over prompt + config space**, not a single clever sentence.

## Anti-patterns
- **Chatbot-only assumptions**: Hides sampling controls you need for deterministic or creative tasks
- **One-and-done prompts**: Skips the iterative loop Boonstra treats as essential
- **Ignoring model choice**: Porting a prompt unchanged across models without re-tuning

## Worked Example
**Task**: Classify a mixed-tone movie review (words like “disturbing” and “masterpiece” in one sentence).

Zero-shot skeleton from the whitepaper’s documentation style:
- Goal: Classify as POSITIVE / NEUTRAL / NEGATIVE
- Model: gemini-pro
- Temperature: 0.1 (low creativity)
- Prompt ends with `Sentiment:` so the next tokens are forced toward a label

**Why it works**: Low temperature + explicit label vocabulary + trailing cue reduces free-form prose. Ambiguous adjectives still need later techniques (few-shot, system constraints) if zero-shot fails.

## Key Takeaways
1. Everyone can write a prompt; effective prompts require deliberate engineering.
2. Optimize for your specific model; do not assume portability.
3. Configure output settings alongside the text of the prompt.
4. Document attempts in a structured table from day one (see Best Practices).
5. Inadequate prompts produce ambiguity and inaccuracy — fix the input, not just the model.

## Connects To
- **Ch 2**: LLM output configuration (temperature, top-K, top-P, length)
- **Ch 3–9**: Prompting techniques that exploit how LLMs are trained
- **Ch 10**: Best practices and documentation discipline
