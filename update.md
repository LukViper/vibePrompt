# VibePrompt — Revised Project Plan

## 1. Project Vision

> **VibePrompt is a personalized, context-aware prompt adaptation system that learns how a user communicates, understands their context, recovers noisy input, and makes the smallest useful modification needed to get a better AI response.**

The system should not behave like a generic "prompt optimizer."

Its goal is to understand:

1. **How the user communicates**
2. **How the user prefers AI to respond**
3. **What the user currently means**
4. **What context the user is working in**
5. **When no modification is necessary**

---

# 2. Core Product Loop

```text
                     USER
                       │
                       ▼
                ┌─────────────┐
                │ Raw Prompt  │
                └──────┬──────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
 ┌─────────────────┐       ┌─────────────────┐
 │ Personal Typing │       │ User Preference │
 │     Model       │       │     Profile     │
 └────────┬────────┘       └────────┬────────┘
          │                         │
          └────────────┬────────────┘
                       ▼
              ┌─────────────────┐
              │ Context Engine  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ PASS / ADAPT /  │
              │      ASK        │
              └────────┬────────┘
                       │
             ┌─────────┼─────────┐
             ▼         ▼         ▼
           PASS      ADAPT      ASK
             │         │         │
             │         ▼         │
             │  Minimal Prompt   │
             │     Adapter       │
             │         │         │
             └─────────┼─────────┘
                       ▼
                    ChatGPT
                       │
                       ▼
                 User Response
                       │
                       ▼
                Feedback/Learning
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       Typing Model        Preference Model
```

---

# 3. System Pillars

VibePrompt consists of three primary intelligence layers.

## 3.1 Understand Me

### User Preference Profile

Determines:

> "How does this user prefer AI to communicate with them?"

The profile is initially created through onboarding.

Example:

```json
{
  "learning_preferences": [
    "real-world examples",
    "analogies",
    "step-by-step explanations"
  ],
  "explanation_preferences": [
    "simple explanations first",
    "deeper technical detail when needed"
  ],
  "prompt_style": "casual and conversational",
  "response_length": "concise but sufficiently detailed",
  "technical_level": "intermediate",
  "preferred_tone": "direct and friendly",
  "preferred_elements": [
    "examples",
    "analogies",
    "comparisons",
    "practical applications",
    "practice questions"
  ]
}
```

---

## 3.2 Understand How I Type

### Personalized Typing Model

Determines:

> "What does this user probably mean when they type something messy?"

Example:

```text
bro expln dedlcks in os wth exmpl
```

Potential interpretation:

```text
bro explain deadlocks in operating systems with example
```

The system should recognize:

* spelling mistakes
* missing characters
* repeated characters
* swapped characters
* abbreviations
* informal typing
* user-specific mistakes
* technical vocabulary

---

## 3.3 Understand What I Mean Right Now

### Context Engine

The system combines:

```text
Current Prompt
      +
Conversation Context
      +
User Profile
      +
Personal Typing Model
      +
Learning Context
```

This allows VibePrompt to interpret prompts that would otherwise be ambiguous.

Example:

```text
"explain that again"
```

may be meaningless without conversation context but completely clear inside an ongoing conversation.

---

# 4. User Preference Profile

## 4.1 Initial Onboarding

The onboarding system should allow the user to describe:

* learning preferences
* explanation preferences
* prompt-writing style
* desired response length
* technical level
* preferred tone
* preferred response elements

### Two onboarding modes

#### Quick Setup

A short 30-second setup.

Example:

```text
How do you usually learn?

○ Examples
○ Step-by-step
○ Analogies
○ Theory
○ Mix

How long should answers normally be?

○ Short
○ Medium
○ Detailed

Preferred tone?

○ Casual
○ Direct
○ Professional
○ Encouraging
```

#### Advanced Setup

Use the ChatGPT-based onboarding prompt.

Flow:

```text
VibePrompt
    ↓
Copy onboarding prompt
    ↓
ChatGPT interviews user
    ↓
ChatGPT generates JSON
    ↓
User copies JSON
    ↓
VibePrompt validates JSON
    ↓
Profile created
```

---

# 5. Preference Priority System

