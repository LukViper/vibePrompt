# Cheatsheet — CO-STAR Decision Aid

## Start here: build the prompt
| If you need… | Do this | Because |
|---|---|---|
| Less generic reply | Add **Context** (often above Objective) | Background scopes meaning |
| Model to stop guessing the task | Write a sharp **Objective** | “haiku poem” is ambiguous (write vs explain) |
| Expert voice / persona | Set **Style** | Role changes structure of advice |
| Speech/email feel | Set **Tone** | Neutral default is often bland |
| Right reading level | Set **Audience** | CEO ≠ 6-year-old vocabulary |
| Usable shape | Set **Response** length/format | Lists/tables/reports beat walls of text |
| Speed over perfection | Start short, **Iterate** | Memory holds prior turns; brainstorm live |

**Mix rule:** Use only the CO-STAR letters that change the outcome. C+O(+R) is the common minimum.

---

## CO-STAR letter picker
- **C** when situation/domain isn’t obvious from the ask alone
- **O** always — name the verb (rewrite, extract, classify, summarize, generate…)
- **S** when channel needs a persona (coach, CEO, teacher…) — still verify expert claims
- **T** when delivery emotion matters (formal / casual / humorous / empathetic / authoritative / inspirational)
- **A** when jargon or analogy set must change
- **R** when you already know the artifact shape (table, ranked list, 1 paragraph, report)

---

## Creativity / Temperature
| Task vibe | Creativity | Temp | Why |
|---|---|---|---|
| Classify, cluster, route, stable extract | Low | 0 | Reproducible buckets |
| Rewrite, translate, balanced summary | Balanced | 0.5 | Fluent but controlled |
| Taglines, speeches, brainstorming | High | 1 | Diversity; re-run for options |
| Demo must match tomorrow | Low | 0 | Determinism (in theory) |

---

## Which task family?
| You have… | You want… | Use |
|---|---|---|
| Source text | Same meaning, new form | **Task-Rewriting** (simplify/correct/translate/enhance) |
| Messy blob | Fields / entities / buried actions | **Task-Extracting** |
| Many items | Groups by similarity or criterion | **Task – Clustering** |
| Items + known labels | Category tags / routing | **Task – Classifying** |
| Long source | Shorter faithful digest | **Task – Summarizing** (shorten / key points / merge) |
| Brief or bullets | New draft / ideas / quiz | **Task-Generating** |

**Chain tell:** Need a LinkedIn post from notes? Generate → Rewrite. Need analytics on feedback? Classify → Summarize. Need partner triage? Cluster → Summarize (no invention).

---

## Shots & tokens
| Signal | Decision |
|---|---|
| Format/labels must be exact | Few-shot (or one-shot) examples |
| Simple clear ask | Zero-shot often enough |
| Reply truncates / forgets earlier chat | You’re near the **token** limit — shorten history or input |
| ~100 tokens ≈ 75 words | Budget prompt + history + answer together |

---

## Hallucination & safety tells
| You see… | Assume… | Do |
|---|---|---|
| Perfect summary of an unread URL | Possible fabrications from URL cues | Verify against source |
| Citations / links | Some may be invented | Open every link |
| Medical/financial “expert” Style | Plausible harm | Human expert review |
| Translation for public display | Word-level meaning risk | Native-speaker check |
| Quiz / appraisal / bio generate | Peak hallucination | Fact-check every claim |

---

## Advanced knobs
| Situation | Move |
|---|---|
| Answer wrong or opaque | “Show your chain of thought” / “think step by step” |
| Goal underspecified (career, coaching) | **Roleplay Mode** — model interviews you; exit when enough |
| Social/casual channel | Ask to **add emojis** |
| Formal gov/paper channel | Skip emojis; prefer Formal tone + clear R |

---

## Tutorial Creativity defaults (answer key)
| Tutorial | Setting |
|---|---|
| 1 Rewriting / 2 Extracting | Balanced |
| 3 Clustering / 4 Classifying | Low |
| 5 Summary | Balanced or Low (ops: Low + no invention) |
| 6 Generate | High |
