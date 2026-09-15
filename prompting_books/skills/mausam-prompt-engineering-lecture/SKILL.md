---
name: mausam-prompt-engineering-lecture
description: "Knowledge base from \"Prompt Engineering\" (IIT Delhi / Mausam lecture; slides by Elvis Saravia / promptingguide.ai). Use when applying few-shot, CoT, Self-Consistency, ReAct, PAL, sampling controls, or prompt-risk defenses, studying the lecture, or referencing its techniques."
---

<!-- argument-hint: [topic, technique name, or chapter number] -->

# Prompt Engineering (IIT Delhi / Mausam Lecture)
**Author**: Lecture materials attributed to Mausam (IIT Delhi); slides by Elvis Saravia (promptingguide.ai) | **Pages**: ~40 | **Chapters**: 4 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `react`, `self-consistency`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch02`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### Prompt Anatomy
Use **Instructions + Context + Input data + Output indicator** when building any non-trivial prompt. Prefer a trailing output cue (`Sentiment:`, `Answer:`) so completions stay evaluable.

### Decoding Controls
Prefer **sampling** over greedy/beam for open-ended dialog and storytelling. Use **low temperature and low top_p** when you need exact answers; use **higher** when you need diverse responses. Keep settings fixed when A/B testing prompt wording.

### Few-shot Prompting
Use **few-shot exemplars** when instructions alone don’t lock format or decision boundaries. Prefer consistent input→answer schemas across exemplars and the live query.

### Chain-of-Thought (CoT)
Use **CoT** when the task needs multi-step reasoning. Prefer **few-shot CoT** (exemplars that show steps) over answer-only few-shot for arithmetic/logic. Use **Zero-Shot CoT** (“Let’s think step by step”) when exemplars aren’t available.

### Self-Consistency
Prefer **Self-Consistency** over a single greedy CoT path when answers flip across runs. How: sample diverse reasoning paths via few-shot CoT, then select the most consistent answer. Needs enough randomness for path diversity.

### Generate Knowledge Prompting
Use **Generate Knowledge** when commonsense fails without explicit background. How: generate knowledge samples → ask knowledge-augmented questions → keep the **highest-confidence** prediction.

### PAL (Program-aided Language Models)
Prefer **PAL** over text-only CoT when the bottleneck is precise computation. How: LLM emits an intermediate program; a runtime (e.g. Python) returns the answer.

### ReAct
Use **ReAct** when answers need external tools, knowledge bases, or environments. Interleave **reasoning traces** (plan, update, exceptions) with **actions** (tool calls) for more factual responses.

### Directional Stimulus Prompting
Use **Directional Stimulus** when you can train a small **policy LM** to emit hints but the main LLM stays a frozen black box (e.g. guided summarization).

### Risk Triad
- **Prompt Injection** — untrusted commands override instructions (especially via concatenation).
- **Prompt Leaking** — model is forced to spit out its own prompt (secrets don’t belong there).
- **Jailbreaking** — injection aimed at bypassing safety/moderation; static API models remain probeable.

### Escalation Ladder
Wrong format → **Few-shot** → wrong steps → **CoT** → unstable answer → **Self-Consistency** → missing facts → **Generate Knowledge / ReAct** → bad math → **PAL**.

### Task Catalog (Intro)
Summarization, QA (with Unsure fallback), classification, role playing, code generation, and explicit step-breaking for reasoning — all share the same prompt anatomy.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction-prompt-engineering.md) | Introduction to Prompt Engineering | Prompt Anatomy, Temperature/Top-p, Task prompts |
| [ch02](chapters/ch02-advanced-prompting-techniques.md) | Advanced Prompting Techniques | Few-shot, CoT, Zero-Shot CoT, Self-Consistency |
| [ch03](chapters/ch03-tool-augmented-reasoning.md) | Tool-Augmented and Knowledge Techniques | Generate Knowledge, PAL, ReAct, Directional Stimulus |
| [ch04](chapters/ch04-prompt-risks.md) | Prompt Risks | Prompt Injection, Prompt Leaking, Jailbreaking |

## Topic Index

- **Chain-of-Thought (CoT)** → ch02
- **Code generation prompts** → ch01
- **Decoding / sampling** → ch01, ch02
- **Directional Stimulus Prompting** → ch03
- **Few-shot prompting** → ch02
- **Generate Knowledge Prompting** → ch03
- **Jailbreaking** → ch04
- **PAL** → ch03
- **Prompt Anatomy** → ch01
- **Prompt Injection** → ch04
- **Prompt Leaking** → ch04
- **Question answering** → ch01
- **ReAct** → ch03
- **Role playing** → ch01
- **Self-Consistency** → ch02
- **Temperature** → ch01
- **Text classification** → ch01
- **Text summarization** → ch01
- **Top-p** → ch01
- **Zero-Shot CoT** → ch02

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

This skill covers the lecture-slide content only (structure and technique names from the Mausam / promptingguide.ai materials). It is not a full reproduction of the Prompt Engineering Guide. For hands-on implementation in your codebase, combine with project-specific tools. For topics beyond this lecture, check related skills or ask the agent directly.
