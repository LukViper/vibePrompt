# VibePrompt – Intent & Emotion Aware Prompt Generator

**Tagline:** “Why Vibe Code, When You Can Vibe Prompt?”

---

## 1. Project Title
**VibePrompt – Intent & Emotion Aware Prompt Generator**

---

## 2. Problem Statement

Most users write vague, emotional, or poorly structured prompts when interacting with Generative AI tools such as ChatGPT, Claude, Gemini, and Grok. This commonly results in:

- Inaccurate or low-quality responses
- Higher token consumption
- Repeated trial-and-error cycles
- Frustration for non-expert users

Existing solutions either require strong prompt engineering skills or perform only generic rewriting. There is a clear gap for a lightweight, user-friendly system that can understand the **semantic meaning** and **emotional intent** of a user’s raw input and convert it into a clear, effective, ready-to-use prompt.

---

## 3. Project Objectives

Build a browser extension that:

1. Reads the text currently typed by the user in a GenAI chat input box.
2. Understands the **semantic intent** and **emotional tone** (e.g., “grill this hard”, “be encouraging”, “explain simply”).
3. Generates a well-structured and optimized prompt.
4. Displays the result in a clean dialogue box so the user can copy or edit it.

**Academic Focus:** Demonstrate applied NLP techniques — specifically intent detection, emotion/tone understanding, and controlled text generation — in a real interactive system.

---

## 4. Scope (MVP)

### Supported Platforms
- **Primary:** ChatGPT
- **Optional (if time permits):** Claude

### Core Features
- Floating action button or keyboard shortcut (e.g., `Ctrl + Shift + V`)
- Reads only the plain text currently present in the input box
- Opens a modern modal / dialogue box showing:
  - Original user input
  - Detected Intent + Emotion/Tone
  - Generated Optimized Prompt
  - **Copy** button
  - **Regenerate** button
- Optional quick tone selectors:  
  `Grill` | `Neutral` | `Encourage` | `Simplify` | `Professional`

### Explicitly Out of Scope (for MVP)
- Automatic pasting of the generated prompt
- Support for all major LLMs
- Handling of files or images
- Storing user history or personal data

---

## 5. Core NLP Pipeline

1. **Input Capture**  
   Content script extracts the text from the active chat input box.

2. **Intent + Emotion Analysis**  
   An LLM (or hybrid approach) analyzes the input to extract:
   - Primary goal / intent
   - Desired emotional tone or style (criticism intensity, encouragement, simplicity, formality, etc.)
   - Important constraints or context

3. **Prompt Generation**  
   The extracted information is fed into a carefully engineered system prompt that produces a clean, structured, and effective prompt optimized for the target model.

4. **Presentation**  
   Results are displayed in a polished UI modal for the user to review and copy.

### Recommended Implementation Options
- Free / low-cost LLM APIs: Groq, Google Gemini (free tier), OpenRouter, Together AI
- Local option (bonus points): Ollama with a small model for privacy and offline capability

---

## 6. Recommended Technology Stack

| Layer              | Technology                              | Purpose                              |
|--------------------|-----------------------------------------|--------------------------------------|
| Extension          | Chrome Extension (Manifest V3)          | Core delivery platform               |
| Content Script     | JavaScript                              | Read text from chat input            |
| UI (Modal)         | HTML + CSS + Vanilla JS (or React)      | Dialogue box interface               |
| Backend / Logic    | Python (FastAPI) **or** direct API calls | NLP processing                       |
| Language Model     | Groq / Gemini / OpenRouter / Ollama     | Intent analysis & prompt generation  |

---

## 7. Evaluation Plan

To demonstrate effectiveness, the following evaluation should be performed:

- Collect 15–20 realistic, student-style prompts (vague + emotionally loaded).
- Generate optimized versions using VibePrompt.
- Run both original and optimized prompts on the same target model.
- Compare results using:
  - Human ratings (clarity, relevance, emotional fidelity)
  - Token count comparison
  - Output quality (can use LLM-as-a-judge)

Present findings in tables and simple charts in the final report.

---

## 8. Suggested Timeline (8–10 Weeks)

| Week   | Tasks                                              |
|--------|----------------------------------------------------|
| 1–2    | Literature review, finalize design, set up extension skeleton |
| 3      | Content script – successfully read text from ChatGPT |
| 4      | Design and implement basic modal UI                |
| 5–6    | Build core NLP pipeline (intent + emotion → prompt) |
| 7      | UI polish, tone selectors, regenerate functionality |
| 8      | Conduct evaluation experiments and collect results |
| 9      | Write report, prepare presentation & demo video    |
| 10     | Buffer / final improvements                        |

---

## 9. Project Deliverables

- Fully working Chrome Extension
- Detailed Project Report (including NLP pipeline explanation and evaluation results)
- Presentation slides + live demo / demo video
- Source code hosted on GitHub
- Optional: Short research-style write-up on “Intent & Emotion Aware Prompt Generation”

---

## 10. Novelty & Academic Contribution

While many tools perform generic prompt improvement, **VibePrompt** specifically focuses on understanding **emotional intent** and **semantic meaning** (including natural shorthand such as “/grill this”) and translating that understanding into a precise, high-quality prompt.

This positions the project as a meaningful applied NLP contribution suitable for a college-level project, combining:
- Semantic understanding
- Affective / emotional NLP
- Controlled text generation
- Real-world interactive system design

---

## 11. Future Enhancements (Beyond MVP)

- Support for additional models (Claude, Gemini, Grok)
- Local model support for full privacy
- Prompt history and favorite tones
- Multi-language support
- Browser support beyond Chrome

---

**Project Codename:** VibePrompt  
**Tagline:** “Why Vibe Code, When You Can Vibe Prompt?”
