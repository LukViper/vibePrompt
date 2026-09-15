# Chapter 1: Introduction and Why a Prompt Canvas

## Core Idea
Prompt engineering is the craft of designing inputs that steer LLMs toward useful, contextual, task-specific outputs — and practitioners need a **unified visual canvas** because techniques are scattered across papers, blogs, and anecdotes.

## Frameworks Introduced
- **Prompt as blueprint** (Schulhoff et al.): Treat a prompt technique as a reusable structure for how to organize the input, not as one-off wording.
  - When to use: Designing any non-trivial LLM interaction.
  - How: Separate *what* you want from *how* the prompt is structured (role, steps, context, format).
- **Pre-train, Prompt, Predict** (Liu et al.): Modern NLP adapts a general model via prompts and in-context learning instead of task-specific supervised training alone.
  - When to use: Explaining why wording and structure matter without fine-tuning.
  - How: Encode the task in the prompt; rely on patterns the model learned in pre-training.
- **Canvas for visualization**: Borrow the business-model / design-thinking canvas pattern to put prompt elements in one shared visual space.
  - When to use: Teaching teams, workshops, or aligning people with mixed expertise.
  - How: Fill four primary categories in natural processing order: setting → task → background → output.

## Key Concepts
- **Prompt engineering**: Designing queries that bridge user goals and model capabilities.
- **In-context learning**: Adapting behavior through the prompt without retraining.
- **Fragmented knowledge**: Techniques published across journals, preprints, GitHub, Reddit, YouTube without a shared practitioner map.
- **Token → embedding → self-attention → next-token prediction**: Core transformer path from prompt text to output (Lo).
- **Text-to-text modality**: Primary scope of this canvas (other modalities exist but are out of scope here).

## Mental Models
- Use a **canvas** when you need one shared artifact for collaboration instead of a long prose checklist.
- Think of prompting as **bridging generalized pre-trained knowledge and specific user needs**.
- Prefer **structure over lore** when onboarding pupils, students, or employees.

## Anti-patterns
- **Hunting techniques in isolation**: Collecting CoT / Few-shot tips without a place to put them in a full prompt.
- **Assuming the model “just knows” the situation**: Skipping context because the model is “trained on everything.”
- **Treating prompt engineering as only advanced research**: Blocking non-specialists from a usable entry framework.

## Worked Example
**Team workshop kickoff**: A marketing lead wants “better ChatGPT summaries.” Instead of listing random tips, open a blank Prompt Canvas with metadata fields **Prompt Name / Date / Owner**, then walk the four categories left-to-right: who speaks and for whom → what goal and steps → what context/refs → what format and tone. Capture recommended techniques and tooling last as optional enhancers.

## Key Takeaways
1. Prompt engineering is both art and science of steering LLMs.
2. Knowledge is fragmented; a canvas consolidates it visually.
3. Transformers + unsupervised pre-training make prompts the main adaptation lever.
4. Canvas order mirrors information processing: persona/audience → goal/steps → context/refs → format/tone.
5. Primary audience for this guide: learners and practitioners, not only researchers.

## Connects To
- **Ch 2**: How literature taxonomies and patterns feed the canvas cells.
- **Ch 3–6**: Filling each primary canvas category.
- **Business Model Canvas / Lean Canvas**: Visualization lineage (Osterwalder, Maurya, IBM design thinking).
