# Chapter 9: Code Prompting

## Core Idea
Treat code as a first-class text task: prompt for **writing**, **explaining**, **translating**, and **debugging/reviewing** with low temperature — always read and test output; multimodal prompting is a separate concern.

## Frameworks Introduced
- **Prompts for writing code**: Ask for a snippet/script in a named language with clear requirements
  - When to use: Boilerplate, renames, glue scripts, speeding implementation
  - How: Specify language, I/O behavior, edge checks; temp ~0.1; then test in a sandbox folder
- **Prompts for explaining code**: Paste code (comments stripped) and ask for a structured explanation
  - When to use: Reading unfamiliar team code
  - How: “Explain the below … code”; expect step breakdown of control flow
- **Prompts for translating code**: Move logic between languages (e.g. Bash → Python)
  - When to use: Reuse a working script in another runtime
  - How: Provide full source; ask for equivalent snippet; verify indenting (Markdown mode in Vertex Studio)
- **Prompts for debugging and reviewing**: Include traceback + source; ask what is wrong and how to improve
  - When to use: Errors or quality pass
  - How: Paste error and code; request fix **and** general improvements

## Key Concepts
- **LLMs can’t reason / repeat training data** (Boonstra’s caution): Generated code must be read and tested
- **Vertex AI Studio Markdown button**: Required for Python indentation in Language Studio
- **Low temperature for code**: Deterministic, less creative drift (examples use 0.1)
- **Review beyond the reported bug**: Models may find related defects (undefined names, wrong variables, missing try/except)
- **Multimodal prompting**: Multiple input modalities (text+image+audio+…) — separate from text/code prompting
- **Confidentiality**: Prefer Vertex AI / Cloud over consumer chat when code is sensitive

## Mental Models
- Use **write → explain → translate → debug** as a lifecycle when Y is evolving a script across languages and fixes.
- Prefer **temp 0.1 and explicit language tags** when Y is production-bound code.
- Always **test on a tiny fixture directory** when Y is filesystem automation.
- Use **error + full code in one prompt** when Y is debugging — context beats “fix this” alone.

## Anti-patterns
- **Shipping untested LLM code**
- **Plain-text Python without indent preservation**
- **High temperature for code gen**
- **Assuming multimodal is required for code** — code prompts use the ordinary text LLM

## Worked Example
**Bash rename script** (Table 16 → 19 chain):
1. **Write**: Prompt for Bash that asks a folder name and prepends `draft_` to each file → documented script with existence check + loop.
2. **Verify**: Save as `rename_files.sh`, run on a test folder → files become `draft_filename.txt`.
3. **Explain**: Strip comments; ask for explanation → user input, existence check, listing, rename, success message.
4. **Translate**: Bash → Python with `os`/`shutil`.
5. **Debug**: Broken edit uses `toUpperCase(prefix)` and mismatched `new_file_name` → model fixes with `prefix.upper()`, corrects paths, suggests extension handling, spaces, f-strings, try/except.

## Key Takeaways
1. Code prompting covers write, explain, translate, and debug/review.
2. Low temperature and explicit language/format improve reliability.
3. Always read, test, and preserve indentation (Markdown where needed).
4. Debug prompts that include tracebacks often surface additional bugs.
5. Multimodal prompting is orthogonal; code still rides the text model.

## Connects To
- **Ch 2**: Token limits can truncate long refactors — raise if needed
- **Ch 5**: CoT helps break coding requests into steps
- **Ch 7**: Agents may call code interpreters as tools
- **Ch 10**: Specificity, variables, and documentation apply to code prompts too