The system must never allow learned preferences to override explicit instructions.

Priority:

```text
1. Explicit current instruction
2. Current conversation context
3. User profile
4. Learned behavioral preferences
5. Detected vibe/emotion
6. Default behavior
```

Example:

User profile:

```text
Likes analogies
```

Current prompt:

```text
Give me only the formal definition of TCP.
Do not use analogies.
```

VibePrompt must **not** inject an analogy.

Explicit instructions always win.

---

# 6. Personalized Typing Model

## 6.1 Purpose

Build a user-specific vocabulary and error model that improves over time.

Example:

```json
{
  "personal_typos": {
    "thsi": {
      "correction": "this",
      "count": 17,
      "confidence": 0.96
    },
    "adn": {
      "correction": "and",
      "count": 12,
      "confidence": 0.93
    }
  },
  "abbreviations": {
    "os": {
      "meaning": "operating systems",
      "confidence": 0.89
    }
  },
  "domain_terms": [
    "LPC2148",
    "Kruskal",
    "FastAPI",
    "CUDA"
  ]
}
```

---

# 7. Personal Vocabulary Categories

The personal dataset should not be a single dictionary.

```text
Personal Data
│
├── Typing Corrections
│   ├── thsi → this
│   ├── adn → and
│   └── exmple → example
│
├── Abbreviations
│   ├── os → operating systems
│   ├── ml → machine learning
│   └── db → database
│
├── Domain Vocabulary
│   ├── LPC2148
│   ├── Kruskal
│   ├── FastAPI
│   └── CUDA
│
└── Prompt Habits
    ├── asks for examples
    ├── prefers concise answers
    └── frequently requests step-by-step explanations
```

This distinction prevents technical terms from being incorrectly "fixed."

---

# 8. NLP Recovery Engine

The first version should use lightweight NLP rather than an LLM for every typo.

## Pipeline

```text
Raw Prompt
    ↓
Noise Detection
    ↓
Candidate Generation
    ↓
Edit Distance
    ↓
Character N-Grams
    ↓
Word N-Gram Probability
    ↓
Personal Vocabulary
    ↓
Domain Vocabulary
    ↓
Confidence Score
    ↓
Correction / Preserve / LLM Fallback
```

---

# 9. Edit Distance

Use Levenshtein distance for candidate generation.

Example:

```text
thsi → this
```

The distance is small, making `this` a strong candidate.

However, edit distance alone cannot determine the correct meaning.

Therefore it must be combined with contextual probability.

---

# 10. Character N-Grams

Character n-grams make the system more robust to noisy spelling.

Example:

```text
hello
```

Character trigrams:

```text
hel
ell
llo
```

Even a corrupted word:

```text
hhelo
```

still contains useful character-level similarity.

Character n-grams should therefore be an important component of the typo-recovery layer.

---

# 11. Word N-Grams

Word n-grams provide contextual information.

Conceptually:

```text
P(w1, w2, ..., wn)
```

can be estimated from previous words.

For example:

```text
"explain ___ algorithm"
```

can provide useful information when choosing between candidate corrections.

---

# 12. Candidate Scoring

A possible initial scoring function:

```text
FinalScore =
    0.30 × EditSimilarity
  + 0.25 × CharacterNGramScore
  + 0.20 × WordContextScore
  + 0.20 × PersonalHistoryScore
  + 0.05 × DomainContextScore
```

These weights are **initial experimental values**, not fixed truths.

They should eventually be optimized through evaluation.

---

# 13. Confidence-Driven Correction

Never automatically correct every suspicious word.

Example:

```text
Confidence > 0.90
        ↓
    Auto-correct

0.60–0.90
        ↓
 Contextual verification

< 0.60
        ↓
Preserve / LLM fallback / ASK
```

The thresholds should be experimentally determined.

---

# 14. Protecting Technical Vocabulary

The system must recognize that unusual words are not necessarily mistakes.

Example:

```text
LPC2148
Kruskal
CUDA
FastAPI
Kubernetes
```

should not be aggressively corrected by a general spell checker.

Maintain a domain vocabulary layer.

