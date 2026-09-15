# Cheatsheet — Richardson Prompt Engineering Foundations (sample)

## Decide: what kind of prompt?
| If you need… | Prefer | Because |
|---|---|---|
| Grounding facts, role, schema, policy | **Informative** | Model treats content as given |
| An answer, comparison, judgment | **Interrogative** | Speech act is a question |
| Execution (rewrite, classify, generate) | **Directive** | Speech act is a command |
| Stable production behavior | **Mix with hierarchy** | Inform first, then ask/direct |

## Decide: foundations vs tactics
| Situation | Do | Skip |
|---|---|---|
| Team argues “is this AI?” | Use **Turing operational test** framing | Consciousness debates |
| Explaining capability jump | Cite **data + GPU/TPU + deep learning** | “Just better prompts” alone |
| Legacy rules bot failing | Move toward **data-driven / learned** approaches | Endless rule patches only |
| Prompt fails oddly | Run **anatomy checklist** | Random synonym rewrites |

## Prompt anatomy checklist (Ch 7 TOC)
1. Clear **objective**  
2. **Context / background**  
3. **Prior knowledge** bounds (assume vs invent)  
4. **Specificity** + desired depth/scope  
5. **Examples / analogies**  
6. **Constraints / limitations**  
7. **Tone / style**  
8. **Edge cases**  
9. **Evaluate** → iterate one change at a time  

## ML evolution quick map (Ch 2)
```
Symbolic / rules → Statistical learning → Neural nets + backprop (1986+)
                 → SVMs (1990s) → Big data + GPU/TPU → Deep learning
                 → (later books chapters) Generative / Transformers / GPT
```

## History anchors (Ch 1)
| Anchor | Use when |
|---|---|
| Bletchley / Enigma / Colossus | Linking computation, search, crypto ancestry |
| Turing test (1950) | Conversational intelligence as behavior |
| Dartmouth 1956 / McCarthy | Naming AI; interdisciplinary field birth |

## Tells & smells
- **Fluent but wrong** → imitation-game success ≠ task success; add constraints + eval.  
- **Long context, wild format** → missing directive contract.  
- **Question with no facts** → missing informative grounding.  
- **“Just add more rules”** on paraphrases → need statistical/learned approach.  
- **One prompt forever** → missing iterate–evaluate loop.

## Defaults (sample-safe)
- Structure prompts as **informative → directive** (interrogative only if you need a check).  
- Change **one** anatomy dimension per iteration.  
- Prefer explicit **edge-case tags** (`GAP:`, `UNKNOWN:`) over silent hallucination.
