# Chapter 2: Evolution of Machine Learning

> **Sample note:** Full chapter body is not in the publisher excerpt. Structure below is distilled from the book’s TOC and preface summary for this chapter — use for navigation and decision framing, not as a substitute for the full text.

## Core Idea
ML evolved from hand-crafted symbolic/rule systems to statistical and neural methods, then scaled via data + GPU/TPU compute into deep learning — each shift changes what prompts can and cannot assume about the model.

## Frameworks Introduced
- **Symbolic AI → statistical learning arc**: Early methods encode knowledge as rules/symbols; later methods learn patterns from data.
  - When to use: When choosing whether to hard-code logic vs train/fit a model
  - How: Prefer rules when the domain is small and audited; prefer statistical/neural when patterns are high-dimensional and data-rich
  - Why it works / failure mode: Rules are inspectable but brittle; statistical models generalize but obscure failure modes
- **Rule-based → data-driven transition**: Limitations of rule systems drive emergence of data-driven models (with new challenges).
  - When to use: When a legacy expert system plateaus or maintenance cost explodes
  - How: Inventory which rules are incomplete vs which need learned features; plan for data quality and drift
- **Backpropagation era (from 1986)**: Enables training multi-layer neural nets by propagating error signals.
  - When to use: When explaining why deep nets became trainable at scale
  - How: Frame learning as iterative weight updates from prediction error — not magic memorization
- **SVM prominence (1990s)**: Margin-based classifiers as a major statistical-learning milestone.
  - When to use: When contrasting classical ML with deep learning eras
  - How: Position SVMs as strong on structured features/smaller data relative to later deep nets
- **Big data + GPU/TPU scaling**: Hardware and datasets unlock deep learning and large models.
  - When to use: When explaining sudden capability jumps or cost of training/inference
  - How: Separate algorithmic ideas from the compute substrate that made them practical

## Key Concepts
- **Symbolic AI**: Intelligence via explicit symbols and rules
- **Statistical learning**: Models estimated from data distributions
- **Rule-based system**: Hand-authored if/then knowledge
- **Data-driven model**: Behavior shaped primarily by training data
- **Neural network**: Layered units learning representations
- **Backpropagation**: Algorithm for training layered nets via error gradients (highlighted since 1986)
- **Support vector machine (SVM)**: Margin-maximizing classifier family prominent in the 1990s
- **Big data**: Scale of datasets enabling richer models
- **GPU / TPU**: Hardware accelerating training and inference
- **Deep learning**: Multi-layer representation learning enabled by data + compute

## Mental Models
- Use **symbolic vs statistical** when Y is deciding interpretability vs coverage.
- Prefer **data-driven models** when Y has abundant labeled/unlabeled data and rules don’t scale.
- Think of **backprop + depth** as the hinge between shallow classical ML and modern deep systems.
- Treat **hardware eras (GPU/TPU)** as first-class causes of capability — not footnotes.

## Anti-patterns
- **Romanticizing pure rules**: Underestimates maintenance and edge-case explosion
- **Ignoring compute history**: Attributes today’s LLMs only to clever math, not data/hardware scale
- **Skipping classical milestones**: Jumps from “Turing” to “GPT” without neural nets, SVMs, or backprop context

## Worked Example
**Decision walk: legacy FAQ bot**  
- Rules-only bot: accurate for 40 scripted intents, fails on paraphrase → brittleness of rule-based systems.  
- Statistical classifier (e.g. SVM-era thinking): maps bag-of-features → intent; needs feature engineering.  
- Deep model era: representation learning absorbs paraphrase; needs data + compute budget.  
**Prompt implication**: On modern generative models, your prompt is steering a statistical sequence model — design for ambiguity, not for a fixed rule table.

## Key Takeaways
1. Evolution is a stack of paradigms, not a single invention story.
2. Backpropagation and neural research are called out as pivotal (1986+).
3. SVMs mark a 1990s statistical high-water mark before deep learning’s rise.
4. Big data and GPU/TPU hardware are treated as transformative enablers.
5. Deep learning emergence is the bridge toward generative and transformer eras (later chapters).

## Connects To
- **Ch 1**: Philosophical/historical origins (Turing, Dartmouth)
- **Ch 3–4** (TOC): Generative models → transformers/GPT (not in sample body)
- **Ch 7**: Prompting assumes statistical generative models, not rule engines
