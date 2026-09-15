# Cheatsheet

## Pick a category
| If you need to… | Category | Reach for |
|---|---|---|
| Teach a notation/DSL | Input Semantics | Meta Language Creation |
| Shape role/format/automation/viz/plan | Output Customization | Persona, Template, Output Automater, Visualization Generator, Recipe |
| Verify claims or see reasoning | Error Identification | Fact Check List, Reflection |
| Improve the question/path | Prompt Improvement | Question Refinement, Alternative Approaches, Cognitive Verifier, Refusal Breaker* |
| Change who drives / loop / play | Interaction | Flipped Interaction, Infinite Generation, Game Play |
| Focus or wipe context | Context Control | Context Manager |

\*Refusal Breaker: ethical diagnosis only — not for bypassing safety policy.

## Decision rules (When X → do Y, because Z)
- When English is a bad medium for the idea → **Meta Language Creation**, because notations reduce ambiguity — but never remap articles/commas.
- When the model lists manual steps → **Output Automater** with a *named* artifact type, because “automate” alone is refused/misread.
- When you know the expert role, not the checklist → **Persona**, because roles select details you would otherwise omit.
- When layout is contractual → **Template**; when sequence-to-goal is partial → **Recipe** — don’t force both if formats conflict.
- When you need a picture → **Visualization Generator** for tool Y, because the LLM emits text pipelines, not pixels.
- When you’re not the expert on critical claims → **Fact Check List** (scoped, usually at end), because fluency hides errors.
- When you must debug *why* → **Reflection**; if rationale could lie → add **Fact Check List**.
- When the ask is naive/high-level → **Question Refinement** and/or **Cognitive Verifier**, because better questions beat more retries.
- When familiarity bias is likely → **Alternative Approaches** *within hard constraints*, because unconstrained options waste turns.
- When the model should interview you → **Flipped Interaction** with goal + stop + engagement policy.
- When retyping the generator is the risk → **Infinite Generation** (X at a time + stop phrase); monitor drift.
- When rules are small but content is large → **Game Play** (+ Persona to hide spoilers).
- When prior turns hijack attention → **Context Manager** consider/ignore; use **start over** only if you will re-apply patterns.

## Composition defaults
| Goal | Stack |
|---|---|
| Structured batch URLs/records | Infinite Generation + Template |
| Investigation/training scenario | Game Play + Persona (+ Visualization Generator) |
| Safer refined questions | Question Refinement + Reflection + Fact Check List |
| Novice-friendly refinement | Question Refinement + Cognitive Verifier + Persona (term definitions) |
| Deploy interview → script | Flipped Interaction + Output Automater |
| Plan with known fragments | Recipe (+ Alternative Approaches / Reflection ideas) |

## Tells & smells
- Model says it “can’t automate” → artifact type wasn’t concrete.
- Refined questions feel tunnel-visioned → add anti-scope or Cognitive Verifier.
- Infinite outputs slowly ignore the original rules → context drift; reinstate prompt or reset deliberately.
- “Start over” suddenly dumber → you wiped injected/prior patterns.
- Fact list refused on code dump → output type not fact-check friendly; change ask or use Reflection differently.
- Refusal + probing for policy edges → stop; pattern is for clarification, not jailbreaks.

## Thresholds & defaults
- Meta-language: **one per session**; new language → new session.
- Cognitive Verifier: start with **~3** subquestions unless user bandwidth says otherwise.
- Infinite Generation: emit **few outputs per turn** to respect length limits.
- Fact lists: place **after** the main answer when terms may be unfamiliar.
- Automations: **read before run** — pattern doesn’t transfer responsibility.
