# Chapter 2: LLM Output Configuration

## Core Idea
After choosing a model, set output length and sampling (temperature, top-K, top-P) for the task — extremes of one setting can cancel the others, and defaults should match determinism vs creativity needs.

## Frameworks Introduced
- **Output length (max tokens)**: Caps how many tokens are generated; does **not** make prose more succinct — generation simply stops at the limit
  - When to use: Cost/latency control; techniques like ReAct that otherwise emit trailing junk
  - How: Set token limit in config **and** engineer the prompt if you need short answers
- **Temperature**: Controls randomness in token selection (softmax-like sharpness)
  - When to use: Deterministic tasks → low/0; creative tasks → higher
  - How: Temperature 0 ≈ greedy decoding (highest-probability token); very high → near-uniform among candidates
- **Top-K sampling**: Keep only the K most likely next tokens, then sample
  - When to use: Bound creativity; top-K=1 ≡ greedy
  - How: Higher K → more varied; lower K → more factual/restricted
- **Top-P (nucleus) sampling**: Keep smallest set of tokens whose cumulative probability ≤ P
  - When to use: Adaptive candidate set by mass rather than fixed count
  - How: P=0 → effectively greedy; P=1 → all nonzero-probability tokens
- **Combined sampling (Vertex Studio pattern)**: Candidates must pass top-K **and** top-P, then temperature samples among survivors
  - When to use: When all three knobs are available
  - How: Learn how *your* stack composes them — behavior is product-specific

## Key Concepts
- **Token probabilities**: Model predicts a distribution over vocabulary; sampling chooses one token
- **Greedy decoding**: Always pick the highest-probability token
- **Extreme cancellation**: Temp=0 → top-K/P irrelevant; top-K=1 → temp/P irrelevant; top-P≈0 → same; very high temp → random among survivors; huge K or P=1 → little filtering
- **Coherence vs freedom trade-off**: Higher temp/K/P/length → more chance of less-relevant text
- **Tie-breaking**: Even at temp 0, equal top probabilities may yield non-identical runs

## Mental Models
- Use **temperature as “diversity dial”** when Y is creative writing; use **0** when Y is math or a single correct label.
- Prefer **starting presets** over random knobs: coherent-creative `.2 / .95 / 30`; very creative `.9 / .99 / 40`; less creative `.1 / .9 / 20`; single-answer **temp 0**.
- Think of **max tokens as a hard stop**, not a style guide — shorten with prompt instructions if needed.
- Use **low output length** when Y is ReAct-style loops that otherwise keep emitting useless tokens.

## Anti-patterns
- **Expecting shorter max-tokens to rewrite style**: It only truncates
- **Turning all knobs to maximum “for creativity”**: Relevance collapses
- **Ignoring composition rules**: Assuming temp alone behaves the same when top-K=1
- **Leaving defaults unexamined**: Gemini defaults may effectively disable top-K/top-P

## Worked Example
**Presets from Boonstra (“Putting it all together”)**:

| Goal | Temperature | Top-P | Top-K |
|------|-------------|-------|-------|
| Relatively coherent, mildly creative | 0.2 | 0.95 | 30 |
| Especially creative | 0.9 | 0.99 | 40 |
| Less creative | 0.1 | 0.9 | 20 |
| Single correct answer (e.g. math) | 0 | (any; often irrelevant) | (any) |

**Decision walk-through**: Classification label → temp 0.1, low token limit (e.g. 5). Storyline brainstorm → temp 1, higher tokens, top-K 40 / top-P 0.8 as in later whitepaper tables.

## Key Takeaways
1. Configure length and sampling for the task before blaming the prompt text.
2. Experiment with top-K, top-P, both, or neither — pick what matches desired diversity.
3. Know how your platform combines the three settings.
4. Extreme values nullify sibling knobs; start from the presets above.
5. More freedom can mean less relevance — dial back when outputs drift.

## Connects To
- **Ch 1**: Prompt engineering always includes model configuration
- **Ch 3**: Zero-shot classification examples use low temp and tiny token limits
- **Ch 5–6**: CoT prefers temp 0; self-consistency uses high temp for diversity
- **Ch 7**: ReAct needs tight output length control
