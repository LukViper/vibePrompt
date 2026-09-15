# Chapter 2: Literature Foundations (Taxonomies, Patterns, Skills)

## Core Idea
The Prompt Canvas is evidence-backed: a systematic review distilled design dimensions, prompt patterns, practitioner skills, and named techniques into canvas-ready building blocks.

## Frameworks Introduced
- **Braun et al. prompt design taxonomy**: Dimensions include input/output type, interaction (computer- vs human-in-the-loop, role, style), learning (zero/one/few-shot), context (information space), chain-of-thought style, and outcome goals (*learn, lookup, investigate, monitor/extract, decide, create*).
  - When to use: Diagnosing what a prompt is missing before rewriting it.
  - How: Check mutually exclusive choices (e.g. learning regime) and non-exclusive ones (e.g. input type); name the intended outcome goal.
- **White et al. prompt patterns**: Reusable structural observations — Scope, Task/Goal, Context, Procedure, Role, Output, Termination condition.
  - When to use: Turning a recurring problem into a fillable template.
  - How: Map the request to pattern slots (e.g. “Act as persona X…”, “Within scope X…”, “Ask until condition…”).
- **Sasson Lazovsky et al. prompt-engineering skills**: Creativity, Clarity and Precision, Adaptability, Critical Thinking, Empathy, Cognitive Flexibility, Goal Orientation.
  - When to use: Coaching humans who write prompts, not only tuning the text.
  - How: Score a draft against skills (e.g. low Clarity → shorten instructions; low Empathy → add audience needs).

## Key Concepts
- **Zero-shot / One-shot / Few-shot**: No examples vs one vs a few demonstrations in the prompt.
- **Chain-of-Thought (CoT)**: Decompose reasoning into intermediate steps before the final answer.
- **Emotion Prompting**: Append emotionally charged stakes (e.g. career importance).
- **Rephrase and Respond (RaR)**: Model restates the question before answering.
- **Re-reading (RE2)**: Instruct the model to read the question again.
- **Analogical Prompting / Thread-of-Thought / Plan-and-Solve / Self-Consistency / Tree-of-Thoughts / APE / Self-Refine**: CoT-family and optimization variants from the synthesis literature.
- **PRISMA-informed SLR**: Selection process used to include primary survey sources (Braun, Schulhoff, Sahoo, Sasson Lazovsky, White).

## Mental Models
- Use **Braun’s outcome goals** when the ask is vague: force Learn vs Decide vs Create.
- Think of **White patterns as Lego connectors** when stitching Role + Procedure + Output.
- Prefer **skill diagnosis** when the model is fine but the human prompt writer is inconsistent.

## Anti-patterns
- **Fine-tuning first**: Treating parameter updates as the answer when prompt structure would suffice for practitioners.
- **Technique collecting without slots**: Memorizing CoT/ToT names without Role, Context, or Format cells.
- **Ignoring question-asking skill**: Assuming prompt quality is only about keywords, not clarity/empathy/goals.

## Worked Example
**Vague ask**: “Help with our Q3 report.”
- Braun outcome → *Create* (draft) + *Lookup* (pull figures).
- White slots → Role: “financial editor”; Task: “draft exec summary”; Context: “consider Y metrics”; Procedure: “explain assumptions”; Output: “preserve template.”
- Skills check → add Clarity (word limit) and Goal Orientation (decision-ready CFO audience).

## Key Takeaways
1. Canvas cells map onto published taxonomies, not invented folklore.
2. Patterns give structure; skills improve the human authoring loop.
3. CoT-family methods belong under Goal/Step-by-Step and Recommended Techniques.
4. Outcome goals (*learn…create*) clarify intent before wording polish.
5. Primary included surveys: Braun, Schulhoff (Prompt Report), Sahoo, Sasson Lazovsky, White.

## Connects To
- **Ch 3**: Persona/Role and Audience (role dimension + empathy skill).
- **Ch 4**: Task/Intent and Step-by-Step (CoT, Plan-and-Solve).
- **Ch 7**: Recommended Techniques toolbox.
