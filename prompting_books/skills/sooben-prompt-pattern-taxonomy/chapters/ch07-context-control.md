# Chapter 7: Context Control Patterns

## Core Idea
Context Control patterns assign who the model is (Persona) or what contextual frame/lens it may use (ContextManager, MetaLanguageCreation).

## Frameworks Introduced
- **Context Control (strategy)**: role, perspective, or contextual grounding (borrowed from White et al.).
- **Persona**: Adopts a role or persona to shape responses.
  - Classification: `Context Control » Role & perspective @ Context, Output Format/Style, Profile/Role`
  - When to use: Use Persona when expertise, audience, voice, or evaluation criteria should follow a known role.
  - How: Act as {{persona}}; optionally focus areas + task + input. Still add explicit constraints when precision matters.
  - Trade-offs: Encodes many expectations concisely; can bias, imply false authority, or invent details for simulated systems.
  - Also known as: Multi-Personas Prompting, Role Prompting, Multi-Personas, Role
- **ContextManager**: Controls the contextual scope, included or excluded information, and disciplinary lenses used during response generation.
  - Classification: `Context Control » Context grounding @ Context, Directive, Procedural Steps`
  - When to use: Use ContextManager when scope, include/exclude sets, or disciplinary lenses must be explicit.
  - How: Set scope → consider only include_items → ignore exclude_items → ask question (+ input).
  - Trade-offs: Cuts drift; over-exclusion omits needed facts. Reset variants can drop prior instructions.
  - Also known as: Cross-disciplinary Prompting, Context Control, Context Manager, Scoped Prompting
- **MetaLanguageCreation**: Defines custom shorthand semantics for subsequent prompt use.
  - Classification: `Context Control » Context grounding @ Context, Directive`
  - When to use: Use MetaLanguageCreation when custom shorthand must mean something specific for the rest of the prompt.
  - How: Define shorthand→meaning bindings, then use those tokens in the task.
  - Trade-offs: Compresses long repeated instructions; ambiguous definitions cascade into errors.

## Key Concepts
- **Context grounding**: subcategory hosting ['ContextManager', 'MetaLanguageCreation']
- **Role & perspective**: subcategory hosting ['Persona']

## Mental Models
- Use **Persona** when Y = voice/expertise/audience should drive defaults.
- Use **ContextManager** when Y = include/exclude/scope/lens must be explicit.
- Use **MetaLanguageCreation** when Y = custom shorthand must bind to semantics for later tokens.
- Prefer Persona for *who*; ContextManager for *what counts as context*.

## Anti-patterns
- **Persona replacing precise criteria**: roles are fuzzy—add constraints.
- **Aggressive context reset**: may drop prior instructions.
- **Undefined shorthand**: MetaLanguageCreation without crisp meaning spreads errors.

## Worked Example
**Persona + ContextManager (security review):**
```
Act as a security reviewer.
Provide outputs that a security reviewer would create.
Pay particular attention to authentication, authorization, input validation, and data exposure.
Set the scope to security review.
Consider only: authentication, authorization, input validation, data exposure.
Ignore: formatting, naming conventions, style preferences.
Review the following code and identify security issues:
{{source_code}}
```
Persona shapes voice/criteria; ContextManager clamps topical scope.

## Key Takeaways
1. Three patterns; Persona is the only Profile/Role annotation in the whole taxonomy.
2. Context annotations appear only here (Persona, ContextManager, MetaLanguageCreation).
3. Cross-disciplinary prompting is retained under ContextManager variants.
4. Simulated system personas stay single-turn; repeated exchanges become workflows.

## Connects To
- **Ch 6**: Pair with SchemaSpecs / SelfCalibration
- **Ch 9**: Boundary overlap Persona vs ContextManager
