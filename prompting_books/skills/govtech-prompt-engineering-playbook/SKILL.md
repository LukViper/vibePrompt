---
name: govtech-prompt-engineering-playbook
description: "Knowledge base from \"Prompt Engineering Playbook (Beta v3)\" by GovTech Data Science & AI Division. Use when applying CO-STAR, temperature/shots/tokens, task prompts (rewrite/extract/cluster/classify/summarize/generate), advanced tips, or playbook tutorials."
---

<!-- argument-hint: [topic, framework name, or chapter number] -->

# Prompt Engineering Playbook (Beta v3)
**Author**: GovTech Data Science & AI Division | **Pages**: ~134 | **Chapters**: 10 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `CO-STAR`, `few-shot`, `Task-Rewriting`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch04`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### CO-STAR (primary prompt checklist)
Use **CO-STAR** when Y = outputs are generic or miss voice/format.
- **C Context** — background; prefer above Objective
- **O Objective** — explicit verb/goal (avoid ambiguous 2-word asks)
- **S Style** — persona (career coach, CEO, teacher…) — verify expert domains
- **T Tone** — formal / casual / humorous / empathetic / authoritative / inspirational
- **A Audience** — CEO vs 6-year-old changes diction
- **R Response** — length + format (paragraph, list, table, report)

**Mix and match** — you need not use every letter every time. C+O(+R) is the usual base. The AI is the **co-star**; you remain the star.

**Iterate Till Perfection** — Prefer short start + follow-ups when exploring; chat memory persists (until token limits). Don’t restate everything each turn.

### Temperature / Creativity
| Creativity | Temperature | Use when |
|---|---|---|
| Low | 0 | Classify, cluster, stable extract, reproducible demos |
| Balanced | 0.5 | Rewrite, translate, general summary |
| High | 1 | Brainstorm, taglines, creative speeches (re-run for variants) |

### Zero / One / Few-shot
- Use **few-shot** when Y = exact labels or output shape (`positive` vs `+1/0/−1`, tables, Q:/A: patterns)
- Use **zero-shot** when Y = clear simple ask and strong model
- Few-shot can teach a task **without naming it** if examples show the pattern

### Tokens & hallucination
- Tokens are the processing units; prompt + history + reply share one limit (~100 tokens ≈ 75 words)
- Prefer **verify-then-use** for facts, URLs, bios, high-stakes translation
- Tell: fluent unread-URL “summaries” and citations often invent details — model may only infer from the string you pasted

### Six task families (mix freely)
| Task | Use when Y = |
|---|---|
| **Task-Rewriting** | Same meaning, new form: simplify / correct / translate / enhance |
| **Task-Extracting** | Fields, entities, key points, buried action items |
| **Task – Clustering** | Groups by similarity or named criterion (+ unsure bin) |
| **Task – Classifying** | Predefined labels / department routing; correct via follow-up |
| **Task – Summarizing** | Shortener / key points / merging multi-source notes |
| **Task-Generating** | New drafts (speech, marketing, appraisal, quiz) — peak hallucination; frame with bullets/variables |

### Advanced tips
- **Emojis** — ask explicitly when channel fits
- **Chain Of Thought / Step by Step** — “show your chain of thought” / “think step by step” when answers are wrong or opaque
- **Roleplay Mode** — model interviews you until it can advise; exit when enough

### Practitioner defaults
- Prefer **Low creativity** for ops routing and “do not invent” summaries
- Prefer **explicit Response schemas** over hoping the model formats well
- Prefer **native-speaker check** before publishing translations
- Prefer **human verify** for quizzes, appraisals, medical/financial Style prompts

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction.md) | Introduction | Prompt engineering as work amplifier; narrow vs sentient AI |
| [ch02](chapters/ch02-note-and-scope.md) | Note (Scope & Playground) | LaunchPad; portable concepts; probabilistic demos |
| [ch03](chapters/ch03-key-concepts-terminologies.md) | Key Concepts & Terminologies | Prompt, LLM, Temperature/Creativity, shots, tokens, hallucination |
| [ch04](chapters/ch04-co-star-prompt-tips.md) | Prompt Engineering Tips | CO-STAR; Mix and Match; Iterate Till Perfection |
| [ch05](chapters/ch05-task-rewriting-extracting.md) | Task-Rewriting & Task-Extracting | Simplify/correct/translate/enhance; schema extraction |
| [ch06](chapters/ch06-task-clustering-classifying.md) | Task-Clustering & Task-Classifying | Criterion groups; labels; correction turns |
| [ch07](chapters/ch07-task-summarizing-generating.md) | Task-Summarizing & Task-Generating | Shortener/key points/merge; framed generation |
| [ch08](chapters/ch08-advanced-pro-tips.md) | Advanced Pro Tips & Tricks | Emojis; Chain Of Thought; Roleplay Mode |
| [ch09](chapters/ch09-tutorials.md) | Tutorials | Drills for all six tasks + Creativity recipes |
| [ch10](chapters/ch10-conclusion.md) | Conclusion | Practice and share |

## Topic Index

- **Audience (CO-STAR)** → ch04
- **Chain Of Thought / Step by Step** → ch08
- **Classifying / Task – Classifying** → ch06, ch09
- **Clustering / Task – Clustering** → ch06, ch09
- **CO-STAR** → ch04, cheatsheet.md
- **Context / Objective / Style / Tone / Response** → ch04
- **Creativity / Temperature** → ch03, ch09, cheatsheet.md
- **Extracting / Task-Extracting** → ch05, ch09
- **Few-shot / One-shot / Zero-shot** → ch03
- **Generating / Task-Generating** → ch07, ch09
- **Hallucination** → ch03, ch07
- **Iterate Till Perfection** → ch04
- **LaunchPad / LaunchPad Playground** → ch02
- **Prompt / Prompt Engineering** → ch01, ch03
- **Rewriting / Task-Rewriting** → ch05, ch09
- **Roleplay Mode** → ch08
- **Summarizing / Task – Summarizing** → ch07, ch09
- **Tokens** → ch03
- **Tutorials 1–6** → ch09

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — CO-STAR decision aid, temperature and task pickers

---

## Scope & Limits

This skill covers the GovTech Prompt Engineering Playbook (Beta v3, public edition) only. Concepts transfer to comparable LLM chat apps; LaunchPad itself is officer-only. For hands-on implementation in your codebase, combine with project-specific tools. Model behaviour and context windows change over time — prefer live verification over treating demo replies as fixed.
