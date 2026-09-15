# Chapter 2: Note (Scope & Playground)

## Core Idea
Examples are shown in GovTech’s LaunchPad Playground, but the same prompt patterns transfer to other OpenAI-class (or comparable) LLM chat apps — especially ones that expose temperature/creativity.

## Frameworks Introduced
- **Platform-agnostic concepts**: Learn principles once; apply across chat UIs.
  - When to use: You lack LaunchPad access (public edition of this playbook).
  - How: Recreate prompts in any LLM chat; prefer apps that let you set temperature.
- **Probabilistic reproducibility**: Screenshots are real but slightly trimmed; high creativity yields different runs.
  - When to use: Teaching or documenting demos.
  - How: Expect drift across system prompts, models, and creativity settings.

## Key Concepts
- **LaunchPad**: GovTech whole-of-government AI innovation/experimentation platform (officers only).
- **LaunchPad Playground**: UI used for screenshots and terminology in the playbook.
- **Creativity**: Playground synonym for temperature (see Ch 3).
- **System Prompt**: Hidden starting instructions that differ by product and change behaviour.
- **Public vs. contextualised edition**: Public officers should use the LaunchPad-hosted version for Public Service context.

## Mental Models
- Use **any comparable LLM chat** when LaunchPad is unavailable — concepts still apply.
- Prefer **temperature-controllable playgrounds** when following Creativity experiments.
- Treat demo responses as **illustrative, not golden masters**.

## Anti-patterns
- **Assuming pixel-perfect replication**: Different system prompts or High creativity break match.
- **Treating LaunchPad UI labels as universal**: Other products may rename Creativity/Temperature.
- **Skipping verification because a screenshot looked right**: Outputs remain probabilistic.

## Worked Example
**Follow-along setup**: Open an OpenAI Playground-style app (or ChatGPT). Set Creativity/Temperature to Low when you need stable demos; use High only when exploring variation. Paste playbook prompts; if the reply diverges from the book, check model, system prompt, and creativity before blaming the prompt.

## Key Takeaways
1. LaunchPad is the demo environment; principles are portable.
2. Prefer apps that expose temperature for full playbook fidelity.
3. Screenshots may omit non-essential text; responses can differ.
4. You are responsible for validating outputs in your own tool.
5. Public edition ≠ officer-contextualised LaunchPad edition.

## Connects To
- **Ch 3**: Creativity ↔ Temperature mapping.
- **Ch 4–9**: All examples assume conversational memory like ChatGPT/LaunchPad.
- **OpenAI Playground**: External tool for temperature control.
