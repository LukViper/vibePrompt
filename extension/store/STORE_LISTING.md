# Chrome Web Store listing pack

Use this when submitting **VibePrompt** in the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).

## Package

```bash
./scripts/pack-extension.sh
```

Upload `dist/vibeprompt-<version>.zip`. Never upload the whole repo.

## Store fields

| Field | Suggested value |
|-------|-----------------|
| **Name** | VibePrompt |
| **Summary** (132 chars max) | Minimal, context-aware prompt adaptation for ChatGPT, Claude, Gemini, Grok, DeepSeek, and more. |
| **Category** | Productivity |
| **Language** | English |
| **Visibility** | Public (or Unlisted for testing) |

### Detailed description

```
VibePrompt adapts the prompt you already typed — without bloating it.

On supported GenAI chats (ChatGPT, Claude, Gemini, Grok, DeepSeek, Perplexity, Copilot), open the panel, preview your composer text, then click Adapt now.

• PASS — already clear → kept as-is (often no LLM call)
• ADAPT — small clarity / tone fixes from chat context
• ASK — too vague → one clarifying question

You choose Use adapted or Original. Nothing is auto-sent.

Setup
1. Install the extension
2. Run or host the VibePrompt backend API
3. Open extension Settings → Save (default Backend URL: https://vibeprompt.onrender.com) → allow host access
4. Optionally paste your Groq API key (stored only in this browser)
5. Reload the chat tab and click Adapt now

Your prompts go only to the Backend URL you configure (default production API above).
```

## Graphics

| Asset | Size | File |
|-------|------|------|
| Extension icon | 128×128 | `../icons/icon128.png` (also in zip) |
| Small promo tile | 440×280 | `promo-small-440x280.png` |
| Marquee promo | 1400×560 | `promo-marquee-1400x560.png` |
| Screenshots (required ≥1) | 1280×800 or 640×400 | Replace `screenshot-placeholder-1280x800.png` with real captures |

Capture at least:

1. Options/settings page with Backend URL + API key fields  
2. Panel on a supported chat showing Adapt / PASS·ADAPT·ASK  
3. (Optional) Before/after adapted prompt

## Privacy practices (dashboard)

Disclose accurately:

- **Single purpose:** Help users improve prompts on GenAI chat sites.
- **User data:** Prompt/composer text, limited chat context, optional API key, local vocabulary/settings.
- **Remote code:** No — select that you are **not** using remote code.
- **Data usage:** Used only to provide the adaptation feature; not sold; not used for unrelated purposes.
- **Privacy policy URL:** Host `../privacy.html` publicly (GitHub Pages, your site, etc.) and paste that HTTPS URL. The in-extension `privacy.html` page alone is not enough for the dashboard field.

### Permission justifications

| Permission | Justification |
|------------|---------------|
| `storage` | Save Backend URL, optional Groq API key, and local vocabulary. |
| Optional host access (`http://*/*`, `https://*/*`) | User grants access only to the Backend URL origin they configure so Adapt requests can reach their self-hosted or deployed API. Not granted at install. |
| Content script site matches | Read composer text, show the panel, and insert text the user accepts on listed GenAI sites only. |

## Review notes (optional message to reviewers)

```
Default Backend URL is https://vibeprompt.onrender.com. Users may override it.
Host permissions are optional and requested at Settings → Save for that origin only.
No remote-executed extension code; the service worker only POSTs JSON to the user’s Backend URL.
Test: load extension → Save settings (grant host access) → open chatgpt.com → Adapt now.
```

## Pre-submit checklist

- [ ] `./scripts/pack-extension.sh` succeeds; zip opens and contains `manifest.json` at the root  
- [ ] Manifest version bumped if republishing  
- [ ] Icons 16 / 48 / 128 present  
- [ ] ≥1 real screenshot (not the placeholder)  
- [ ] Privacy policy hosted on a public HTTPS URL  
- [ ] Dashboard privacy disclosures match this policy  
- [ ] Backend deploy/docs ready for users (README)  
- [ ] Tested unpacked build on each listed chat site you claim  
- [ ] Developer account one-time registration fee paid  
- [ ] No secrets (`.env`, API keys) inside the zip  
