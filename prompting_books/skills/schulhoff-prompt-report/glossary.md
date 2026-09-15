# Glossary — The Prompt Report (Schulhoff et al.)

**Active-Prompt** — Annotate Few-Shot CoT exemplars with highest model uncertainty/disagreement (Ch 3).

**Additional Information** — Task facts supplied in a prompt; preferred over overloaded “context” (Ch 1).

**Analogical Prompting** — Auto-generate exemplars that include CoT rationales (Ch 3).

**Answer Engineering** — Design of answer shape, space, and extractor to map LLM text to labels (Ch 7).

**Answer Extractor** — Regex, verbalizer, or secondary LLM that pulls the final answer (Ch 7).

**Answer Shape / Space** — Physical form of an answer vs allowed value domain (Ch 7).

**APE** — Automatic Prompt Engineer: propose, score, paraphrase instruction prompts (Ch 7).

**Auto-CoT** — Build Few-Shot CoT from Zero-Shot-CoT–generated rationales (Ch 3).

**AutoDiCoT** — Automatic Directed CoT: auto rationales + contrastive/bad-reasoning direction for labeling (Ch 11).

**Chain-of-Thought (CoT)** — Emit intermediate reasoning before the answer; Few-Shot shows rationales (Ch 3).

**Chain-of-Verification (CoVe)** — Draft → verification questions → answers → revised final (Ch 6).

**CLSP** — Cross-Lingual Self Consistent Prompting (Ch 8).

**Contrastive CoT** — Exemplars include incorrect and correct explanations (Ch 3).

**Decomposition** — Explicitly split problems into sub-problems (Least-to-Most, DECOMP, ToT, …) (Ch 4).

**DECOMP** — Decomposed Prompting with few-shot–taught functions/handlers (Ch 4).

**Directive** — Instruction or question expressing prompt intent (Ch 1).

**DiVeRSe** — Multi-prompt × Self-Consistency with step-aware path scoring (Ch 5).

**Emotion Prompting** — Add psychologically salient phrases to boost performance (Ch 2).

**Ensembling** — Combine multiple prompts/paths/experts then aggregate (Ch 5).

**Exemplar / Shot** — Demonstration example in-context; n-shot = n exemplars (Ch 1–2).

**Faithful CoT** — Mixed natural + task-dependent symbolic reasoning (Ch 4).

**Few-Shot Prompting** — Task via a few exemplars without weight updates (Ch 2).

**GrIPS** — Gradient-free instructional prompt search via edit operations (Ch 7).

**Hard / Discrete Prompt** — Only vocabulary tokens; opposite of soft/continuous prompts (Ch 1).

**In-Context Learning (ICL)** — Skills/tasks from exemplars and/or instructions in the prompt (Ch 2).

**Jailbreaking** — Adversarial prompting for unintended model behavior (Ch 10).

**KNN Exemplar Selection** — Retrieve similar training exemplars for the test input (Ch 2).

**Least-to-Most Prompting** — List sub-problems, then solve sequentially with append (Ch 4).

**Meta Prompting** — Prompt an LLM to write or improve prompts (Ch 7).

**MoRE** — Mixture of Reasoning Experts with specialized prompts (Ch 5).

**Multimodal CoT / DDCoT / CoI** — Vision-language thought, duty-distinct subqs, chain-of-images (Ch 8).

**PAL / PoT** — Program-aided / Program-of-Thoughts: code as reasoning + execute (Ch 4, 9).

**Plan-and-Solve** — Zero-Shot inducer: understand, plan, then step through (Ch 3–4).

**Prefix Prompt** — Prompt prepended for continuation (survey focus vs cloze) (Ch 1).

**Prompt** — GenAI input that guides output (text and/or other media) (Ch 1).

**Prompt Chain** — Sequential templates where outputs fill later templates (Ch 1).

**Prompt Engineering (PE)** — Iterative infer → evaluate → modify technique/template (Ch 1, 7).

**Prompt Hacking** — Attacks via prompts; includes injection and jailbreaking (Ch 10).

**Prompt Injection** — User input overrides developer instructions in a shared template (Ch 10).

**Prompt Leaking** — Extracting a hidden prompt template from an app (Ch 10).

**Prompt Mining** — Discover high-frequency mid-phrase templates from corpora (Ch 2).

**Prompt Paraphrasing** — Meaning-preserving rewording for ensembles/PE (Ch 5, 7).

**Prompt Template** — Parameterized function that becomes a prompt when filled (Ch 1).

**Prompting Technique** — Blueprint for structuring one or more prompts (Ch 1).

**ProTeGi** — Prompt optimization with textual gradients + bandit selection (Ch 7).

**RAG** — Retrieval-Augmented Generation; variants include IRCoT, Verify-and-Edit (Ch 9).

**RaR / RE2** — Rephrase-and-Respond; Re-reading with repeated question (Ch 2).

**ReAct / Reflexion** — Thought-Action-Observation agents; Reflexion adds verbal memory (Ch 9).

**Role / Style Prompting** — Assign persona or specify tone/genre (Ch 2).

**Self-Ask** — Decide/ask/answer follow-ups before the final answer (Ch 2).

**Self-Calibration / Self-Refine** — Judge correctness; iterative critique-and-improve (Ch 6).

**Self-Consistency** — Sample diverse CoTs; majority-vote the answer (Ch 5).

**Self-Criticism** — Model judges/critiques/verifies/revises its outputs (Ch 6).

**Self-Verification / RCoT** — Score via masked-question prediction; reverse-reconstruct the problem (Ch 6).

**SG-ICL** — Self-Generated In-Context Learning: model-written exemplars (Ch 2).

**SimToM / S2A** — Answer from one agent’s knowledge; System-2 Attention declutter (Ch 2).

**Skeleton-of-Thought** — Parallelize answering a drafted outline (Ch 4).

**Tree-of-Thought (ToT)** — Search over branching intermediate thoughts (Ch 4).

**Universal Self-Consistency / COSP / USP** — LLM-voted consensus; agreement-based exemplar building (Ch 5).

**Verbalizer** — Maps output tokens/spans to labels injectively (Ch 7).

**Vote-K** — Diverse, representative exemplar selection with human labeling stage (Ch 2).

**XLT / In-CLT / PARC** — Cross-lingual thought, transfer ICL, retrieval-augmented cross-lingual prompts (Ch 8).

**Zero-Shot / Zero-Shot-CoT** — No exemplars; optionally add a thought inducer (Ch 2–3).
