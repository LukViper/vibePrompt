# Chapter 6: Interaction

## Core Idea
Interaction patterns change turn-taking and generation cadence — the LLM asks, plays a game, or keeps generating — so control flips from “user drives every prompt” to goal-directed, repetitive, or experiential dialogues.

## Frameworks Introduced
- **Flipped Interaction**: LLM asks questions to achieve goal X until a stop condition.
  - When to use: Quizzes; gathering requirements the model knows how to elicit (e.g., deploy-to-AWS interview); user shouldn’t have to invent the questionnaire.
  - How: **I would like you to ask me questions to achieve X**; **ask until condition/goal (or forever)**; optional **N questions at a time**. State engagement level (minimal control vs confirm every decision) and expertise level.
  - Failure mode: Too open-ended → excess questions; underspecified target → nondeterministic artifacts. Inject known requirements up front.

- **Game Play**: Create a game around topic X with explicit rules; model generates content under those rules.
  - When to use: Rules are narrow, content breadth is large (training scenarios, explorations).
  - How: **Create a game for me around X** + **one or more fundamental rules**. Text I/O games work best; rich action language allowed. Combine with Persona, Infinite Generation, Visualization Generator.
  - Failure mode: Rules outside model capabilities; spoiling hidden state by describing it in the prompt (Persona helps hide details).

- **Infinite Generation**: Keep producing outputs (X at a time) without retyping the generator prompt.
  - When to use: CRUD-for-many-entities; repeated template fills; batch generation with optional between-output inputs.
  - How: **Generate forever, X outputs at a time**; optional **how to use input between outputs**; optional **stop when I ask** (use explicit stop phrases if “stop” could be content).
  - Failure mode: Context drift as history grows; repetitive outputs; length limits — rate-limit with X-at-a-time and monitor/correct.

## Key Concepts
- Inversion of control for questioning
- Termination conditions vs. forever loops
- Rules-as-constraints, content-as-generation
- Prompt reuse under conversational context limits

## Mental Models
- Use **Flipped Interaction** when the model is better at knowing what to ask than the user is at volunteering it.
- Use **Game Play** when you want experiential practice/exploration under fixed rules.
- Use **Infinite Generation** when retyping the same generator prompt is the error source.
- Stack **Game Play + Persona** when the interface *is* the fiction (terminal, system).

## Anti-patterns
- Flipped Interaction without a goal or stop condition.
- Infinite Generation without monitoring for drift/repetition.
- Putting spoilers in Game Play prompts that Persona was meant to hide.

## Worked Example
**Flipped Interaction (deployment)**:  
“From now on, I would like you to ask me questions to deploy a Python application to AWS. When you have enough information to deploy the application, create a Python script to automate the deployment.”

**Sharpening**: Name services (EC2/Lambda/…) and engagement policy to cut wasted turns.

**Game Play + Persona (cybersecurity game, compact reconstruction)**: Pretend to be a Linux terminal on a compromised host; user investigates via commands; attack effects drawn from a fixed menu (new processes, changed files, ports, outbound connections, passwords, accounts, data theft); start with a scenario containing clues. Sample investigation path: `ls -alt` → suspicious `.bash_history` → `cat` reveals destructive/backdoor command sequence — content invented under rules, not pasted as a long raw transcript.

## Why it works / failure mode
Flipped Interaction works because the model often knows *what information is missing* better than the user knows what to volunteer — if goal, stop, and engagement are explicit. Without them, question storms or underspecified artifacts appear. Game Play works when rules fit text I/O and content breadth is the hard part; spoiling hidden state in the prompt collapses the experience. Infinite Generation amortizes prompt entry but conversational context can fade — monitor, correct, or restart with Context Manager.

## Key Takeaways
1. Always declare goal + stop rules for flipped dialogues.
2. Keep game rules small; let the model expand content.
3. Rate-limit infinite generation; watch for context fade.
4. Interaction patterns are natural combinators with Output Customization.
5. Inject known requirements early in Flipped Interaction rather than hoping the model asks for them.

## Connects To
- **Ch 3 Persona / Template / Visualization Generator**: Common stacks for games and batched structured output.
- **Ch 3 Output Automater**: Flipped Interaction often ends in an automation artifact.
- **Ch 7 Context Manager**: Reset when a long infinite/game session pollutes later work.
- **Ch 5 Cognitive Verifier**: Related elicitation pattern where subdivision serves answer quality, not a long-running goal interview.