```text
Generic Vocabulary
       +
Personal Vocabulary
       +
Domain Vocabulary
```

---

# 15. Personal Learning Loop

The personal model should improve with usage.

```text
User Input
    ↓
Detect suspicious token
    ↓
Generate candidates
    ↓
Calculate confidence
    ↓
Select correction
    ↓
Send adapted prompt
    ↓
Observe feedback
    ↓
Update personal model
```

---

# 16. Learning Evidence

Do not learn from a single occurrence.

### Weak evidence

One typo:

```text
thsi
```

### Medium evidence

Repeated occurrence:

```text
thsi
thsi
thsi
thsi
```

### Strong evidence

User explicitly accepts or corrects the suggestion.

Example:

```text
User:
No, I meant "switch".
```

The system can then strongly associate the correction.

---

# 17. Personal Typing Model Safety

The model must be able to **unlearn** incorrect assumptions.

Example:

```text
cuda → data
```

might be incorrectly learned.

If the user repeatedly rejects this correction:

```text
confidence decreases
```

Eventually:

```text
cuda → preserve
```

The system should support:

* confidence increase
* confidence decrease
* manual deletion
* reset personal vocabulary

---

# 18. Privacy Architecture

Personal typing data should be **local-first**.

Recommended architecture:

```text
Chrome Extension
      │
      ├── User Profile
      │
      └── Personal Vocabulary
               │
               ↓
         Local Storage
```

The backend should not receive the user's entire personal dictionary on every request.

Benefits:

* better privacy
* lower latency
* lower bandwidth
* lower backend storage requirements
* better user trust

---

# 19. User Controls

Provide:

```text
Personal Learning: ON / OFF
```

Additional controls:

```text
View Learned Words
Forget Learned Vocabulary
Pause Learning
```

Users should know that the system is learning.

---

# 20. Context Engine

The context engine combines:

```text
Current Prompt
       +
Relevant Conversation
       +
User Profile
       +
Personal Vocabulary
       +
Learning Context
```

Example:

```text
Subject: Operating Systems
Topic: Deadlocks
Level: Intermediate

Prompt:
"bro explain that again"
```

The system can resolve "that" using conversation context.

---

# 21. PASS / ADAPT / ASK

This is the central decision layer.

## PASS

The prompt is already good.

Example:

```text
Explain TCP congestion control with an example.
```

Action:

```text
Do nothing.
```

Benefits:

* zero unnecessary rewriting
* lower latency
* lower token usage

---

## ADAPT

The prompt is understandable but personalization can improve it.

Input:

```text
explain deadlock
```

Possible output:

```text
Explain deadlock in operating systems concisely,
using a simple analogy and one example.
```

---

## ASK

The intended meaning cannot be safely recovered.

Input:

```text
explain that thing from yesterday
```

If context is insufficient:

```text
Which topic are you referring to?
```

Never hallucinate missing intent.

---

# 22. Minimal Prompt Adapter

The adapter should optimize for:

```text
Meaning Preservation
+
Useful Personalization
+
Necessary Clarification
-
Unnecessary Tokens
```

Bad:

```text
You are an expert educational assistant.
Your task is to explain...
The user prefers...
The user is an intermediate learner...
Use analogies...
Use examples...
Structure your response...
...
```

Better:

```text
Explain deadlock using a simple analogy and one example.
Keep it concise.
```

The output should be as short as possible while preserving useful information.

---

# 23. Learning Context / Books-to-Skill

Books-to-Skill should become a source of **Learning Context** rather than a completely separate product.

Example:

```json
{
  "subject": "Operating Systems",
  "resource": "Operating System Concepts",
  "current_topic": "Deadlocks",
  "level": "Intermediate"
}
```

Then:

```text
bro explain deadlock
```

can be interpreted using:

```text
Subject
+
Current Topic
+
Learning Level
+
User Preferences
```

---

# 24. Future Book Intelligence

Later:

```text
Book / PDF
     ↓
Chapter Extraction
     ↓
Topic Extraction
     ↓
Topic Mapping
     ↓
Learning Context
     ↓
VibePrompt
```

Do not build a complete RAG system during the first MVP.

---

# 25. Emotion / Vibe Detection

