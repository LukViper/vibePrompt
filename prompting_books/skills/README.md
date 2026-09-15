# Prompt Engineering Skills

Generated with [book-to-skill](https://github.com/virgiliojr94/book-to-skill) from the PDFs in `../books/`.

Each skill folder contains `SKILL.md`, `chapters/`, `glossary.md`, `patterns.md`, and `cheatsheet.md`.

| Skill | Source | Chapters |
|-------|--------|----------|
| `liu-pretrain-prompt-predict` | Pre-train, Prompt, and Predict (Liu et al.) | 12 |
| `white-prompt-pattern-catalog` | Prompt Pattern Catalog (White et al.) | 7 |
| `boonstra-google-prompt-engineering` | Google Prompt Engineering Whitepaper (Boonstra) | 10 |
| `govtech-prompt-engineering-playbook` | GovTech Singapore Playbook (Beta v3) | 10 |
| `hewing-prompt-canvas` | The Prompt Canvas (Hewing & Leinhos) | 8 |
| `schulhoff-prompt-report` | The Prompt Report (Schulhoff et al.) | 11 |
| `mausam-prompt-engineering-lecture` | IIT Delhi Prompt Engineering Lecture (Mausam) | 4 |
| `ansh-chatgpt-prompt-ebook` | ChatGPT eBook (Ansh Mehra / Think School) | 10 |
| `richardson-prompt-engineering-foundations` | Prompt Engineering Foundations sample (Richardson) | 3 |
| `sooben-prompt-pattern-taxonomy` | Taxonomy of Single-Turn Prompt Patterns (Sooben & Syriani) | 9 |

**Skipped:** `09_Vanderbilt_*` PDF (duplicate of White et al.).

**Validation (2026-09-13):** all 10 skills passed `scan_generated_skill.py` and `validate_skill.py`.

## Use

Point your agent skills root at this directory, or symlink individual skills into `~/.agents/skills/`:

```bash
ln -sfn "$(pwd)/liu-pretrain-prompt-predict" ~/.agents/skills/liu-pretrain-prompt-predict
```
