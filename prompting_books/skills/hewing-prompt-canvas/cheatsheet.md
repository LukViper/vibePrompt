# Cheatsheet — The Prompt Canvas

## Decision rules

| When you see… | Do this | Because |
|---|---|---|
| Vague “write about X” | Fill **Task and Intent** with action verb + success criteria | Intent focuses the model |
| Fluent but wrong voice | Set **Persona/Role** + **Tonality** | Role casts speaker; tone sets register |
| Expert but unreadable | Fill **Audience** | Audience sets depth and language |
| Generic answers | Add **Context** (situation) | Model performs best on what you tell it |
| Ungrounded claims | Add **References** + how to use them | Anchors facts/policies/examples |
| Messy structure | Specify **Output** length/sections/format | Makes deliverable channel-fit |
| Complex reasoning fails | Add **Step-by-Step** or CoT/Plan-and-Solve | Decomposition improves coherence |
| Need multiple angles | Use **Tree-of-Thoughts** | Explores branches/personas |
| Model misreads brief | Use **RaR** or **Re-reading** | Forces restatement/re-read |
| Template reuse | Add **Placeholders & Delimiters** | Separates variables and data |
| Close but not shippable | **Iterative Optimization** (one change at a time) | Controlled refinement |
| Choosing a model | Test same canvas prompt in an **LLM Arena** | Isolates model effects |
| Org-wide tone/facts | **Custom GPT** / API with brand docs | Institutionalizes Context/Tonality |

## Canvas fill order

1. **Persona/Role** → **Audience**
2. **Task and Intent** → **Step-by-Step**
3. **Context** → **References**
4. **Output/Format** → **Tonality**
5. Optional: **Recommended Techniques** → **Tooling**
6. Metadata: **Prompt Name / Date / Owner**

## Braun outcome picker

| Goal | Prefer |
|---|---|
| Learn | Explanations, step teaching |
| Lookup | Short factual retrieval |
| Investigate | Multi-source analysis |
| Monitor/Extract | Structured pulls from text |
| Decide | Options + criteria + recommendation |
| Create | Drafts, designs, new artifacts |

## White pattern quick map

| Pattern slot | Canvas home |
|---|---|
| Role | Persona/Role |
| Task/Goal | Task and Intent |
| Procedure | Step-by-Step |
| Context / Scope | Context |
| Output | Output/Format |
| Termination | Iterative Optimization stop rule |

## Technique picker

| Need | Technique |
|---|---|
| Linear hard reasoning | Chain-of-Thought / Plan-and-Solve |
| Diverse options | Tree-of-Thoughts |
| Majority vote robustness | Self-Consistency |
| Critique loop | Self-Refine |
| Blank-page prompt | AI as Prompt Generator |
| Creativity vs focus | Temperature / top-p (advanced) |
| Cut repetition | Frequency/presence penalty |

## Tells & smells

- **No verb in the goal** → Task cell empty.
- **“Be helpful” only** → Persona under-specified.
- **Attached file never mentioned** → References cell incomplete.
- **Beautiful prose, wrong length** → Output cell missing.
- **Stacked CoT+ToT+Emotion on a lookup** → Technique overkill; simplify.
- **Tool purchased before canvas literacy** → Process smell; teach cells first.

## Defaults (practitioner)

- Start every workshop prompt on the **four primary categories**.
- Cap tone attributes at **2–3**.
- Change **one** cell per iteration.
- Prefer **Markdown + explicit sections** when humans edit downstream.
- Treat canvas as **living**: drop techniques models already internalize.