Emotion detection should remain, but it should be a **secondary signal**.

Example:

```text
"bro i seriously don't understand this 😭"
```

may indicate frustration.

The system could slightly change the response style.

However:

```text
Explicit User Instruction
```

must always override inferred emotion.

Vibe should influence behavior, not dominate the system.

---

# 26. Grill Mode

Grill should mean:

```text
Direct
+
Challenging
+
Constructive
```

It should not mean:

```text
Insulting
+
Aggressive
+
Hostile
```

Example:

```text
"Your current understanding has a gap here.
Let's identify it and fix it."
```

rather than:

```text
"Your question is stupid."
```

---

# 27. Technical Architecture

## Chrome Extension

```text
extension/
├── popup/
├── content/
├── background/
├── profile/
├── personal_model/
└── context/
```

Responsibilities:

* capture prompt
* access user profile
* maintain local personal vocabulary
* communicate with backend
* display adaptations
* display changes
* collect user feedback

---

## Backend

```text
backend/
├── main.py
│
├── api/
│   ├── vibe.py
│   ├── profile.py
│   └── learning.py
│
├── nlp/
│   ├── normalization.py
│   ├── edit_distance.py
│   ├── char_ngrams.py
│   ├── word_ngrams.py
│   ├── candidate_generation.py
│   └── confidence.py
│
├── adaptation/
│   ├── decision.py
│   ├── context.py
│   └── adapter.py
│
├── models/
│   ├── profile.py
│   ├── vocabulary.py
│   └── context.py
│
└── evaluation/
```

---

# 28. API Architecture

Move toward:

```text
POST /api/v1/adapt
```

Example request:

```json
{
  "prompt": "bro expln dedlck in os wth exmpl",
  "profile": {},
  "context": {},
  "personal_vocabulary": {}
}
```

Example response:

```json
{
  "decision": "ADAPT",
  "normalized_prompt": "bro explain deadlock in operating systems with example",
  "adapted_prompt": "Explain deadlock in operating systems with a simple example.",
  "changes": [
    "dedlck → deadlock",
    "os → operating systems",
    "wth → with",
    "added example preference"
  ],
  "confidence": 0.94
}
```

PASS example:

```json
{
  "decision": "PASS",
  "adapted_prompt": null,
  "confidence": 0.98
}
```

---

# 29. User Experience

## Installation

```text
Welcome to VibePrompt

VibePrompt learns how you communicate
and how you want AI to respond.

[ Quick Setup ]    [ Skip ]
```

---

## Main Interface

```text
┌───────────────────────────────────┐
│ VibePrompt                    ⚙   │
│                                   │
│ Your prompt                       │
│ ┌───────────────────────────────┐ │
│ │ bro expln dedlck in os        │ │
│ └───────────────────────────────┘ │
│                                   │
│ ✓ 2 typing corrections            │
│ ✓ Using your learning preferences │
│                                   │
│        [ Adapt Prompt ]            │
└───────────────────────────────────┘
```

---

# 30. Transparency

Whenever VibePrompt modifies a prompt, show the user what changed.

Example:

```text
Original:
bro expln dedlck in os wth exmpl

Adapted:
Explain deadlock in operating systems
with a simple example.

Changes:
✓ dedlck → deadlock
✓ os → operating systems
✓ wth → with
✓ Added preference for examples
```

This creates trust.

---

# 31. "Why did you change this?"

A useful future feature.

Example:

```text
thsi → this
```

User clicks:

> Why?

VibePrompt:

```text
You have previously typed "thsi"
8 times and corrected it to "this".
```

This makes personalization explainable.

---

# 32. What VibePrompt Should NOT Do

The system should not:

* rewrite every prompt
* add unnecessary instructions
* force user preferences
* aggressively spell-check technical terms
* learn from one occurrence
* store unnecessary personal data
* assume sending a prompt means the user approved the adaptation
* add personality unnecessarily
* make every interaction depend on an LLM
* create large optimized prompts

---

# 33. Development Roadmap

## Phase 0 — Baseline

### Tasks

* Freeze current implementation
* Create evaluation dataset
* Measure current latency
* Measure current token usage
* Measure optimized prompt length
* Measure current intent accuracy

