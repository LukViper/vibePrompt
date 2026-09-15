# Patterns — Prompting Techniques Taxonomy

## In-Context Learning (Few-Shot)
**When to use**: Format/label mapping is hard to specify in instructions alone; labeled demos exist.  
**How**: Pack exemplars; tune quantity, order, label balance/quality, format, similarity; append test input.  
**Trade-offs**: Strong but order/format sensitive; context-window limited; label noise effects vary by model size.

## Zero-Shot Instruction / Role / Style / Emotion
**When to use**: No demos; open-ended writing; need persona or tone.  
**How**: Clear directive; optional role, style, or emotionally salient stakes phrases.  
**Trade-offs**: Cheap; weaker on precise label spaces; role helps quality more than always accuracy.

## Declutter & Clarify (S2A, SimToM, RaR, RE2, Self-Ask)
**When to use**: Irrelevant context, multi-agent belief, ambiguous or complex questions.  
**How**: Rewrite without distractors; restrict to known facts; rephrase/expand; re-read; ask follow-ups first.  
**Trade-offs**: Extra calls/latency; over-clarifying simple questions wastes tokens.

## Chain-of-Thought (Few-Shot & Zero-Shot)
**When to use**: Multi-step math/reasoning.  
**How**: Show rationales in shots or append thought inducers (`Let's think step by step`, Plan-and-Solve, ThoT).  
**Trade-offs**: Often helps; can hurt (survey MMLU Zero-Shot-CoT regression)—always measure; harder extraction.

## Contrastive / Complexity / Active / Auto / Analogical / Tab-CoT
**When to use**: Plain CoT plateaus.  
**How**: Show wrong+right reasoning; prefer complex exemplars + long-chain votes; annotate uncertain items; bootstrap Auto-CoT; generate analogical demos; table-structured thoughts.  
**Trade-offs**: Annotation/compute cost; complexity heuristics are task-dependent.

## Least-to-Most
**When to use**: Compositional problems with ordered subgoals.  
**How**: List sub-problems → solve sequentially, appending answers.  
**Trade-offs**: Multiple calls; failure compounds if early sub-answers wrong.

## DECOMP (Function Routing)
**When to use**: Heterogeneous sub-skills/tools.  
**How**: Few-Shot teach handlers; split and dispatch; merge.  
**Trade-offs**: Engineering overhead; needs reliable function interfaces.

## Tree-of-Thought
**When to use**: Planning/search with backtracking value.  
**How**: Generate candidate thoughts; evaluate progress; expand top branches.  
**Trade-offs**: Expensive; needs a decent heuristic evaluator.

## Program-of-Thoughts / Faithful CoT / PAL
**When to use**: Calculation- or code-heavy tasks.  
**How**: Emit code/symbolic steps; execute; return runtime result.  
**Trade-offs**: Poor fit for pure semantic reasoning; sandboxing required.

## Self-Consistency & Universal SC
**When to use**: Noisy CoT with discrete (or paraphrased) answers.  
**How**: Sample T>0; majority vote or LLM consensus prompt.  
**Trade-offs**: N× cost; doesn’t fix systematically wrong prompts.

## MoRE / DiVeRSe / COSP / USP
**When to use**: Mixed reasoning types or need auto exemplars from agreement.  
**How**: Expert prompts by genre; multi-prompt SC; keep high-agreement generated rationales as shots.  
**Trade-offs**: Complex pipelines; USP drops SC for broader tasks.

## Self-Calibration / Self-Refine / CoVe / RCoT / Self-Verification
**When to use**: Need gate, revise, or fact-check before shipping.  
**How**: Ask correctness; critique→refine loops; verification Qs; reverse-reconstruct; mask-predict scoring.  
**Trade-offs**: Extra latency; critics can be sycophantic; cap iterations.

## Meta Prompting / APE / GrIPS / ProTeGi
**When to use**: Dataset-scored prompt search worth the compute.  
**How**: LLM proposes/mutates prompts; score; select (bandits/paraphrase).  
**Trade-offs**: Can overfit eval; RL variants may yield unreadable prompts.

## Answer Engineering
**When to use**: Any metric-driven or production labeling pipeline.  
**How**: Fix shape & space; extract via verbalizer/regex/LLM trigger (often last match with CoT).  
**Trade-offs**: Strict shapes may cost reasoning quality; loose shapes need robust extractors.

## ReAct / Reflexion / RAG / IRCoT
**When to use**: Tools, environment feedback, or external knowledge required.  
**How**: Thought-Action-Observation; reflect on failure into memory; retrieve (iteratively with CoT).  
**Trade-offs**: Tool errors propagate; security surface expands; retrieval noise.

## Multilingual / Multimodal Extensions
**When to use**: Non-English or non-text inputs.  
**How**: Reuse ICL/CoT/SC; choose template vs task language; XLT/PARC/MAPS/DecoMT; MM CoT, DDCoT, CoI, negative prompts.  
**Trade-offs**: Translation loss vs weak in-language reasoning; modality-specific failure modes.

## Hardening (Injection/Jailbreak Mitigations)
**When to use**: Untrusted user text enters templates.  
**How**: Detectors + guardrails + least-privilege tools; prompt defenses only as soft mitigation.  
**Trade-offs**: No complete prompt-only fix; false positives hurt UX.
