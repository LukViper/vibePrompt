# Chapter 12: Conclusion

## Core Idea
Prompt-based learning is positioned as a **major NLP paradigm shift**—not just a trick—organizing how we adapt pretrained LMs by reformulating tasks. The survey’s value is a shared typology, notation, and challenge map so progress is cumulative.

## Frameworks Introduced
- **Paradigm Continuity Lens**: Feature → Architecture → Objective → Prompt engineering are successive loci of inductive bias; studying commonalities/differences across all four paradigms strengthens each and seeds the next shift.
  - When to use: Research strategy, teaching, or justifying prompting vs FT in orgs.
  - How: State which engineering lever you move and why; cite gaps (§10) as agenda.

## Key Concepts
- **Prompt-based learning paradigm**: pre-train, prompt, and predict.
- **Typology (Fig. 1)**: PLMs, prompt eng., answer eng., multi-prompt, training strategies.
- **Core challenges**: design, tuning choice, multi-prompt, transfer, calibration, pretrain-for-prompt.

## Mental Models
- Use this survey as a **routing table**, not a final recipe book.
- Prefer **scientifically meaningful advances** on named challenges over one-off template anecdotes.
- Keep one eye on the **next paradigm** while exploiting this one.

## Anti-patterns
- **Treating the survey as settled best practices**—many axes remain open (Ch 10–11).
- **Ignoring earlier paradigms**—FT and architecture choices still matter under the hood.

## Worked Example
Team adopting prompting for internal NLP:
1. Lock notation from Ch 2 ([X]/[Z], cloze/prefix).
2. Pick PLM family (Ch 3) and update strategy (Ch 7 Table 6).
3. Engineer template+verbalizer (Ch 4–5); add PE/PA if brittle (Ch 6).
4. Check app-specific patterns (Ch 8) and calibration (Ch 10.9).
5. Track novelty against timeline/trends (Ch 11).

## Key Takeaways
1. Prompting is a paradigm, with formal structure and a research agenda.
2. Shared typology enables comparable methods.
3. Biggest returns: tackle stated challenges, not only TC/FP templates.
4. Cross-paradigm thinking accelerates the field.
5. Resources (NLPedia-Pretrain, tabs/figures) support ongoing learning.

## Connects To
- **Ch 1**: Sea-change framing revisited.
- **Ch 2–11**: Full toolkit just summarized.
- **External**: NLPedia–Pretrain companion site for live updates.
