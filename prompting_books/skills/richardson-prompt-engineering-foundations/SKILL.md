---
name: richardson-prompt-engineering-foundations
description: "Knowledge base from \"Prompt Engineering\" (foundations sample) by Eric C. Richardson. Use when applying Richardson's AI/ML history framing, prompt structure categories (informative/interrogative/directive), prompt ecosystem craft, or studying early foundations of prompt engineering."
---

<!-- argument-hint: [topic, framework name, or chapter number] -->

# Prompt Engineering — Foundations (Sample)
**Author**: Eric C. Richardson | **Pages**: ~37 (publisher sample) | **Chapters in skill**: 3 (from sample) | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `turing-test`, `prompt triad`, `ml evolution`; I find and read the relevant chapter
- **With chapter** — ask for `ch01`, `ch02`, or `ch07`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

- Use **history → ML evolution → prompt craft** when onboarding: prompt tactics without foundations produce brittle expectations.
- Prefer **Turing’s operational test** when judging chatbot human-likeness; prefer **task metrics** when judging production reliability.
- Treat **Dartmouth 1956 / McCarthy** as the naming and institutional birth of AI — interdisciplinary from the start (math, psychology, engineering, CS).
- Think of **Enigma shared rotor settings as a shared secret** and **human-chosen words as search-space reduction** when linking early compute to brute-force search.
- Use **symbolic → statistical → neural/backprop → SVM era → big data + GPU/TPU → deep learning** when explaining why today’s models are promptable sequence learners, not rule tables.
- Prefer **data-driven models** when rules cannot cover paraphrase and scale; prefer **rules** when the domain is small, audited, and must be inspectable.
- Use the **prompt structure triad**:
  - **Informative** when grounding facts, role, schema, or policy
  - **Interrogative** when eliciting answers, comparisons, or judgments
  - **Directive** when commanding a procedure or output contract
- Prefer **informative → directive** (optional interrogative check) when building production prompts; keep hierarchy explicit.
- Run the **prompt anatomy stack** when outputs are vague: objectives → context → prior-knowledge bounds → specificity/depth → examples → constraints → tone/style → edge cases.
- Prefer **iterate + evaluate** (change one dimension; measure) when quality is inconsistent — do not only synonym-swap.
- Contrast **effective vs ineffective prompts** empirically: clear structure raises performance; ambiguity yields inaccurate or off-topic results.
- Remember **prompt engineering** is framed as a critical skill for AI output quality, UX, and responsible development — not optional garnish.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-brief-overview-ml-ai.md) | A Brief Overview of ML and AI | Turing test, Dartmouth/AI naming, Enigma→Colossus bridge, prompt-engineering rationale |
| [ch02](chapters/ch02-evolution-of-machine-learning.md) | Evolution of Machine Learning | Symbolic→statistical, backprop, SVMs, big data, GPU/TPU, deep learning |
| [ch07](chapters/ch07-prompt-ecosystem.md) | The Prompt Ecosystem | Informative/interrogative/directive, anatomy checklist, iteration & evaluation |

## Topic Index

- **Active learning / prompt refinement** → ch07
- **Backpropagation** → ch02
- **Big data / GPU / TPU** → ch02
- **Brute force / Colossus / Enigma** → ch01
- **Constraints / edge cases** → ch07
- **Dartmouth conference / McCarthy** → ch01
- **Deep learning** → ch02
- **Directive prompts** → ch07
- **Informative prompts** → ch07
- **Interrogative prompts** → ch07
- **Machine learning evolution** → ch02
- **Prompt anatomy / ecosystem** → ch07
- **Prompt engineering (why it matters)** → ch01, ch07
- **Rule-based vs data-driven** → ch02
- **Support vector machines (SVMs)** → ch02
- **Symbolic AI / statistical learning** → ch02
- **Turing test / imitation game** → ch01

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

**This skill is generated from a publisher sample excerpt of *Prompt Engineering* by Eric C. Richardson (BPB Publications), not the full book.** The sample includes front matter, a detailed TOC for chapters 1–19, and partial Chapter 1 body text (truncated mid-section). Chapters 2 and 7 in this skill are structured from TOC headings and preface summaries only.

This skill covers sample-available foundations: AI history milestones, ML evolution map, and the prompt-ecosystem triad (informative / interrogative / directive) plus craft checklist. It does **not** include full-book depth on transformers, tokens, ethics, tooling, legal frameworks, or later chapters. For hands-on implementation in your codebase, combine with project-specific tools. For topics beyond this sample, check related skills, the full book, or ask the agent directly.
