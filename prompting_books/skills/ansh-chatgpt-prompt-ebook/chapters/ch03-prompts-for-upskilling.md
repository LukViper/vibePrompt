# Chapter 3: Prompts for Upskilling

## Core Idea
ChatGPT becomes a skill coach when you assign a mentor role, define a concrete growth task, and add constraints—three reusable patterns: weekly routine, legendary-personality mentorship, and rule-explicit trivia games.

## Frameworks Introduced
- **Prompt Anatomy (introduced in practice)**: ASSIGN A ROLE → DEFINE THE TASK → SET CONSTRAINTS (and clarify purpose).
  - When to use: Designing any learning or coaching prompt.
  - How: Name a senior mentor persona; state the deliverable (e.g. weekly routine); constrain for uncommon advice and underrated resources; keep purpose explicit.
- **Weekly Skill-Routine Prompt**: Senior `[subject]` mentor builds a week plan focused on `[specific topic]`.
  - When to use: You need a structured practice cadence, not a one-off tip list.
  - How: `You are a senior [subject] Mentor. Give me a weekly routine to improve my [subject] skills, especially for [specific topic]. Include uncommon advice and underrated [subject] Resources.`
- **Legendary Personality Mentorship**: Channel a named person’s mental models, thought process, and tone; end with one actionable step.
  - When to use: Career or strategy doubts where a specific thinker’s lens helps.
  - How: Provide Personality + Doubt; require exact mental models/tone; mandate one concrete next action per answer.
- **Trivia Game Prompt**: Interactive quiz with scoring, win/lose thresholds, wait-for-answer turns, and control phrases.
  - When to use: Drilling theoretical basics in any subject.
  - How: Act as `<subject>` trivia; one MCQ per round; 10 pts correct / 0 wrong; 10 rounds to reach 50; “Stop this game” / “Start again” controls; wait for user before next question.

## Key Concepts
- **Role assignment**: Making the model behave as a mentor or game system.
- **Uncommon + underrated resources**: Constraint that pushes past generic top-10 lists.
- **Actionable closing step**: Forces mentorship answers into execution, not pure inspiration.
- **Explicit game rules**: Scoring, turn-taking, and stop/reset phrases so the model does not invent hidden rules.
- **Purpose clarification**: Stating *why* you want the output improves focus.

## Mental Models
- Use a **weekly routine prompt** when motivation is high but structure is missing.
- Use **personality mentorship** when you want decision style, not generic advice.
- Use a **trivia game** when you need spaced recall of fundamentals.
- Prefer **explicit rules over assumptions**—especially for interactive loops.
- Think of upskilling prompts as **coach contracts**: role + curriculum focus + quality bar.

## Anti-patterns
- **Vague “help me get better at X”**: No cadence, focus topic, or resource quality bar.
- **Personality prompt without actionable close**: Interesting voice, no next step.
- **Quiz without wait/score/stop rules**: Model dumps all questions or invents scoring.
- **Assuming the model knows your level**: Omit year/background and get mismatched plans.

## Worked Example
**Weekly routine (UX / mobile iOS)** — compact reconstruction of the book’s anatomy:

| Slot | Content |
|------|---------|
| Role | Senior UX Design Mentor |
| Task | Weekly routine to improve UX skills, especially mobile iOS |
| Constraints | Uncommon advice + underrated UX resources |

**Filled prompt skeleton**:
`You are a senior UX Design Mentor. Give me a weekly routine to improve my UX Design skills, especially for mobile iOS designs. Include uncommon advice and underrated UX Design Resources.`

**Expected shape of a good completion**: Day-by-day practice (study HIG, critique apps, build) plus non-obvious resources—not only “watch YouTube.”

**Personality variant**: Personality = Sundar Pichai; Doubt = second-year Chemical Engineering student aiming for a Google developer role—answer in that voice with CS fundamentals, projects, and one next action.

## Key Takeaways
1. Upskilling prompts work when role, task, and constraints are explicit.
2. Ask for uncommon/underrated material to escape generic advice.
3. Personality prompts need mental-model fidelity *and* one actionable step.
4. Interactive learning needs declared rules: turns, points, win/lose, stop/reset.
5. Swap the bracketed subject/topic to reuse the same templates across careers.

## Connects To
- **Ch 4**: Formal blueprint—framing, rich context, constraint decomposition.
- **Ch 6**: Same personality-mentorship pattern applied to content strategy.
- **Ch 7**: UX mentor prompts for research and interview practice.
