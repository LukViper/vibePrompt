# Chapter 10: Security & Alignment Issues

## Core Idea
Prompting introduces a distinct threat and reliability surface: **prompt hacking** (injection + jailbreaking), privacy leaks, insecure codegen, and **alignment** failures (sensitivity, miscalibration, sycophancy, bias, ambiguity). Defenses help but no prompt-only defense is fully secure.

## Frameworks Introduced
### Security
- **Prompt Hacking**: manipulate prompts to exploit GenAI (superset).
- **Prompt Injection**: user input overrides developer instructions inside a shared template (architecture: model can’t reliably separate trusted vs untrusted text).
- **Jailbreaking**: elicit unintended behavior via adversarial prompting (with or without a developer wrapper).
- **Risks**: training-data reconstruction; **prompt leaking**; package hallucination; buggy/vulnerable generated code; customer-service brand/legal harm.
- **Hardening**: prompt-based defenses (instructions like “ignore malicious…”) · **detectors** (often fine-tuned) · **guardrails** / dialogue managers / prompt DSLs—mitigate, don’t solve.

### Alignment & robustness
- **Prompt sensitivity**: wording, task format, Few-Shot ordering, **prompt drift**.
- **Overconfidence / calibration**: token probs vs verbalized scores; self-eval (Ch 6) as better calibration in some settings.
- **Sycophancy**: models agree with user opinions, “Are you sure?”, or false premises—worse in larger/instruction-tuned models.
- **Bias / stereotypes / culture**: demonstration selection and AttrPrompt-style mitigations; cultural awareness.
- **Ambiguity**: ambiguous demos/questions; clarification sub-prompts.

## Key Concepts
- **Trusted instructions vs untrusted user channel**: classical injection root cause.
- **Package hallucination**: suggest nonexistent libraries attackers later squat.
- **Prompt leaking**: social-engineering the template out of an app.
- **Vanilla prompting vs carefully selected demos**: bias can enter through exemplars.
- **Question clarification**: ask before answering when under-specified.

## Mental Models
- Use **detectors + guardrails** when Y is user-facing; never rely on prompt-only bans.
- Prefer **omit user opinions** in prompts when Y needs independent judgment (anti-sycophancy).
- Treat **ordering/wording ablations** as mandatory when Y metrics swing (sensitivity).
- Use **clarification turns** when Y queries are ambiguous rather than guessing.

## Anti-patterns
- **Prompt-only “refuse malice” wording as sole control**: Schulhoff et al. show no PE defense fully blocks attacks.
- **Shipping codegen without package allowlists**: hallucination → supply-chain risk.
- **Putting secrets in system prompts** assuming they can’t leak.
- **Leading the model with your preferred answer** then trusting agreement.

## Worked Example
Injection-shaped template:

```
Recommend a book for the following person: {USER_INPUT}
```

Malicious fill: user text that instructs the model to discard the developer preamble and follow a new harmful directive → model may prioritize user text.

Jailbreak (no wrapper): user directly asks for disallowed content in a raw chat (no app template).

Leak probe: user asks the model to reveal the app’s hidden initial instructions / system template.

Hardening stack: input detector → refuse/canned path → output filter; keep developer instructions out-of-band where architecture allows; still assume residual risk.

Sycophancy avoid: don’t include `I love this argument` / `I'm sure you're wrong` when scoring quality.

## Key Takeaways
1. Injection ≠ jailbreak, but both sit under prompt hacking.
2. Privacy, IP (templates), codegen, and brand/legal are concrete risks.
3. Prompt defenses < detectors/guardrails < still imperfect.
4. Alignment issues: sensitivity, calibration, sycophancy, bias, ambiguity.
5. Don’t put personal opinions in evaluative prompts.

## Connects To
- **Ch 7**: extractors and PE don’t equal security reviews.
- **Ch 9**: agents multiply tool-abuse paths.
- **Ch 11**: real PE work must include failure and safety checks.
