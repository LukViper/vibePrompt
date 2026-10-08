/**
 * VibePrompt panel — live composer sync + adapt controls (no onboarding).
 */
(() => {
  const TONES = [
    { id: null, label: "None" },
    { id: "Grill", label: "Grill" },
    { id: "Neutral", label: "Neutral" },
    { id: "Encourage", label: "Encourage" },
    { id: "Simplify", label: "Simplify" },
    { id: "Professional", label: "Professional" },
  ];
  const TONE_TITLES = {
    None: "No tone override — clean adapted prompt only",
    Grill: "Critical judgment of the context — challenge flaws, no soft padding",
    Neutral: "Matter-of-fact — neither grilling nor encouraging",
    Encourage: "Supportive replies even if the idea is weak or something went wrong",
    Simplify: "Simplify concepts — plain language, short sentences",
    Professional: "Professional GenAI output — polished and precise",
  };
  const ROOT_ID = "vibeprompt-root";
  const RESTORE_ID = "vibeprompt-restore";

  let selectedTone = null;
  let lastOriginal = "";
  let lastResult = null;
  let minimized = false;
  let exited = false;
  let suppressComposerSync = false;
  let adaptInFlight = false;
  let lastSyncedComposer = "";
  /** Real user draft when resolving an ASK (not the internal resolve payload). */
  let clarificationBaseOriginal = "";

  function siteName() {
    return window.VibePromptAPI?.getSiteName?.() || "this chat";
  }

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
    removeRestore();
    exited = true;
    minimized = false;
    selectedTone = null;
    lastResult = null;
    clarificationBaseOriginal = "";
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
    return TONES.map((t) => {
      const label = t.label;
      const title = escapeHtml(TONE_TITLES[label] || label);
      const isActive = selectedTone === t.id;
      const toneAttr = t.id == null ? "" : t.id;
      return `<button type="button" class="vp-tone${isActive ? " is-active" : ""}" data-tone="${escapeHtml(
        toneAttr
      )}" data-tone-none="${t.id == null ? "1" : "0"}" title="${title}" aria-label="${escapeHtml(
        label
      )}: ${title}">${escapeHtml(label)}</button>`;
    }).join("");
  }

  function renderIdle(composerPreview) {
    const preview = (composerPreview || "").trim();
    const name = escapeHtml(siteName());
    return `
      <div class="vp-section">
        <span class="vp-label">${name} composer</span>
        <pre class="vp-original">${
          preview
            ? escapeHtml(preview)
            : "<span class='vp-muted-inline'>Waiting for you to type…</span>"
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
    const name = escapeHtml(siteName());
    return `
      <div class="vp-empty">Type something in the ${name} input — VibePrompt will follow it.</div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="generate">Adapt now</button>
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
    const name = escapeHtml(siteName());
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
             <label class="vp-label vp-clarify-label" for="vp-clarify-answer">Your answer</label>
             <textarea
               id="vp-clarify-answer"
               class="vp-prompt vp-clarify-answer"
               rows="3"
               placeholder="Answer here…"
               spellcheck="true"
             ></textarea>
             <p class="vp-hint-inline">Answer here, then Resolve — the chat composer stays untouched until you Use adapted.</p>
           </div>`
        : "";

    const adaptedSection =
      decision === "ask"
        ? ""
        : `<div class="vp-section">
             <span class="vp-label">${decision === "adapt" ? "Adapted" : "Composer preview"}</span>
             <textarea class="vp-prompt" spellcheck="true">${escapeHtml(
               decision === "adapt" ? adapted : normalized
             )}</textarea>
           </div>`;

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
      ${adaptedSection}
      ${changes}
      <div class="vp-section">
        <span class="vp-label">Tone override</span>
        <div class="vp-tones">${tonesHtml()}</div>
      </div>
      <div class="vp-actions">
        ${
          decision === "ask"
            ? `<button type="button" class="vp-btn vp-btn-primary" data-action="answer-clarification">Resolve clarification</button>`
            : `<button type="button" class="vp-btn vp-btn-primary" data-action="use-adapted">
                 ${decision === "pass" ? "Use original" : "Use adapted"}
               </button>`
        }
        <button type="button" class="vp-btn vp-btn-secondary" data-action="use-original">Original</button>
        ${
          decision === "ask"
            ? ""
            : `<button type="button" class="vp-btn vp-btn-secondary" data-action="copy">Copy</button>
               <button type="button" class="vp-btn vp-btn-secondary" data-action="regenerate">Again</button>`
        }
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
            <p class="vp-tagline">Minimal · context-aware · multi-chat</p>
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

      const toneBtn = target.closest("[data-tone], [data-tone-none]");
      if (toneBtn && root.contains(toneBtn) && toneBtn.hasAttribute("data-tone-none")) {
        const none = toneBtn.getAttribute("data-tone-none") === "1";
        selectedTone = none ? null : toneBtn.getAttribute("data-tone") || null;
        root.querySelectorAll(".vp-tone").forEach((btn) => {
          const btnNone = btn.getAttribute("data-tone-none") === "1";
          const btnTone = btn.getAttribute("data-tone") || null;
          const active = btnNone ? selectedTone == null : selectedTone === btnTone;
          btn.classList.toggle("is-active", active);
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
      else if (action === "use-adapted") handleUsePrompt(false);
      else if (action === "use-original") handleUsePrompt(true);
      else if (action === "answer-clarification") handleAnswerClarification();
    });

    return root;
  }

  function setBody(html) {
    const body = ensureShell().querySelector(".vp-body");
    if (body) body.innerHTML = html;
  }

  async function handleCopy() {
    const textarea = getRoot()?.querySelector(".vp-prompt");
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

  function buildResolvedPrompt(original, question, answer) {
    return [
      "Resolve this into ONE clean prompt the user can send to a GenAI chat.",
      "Do not include clarifying questions, 'My answer', or scaffolding in the result.",
      "",
      `Original draft: ${original}`,
      question ? `Clarifying question that was asked: ${question}` : "",
      `User's answer: ${answer}`,
      "",
      "Output only the clean standalone user prompt (same JSON contract as usual).",
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  async function handleAnswerClarification() {
    const answerEl = getRoot()?.querySelector(".vp-clarify-answer");
    const answer = (answerEl instanceof HTMLTextAreaElement ? answerEl.value : "").trim();
    if (!answer) {
      setStatus("Type your answer below the clarification first", "error");
      answerEl?.focus?.();
      return;
    }

    const baseOriginal = (lastResult?.original || lastOriginal || "").trim();
    const question = (lastResult?.clarification || "").trim();
    if (!baseOriginal) {
      setStatus("Nothing to resolve", "error");
      return;
    }

    clarificationBaseOriginal = baseOriginal;
    // Stay in-panel only — never dump Q&A into the GenAI composer.
    await requestAndRender(buildResolvedPrompt(baseOriginal, question, answer), selectedTone, {
      displayOriginal: baseOriginal,
      touchComposer: false,
    });
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
      ok ? `Inserted into ${siteName()} composer` : "Could not find composer — copied instead",
      ok ? "ok" : "error"
    );
    if (!ok && text) navigator.clipboard?.writeText(text);
  }

  async function requestAndRender(text, tone, options = {}) {
    const trimmed = (text || "").trim();
    if (!trimmed) {
      setBody(renderEmpty());
      return;
    }

    const displayOriginal = (options.displayOriginal || trimmed).trim();
    const touchComposer = options.touchComposer !== false;

    lastOriginal = displayOriginal;
    if (touchComposer) {
      lastSyncedComposer = displayOriginal;
    }
    adaptInFlight = true;
    if (minimized) expandPanel();
    setBody(renderLoading(displayOriginal));

    if (typeof window.VibePromptAPI?.requestVibe !== "function") {
      setBody(renderError(displayOriginal, "VibePrompt bridge missing."));
      adaptInFlight = false;
      return;
    }

    const result = await window.VibePromptAPI.requestVibe(trimmed, tone || null);
    adaptInFlight = false;

    if (!getRoot()) return;

    const withDisplayOriginal = (data) => {
      if (!data || typeof data !== "object") return data;
      const next = { ...data, original: displayOriginal };
      if (clarificationBaseOriginal && displayOriginal === clarificationBaseOriginal) {
        clarificationBaseOriginal = "";
      }
      return next;
    };

    if (!result.ok) {
      if (result.fallback) {
        setBody(renderResult(withDisplayOriginal(result.fallback)));
        setStatus(result.error || "Using original", "error");
        return;
      }
      setBody(
        renderError(displayOriginal, result.error || "Request failed", Boolean(result.needsKey))
      );
      return;
    }

    setBody(renderResult(withDisplayOriginal(result.data)));
    if (!touchComposer && (result.data?.decision || "").toLowerCase() === "adapt") {
      setStatus("Clarification resolved — review Adapted, then Use adapted", "ok");
    }
  }

  async function handleRegenerate() {
    const text =
      (lastOriginal || "").trim() ||
      (window.VibePromptAPI?.readComposerText?.() || "").trim();
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
    await requestAndRender(text, selectedTone, { displayOriginal: text, touchComposer: false });
  }

  async function handleGenerate() {
    const text = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    if (!text) {
      setBody(renderEmpty());
      return;
    }
    await requestAndRender(text, selectedTone);
  }

  function onComposerChange(text) {
    if (exited || suppressComposerSync || adaptInFlight) return;

    const trimmed = (text || "").trim();
    lastSyncedComposer = trimmed;

    if (!trimmed) {
      lastOriginal = "";
      lastResult = null;
      if (!minimized) setBody(renderEmpty());
      return;
    }

    if (lastResult && lastOriginal === trimmed) return;

    lastOriginal = trimmed;
    lastResult = null;
    if (!minimized) setBody(renderIdle(trimmed));
  }

  function bootBody() {
    const composer = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    lastSyncedComposer = composer;
    lastOriginal = composer;
    setBody(composer ? renderIdle(composer) : renderIdle(""));
  }

  function mount() {
    if (exited) {
      removeRestore();
      return;
    }
    removeRestore();
    ensureShell();
    const body = getRoot()?.querySelector(".vp-body");
    if (body && !body.hasChildNodes()) {
      bootBody();
    }
    if (minimized) minimizePanel();
  }

  window.VibePromptModal = {
    open: handleGenerate,
    close: exitPanel,
    restore: restorePanel,
    mount,
    minimize: minimizePanel,
    expand: expandPanel,
    onComposerChange,
  };
})();
