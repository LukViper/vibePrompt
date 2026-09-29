/**
 * VibePrompt panel — prompt-based onboarding + live composer sync.
 */
(() => {
  const TONES = ["Grill", "Neutral", "Encourage", "Simplify", "Professional"];
  const ROOT_ID = "vibeprompt-root";
  const RESTORE_ID = "vibeprompt-restore";

  const ONBOARDING_PROMPT = `I want you to help configure my personal VibePrompt profile.

Ask me the following questions one at a time. Wait for my answer before asking the next question. Do not judge or analyze my answers while asking the questions.

1. When you are learning something difficult, what helps you most? You can mention things like analogies, real-world examples, step-by-step explanations, visual explanations, code examples, practice questions, or theory.

2. When you don't understand something, what kind of explanation do you usually ask for?

3. How do you normally write prompts to ChatGPT? For example: short and casual, detailed, structured, messy, conversational, or something else.

4. How long do you usually want ChatGPT's answers to be?

5. How technical should explanations normally be for you?

6. What kind of tone do you usually prefer? For example: friendly, casual, professional, direct, challenging, or encouraging.

7. When ChatGPT explains a technical topic, what do you usually want it to include? Examples, analogies, code, diagrams, comparisons, practical applications, questions, etc.

After I answer all seven questions, create a compact VibePrompt profile.

Return ONLY the following JSON and nothing else:

{
"learning_preferences": [],
"explanation_preferences": [],
"prompt_style": "",
"response_length": "",
"technical_level": "",
"preferred_tone": "",
"preferred_elements": []
}

Use short, clear values. Do not include personal information, psychological diagnoses, personality labels, or information that I did not explicitly provide.`;

  let selectedTone = null;
  let lastOriginal = "";
  let lastResult = null;
  let minimized = false;
  let exited = false;
  let inOnboarding = false;
  let suppressComposerSync = false;
  let adaptInFlight = false;
  let pendingComposerText = null;
  let lastSyncedComposer = "";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getRoot() {
    return document.getElementById(ROOT_ID);
  }

  function setStatus(message, kind) {
    const el = getRoot()?.querySelector(".vp-status");
    if (!el) return;
    el.textContent = message || "";
    el.classList.remove("is-error", "is-ok");
    if (kind) el.classList.add(`is-${kind}`);
  }

  function removeRestore() {
    document.getElementById(RESTORE_ID)?.remove();
  }

  function ensureRestore() {
    if (document.getElementById(RESTORE_ID)) return;
    const btn = document.createElement("button");
    btn.id = RESTORE_ID;
    btn.type = "button";
    btn.title = "Show VibePrompt";
    btn.setAttribute("aria-label", "Show VibePrompt");
    btn.textContent = "V";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      restorePanel();
    });
    document.documentElement.appendChild(btn);
  }

  function exitPanel() {
    getRoot()?.remove();
    exited = true;
    minimized = false;
    selectedTone = null;
    ensureRestore();
  }

  function minimizePanel() {
    const root = getRoot();
    if (!root) return;
    minimized = true;
    root.classList.add("is-minimized");
    const minBtn = root.querySelector('[data-action="minimize"]');
    if (minBtn) {
      minBtn.setAttribute("aria-label", "Expand");
      minBtn.title = "Expand";
      minBtn.textContent = "▢";
    }
  }

  function expandPanel() {
    const root = getRoot();
    if (!root) return;
    minimized = false;
    root.classList.remove("is-minimized");
    const minBtn = root.querySelector('[data-action="minimize"]');
    if (minBtn) {
      minBtn.setAttribute("aria-label", "Minimize");
      minBtn.title = "Minimize";
      minBtn.textContent = "–";
    }
  }

  function restorePanel() {
    exited = false;
    removeRestore();
    ensureShell();
    bootBody();
    expandPanel();
  }

  function openSettings() {
    try {
      chrome.runtime.sendMessage({ type: "OPEN_OPTIONS" }, () => {
        void chrome.runtime.lastError;
      });
    } catch {
      /* ignore */
    }
  }

  function tonesHtml() {
    return TONES.map(
      (t) =>
        `<button type="button" class="vp-tone${
          selectedTone === t ? " is-active" : ""
        }" data-tone="${t}">${t}</button>`
    ).join("");
  }

  function renderIdle(composerPreview) {
    const preview = (composerPreview || "").trim();
    return `
      <div class="vp-section">
        <span class="vp-label">ChatGPT composer</span>
        <pre class="vp-original">${
          preview ? escapeHtml(preview) : "<span class='vp-muted-inline'>Waiting for you to type…</span>"
        }</pre>
      </div>
      <div class="vp-empty vp-empty-sm">
        Preview updates as you type. Groq is only called when you click <strong>Adapt now</strong>.
      </div>
      <div class="vp-section">
        <span class="vp-label">Tone override</span>
        <div class="vp-tones">${tonesHtml()}</div>
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="generate">Adapt now</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="profile">Setup profile</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderWelcomeChoose() {
    return `
      <div class="vp-empty">
        Welcome to VibePrompt.<br />
        VibePrompt learns how you communicate and how you want AI to respond.
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="onboard-quick">Quick setup (~30s)</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="onboard-advanced">Advanced (ChatGPT JSON)</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="onboard-skip">Skip</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderQuickSetup() {
    return `
      <div class="vp-section">
        <span class="vp-label">Quick setup</span>
        <p class="vp-onboard-q">How do you usually learn?</p>
        <div class="vp-quick-opts" data-quick="learn">
          <button type="button" class="vp-quick is-active" data-value="examples">Examples</button>
          <button type="button" class="vp-quick" data-value="step-by-step">Step-by-step</button>
          <button type="button" class="vp-quick" data-value="analogies">Analogies</button>
          <button type="button" class="vp-quick" data-value="theory">Theory</button>
          <button type="button" class="vp-quick" data-value="mix">Mix</button>
        </div>
      </div>
      <div class="vp-section">
        <p class="vp-onboard-q">How long should answers normally be?</p>
        <div class="vp-quick-opts" data-quick="length">
          <button type="button" class="vp-quick is-active" data-value="short">Short</button>
          <button type="button" class="vp-quick" data-value="medium">Medium</button>
          <button type="button" class="vp-quick" data-value="detailed">Detailed</button>
        </div>
      </div>
      <div class="vp-section">
        <p class="vp-onboard-q">Preferred tone?</p>
        <div class="vp-quick-opts" data-quick="tone">
          <button type="button" class="vp-quick is-active" data-value="casual">Casual</button>
          <button type="button" class="vp-quick" data-value="direct">Direct</button>
          <button type="button" class="vp-quick" data-value="professional">Professional</button>
          <button type="button" class="vp-quick" data-value="encouraging">Encouraging</button>
        </div>
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="onboard-quick-save">Save profile</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="onboard-advanced">Advanced instead</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderOnboarding() {
    return `
      <div class="vp-section">
        <span class="vp-label">Profile setup</span>
        <p class="vp-onboard-q">
          1) Copy the setup prompt below into ChatGPT.<br />
          2) Answer ChatGPT’s questions.<br />
          3) Paste the final JSON profile here and save.
        </p>
      </div>
      <div class="vp-section">
        <span class="vp-label">Setup prompt</span>
        <textarea class="vp-prompt vp-onboard-prompt" readonly rows="8">${escapeHtml(
          ONBOARDING_PROMPT
        )}</textarea>
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="onboard-paste-prompt">
          Paste into ChatGPT
        </button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="onboard-copy-prompt">
          Copy prompt
        </button>
      </div>
      <div class="vp-section">
        <span class="vp-label">Paste ChatGPT JSON result</span>
        <textarea
          class="vp-prompt vp-onboard-result"
          rows="7"
          placeholder='Paste the JSON profile here, e.g. { "learning_preferences": [...], ... }'
        ></textarea>
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="onboard-save">
          Save profile
        </button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="onboard-skip">
          Skip for now
        </button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderLoading(original) {
    return `
      <div class="vp-section">
        <span class="vp-label">Original</span>
        <pre class="vp-original">${escapeHtml(original)}</pre>
      </div>
      <div class="vp-loading">
        <div class="vp-spinner" aria-hidden="true"></div>
        Checking whether adaptation helps…
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderEmpty() {
    return `
      <div class="vp-empty">Type something in the ChatGPT input box — VibePrompt will follow it.</div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="generate">Adapt now</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="profile">Setup profile</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function decisionBadge(decision) {
    const d = (decision || "adapt").toLowerCase();
    return `<span class="vp-decision vp-decision-${escapeHtml(d)}">${escapeHtml(d.toUpperCase())}</span>`;
  }

  function renderResult(data) {
    lastResult = data;
    const decision = (data.decision || "adapt").toLowerCase();
    const adapted = data.optimized_prompt || data.original || "";
    const changes =
      Array.isArray(data.changes) && data.changes.length
        ? `<div class="vp-section">
             <span class="vp-label">Changes</span>
             <ul class="vp-changes">
               ${data.changes.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
             </ul>
           </div>`
        : "";

    const tokenLine =
      typeof data.estimated_token_change === "number"
        ? `<div class="vp-meta">Token Δ ${data.estimated_token_change >= 0 ? "+" : ""}${
            data.estimated_token_change
          }${data.used_llm === false ? " · no LLM call" : ""}${
            typeof data.confidence === "number" ? ` · conf ${data.confidence}` : ""
          }</div>`
        : "";

    const normalized = data.normalized_prompt || data.original || "";
    const showNormalized =
      normalized && data.original && normalized.trim() !== data.original.trim();

    const recoveryBlock =
      Array.isArray(data.recovery_changes) && data.recovery_changes.length
        ? `<div class="vp-section">
             <span class="vp-label">Typing recovery</span>
             <ul class="vp-changes">
               ${data.recovery_changes.map((c) => `<li>✓ ${escapeHtml(c)}</li>`).join("")}
             </ul>
           </div>`
        : "";

    const askBlock =
      decision === "ask" && data.clarification
        ? `<div class="vp-section">
             <span class="vp-label">Clarification needed</span>
             <pre class="vp-original">${escapeHtml(data.clarification)}</pre>
             <p class="vp-hint-inline">Answer this in ChatGPT — VibePrompt won't invent the topic.</p>
           </div>`
        : "";

    return `
      <div class="vp-section vp-decision-row">
        ${decisionBadge(decision)}
        ${tokenLine}
      </div>
      <div class="vp-section">
        <span class="vp-label">Original</span>
        <pre class="vp-original">${escapeHtml(data.original || "")}</pre>
      </div>
      ${
        showNormalized
          ? `<div class="vp-section">
               <span class="vp-label">Normalized</span>
               <pre class="vp-original">${escapeHtml(normalized)}</pre>
             </div>`
          : ""
      }
      ${recoveryBlock}
      ${askBlock}
      <div class="vp-section">
        <span class="vp-label">${decision === "adapt" ? "Adapted" : "Composer preview"}</span>
        <textarea class="vp-prompt" spellcheck="true">${escapeHtml(
          decision === "adapt" ? adapted : decision === "ask" ? data.original || "" : normalized
        )}</textarea>
      </div>
      ${changes}
      <div class="vp-section">
        <span class="vp-label">Tone override</span>
        <div class="vp-tones">${tonesHtml()}</div>
      </div>
      <div class="vp-actions">
        ${
          decision === "ask"
            ? `<button type="button" class="vp-btn vp-btn-primary" data-action="use-clarification">Ask this in ChatGPT</button>`
            : `<button type="button" class="vp-btn vp-btn-primary" data-action="use-adapted">
                 ${decision === "pass" ? "Use original" : "Use adapted"}
               </button>`
        }
        <button type="button" class="vp-btn vp-btn-secondary" data-action="use-original">Original</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="copy">Copy</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="regenerate">Again</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderError(original, message, needsKey) {
    return `
      <div class="vp-section">
        <span class="vp-label">Original</span>
        <pre class="vp-original">${escapeHtml(original || "—")}</pre>
      </div>
      <div class="vp-empty">${escapeHtml(message)}
        <br /><span class="vp-hint-inline">Your original prompt is ready to send.</span>
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="use-original">Use original</button>
        ${
          needsKey
            ? `<button type="button" class="vp-btn vp-btn-secondary" data-action="settings">Settings</button>`
            : `<button type="button" class="vp-btn vp-btn-secondary" data-action="regenerate">Try again</button>`
        }
      </div>
      <div class="vp-status is-error"></div>
    `;
  }

  function parseProfileJson(raw) {
    let text = (raw || "").trim();
    if (!text) throw new Error("Paste the JSON profile from ChatGPT first.");

    const fence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (fence) text = fence[1].trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Could not find a JSON object in that paste.");
    }
    text = text.slice(start, end + 1);

    const data = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Profile JSON must be an object.");
    }

    const asList = (v) => {
      if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean).slice(0, 12);
      if (typeof v === "string" && v.trim()) return [v.trim()];
      return [];
    };

    return {
      learning_preferences: asList(data.learning_preferences),
      explanation_preferences: asList(data.explanation_preferences),
      preferred_elements: asList(data.preferred_elements),
      prompt_style: String(data.prompt_style || "").trim(),
      response_length: String(data.response_length || "").trim(),
      technical_level: String(data.technical_level || "").trim(),
      preferred_tone: String(data.preferred_tone || "").trim(),
    };
  }

  function ensureShell() {
    let root = getRoot();
    if (root) return root;

    root = document.createElement("div");
    root.id = ROOT_ID;
    root.innerHTML = `
      <div class="vp-panel" role="complementary" aria-labelledby="vp-title">
        <div class="vp-header">
          <div class="vp-brand">
            <h2 class="vp-title" id="vp-title">VibePrompt</h2>
            <p class="vp-tagline">Minimal · personalized · context-aware</p>
          </div>
          <div class="vp-window-actions">
            <button type="button" class="vp-win-btn" data-action="settings" title="Settings" aria-label="Settings">⚙</button>
            <button type="button" class="vp-win-btn" data-action="minimize" title="Minimize" aria-label="Minimize">–</button>
            <button type="button" class="vp-win-btn" data-action="exit" title="Exit" aria-label="Exit">×</button>
          </div>
        </div>
        <div class="vp-minimized-bar" data-action="expand">
          <span class="vp-min-label">VibePrompt</span>
          <span class="vp-min-hint">Click to expand</span>
        </div>
        <div class="vp-body"></div>
      </div>
    `;
    document.documentElement.appendChild(root);

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const quickBtn = target.closest(".vp-quick");
      if (quickBtn && root.contains(quickBtn)) {
        const group = quickBtn.closest(".vp-quick-opts");
        if (group) {
          group.querySelectorAll(".vp-quick").forEach((b) => b.classList.remove("is-active"));
          quickBtn.classList.add("is-active");
        }
        return;
      }

      const toneBtn = target.closest("[data-tone]");
      if (toneBtn && root.contains(toneBtn)) {
        const tone = toneBtn.getAttribute("data-tone");
        selectedTone = selectedTone === tone ? null : tone;
        root.querySelectorAll(".vp-tone").forEach((btn) => {
          btn.classList.toggle("is-active", btn.getAttribute("data-tone") === selectedTone);
        });
        return;
      }

      const actionBtn = target.closest("[data-action]");
      if (!actionBtn || !root.contains(actionBtn)) return;

      const action = actionBtn.getAttribute("data-action");
      if (action === "exit") exitPanel();
      else if (action === "minimize") {
        if (minimized) expandPanel();
        else minimizePanel();
      } else if (action === "expand") expandPanel();
      else if (action === "copy") handleCopy();
      else if (action === "regenerate") handleRegenerate();
      else if (action === "generate") handleGenerate();
      else if (action === "settings") openSettings();
      else if (action === "profile") startOnboarding();
      else if (action === "onboard-quick") {
        inOnboarding = true;
        setBody(renderQuickSetup());
      } else if (action === "onboard-advanced") {
        inOnboarding = true;
        setBody(renderOnboarding());
      } else if (action === "onboard-quick-save") handleQuickSetupSave();
      else if (action === "onboard-copy-prompt") handleCopyOnboardingPrompt();
      else if (action === "onboard-paste-prompt") handlePasteOnboardingPrompt();
      else if (action === "onboard-save") handleSaveOnboardingProfile();
      else if (action === "onboard-skip") skipOnboarding();
      else if (action === "use-adapted") handleUsePrompt(false);
      else if (action === "use-original") handleUsePrompt(true);
      else if (action === "use-clarification") handleUseClarification();
    });

    return root;
  }

  function setBody(html) {
    const body = ensureShell().querySelector(".vp-body");
    if (body) body.innerHTML = html;
  }

  async function handleCopy() {
    const textarea = getRoot()?.querySelector(".vp-prompt:not(.vp-onboard-prompt):not(.vp-onboard-result)");
    if (!(textarea instanceof HTMLTextAreaElement)) return;
    try {
      await navigator.clipboard.writeText(textarea.value);
      setStatus("Copied", "ok");
    } catch {
      textarea.select();
      document.execCommand("copy");
      setStatus("Copied", "ok");
    }
  }

  async function handleCopyOnboardingPrompt() {
    try {
      await navigator.clipboard.writeText(ONBOARDING_PROMPT);
      setStatus("Setup prompt copied", "ok");
    } catch {
      const el = getRoot()?.querySelector(".vp-onboard-prompt");
      if (el instanceof HTMLTextAreaElement) {
        el.select();
        document.execCommand("copy");
        setStatus("Setup prompt copied", "ok");
      }
    }
  }

  function handlePasteOnboardingPrompt() {
    suppressComposerSync = true;
    const ok = window.VibePromptAPI?.writeComposerText?.(ONBOARDING_PROMPT);
    setTimeout(() => {
      suppressComposerSync = false;
    }, 800);
    setStatus(
      ok
        ? "Setup prompt pasted into ChatGPT — answer the questions, then paste the JSON here"
        : "Could not paste — use Copy prompt instead",
      ok ? "ok" : "error"
    );
  }

  async function handleSaveOnboardingProfile() {
    const input = getRoot()?.querySelector(".vp-onboard-result");
    const raw = input instanceof HTMLTextAreaElement ? input.value : "";
    try {
      const profile = parseProfileJson(raw);
      await window.VibePromptAPI?.saveProfile?.(profile);
      inOnboarding = false;
      const composer = (window.VibePromptAPI?.readComposerText?.() || "").trim();
      setBody(renderIdle(composer));
      setStatus("Profile saved — click Adapt now when ready", "ok");
    } catch (err) {
      setStatus(err?.message || "Invalid profile JSON", "error");
    }
  }

  function handleUseClarification() {
    const q = lastResult?.clarification;
    if (!q) return;
    suppressComposerSync = true;
    const ok = window.VibePromptAPI?.writeComposerText?.(q);
    setTimeout(() => {
      suppressComposerSync = false;
      lastSyncedComposer = q.trim();
    }, 800);
    setStatus(ok ? "Clarification inserted — answer in ChatGPT" : "Could not insert clarification", ok ? "ok" : "error");
  }

  async function handleUsePrompt(useOriginal) {
    const original = lastResult?.original || lastOriginal;
    const adapted = lastResult?.optimized_prompt || original;
    const text = useOriginal ? original : adapted;
    if (!useOriginal && lastResult?.recovery_changes) {
      await window.VibePromptPersonalModel?.learnFromRecoveryChanges?.(
        lastResult.recovery_changes
      );
    }
    suppressComposerSync = true;
    const ok = window.VibePromptAPI?.writeComposerText?.(text || "");
    setTimeout(() => {
      suppressComposerSync = false;
    }, 800);
    setStatus(
      ok ? "Inserted into ChatGPT composer" : "Could not find composer — copied instead",
      ok ? "ok" : "error"
    );
    if (!ok && text) navigator.clipboard?.writeText(text);
  }

  async function requestAndRender(text, tone) {
    const trimmed = (text || "").trim();
    if (!trimmed) {
      setBody(renderEmpty());
      return;
    }

    lastOriginal = trimmed;
    lastSyncedComposer = trimmed;
    adaptInFlight = true;
    if (minimized) expandPanel();
    setBody(renderLoading(trimmed));

    if (typeof window.VibePromptAPI?.requestVibe !== "function") {
      setBody(renderError(trimmed, "VibePrompt bridge missing."));
      adaptInFlight = false;
      return;
    }

    const result = await window.VibePromptAPI.requestVibe(trimmed, tone || null);
    adaptInFlight = false;
    pendingComposerText = null;

    if (!getRoot()) return;

    if (!result.ok) {
      if (result.fallback) {
        setBody(renderResult(result.fallback));
        setStatus(result.error || "Using original", "error");
        return;
      }
      setBody(renderError(trimmed, result.error || "Request failed", Boolean(result.needsKey)));
      return;
    }

    setBody(renderResult(result.data));
  }

  async function handleRegenerate() {
    const text =
      (window.VibePromptAPI?.readComposerText?.() || "").trim() || lastOriginal;
    if (!text) {
      setBody(renderEmpty());
      return;
    }
    getRoot()
      ?.querySelectorAll(".vp-btn")
      .forEach((b) => {
        b.disabled = true;
      });
    setStatus("Re-checking…");
    await requestAndRender(text, selectedTone);
  }

  async function handleGenerate() {
    const text = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    if (!text) {
      setBody(renderEmpty());
      return;
    }
    await requestAndRender(text, selectedTone);
  }

  function startOnboarding() {
    inOnboarding = true;
    setBody(renderWelcomeChoose());
  }

  function getQuickSelection(groupName) {
    const root = getRoot();
    const group = root?.querySelector(`.vp-quick-opts[data-quick="${groupName}"]`);
    const active = group?.querySelector(".vp-quick.is-active");
    return active?.getAttribute("data-value") || "";
  }

  async function handleQuickSetupSave() {
    const learn = getQuickSelection("learn");
    const length = getQuickSelection("length");
    const tone = getQuickSelection("tone");
    const learningMap = {
      examples: ["examples", "practical applications"],
      "step-by-step": ["step-by-step"],
      analogies: ["analogies"],
      theory: ["theory"],
      mix: ["examples", "analogies", "step-by-step"],
    };
    const profile = {
      learning_preferences: learningMap[learn] || ["examples"],
      explanation_preferences: learningMap[learn] || ["examples"],
      preferred_elements: learningMap[learn] || ["examples"],
      prompt_style: "casual",
      response_length: length || "medium",
      technical_level: "intermediate",
      preferred_tone: tone || "friendly",
    };
    await window.VibePromptAPI?.saveProfile?.(profile);
    inOnboarding = false;
    const composer = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    setBody(renderIdle(composer));
    setStatus("Quick profile saved — click Adapt now when ready", "ok");
  }

  async function skipOnboarding() {
    inOnboarding = false;
    await window.VibePromptAPI?.saveProfile?.({
      learning_preferences: [],
      explanation_preferences: [],
      preferred_elements: [],
      prompt_style: "",
      response_length: "",
      technical_level: "",
      preferred_tone: "",
    });
    const composer = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    setBody(renderIdle(composer));
    setStatus("Onboarding skipped — you can set a profile later", "ok");
  }

  /**
   * Called by content.js whenever the ChatGPT composer text changes.
   * Preview only — never hits Groq here (that burned ~100+ calls before).
   */
  function onComposerChange(text) {
    if (exited || inOnboarding || suppressComposerSync || adaptInFlight) return;

    const trimmed = (text || "").trim();
    lastSyncedComposer = trimmed;

    if (!trimmed) {
      lastOriginal = "";
      lastResult = null;
      if (!minimized) setBody(renderEmpty());
      return;
    }

    // Keep existing result visible if user is still on same adapted session,
    // but always refresh the idle/original preview without an API call.
    if (lastResult && lastOriginal === trimmed) return;

    lastOriginal = trimmed;
    lastResult = null;
    if (!minimized) setBody(renderIdle(trimmed));
  }

  async function bootBody() {
    const state = await window.VibePromptAPI?.getProfileState?.();
    if (state?.ok && !state.onboardingComplete) {
      inOnboarding = true;
      setBody(renderWelcomeChoose());
      return;
    }
    const composer = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    lastSyncedComposer = composer;
    lastOriginal = composer;
    setBody(composer ? renderIdle(composer) : renderIdle(""));
  }

  async function mount() {
    if (exited) {
      ensureRestore();
      return;
    }
    removeRestore();
    ensureShell();
    const body = getRoot()?.querySelector(".vp-body");
    if (body && !body.hasChildNodes()) {
      await bootBody();
    }
    if (minimized) minimizePanel();
  }

  window.VibePromptModal = {
    open: handleGenerate,
    close: exitPanel,
    mount,
    minimize: minimizePanel,
    expand: expandPanel,
    onComposerChange,
  };
})();
