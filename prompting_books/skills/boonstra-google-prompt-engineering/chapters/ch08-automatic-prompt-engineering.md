# Chapter 8: Automatic Prompt Engineering (APE)

## Core Idea
Automatic Prompt Engineering uses an LLM to **generate candidate prompts**, score them with a metric, select (and optionally tweak) the winner, and repeat — automating part of the human prompt-search loop.

## Frameworks Introduced
- **Automatic Prompt Engineering (APE)**: Prompt a model to write prompts; evaluate; keep the best
  - When to use: Large paraphrase/instruction spaces (e.g. chatbot utterance variants); reducing manual brainstorming
  - How: (1) write a meta-prompt that fixes semantics and asks for N variants (2) score candidates with BLEU, ROUGE, or a task metric (3) select the top scorer (4) optionally human-tweak and re-score (5) repeat if coverage gaps remain
  - Why it works: Turns prompt search into an explicit generate-and-rank loop instead of ad-hoc chatting
  - Failure mode: Optimizing n-gram overlap when the real goal is task accuracy or brand voice
- **Candidate generation → evaluation → selection loop**
  - When to use: Training data or routing phrases need coverage of many phrasings with same semantics
  - How: Fix meaning (“One Metallica t-shirt size S”); vary politeness and word order; keep a scored shortlist for the chatbot/app

## Key Concepts
- **Prompt-to-write-prompts**: Meta-prompting for instruction candidates
- **Semantic invariance**: Variants keep the same meaning (e.g. order “One Metallica t-shirt size S”)
- **BLEU**: Bilingual Evaluation Understudy — candidate scoring option
- **ROUGE**: Recall-Oriented Understudy for Gisting Evaluation — candidate scoring option
- **Human-in-the-loop tweak**: Selected prompt can still be edited then re-scored
- **Alleviates human input**: Does not remove the need for a clear goal and evaluation metric

## Mental Models
- Use **APE** when Y is “enumerate many equivalent phrasings” better done by a model than by hand.
- Prefer a **fixed evaluation metric** when Y requires comparable ranking across candidates.
- Think of APE as **search in prompt space** with an LLM proposal distribution.
- Still **document and test** the final selected prompt like any hand-written one.

## Anti-patterns
- **Generating without scoring**: Leaves you with unranked noise
- **Optimizing the wrong metric**: BLEU/ROUGE may not match task success
- **Assuming zero human judgment**: Safety, brand, and edge cases still need review
- **Endless regeneration without selection criteria**

## Worked Example
**Merchandise chatbot order phrasings** (Table 15):
- Meta-prompt: band merch shop needs variants of ordering “One Metallica t-shirt size S”; generate 10 with same semantics.
- Outputs span polite purchase requests (“I’d like to purchase…”) to terse orders (“Small Metallica t-shirt, one please.”).
- Next steps per APE: score candidates (BLEU/ROUGE or task accuracy in the chatbot), pick the best instruction set, tweak, repeat.

## Key Takeaways
1. APE automates generating and selecting prompts via generate→evaluate→select.
2. Keep semantics fixed while varying surface forms when covering user phrasings.
3. Choose a metric aligned with the real task, not only n-gram overlap.
4. Selected prompts still need iteration, documentation, and production tests.
5. Use when manual prompt brainstorming does not scale.

## Connects To
- **Ch 1**: Prompt engineering as iterative search — APE accelerates proposals
- **Ch 3**: Generated variants can become few-shot pools
- **Ch 10**: Document attempts; operationalize evaluation