### Deliverable

Baseline evaluation report.

---

# Phase 1 — Minimal Adapter

Implement:

* PASS
* ADAPT
* ASK
* minimal prompt transformation
* explicit instruction priority
* token budget

### Goal

Stop VibePrompt from unnecessarily expanding prompts.

---

# Phase 2 — User Profile

Implement:

* onboarding
* JSON profile
* profile storage
* profile injection
* preference priority
* quick setup UI

### Test

Same prompt:

```text
User A Profile
vs
User B Profile
```

Expected:

Different adaptations where preferences are relevant.

---

# Phase 3 — Conversation Context

Implement:

* conversation extraction
* relevant context selection
* topic detection
* context confidence
* context limits

### Test

```text
"explain that again"
```

with and without previous conversation.

---

# Phase 4 — Generic Typing Recovery

Implement:

* noise detection
* Levenshtein distance
* candidate generation
* character n-grams
* word n-grams
* confidence scoring

At this stage, use a **generic error model**.

---

# Phase 5 — Personalized Typing Model

Implement:

* personal vocabulary
* typo frequency
* correction confidence
* abbreviations
* domain vocabulary
* local storage
* feedback

This is where the system becomes personalized at the language level.

---

# Phase 6 — Learning Loop

Implement:

```text
Observe
   ↓
Score
   ↓
Learn
   ↓
Validate
   ↓
Update
```

Use confidence-based learning.

Do not permanently change the user's profile based on a single interaction.

---

# Phase 7 — Learning Context

Implement:

* subject
* resource
* topic
* learning level

Then later add:

* PDF processing
* chapter extraction
* topic extraction
* progress tracking

---

# Phase 8 — Adversarial Robustness

Create a dedicated corrupted-prompt dataset.

## Level 0 — Normal

```text
Explain deadlocks in operating systems.
```

## Level 1 — Minor Typos

```text
Explian deadlocks in oprating systems.
```

## Level 2 — Heavy Typos

```text
expln dedlcks in os
```

## Level 3 — Abbreviations

```text
explain dl in os w example
```

## Level 4 — Mixed Noise

```text
brooo expln dedlck in os nd giv exmpl plzz
```

## Level 5 — Extreme

```text
bro expln dedlk os exmpl
```

---

# 34. Evaluation Framework

Compare:

```text
A. Raw ChatGPT

B. Generic Prompt Optimizer

C. VibePrompt without profile

D. VibePrompt + Profile

E. VibePrompt + Profile + Personal Typing Model

F. Full VibePrompt
```

---

# 35. Evaluation Metrics

## Quality

* Intent accuracy
* Answer usefulness
* Personalization quality
* Meaning preservation

## Robustness

* Typo recovery accuracy
* Intent recovery accuracy
* False correction rate
* Technical-term preservation

## Efficiency

* Prompt token count
* Additional latency
* Number of LLM calls
* API cost

## User Experience

* User satisfaction
* Correction acceptance
* Perceived usefulness
* Trust
* Preference for adapted vs raw prompt

---

# 36. Ablation Study

Remove one component at a time.

```text
Full VibePrompt
      ↓
- Personal Profile
      ↓
- Personal Typing Model
      ↓
- Conversation Context
      ↓
- Character N-Grams
      ↓
- Word N-Grams
      ↓
- Edit Distance
```

Measure how much performance decreases.

This allows the project to produce actual research findings instead of simply demonstrating features.

---

# 37. Example End-to-End Scenario

User types:

```text
brooo expln dedlck in os wth exmpl plzz
```

### Step 1 — Noise Detection

```text
noise_score = 0.82
```

### Step 2 — Personal Typing Model

Recognizes:

```text
expln → explain
dedlck → deadlock
os → operating systems
wth → with
exmpl → example
```

### Step 3 — Context

```text
Subject: Operating Systems
Topic: Deadlocks
Level: Intermediate
```

### Step 4 — User Profile

```text
Likes:
- examples
- analogies
- concise answers
```

### Step 5 — Decision

```text
ADAPT
```

### Step 6 — Minimal Adapter

