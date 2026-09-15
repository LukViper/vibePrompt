# Chapter 8: Applications

## Core Idea
Prompting is task-family specific: easy for classification/probing, finicky for IE/tagging, natural for generation/QA unification, and extensible to multimodal and meta-applications (debias, domain adapt, data build).

## Frameworks Introduced
- **Knowledge Probing**: factual (LAMA, X-FACTR) and linguistic probes via cloze; usually **tuning-free**; discrete/continuous templates + ensembles. Goal = audit LM knowledge, not train a classifier.
  - When to use: Measure what a frozen LM “knows.”
  - How: Cloze templates for triples/linguistic tests; compare models with fixed *Z*.
- **Classification & NLI**: cloze + verbalizers; often few-shot **fixed-prompt LM tuning** (PET, LM-BFF). NLI uses pair templates with small manual *Z* (Yes/No/Maybe).
- **Information Extraction**
  - **RE**: large label space + entity salience → adaptive answers, entity markers `[E]`, **prompt composition** (PTR).
  - **Semantic parsing**: paraphrase framing + grammar-constrained decoding + similarity-selected demos (ICL).
  - **NER**: **prompt decomposition** over spans (TemplateNER).
  - When to use: Structure breaks naive CLS templates.
  - How: Mark entities / enumerate spans / compose subtasks; don’t reuse sentiment verbalizers.
- **Reasoning**: Winograd via candidate substitution + LM scoring; commonsense MC by comparing choice probs; math via *serialized reasoning* prompts.
- **QA Unification**: many QA formats → generation with T5/BART prompts (UnifiedQA). LM probs are weak correctness signals.
- **Text Generation**: prefix prompts; strategies from GPT-3 ICL → Prefix-Tuning → prompt+LM (guidance-initialized).
- **Eval of Generation**: BARTScore—“evaluation as generation”; tiny prompt edits (“such as”) can shift MT correlation.
- **Multimodal**: image→continuous prefix into frozen LM (Frozen) + PA for new visual categories.
- **Meta-apps**: DRF domain adaptation; self-diagnosis/debias templates; instruction-driven dataset construction.

## Key Concepts
- **Tabs 7–8 typology**: Task × PLM × Setting × Prompt/Answer eng. × Tuning × Multi-prompt (TFP/LMT/PT/LMPT; PA/PE/PC/PD).
- **Tab 10 prompt bank**: reusable templates per task family.
- **Tab 9 resources**: FewGLUE, FLEX, LAMA variants, Natural-Instructions, REALTOXICITYPROMPTS.

## Mental Models
- Use **cloze+verbalizer** for text classification/NLI few-shot.
- Use **composition/decomposition** when structure or span multiplicity dominates.
- Use **prefix+L2R/Enc–Dec** for summarization/MT/data-to-text.
- Use **probing templates** to audit LM knowledge before productizing.
- Use **Tabs 7–10 as routing tables** when implementing a new task.

## Anti-patterns
- **Copying sentiment templates into RE/NER** without entity/span handling.
- **Trusting raw LM probs as confidence** on QA.
- **One prompt shape for all QA formats** without decode constraints.
- **Skipping toxicity/self-diagnosis** when deploying open generation.

## Worked Example
**Self-diagnosis / debias**  
Template: `The following text contains violence. [X][Z]`.  
Fill [X]; compare P(Yes) vs P(No). For decoding, mix next-token dist under original vs diagnosis-augmented context to suppress the attribute.

**NER span prompt**: `Mike is a [Z] entity.` with type-word *Z*—repeat per span.

**Tab 10 starters**  
- Fact: `Adolphe Adam died in [Z].`  
- CLS: `[X] It was [Z].` / `This passage is about [Z]: [X]`  
- Sum: `[X] TL;DR: [Z]`  
- MT: `French: [X] English: [Z]`

## Key Takeaways
1. Application dictates shape, *Z*, and multi-prompt pattern.
2. Classification is best-charted; IE needs extra machinery.
3. Generation and QA benefit from prefix/seq2seq unification.
4. Meta-applications show prompts as control/audit tools.
5. Use Tabs 7–10 as routing tables when implementing a task.
6. Probing ≠ downstream training—keep LM frozen when measuring knowledge.
7. Small prompt wording changes can move evaluation metrics.

## Connects To
- **Ch 4–7**: Mechanisms behind each app pattern.
- **Ch 9**: Relatives (QA formulation, controlled gen).
- **Ch 10**: Where apps still break (structure, calib, many-class).
