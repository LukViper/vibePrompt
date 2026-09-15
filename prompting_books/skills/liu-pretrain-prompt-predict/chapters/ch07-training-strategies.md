# Chapter 7: Training Strategies for Prompting Methods

## Core Idea
Decide **data regime** (zero / few / full) and **what gets updated** (LM params, prompt params, both, or neither). Five strategies trade accuracy, storage, forgetting, and prompt-engineering burden—this is the systems heart of prompt-based learning.

## Frameworks Introduced
- **Training Settings**
  - **Zero-shot**: no task training; prompt-only. Caveat: labels often used to *construct/validate* prompts—arguably not true zero-shot (Perez et al.).
  - **Few-shot**: tiny labeled set—prompting’s highest relative value.
  - **Full-data**: large sets—parameter expressivity usually wins over frozen-prompt tricks alone.
- **Five Parameter-Update Strategies** (Table 6)
  1. **Promptless Fine-tuning** — tune LM (all or partial), no prompts (BERT/RoBERTa classic).  
     Pros: simple, fits big data. Cons: unstable/overfit on small data; catastrophic forgetting.
  2. **Tuning-free Prompting** — freeze LM; no extra prompt params (GPT-3, LAMA, AutoPrompt inference). +PA → **in-context learning**.  
     Pros: efficient, no forgetting, true API-friendly zero/few. Cons: heavy prompt eng.; large *k* is slow; hard to use huge datasets.
  3. **Fixed-LM Prompt Tuning** — freeze LM; tune prompt params (Prefix-Tuning, Prompt-Tuning, WARP).  
     Pros: strong few-shot; retains LM knowledge; small task packs. Cons: not zero-shot; limited high-data power; soft prompts opaque; hyperparams/seeds matter.
  4. **Fixed-prompt LM Tuning** — tune LM; discrete template fixed (PET, LM-BFF). Includes **null prompt** `[X][Z]` with answer eng. + partial FT (Logan IV).  
     Pros: templates specify task → efficient few-shot learning. Cons: still needs eng.; task-specific LM may not transfer.
  5. **Prompt+LM Tuning** — tune prompt params and LM (P-Tuning, PTR, PADA).  
     Pros: most expressive; good full-data. Cons: store/train full models; overfit risk on small sets.
  - When to use: See Mental Models + cheatsheet matrix.
  - How: Fix constraints (API? multi-task? data size?) → pick row → pick prompt/answer pattern from Ch 4–6 → measure forgetting & latency.

## Key Concepts
- **In-context learning**: TFP + answered-prompt augmentation.
- **Null prompt**: competitive minimal `[X][Z]` reducing template artistry.
- **Additional prompt parameters**: continuous prefixes/embeddings beyond LM weights.
- **Catastrophic forgetting**: LM loses prior abilities after FT.

## Mental Models
- Use **tuning-free** for true zero-shot / API-only LMs.
- Use **fixed-LM prompt tuning** for few-shot + storage constraints + no forgetting.
- Use **fixed-prompt LM tuning** when discrete templates + small data beat head-based FT.
- Use **prompt+LM** for full-data maximum accuracy or structured prompts needing LM adaptation.
- Use **promptless FT** when prompts add little and data is abundant.
- If “zero-shot” used a large val set for prompt choice, label it **tuned few-shot**.

## Anti-patterns
- **Calling validation-tuned prompts “zero-shot”.**
- **Full LM FT on tiny data** → unstable/overfit.
- **Soft-prompt-only in high-data** when capacity saturates.
- **Huge in-context *k*** as free training without latency checks.
- **One strategy for all tasks** in a multi-task deployment (mix 3 for shared LM + 4/5 for heavy tasks).

## Worked Example
**Sentiment, 16 labels/class — decision path**
1. Labeled local RoBERTa available → **fixed-prompt LM tuning** (LM-BFF): cloze template + verbalizer search + small FT.
2. Only GPT API → **tuning-free + PA**: similarity-select demos; calibrate for recency/majority bias.
3. One frozen T5 serving 50 tasks → **Prompt-Tuning** per task (tiny embeddings, shared LM).
4. RE with entity structure + medium data → **PTR-style prompt+LM** with composition.
5. Millions of labels, single task, no need for LM reuse → **promptless FT** may suffice.

## Key Takeaways
1. Regime × update strategy is the primary systems choice.
2. Memorize Table 6’s five rows and example systems.
3. Prompting shines in few-shot; full-data may prefer heavier tuning.
4. Freezing the LM preserves generality; tuning it fits the task.
5. Null prompts show answer/partial FT can shrink template burden.
6. ICL is a *combination* of strategies (TFP+PA), not a sixth unrelated mode.
7. Report prompt-selection protocol honestly (true vs tuned few-shot).

## Connects To
- **Ch 4–6**: What you engineer before/while tuning.
- **Ch 8**: Which apps used which strategy (Tabs 7–8).
- **Ch 10**: Tuning-strategy selection still under-benchmarked.