```text
Explain deadlock in operating systems
using a simple analogy and one example.
Keep it concise.
```

### Step 7 — ChatGPT

ChatGPT receives the clean personalized prompt.

### Step 8 — Learning

VibePrompt records useful evidence about the typing patterns and adaptation.

---

# 38. Final MVP

The MVP should include:

### Core

* Chrome extension
* FastAPI backend
* Groq integration
* PASS / ADAPT / ASK
* Minimal prompt adaptation

### Personalization

* User onboarding
* User preference profile
* Profile-aware adaptation
* Explicit instruction priority

### Robustness

* Typo detection
* Edit distance
* Character n-grams
* Word n-grams
* Confidence scoring
* Generic vocabulary

### Personal Learning

* Personal vocabulary
* Typo frequency
* User-specific corrections
* Domain vocabulary
* Local-first storage

### Context

* Basic conversation context
* Basic learning context

### Evaluation

* Normal prompts
* Noisy prompts
* Adversarial prompts
* Personalized vs non-personalized comparison
* Token and latency measurement

---

# 39. Post-MVP

After the MVP proves useful:

```text
Phase 10
│
├── Advanced automatic preference learning
├── Better neural typo correction
├── More sophisticated contextual language model
├── Book/PDF intelligence
├── Learning progress
├── Cross-device synchronization
├── Better feedback learning
└── Advanced analytics
```

---

# 40. Research Question

The project can be framed around:

> **Can a personalized, context-aware prompt adaptation system improve AI interaction quality for users with different communication styles and noisy natural-language input while reducing unnecessary prompt expansion and preserving user intent?**

---

# 41. Hypotheses

### H1 — Personalization

A personalized prompt adapter produces responses that users rate as more useful than a generic prompt optimizer.

### H2 — Robustness

A personalized typing model improves intent recovery from noisy and typo-heavy prompts.

### H3 — Efficiency

A PASS/ADAPT/ASK architecture reduces unnecessary LLM calls and prompt-token overhead.

### H4 — Personal Learning

A user's correction history improves typo recovery compared with a generic correction model.

### H5 — Context

Conversation and learning context improve interpretation of ambiguous prompts.

---

# 42. Success Criteria

VibePrompt should only be considered successful if it can demonstrate:

```text
✓ Better intent recovery
✓ Better personalization
✓ Lower unnecessary token expansion
✓ Lower unnecessary LLM calls
✓ Robustness to noisy input
✓ Low false-correction rate
✓ Preservation of technical vocabulary
✓ Improvement from personal learning
✓ Acceptable latency
✓ User trust and control
```

---

# 43. Final Product Architecture

```text
                         VIBEPROMPT
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   USER PROFILE       PERSONAL TYPING       LEARNING CONTEXT
          │                MODEL                   │
          │                   │                   │
          │          ┌────────┴────────┐          │
          │          │                 │          │
          │       Edit Distance    N-Grams       │
          │          │                 │          │
          │          └────────┬────────┘          │
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                       CONTEXT ENGINE
                              │
                              ▼
                       PASS / ADAPT / ASK
                              │
                    ┌─────────┴─────────┐
                    │                   │
                   PASS               ADAPT
                    │                   │
                    │          MINIMAL ADAPTER
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                           ChatGPT
                              │
                              ▼
                           RESPONSE
                              │
                              ▼
                        USER FEEDBACK
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
          PERSONAL TYPING            USER PREFERENCES
              MODEL                       MODEL
```

---

# 44. Product Philosophy

The entire project should follow five rules:

### 1. Understand before optimizing

Do not rewrite a prompt simply because you can.

### 2. Personalize, don't stereotype

Learn preferences, but never let them override explicit instructions.

### 3. Correct cautiously

A strange word may be a typo, abbreviation, or technical term.

### 4. Minimal is better

The best optimized prompt may be only one sentence longer—or unchanged.

### 5. Privacy by design

Personal typing behavior should remain under the user's control, preferably locally.

---

# 45. One-Line Product Definition

> **VibePrompt learns how you type, how you learn, and what you're currently doing—then makes the smallest change necessary to help AI understand you better.**

This should be the guiding principle for the entire implementation.
