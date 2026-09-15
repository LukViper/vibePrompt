# Chapter 4: Prompt Risks

## Core Idea
Prompted systems can be hijacked or coerced: **Prompt Injection** overrides instructions, **Prompt Leaking** extracts the system prompt, and **Jailbreaking** bypasses safety/moderation — especially when untrusted user text is concatenated into prompts.

## Frameworks Introduced
- **Prompt Injection**: Hijack an LM’s output by injecting an untrusted command that overrides the original prompt instructions.
  - When to use (defensive framing): Anytime you concatenate user-generated text with a developer/system prompt.
  - How (attack surface): User content embeds competing directives that try to displace the developer’s task.
  - How (mitigate): Separate trusted instructions from untrusted data; constrain outputs; don’t treat concatenated user text as equally privileged.
  - Failure mode: Assuming “the model will know which part is the real instruction.”

- **Prompt Leaking**: Force the model to reveal its own prompt (system/developer text).
  - When to watch for: Apps that hide proprietary instructions, keys, or policy text in the prompt.
  - How (attack surface): User asks the model to reprint, paraphrase, or encode the hidden system text.
  - How (mitigate): Keep secrets out of prompts; monitor for prompt-disclosure requests; minimize sensitive content in context.
  - Failure mode: Storing API keys, private policies, or PII only “inside” the system prompt.

- **Jailbreaking**: A form of injection aimed at bypassing safety and content moderation.
  - When to watch for: Public chatbots and API apps with static safety layers.
  - How (attack surface): Harmful prompts/attacks that exploit static serving, training-data quirks, or moderation gaps.
  - How (mitigate): Layer defenses (filters, refusal policies, monitoring); assume static models remain probeable.
  - Failure mode: Believing jailbreaks are “too hard” because moderation exists — lecture notes they often are not.

## Key Concepts
- **Untrusted command**: User- or third-party-supplied text treated as instructions.
- **Instruction override**: When injected text displaces the developer’s intended task.
- **Concatenation risk**: Gluing user prompts onto a fixed template without isolation.
- **Prompt leaking**: Disclosure of the prompt itself (sensitive/private/confidential content).
- **Jailbreaking**: Circumventing safety/moderation features via adversarial prompting.
- **Static serving**: Fixed deployed model/policy that attackers can repeatedly probe.
- **Content moderation**: API-side filters that jailbreaks try to evade.

## Mental Models
- Use **trust boundaries** when Y is “any string from outside your org enters the prompt.”
- Prefer **data-vs-instruction separation** over “please ignore malicious users” instructions alone.
- Treat **Prompt Leaking** as a confidentiality bug, not just a curiosity.
- Treat **Jailbreaking** as injection with a safety-bypass goal — same root cause family.
- Prefer **defense in depth** when Y is “the model is static and public-facing.”

## Anti-patterns
- **Blind concatenation**: `system_prompt + user_message` with full trust in the model to keep roles straight.
- **Secrets in system prompts**: Credentials or confidential policies living only in prompt text.
- **Safety-by-hope**: Assuming API moderation makes jailbreaks impractical.
- **Single-layer refusal**: One canned “don’t do bad things” line as the only control.

## Worked Example
**Injection via concatenation** (pattern, not a recipe for harm):
- Trusted instruction: “Summarize the following ticket for support staff.”
- Untrusted user field: contains a competing directive that tries to change the task (e.g. ignore summarization and output something else).
- Without isolation, the model may follow the injected directive — the lecture’s core warning about concatenation.

**Leaking smell**: User asks for a verbatim dump or encoded copy of the system text. If the app’s value depends on a hidden prompt, redesign so secrets aren’t there.

**Jailbreak framing**: Goal is bypassing moderation, not completing the business task — detect by intent (safety circumvention) even when wording looks playful.

## Key Takeaways
1. Prompt Injection overrides instructions via untrusted injected commands.
2. Prompt Leaking extracts the prompt — keep sensitive material out of it.
3. Jailbreaking targets safety/moderation; often easier than expected on static APIs.
4. Concatenating user text into prompts is the common enabling mistake.
5. Pair advanced techniques (Ch 2–3) with threat awareness before production.

## Connects To
- **Ch 1**: Output indicators and role prompts are still overridable if injection succeeds.
- **Ch 3**: ReAct/tool agents amplify impact if injected actions call tools.
- **Prompt Engineering Guide**: https://github.com/dair-ai/Prompt-Engineering-Guide (and promptingguide.ai source slides).
