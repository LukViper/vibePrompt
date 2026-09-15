# Chapter 4: System, Role, Contextual & Step-Back Prompting

## Core Idea
Separate **system** (overarching purpose/capabilities), **role** (voice/identity), and **contextual** (task-specific background) prompts — then use **step-back** to answer a general question first and inject that knowledge into the specific task.

## Frameworks Introduced
- **System prompting**: Sets big-picture purpose (translate, classify, return format, safety rules)
  - When to use: Need format contracts, schemas, or behavioral guardrails
  - How: Add explicit system-level instructions (“Only return the label in uppercase”; JSON schema; “Be respectful”)
- **Role prompting**: Assign a character/identity (travel guide, editor, teacher)
  - When to use: Need consistent expertise, tone, or style
  - How: “Act as …”; optionally specify style (humorous, formal, persuasive, …)
- **Contextual prompting**: Immediate, dynamic background for this turn
  - When to use: Domain framing that changes per request
  - How: Lead with `Context: …` then the ask
- **Step-back prompting**: First ask a broader principle/setting question; feed that answer as context into the specific prompt
  - When to use: Direct asks yield generic or shallow results; need activated background knowledge
  - How: (1) general probe → (2) specific task with step-back answer as context

## Key Concepts
- **Overlap is normal**: A role prompt can include context; keep primary intent clear for analysis
- **System vs contextual vs role intents**: Capabilities/purpose vs task facts vs style/voice
- **JSON-as-structure force**: Asking for valid JSON reduces free-form hallucination and eases parsing
- **Safety/toxicity line**: System add-on like “You should be respectful in your answer”
- **Effective styles** (Boonstra): Confrontational, Descriptive, Direct, Formal, Humorous, Influential, Informal, Inspirational, Persuasive
- **Bias mitigation via step-back**: Focusing on general principles before particulars

## Mental Models
- Use **system prompting** when Y is a durable contract (format, schema, safety).
- Use **role prompting** when Y is tone/expertise consistency across turns.
- Use **contextual prompting** when Y is per-request background that should not live in the system prompt.
- Use **step-back** when Y is creative/specific but zero-context asks feel generic — broaden first, then narrow.
- Prefer **clear separation of intent** when debugging which layer caused a failure.

## Anti-patterns
- **Mushing all three layers** so you cannot tell what to change
- **Constraints-only system prompts** without positive instructions (see Best Practices)
- **Skipping step-back** when high temperature alone produces random generic content
- **Role without task** (“be a helpful assistant”) with no concrete ask

## Worked Example
**Step-back FPS storyline** (Tables 8–10):
1. **Direct**: “Write a one-paragraph challenging FPS level storyline” → generic urban ambush (high temp → random/generic).
2. **Step-back**: “Based on popular FPS games, list 5 fictional key settings that make levels challenging/engaging” → military base, cyberpunk city, alien ship, zombie town, underwater lab.
3. **Augmented**: Inject the five themes as `Context:`, then “Take one theme and write…” → concrete underwater-lab storyline with pressure, puzzles, aquatic threats.

**System JSON classification** (Table 4 pattern): Classify review; return schema with `movie_reviews[].sentiment` and `name` — forces structured, parseable output even at higher temperature.

## Key Takeaways
1. Distinguish system / role / contextual primary purposes even when they overlap.
2. System prompts excel at format, schema, and safety contracts.
3. Role prompts blueprint tone, style, and focused expertise.
4. Contextual prompts supply dynamic, task-specific facts.
5. Step-back activates broader knowledge before the narrow task — often richer than direct asks.

## Connects To
- **Ch 3**: Examples still help; system/role/context can reduce how many you need
- **Ch 5**: Reasoning techniques stack with these framing layers
- **Ch 10**: Prefer instructions over constraints; be specific about output
