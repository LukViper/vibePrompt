---
name: boonstra-google-prompt-engineering
description: "Knowledge base from \"Prompt Engineering\" by Lee Boonstra (Google, Sept 2024). Use when applying Boonstra's frameworks for temperature/top-K/top-P, zero/few-shot, system/role/contextual prompting, CoT, self-consistency, ToT, ReAct, APE, code prompting, or best practices."
---

<!-- argument-hint: [topic, framework name, or chapter number] -->

# Prompt Engineering
**Author**: Lee Boonstra (Google) | **Pages**: ~65 | **Chapters**: 10 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `temperature`, `ReAct`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch05`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### LLM as prediction engine
Use **prompt + config as next-token setup** when diagnosing bad outputs: the model continues the most likely path given your tokens, training data, and sampling settings. Prefer **API/Vertex access** when you need temperature, top-K, top-P, and logged configs.

### Sampling configuration
Prefer **Boonstra start presets**: coherent-creative `temp 0.2 / top-P 0.95 / top-K 30`; very creative `0.9 / 0.99 / 40`; less creative `0.1 / 0.9 / 20`; single correct answer **`temp 0`**. Use **max tokens as a hard stop**, not a succinct-style control — also engineer the prompt for short answers. Remember extremes cancel siblings (temp 0; top-K 1; top-P≈0). On Vertex-style stacks, candidates pass **top-K and top-P**, then temperature samples.

### Zero / one / few-shot
Use **zero-shot** for simple baselines; escalate to **one-shot** then **few-shot (≈3–5 examples)** when you need pattern/schema imitation. Prefer **diverse, high-quality examples** (include edge cases); one bad example can derail the model. For classification few-shots, **mix class order** (start ~6 and measure).

### System / role / contextual / step-back
Use **system prompting** for purpose, format contracts, JSON schemas, and safety lines. Use **role prompting** for persona, tone, and expertise. Use **contextual prompting** for dynamic, task-specific background. Use **step-back** when direct asks are generic: answer a broader principle question first, then inject it as context into the specific task.

### Chain of Thought
Use **CoT** when the task is solvable by talking through steps. Prefer **answer after reasoning**, **extract the final answer** for pipelines, and **temperature 0** when there is one correct answer. Combine with **few-shot CoT** to teach a preferred method. Trade tokens/latency for accuracy and debuggability.

### Self-consistency & Tree of Thoughts
Use **self-consistency** when a single CoT flip-flops: sample diverse chains at **high temperature**, extract answers, **majority vote** (costly; vote ≠ true probability). Use **ToT** when you need branching exploration of partial solutions, not one linear chain.

### ReAct
Use **ReAct** when Y needs external tools/search/APIs: Thought → Action → Observation until Final Answer. Prefer **low temperature**, **tight token limits**, history resend + trimming, and explicit action formatting — first step toward agents.

### Automatic Prompt Engineering
Use **APE** when Y is large prompt/phrasing search: generate candidates → score (BLEU/ROUGE/task metric) → select → optional tweak → repeat. Still document and evaluate the winner like a hand-written prompt.

### Code prompting
Use the lifecycle **write → explain → translate → debug/review** at **temp ~0.1**. Always read and test; preserve Python indentation (Markdown mode in Vertex Studio). Multimodal prompting is a **separate** concern from text/code prompts.

### Best-practice judgment
Prefer **examples**, **simplicity**, **specific outputs**, and **instructions over constraints**. Parameterize with **variables**; experiment with question/statement/instruction forms and **JSON/XML** for structured tasks. **Document every attempt** (Name, Goal, Model, configs, Prompt, Output, pass/fail, feedback). Re-test when models update; keep prompts in separate files with automated evals.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction-and-prompt-engineering.md) | Introduction & Prompt Engineering | Prediction engine, PE loop, API vs chatbot |
| [ch02](chapters/ch02-llm-output-configuration.md) | LLM Output Configuration | Temperature, top-K, top-P, output length |
| [ch03](chapters/ch03-zero-one-few-shot.md) | Zero-Shot, One-Shot & Few-Shot | Zero/one/few-shot, example quality |
| [ch04](chapters/ch04-system-role-contextual-stepback.md) | System, Role, Contextual & Step-Back | System/role/context, step-back |
| [ch05](chapters/ch05-chain-of-thought.md) | Chain of Thought (CoT) | Zero-shot CoT, few-shot CoT |
| [ch06](chapters/ch06-self-consistency-and-tot.md) | Self-Consistency & Tree of Thoughts | Self-consistency, ToT |
| [ch07](chapters/ch07-react.md) | ReAct (Reason & Act) | Thought–action loop, tools |
| [ch08](chapters/ch08-automatic-prompt-engineering.md) | Automatic Prompt Engineering | APE generate–evaluate–select |
| [ch09](chapters/ch09-code-prompting.md) | Code Prompting | Write, explain, translate, debug |
| [ch10](chapters/ch10-best-practices.md) | Best Practices | Examples, instructions, docs |

## Topic Index

- **APE / Automatic Prompt Engineering** → ch08
- **Best practices** → ch10
- **Chain of Thought / CoT** → ch05, ch10
- **Code prompting** → ch09
- **Contextual prompting** → ch04
- **Documentation table** → ch03, ch10
- **Few-shot / one-shot / zero-shot** → ch03, ch10
- **JSON / structured output** → ch04, ch10
- **Output length / max tokens** → ch02, ch07, ch10
- **ReAct** → ch07
- **Role prompting** → ch04
- **Self-consistency** → ch06
- **Step-back prompting** → ch04
- **System prompting** → ch04
- **Temperature / top-K / top-P** → ch02, cheatsheet
- **Tree of Thoughts / ToT** → ch06
- **Variables in prompts** → ch10

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — parameter decision table and decision guides

---

## Scope & Limits

This skill covers the Boonstra Google Prompt Engineering whitepaper (Sept 2024) only. For hands-on implementation in your codebase, combine with project-specific tools. Platform sampling composition may differ from Vertex Studio — verify against your model provider.
