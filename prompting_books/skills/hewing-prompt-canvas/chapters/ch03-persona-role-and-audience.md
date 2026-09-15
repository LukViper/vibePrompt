# Chapter 3: Persona/Role and Target Audience

## Core Idea
**Persona/Role** sets the model’s voice and expertise; **Audience** sets who the output is for — together they anchor relevance before any task wording.

## Frameworks Introduced
- **Persona/Role (canvas cell)**: Ask the model to adopt a role; fold organization values and culture into the persona description.
  - When to use: Any prompt where expertise, viewpoint, or brand voice matters.
  - How: (1) Name the role. (2) State skill boundary (what “good” looks like). (3) Add org values/culture constraints. (4) Optionally constrain what the role must *not* do.
  - Why it works: Defined role (Braun) narrows tone and specificity; White’s “Act as persona X. Provide outputs that persona X would create” makes the pattern reusable.
- **Audience / Target Audience (canvas cell)**: Build detailed personas for typical users or customers (knowledge level, age, interests, language style).
  - When to use: Content, teaching, support, or any audience-sensitive deliverable.
  - How: (1) Who reads/uses the output. (2) Knowledge level. (3) Language constraints. (4) Examples/references they find relatable.
  - Why it works / failure mode: Empathy + clarity skills (Sasson Lazovsky) improve fit; failure mode is stereotyping—keep only traits that change wording or depth.
- **Role prompting (literature link)**: Braun’s “Role: Defined” and White’s Role pattern.
  - When to use: Steering specificity without long style essays.
  - How: Prefer a concrete persona over “be helpful”; pair with Audience so expertise does not outrun readability.

## Key Concepts
- **Persona/Role**: Model-side identity and expertise frame.
- **Target Audience**: Recipient-side persona that shapes vocabulary and depth.
- **User-centered design**: Canvas category derived from role-based prompting + audience needs.
- **Creative inquiry**: Personas support more insightful questioning (Sasson Lazovsky).
- **Values-integrated persona**: Company culture embedded in the role text, not bolted on later as tone adjectives alone.

## Mental Models
- Use **Persona/Role** when you need the *speaker’s* stance; use **Audience** when you need the *listener’s* fit.
- Think of Role as **casting**, Audience as **who sits in the theater**.
- Prefer **values-integrated personas** when enterprise tone must stay on-brand.
- Use **Role: Defined** (Braun) when “Not defined” yields bland, interchangeable answers.

## Anti-patterns
- **Role without audience**: Expert voice that talks over the reader.
- **Audience without role**: Casual tone with no competent speaker behind it.
- **Generic “helpful assistant”**: No expertise boundary, no culture, no reader model.
- **Costume-only roles**: “You are a pirate” with no task-relevant skill boundary.

## Worked Example
**Art Horizon magazine brief** (from the canvas examples):

**Persona/Role fill**: “You are a skilled summarizer and editor. Your role is to distill complex information into clear and concise summaries while ensuring the text is polished and engaging.”

**Audience fill**: Create content for *Art Horizon* readers — diverse audience of young creatives, collectors, and art enthusiasts; where youth/tech framing applies, use casual relatable language and trending references.

**Check**: Speaker = editor; listener = magazine audience. Without both, you get either academic summary tone or trendy fluff without editorial craft.

## Key Takeaways
1. Fill Persona/Role and Audience before Goal when voice and fit matter.
2. Integrate company values into the role description.
3. Audience detail beats vague “make it accessible.”
4. Role prompting is a documented design dimension, not a gimmick.
5. These two cells set foundation for all later canvas categories.

## Connects To
- **Ch 4**: Goal/steps that the persona executes.
- **Ch 6**: Tonality that must match audience and brand.
- **Ch 7**: Emotion Prompting as an optional intensifier on top of role.
