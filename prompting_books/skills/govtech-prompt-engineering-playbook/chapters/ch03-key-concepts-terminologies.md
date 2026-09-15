# Chapter 3: Key Concepts & Terminologies

## Core Idea
Master five operating knobs before fancy prompts: what a prompt is, how LLMs actually behave, temperature/creativity, zero/one/few-shot examples, token limits — and always assume hallucination until verified.

## Frameworks Introduced
- **Prompt / Prompt Engineering**: Input text (question, statement, command) that directs the AI; engineering improves accuracy, relevance, efficiency.
  - When to use: Any LLM interaction.
  - How: State intent; add context/examples/format as needed.
- **Foundation Model (FM) / Large-Language Model (LLM)**: Pretrained models; text FMs power ChatGPT-like tools.
  - When to use: Explaining why replies feel human-like.
  - How: Think “statistical next-token completion,” not true understanding.
- **Temperature / Creativity**: Controls randomness. Low → conservative/repeatable; High → diverse/unpredictable. Temp 0 ≈ deterministic (in theory).
  - When to use: Poems/brainstorming → High (1); precise facts/classification → Low (0).
  - How (LaunchPad mapping): Low=0, Balanced=0.5, High=1.
- **Zero / One / Few-shot**: How many examples you put in the prompt.
  - When to use: Need format control or pattern induction.
  - How: Zero = instruction only; One = one demo; Few = several demos (labels like Q:/A: work even without naming the task).
- **Tokens**: Atomic units the model processes (words/punctuation/pieces). ~100 tokens ≈ 75 words; ~1500 words ≈ 2048 tokens (OpenAI rough guide). Context limits (e.g. ~4K GPT-3.5 Turbo, up to ~32K some GPT-4 variants) cap prompt + history + reply.
- **Hallucination problems**: Fluent, plausible, wrong or fabricated content (fake facts, wrong dates, invented URLs). No built-in fact-checker.

## Key Concepts
- **Prompt**: User input initiating a response.
- **Creativity**: UI label for temperature in LaunchPad.
- **Few-shot learning**: Multiple examples teach format and task.
- **Zero-shot learning**: Task with no examples — strong models often still cope.
- **Token limit**: Hard ceiling; oversize inputs truncate understanding; chat history competes for budget.
- **Hallucination**: Coherent but incorrect/misleading generation.
- **URL-inference spin**: Model invents article body from URL/domain cues without browsing.

## Mental Models
- Use **Low temperature** when Y = precision, classification, extraction, or reproducible demos.
- Use **High temperature** when Y = brainstorming, taglines, creative drafts.
- Use **few-shot** when Y = you need a specific label set or output shape (+1/0/−1, tables, schema).
- Think of the LLM as **next-probable-word picker**, not a knowledge oracle.
- Prefer **verify-then-use** for facts, figures, citations, biographies, translations with consequences.

## Anti-patterns
- **Trusting fluent summaries of unread sources**: Fabricated meteorology/news details can look perfect.
- **Relying on generated citations/URLs**: Mix of real and invented links is common.
- **Ignoring token budgets**: Long pastes + chat history → silent drop of context.
- **Assuming web browsing**: Many models cannot fetch URLs; they infer from strings you gave.
- **Biography generation without sources**: High hallucination risk for obscure people.

## Worked Example
**Few-shot sentiment control**  
Zero-shot: ask for sentiment → often works.  
Few-shot: show `positive` / `negative` / `neutral` examples → reply becomes a single label. Change labels to `+1` / `0` / `-1` → model mirrors the schema.  
**Pattern-only few-shot**: Give `Q: <country clue> A: <country>` pairs with no task statement → model still answers the next `A:` as the matching country.

**Hallucination check**: A “summary” of a Straits Times URL invented MSS flood details not in the article; Olympics opening given as 15 Aug instead of 8 Aug 2008; BBC-looking links 404. Rule: never ship facts without independent verification.

## Key Takeaways
1. Prompt engineering = deliberate inputs, not magic.
2. LLMs autocomplete; they don’t fact-check.
3. Map Creativity Low/Balanced/High → Temperature 0 / 0.5 / 1.
4. Few-shot is the strongest format controller; zero-shot is often enough for simple asks.
5. Watch tokens: prompt + history + answer share one limit.
6. Hallucinations look real — you own the output.

## Connects To
- **Ch 4**: CO-STAR builds on clear objectives + response format.
- **Ch 5–7**: Task prompts lean on low temp + few-shot for control.
- **Ch 8**: Chain-of-thought helps debug wrong conclusions.
- **OpenAI tokenizer / context windows**: External tooling for token counts.
