# Chapter 3: Output Customization

## Core Idea
Output Customization patterns constrain or tailor type, format, structure, role, or packaging of LLM output — scripts, personas, templates, recipes, and visualization payloads for other tools.

## Frameworks Introduced
- **Output Automater**: Whenever recommended steps appear, also emit an executable artifact that performs them.
  - When to use: Multi-file code edits, terminal/cloud sequences, any computer-controlled workflow.
  - How: **Whenever you produce an output with ≥1 step (and properties…) → Produce an executable artifact of type X that automates these steps.** Name a concrete artifact (“Python script”), not vague “automate this.”
  - Failure mode: Vague “automate” → model claims it can’t; missing local context → non-runnable scripts; blind execution risk.

- **Persona**: Assign a role/viewpoint that selects focus and output style.
  - When to use: You know the expert role but not the exact checklist (security reviewer, Linux terminal, etc.).
  - How: **Act as persona X** + **Provide outputs that persona X would create.** Optionally scope output type; for non-human personas, define I/O mapping (“my input = commands; your output = terminal text”).
  - Failure mode: Living-person personas may be blocked; hallucinations fill imaginary environments (useful for games, risky if treated as truth).

- **Visualization Generator**: Emit text consumable by a viz tool instead of pretending to draw.
  - When to use: Graphs, diagrams, imagery needs beyond plain text.
  - How: **Generate an X that I can provide to tool Y to visualize it.** Optionally list tools and let the model choose (Graphviz Dot vs DALL·E).
  - Failure mode: Underspecified chart/graph type when the tool supports many.

- **Template**: Force a precise output skeleton with placeholders.
  - When to use: URLs, form letters, constrained JSON shapes the model doesn’t know.
  - How: Provide template; mark placeholders (often ALL CAPS); **fit output into placeholders**; **preserve formatting**. Skip if the format is already a known standard the model handles well — unless you need extra shape constraints.
  - Failure mode: Filters away helpful rationale; hard to combine with patterns needing free-form structure (e.g., Recipe step lists).

- **Recipe**: Complete a step sequence from partial “ingredients” toward goal X.
  - When to use: You know goal + some steps/constraints but not full ordering.
  - How: **I want to achieve X; I know I need A,B,C; provide complete sequence; fill missing steps; identify unnecessary steps.** Combines Template + Alternative Approaches + Reflection ideas.
  - Failure mode: Biased toward keeping user’s unnecessary steps unless explicitly told to flag them.

## Key Concepts
- Concrete automation artifact vs. abstract “automation”
- Persona as lens for detail selection
- Placeholders as semantic insertion targets (and omission filters)
- Partial ingredients as waypoints/constraints for sequencing

## Mental Models
- Use **Output Automater** when the model proposes manual steps you would otherwise copy/paste.
- Use **Persona** when you can name the role better than the output checklist.
- Use **Template** when shape is non-negotiable; use **Recipe** when sequence-to-goal matters more than a fixed string layout.
- Use **Visualization Generator** when understanding needs a diagram pipeline, not more prose.

## Anti-patterns
- Asking the model to “automate” without naming script/type.
- Combining Template with Recipe when formats conflict.
- Executing automations you cannot read/verify.

## Worked Example
**Output Automater + multi-file code**:  
“From now on, whenever you generate code that spans more than one file, generate a Python script that can be run to automatically create the specified files or make changes to existing files to insert the generated code.”

**If automation is omitted**: Follow up with “But you didn’t automate it.”

**Template URL (compact)**: Placeholders `NAME`, `JOB` in `https://myapi.com/NAME/profile/JOB` → model fills structured URLs only.

## Why it works / failure mode
- **Automater**: Models accept “produce a script” more readily than “automate the world.” Works best when the full needed context lives in-conversation (greenfield app, self-contained ops). Fails when local OS/project facts are unknown or users execute blindly.
- **Persona**: Role names activate latent checklists; non-human personas invite rich simulated state — great for games, dangerous if treated as factual system state.
- **Template vs Recipe**: Template maximizes format fidelity; Recipe maximizes plan completeness. Combining them only works when the template can express a step list.

## Key Takeaways
1. Name concrete output types for automation and visualization.
2. Personas encode expertise you don’t want to enumerate by hand.
3. Templates buy consistency at the cost of extra explanation and composability.
4. Recipes complete and critique partial plans — ask them to mark unnecessary steps.
5. Read before you run generated automations.
6. If Automater omits the script, remind explicitly (“But you didn’t automate it”).

## Connects To
- **Ch 6 Infinite Generation**: Often stacked with Template for batched structured outputs.
- **Ch 6 Game Play**: Strong with Persona (e.g., compromised Linux terminal).
- **Ch 4 Fact Check List / Reflection**: Pair with Automater/Recipe before trusting steps.
- **Ch 5 Alternative Approaches**: Recipe already leans on alternative-path critique for unnecessary ingredients.
