# Chapter 8: Multilingual & Multimodal Prompting

## Core Idea
Most **multilingual (MLT)** and **multimodal (MM)** methods are extensions of English text techniques (ICL, CoT, decomposition). Extra levers: which language the *template* vs *task* uses, cross-lingual exemplar selection, and modality-specific formats (images, audio, video, segmentation, 3D).

## Frameworks Introduced
### Multilingual
- **XLT (Cross-Lingual Thought)**: CoT-style reasoning transferred across languages.
- **CLSP (Cross-Lingual Self Consistent Prompting)**: Self-Consistency lifted to multilingual settings.
- **In-CLT**: cross-lingual transfer prompting for ICL.
- **PARC**: prompts augmented by retrieval across languages; select semantically aligned or distant exemplars; interactive chains.
- **Prompt language selection**: English template vs task language vs multilingual LLM defaults—empirical choice.
- **MT-oriented**: MAPS (multi-aspect prompt+selection), Chain-of-Dictionary, DecoMT (decomposed MT), DiPMT, Translate-First, external MT systems, human-in-the-loop / iterative MT prompting.

### Multimodal
- **Image prompting**: multimodal ICL, paired-image prompts, negative prompts, prompt modifiers, Image-as-Text.
- **Multimodal CoT / DDCoT (Duty Distinct CoT)**: extend Least-to-Most—subquestions then combine (vision+language).
- **Chain-of-Images (CoI)**: “Let’s think image by image”; generate visual intermediates (e.g. SVG) to reason.
- **MM Graph-of-Thought**: graph-structured multimodal reasoning (taxonomy extension of ToT-like ideas).
- **Audio / Video / Segmentation / 3D prompting**: modality-specific templates and generation controls (survey catalogs ~40 non-text techniques).

## Key Concepts
- **Translate-first vs native multilingual**: route non-English through English reasoning vs stay in-language.
- **Semantically aligned vs distant exemplars**: cross-lingual ICL selection strategies (PARC family).
- **Negative prompt**: specify what *not* to generate (esp. image systems).
- **Duty distinct subquestions**: separate perception vs reasoning duties in MM CoT.
- **Prompt modifiers**: stylistic/quality tags common in image generators.

## Mental Models
- Use **English CoT + translate** when Y’s strongest reasoning model is English-centric; use **in-language / XLT** when translation loses task nuance.
- Prefer **PARC-style retrieval** when labeled target-language shots are scarce.
- Use **DDCoT / CoI** when Y needs visual intermediate structure, not only captions.
- Think of **negative prompts** as output-space constraints analogous to answer-space limits.

## Anti-patterns
- **Assuming English templates always win**: depends on model training mix—A/B template language.
- **Naive word-for-word MT before prompting**: can destroy idioms; consider MAPS/DecoMT.
- **Dumping raw images without Image-as-Text/MM-ICL structure** when the model needs aligned exemplars.
- **Ignoring modality safety**: image/audio attacks differ from text injection (pair with Ch 10).

## Worked Example
Cross-lingual CoT pattern: instruction in English, question in target language, ask for reasoning in English then final answer in target (XLT-style)—or invert if the model is stronger in-language.

MM DDCoT: (1) `Split into subquestions` (visual + logical), (2) answer each with image context, (3) `Combine into final answer`.

CoI inducer: `Let's think image by image.` → produce visual step(s) → textual conclusion.

## Key Takeaways
1. MLT/MM ≈ text taxonomy + language/modality controls.
2. Template language and exemplar language are independent knobs.
3. MT prompting has its own mini-taxonomy (MAPS, DecoMT, dictionaries, HITL).
4. Multimodal CoT variants assign duties across perception and reasoning.
5. Survey: 58 text + 40 other-modality techniques—reuse names when searching literature.

## Connects To
- **Ch 2–5**: base ICL/CoT/SC reused cross-lingually.
- **Ch 4**: DecoMT / DDCoT inherit decomposition.
- **Ch 9**: multimodal agents combine tools with MM prompts.
