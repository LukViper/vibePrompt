---
name: hewing-prompt-canvas
description: "Knowledge base from \"The Prompt Canvas\" by Michael Hewing and Vincent Leinhos. Use when applying the Prompt Canvas for persona/role, audience, task/intent, step-by-step, context, references, output/format, and tonality; studying the guide; or referencing its techniques and tooling."
---

<!-- argument-hint: [topic, canvas cell, technique, or chapter number] -->

# The Prompt Canvas: A Literature-Based Practitioner Guide
**Author**: Michael Hewing & Vincent Leinhos | **Pages**: ~16 | **Chapters**: 8 | **Generated**: 2026-09-13

## How to Use This Skill

- **Without arguments** — load core canvas frameworks for reference
- **With a topic** — ask about `persona`, `tonality`, `chain-of-thought`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch04`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### The Prompt Canvas (primary toolkit)
Use the **Prompt Canvas** when designing or teaching prompts for text-to-text LLMs. Fill metadata (**Prompt Name / Date / Owner**), then four primary categories in processing order, then optional enhancers:

1. **Persona/Role and Target Audience** — who speaks; who listens  
2. **Goal and Step-by-Step** (**Task and Intent** + **Step-by-Step**) — what to do; how to proceed  
3. **Context and References** — situation; facts/files/examples  
4. **Format and Tonality** (**Output** + **Tonality**) — shape; voice  

Add **Recommended Techniques** and **Tooling** when difficulty, reuse, or scale demands them.

Prefer **structure over tip-collecting**: put CoT, Few-shot, role prompting, etc. into named cells instead of a loose pile of tricks.

### Canvas cell rules (“Use X when Y”)
- Use **Persona/Role** when expertise, viewpoint, or company values must shape the answer — cast the model; integrate culture into the role.
- Use **Audience** when reader knowledge, age band, or channel language matters — write *for* a concrete persona, not “everyone.”
- Use **Task and Intent** when outputs wander — start with **action verbs** and state the objective/success focus.
- Use **Step-by-Step** when work is multi-stage or reasoning-heavy — numbered procedure *or* Zero-shot CoT (“Let’s think step by step”).
- Use **Context** when answers feel generic — supply situation/background; the model does **best with what you tell it**.
- Use **References** when claims must be grounded — attach docs/data and say *how* to use them (align, cite, emulate).
- Use **Output/Format** when channel/shape matters — length, sections, Markdown/table/code, quotes/sources.
- Use **Tonality** when brand/register matters — name attributes (authenticity, sophistication, luxury…) and optional style inspiration.

### Recommended Techniques (enhancers)
- Prefer **Iterative Optimization** when the first draft is close — change one constraint per loop.
- Use **Placeholders & Delimiters** when templating or mixing instructions with data.
- Use **AI as a Prompt Generator** when stuck drafting the prompt itself.
- Use **Chain-of-Thought** for linear hard reasoning; **Tree-of-Thoughts** for multi-perspective exploration.
- Use **Emotion Prompting** only as a coda after structure is clear.
- Use **Rephrase and Respond / Re-Reading** when the model misreads complex briefs.
- Use **hyperparameters** (temperature, top-p, frequency/presence penalty) when text instructions alone cannot set creativity/focus.

### Literature anchors (why these cells exist)
- **Braun et al.**: design dimensions — role, style, shots, information space, CoT style, outcome goals (*learn, lookup, investigate, monitor/extract, decide, create*).
- **White et al.**: prompt patterns — Scope, Task/Goal, Context, Procedure, Role, Output, Termination.
- **Sasson Lazovsky et al.**: human skills — Creativity, Clarity and Precision, Adaptability, Critical Thinking, Empathy, Cognitive Flexibility, Goal Orientation.
- **Schulhoff / Sahoo surveys**: technique catalog feeding CoT-family, RaR, Emotion Prompting, etc.

### Worked Example — filling the canvas (Art Horizon)
**Scenario**: Turn an attached document into a short magazine piece.

| Cell | Fill |
|---|---|
| **Persona/Role** | Skilled summarizer/editor; distill complex info into clear, polished, engaging summaries |
| **Audience** | *Art Horizon* readers — young creatives, collectors, enthusiasts; casual/relatable where apt |
| **Task and Intent** | Summarize key points focusing on main arguments and evidence; concise accurate article for quick core-message grasp |
| **Step-by-Step** | Read & Understand → Identify Key Points → Draft → Edit for Clarity → Check Completeness |
| **Context** | Writing for *Art Horizon*, cutting-edge art magazine; vibrant storytelling; emerging trends/movements |
| **References** | Use attached survey feedback to align preferences; use provided example article as reference; optional quotes/sources |
| **Output** | ≤200 words; sections Introduction / Core Content / Conclusions; Markdown |
| **Tonality** | Authenticity + sophistication; emulate magazine distinctive tone |
| **Techniques (optional)** | Delimit the source text; iterate once on length if over 200 words |
| **Tooling (optional)** | Save as library template with placeholders for `{document}` / `{issue_theme}` |

### Anti-patterns
- Tip-stacking without cells; Role without Audience; attachments never instructed; format without tone (or vice versa); CoT/ToT/Emotion piled onto trivial lookups; buying tools before canvas literacy.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction-and-why-canvas.md) | Introduction and Why a Prompt Canvas | Prompt as blueprint; Pre-train/Prompt/Predict; canvas visualization |
| [ch02](chapters/ch02-literature-foundations.md) | Literature Foundations | Braun taxonomy; White patterns; Sasson Lazovsky skills; CoT family |
| [ch03](chapters/ch03-persona-role-and-audience.md) | Persona/Role and Target Audience | Persona/Role; Audience; role prompting |
| [ch04](chapters/ch04-task-intent-and-step-by-step.md) | Task/Intent and Step-by-Step | Task and Intent; Step-by-Step; CoT / Plan-and-Solve |
| [ch05](chapters/ch05-context-and-references.md) | Context and References | Context; References; information space |
| [ch06](chapters/ch06-output-format-and-tonality.md) | Output/Format and Tonality | Output; Tonality; output specification |
| [ch07](chapters/ch07-recommended-techniques.md) | Recommended Techniques | Iteration; delimiters; CoT/ToT; RaR; emotion; hyperparameters |
| [ch08](chapters/ch08-tooling-limitations-outlook.md) | Tooling, Limitations, and Outlook | Libraries; arenas; custom GPTs; APIs; living canvas |

## Topic Index

- **Audience** → ch03
- **Braun taxonomy / outcome goals** → ch02
- **Chain-of-Thought** → ch02, ch04, ch07
- **Context** → ch05
- **Custom GPT / API tooling** → ch08
- **Emotion Prompting** → ch02, ch07
- **Format / Output** → ch06
- **Iterative Optimization** → ch07
- **Persona/Role** → ch03
- **Placeholders & Delimiters** → ch07
- **Plan-and-Solve** → ch02, ch04
- **Prompt Canvas (overview)** → ch01
- **Prompt patterns (White)** → ch02
- **Rephrase and Respond / Re-Reading** → ch02, ch07
- **References** → ch05
- **Step-by-Step** → ch04
- **Task and Intent** → ch04
- **Tonality** → ch06
- **Tree-of-Thoughts** → ch02, ch07
- **White pattern catalog** → ch02

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

This skill covers the Hewing & Leinhos Prompt Canvas paper (arXiv:2412.05127, CC BY 4.0 canvas). Focus is text-to-text practitioner prompting. Multimodal prompting, agent systems, and LLM risk analysis are largely out of scope. For implementation in your codebase, combine with project-specific tools.
