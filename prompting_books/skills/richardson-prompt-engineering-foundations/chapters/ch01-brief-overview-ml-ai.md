# Chapter 1: A Brief Overview of ML and AI

## Core Idea
Prompt engineering sits on top of AI/ML literacy: know how we got machine intelligence (milestones, tests, definitions) before you try to steer model outputs with prompts.

## Frameworks Introduced
- **Operational intelligence (Turing test / imitation game)**: Judge machine intelligence by whether a human cannot tell machine from human in conversation — behavior over consciousness.
  - When to use: When debating “is this AI?” or evaluating chatbots that claim human-like dialogue
  - How: Ask whether linguistic performance alone would pass an imitation-game bar; separate that from claims about internal understanding
  - Why it works / failure mode: Shifts the problem to observable behavior; fails if you equate fluent talk with reliable reasoning or truthfulness
- **AI as a named discipline (Dartmouth 1956)**: McCarthy, Minsky, Rochester, Shannon framed AI as machines simulating human-equivalent intelligence; McCarthy coined “AI.”
  - When to use: When grounding definitions, history, or interdisciplinary scope of the field
  - How: Treat AI as joint work across math, psychology, engineering, and CS — not a single algorithm family
- **Prompt engineering as leverage on AI systems**: Prompt skill directly changes output quality, reliability, UX, and responsible use.
  - When to use: Before diving into prompt tactics without shared vocabulary for AI/ML
  - How: Build foundational history + ML/AI concepts first (this chapter’s stated path), then prompt craft

## Key Concepts
- **Artificial intelligence (AI)**: Machines performing tasks associated with human intelligence (reasoning, learning, language)
- **Machine learning (ML)**: Data-driven methods that train models rather than hand-coding every rule
- **Prompt engineering**: Designing inputs that improve AI system performance and reliability
- **GC&CS / Bletchley Park**: WWII codebreaking context where Turing led electromechanical attacks on Enigma
- **Enigma**: Electromechanical cipher; shared rotor settings ≈ shared secret (symmetric-key analogy)
- **Colossus / Bombe**: Early programmable / iterative search machines enabling brute-force decryption
- **Brute force attack**: Exhaustive iteration over candidate keys/settings until plaintext emerges
- **Turing test**: Operational criterion — converse indistinguishably from a human
- **Dartmouth conference (1956)**: Formal birth of AI as academic field; coined the term
- **NLP / symbolic reasoning**: Early co-evolving strands noted as part of the Dartmouth-era research agenda

## Mental Models
- Use **history → capability → prompting** when Y is explaining why prompt engineering exists: collaboration quality depends on understanding the stack underneath.
- Think of **Enigma rotor settings as a shared secret** when teaching cryptography ancestry of modern cybersecurity.
- Prefer **behavioral tests** when Y is evaluating chatbots; prefer **task metrics** when Y is evaluating production AI reliability.
- Treat **AI as interdisciplinary from day one** when designing teams or curricula.

## Anti-patterns
- **Jumping straight to prompts without foundations**: Misses why models fail and what “intelligence” claims actually mean
- **Equating fluent chat with intelligence**: Passes imitation-game rhetoric; fails on accuracy, safety, and grounding
- **Ignoring human factors in crypto history**: Weak keys (preferring real words) made brute force tractable — same class of mistake as weak secrets today

## Worked Example
**WWII crypto → computational search (author’s bridge)**  
1. Shared daily rotor settings = secret key material.  
2. Humans preferred meaningful six-letter words → search space shrinks.  
3. Colossus/Bombe iterates candidates against Enigma mechanics (brute force).  
4. Lesson for AI lineage: machines outpace humans at systematic search; that capability later fuels learning systems and, eventually, promptable generative models.

**Apply today**: When a prompt “fails,” ask whether you narrowed the search space (constraints, examples, format) the way known-word lists narrowed Enigma settings — or left the model an unbounded space.

## Key Takeaways
1. Prompt engineering quality depends on AI/ML foundations, not only wording tricks.
2. Turing’s contribution is an operational test of conversational indistinguishability, not a definition of mind.
3. Dartmouth (1956) named AI and set an interdisciplinary research agenda still echoed today.
4. Early “computers” in this narrative are search and simulation engines (Colossus/Bombe), not chatbots.
5. Sample body covers milestones deeply; later Ch1 topics (ML types, data training, GPT evolution) appear in the TOC but are truncated in this publisher sample.

## Connects To
- **Ch 2**: Evolution of ML (symbolic → statistical → neural → deep learning)
- **Ch 7**: Prompt ecosystem once foundations are in place
- **Cybersecurity / crypto**: Symmetric secrets, brute force, human-chosen weak keys
- **Conversational AI evaluation**: Turing-test framing vs task-based eval
