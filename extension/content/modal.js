/**
 * VibePrompt panel — persistent top-right UI on ChatGPT.
 * Expects window.VibePromptAPI from content.js.
 */
(() => {
  const TONES = ["Grill", "Neutral", "Encourage", "Simplify", "Professional"];
  const ROOT_ID = "vibeprompt-root";
  const RESTORE_ID = "vibeprompt-restore";

  let selectedTone = null;
  let lastOriginal = "";
  let minimized = false;
  let exited = false;

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
    const root = getRoot();
    if (root) root.remove();
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
    setBody(renderIdle());
    expandPanel();
  }

  function renderIdle() {
    return `
      <div class="vp-empty">
        Type in the ChatGPT box, then generate an optimized prompt.
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="generate">Generate</button>
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
        Reading the vibe…
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderEmpty() {
    return `
      <div class="vp-empty">
        Type something in the ChatGPT input box first.
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="generate">Generate</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function renderSchemaSummary(schema) {
    if (!schema || typeof schema !== "object") return "";
    const cells = [
      ["Persona", schema.persona],
      ["Audience", schema.audience],
      ["Task", schema.task],
      ["Format", schema.format],
      ["Tonality", schema.tonality],
    ].filter(([, v]) => typeof v === "string" && v.trim());

    if (!cells.length) return "";

    const patternBits = [];
    const p = schema.patterns || {};
    if (p.usePersona) patternBits.push("Persona");
    if (p.useTemplate) patternBits.push("Template");
    if (p.useReflection) patternBits.push("Reflection");
    if (p.useContextManager) patternBits.push("Context Mgr");

    return `
      <div class="vp-section">
        <span class="vp-label">Schema (CO-STAR / Canvas)</span>
        <div class="vp-chips">
          ${cells
            .map(
              ([label, value]) =>
                `<span class="vp-chip" title="${escapeHtml(value)}"><strong>${escapeHtml(
                  label
                )}</strong>${escapeHtml(
                  value.length > 72 ? `${value.slice(0, 72)}…` : value
                )}</span>`
            )
            .join("")}
        </div>
        ${
          patternBits.length
            ? `<div class="vp-chips" style="margin-top:6px">
                 ${patternBits
                   .map((b) => `<span class="vp-chip"><strong>Pattern</strong>${escapeHtml(b)}</span>`)
                   .join("")}
               </div>`
            : ""
        }
      </div>
    `;
  }

  function renderResult(data) {
    const chips = `
      <div class="vp-chips">
        <span class="vp-chip"><strong>Intent</strong>${escapeHtml(data.intent || "—")}</span>
        <span class="vp-chip"><strong>Emotion</strong>${escapeHtml(data.emotion || "—")}</span>
      </div>
    `;

    const constraints =
      Array.isArray(data.constraints) && data.constraints.length
        ? `<div class="vp-section">
             <span class="vp-label">Constraints</span>
             <div class="vp-chips">
               ${data.constraints
                 .map((c) => `<span class="vp-chip">${escapeHtml(c)}</span>`)
                 .join("")}
             </div>
           </div>`
        : "";

    const tones = TONES.map(
      (t) =>
        `<button type="button" class="vp-tone${
          selectedTone === t ? " is-active" : ""
        }" data-tone="${t}">${t}</button>`
    ).join("");

    const assembled =
      data.optimized_prompt ||
      data.schema?.generatedPrompt ||
      "";

    return `
      <div class="vp-section">
        <span class="vp-label">Original</span>
        <pre class="vp-original">${escapeHtml(data.original || "")}</pre>
      </div>
      <div class="vp-section">
        <span class="vp-label">Detected</span>
        ${chips}
      </div>
      ${constraints}
      ${renderSchemaSummary(data.schema)}
      <div class="vp-section">
        <span class="vp-label">Tone override</span>
        <div class="vp-tones">${tones}</div>
      </div>
      <div class="vp-section">
        <span class="vp-label">Optimized prompt</span>
        <textarea class="vp-prompt" spellcheck="true">${escapeHtml(assembled)}</textarea>
      </div>
      <div class="vp-actions">
        <button type="button" class="vp-btn vp-btn-primary" data-action="copy">Copy</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="regenerate">Regenerate</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="generate">New</button>
      </div>
      <div class="vp-status"></div>
    `;
  }

  function openSettings() {
    try {
      chrome.runtime.sendMessage({ type: "OPEN_OPTIONS" }, () => {
        void chrome.runtime.lastError;
      });
    } catch {
      // Extension context may be invalidated — user must refresh / open options manually
    }
  }

  function renderError(original, message, needsKey) {
    return `
      <div class="vp-section">
        <span class="vp-label">Original</span>
        <pre class="vp-original">${escapeHtml(original || "—")}</pre>
      </div>
      <div class="vp-empty">${escapeHtml(message)}</div>
      <div class="vp-actions">
        ${
          needsKey
            ? `<button type="button" class="vp-btn vp-btn-primary" data-action="settings">Settings</button>`
            : ""
        }
        <button type="button" class="vp-btn ${
          needsKey ? "vp-btn-secondary" : "vp-btn-primary"
        }" data-action="regenerate">Try again</button>
        <button type="button" class="vp-btn vp-btn-secondary" data-action="generate">New</button>
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
            <p class="vp-tagline">Why vibe code, when you can vibe prompt?</p>
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
    const value = textarea.value;
    try {
      await navigator.clipboard.writeText(value);
      setStatus("Copied to clipboard", "ok");
    } catch {
      textarea.select();
      document.execCommand("copy");
      setStatus("Copied to clipboard", "ok");
    }
  }

  async function requestAndRender(text, tone) {
    lastOriginal = text;
    if (minimized) expandPanel();
    setBody(renderLoading(text));

    if (typeof window.VibePromptAPI?.requestVibe !== "function") {
      setBody(renderError(text, "VibePrompt bridge missing."));
      return;
    }

    const result = await window.VibePromptAPI.requestVibe(text, tone || null);
    if (!getRoot()) return;

    if (!result.ok) {
      setBody(
        renderError(
          text,
          result.error || "Request failed",
          Boolean(result.needsKey)
        )
      );
      return;
    }

    setBody(renderResult(result.data));
  }

  async function handleRegenerate() {
    if (!lastOriginal) {
      await handleGenerate();
      return;
    }
    const buttons = getRoot()?.querySelectorAll(".vp-btn");
    buttons?.forEach((b) => {
      b.disabled = true;
    });
    setStatus("Regenerating…");
    await requestAndRender(lastOriginal, selectedTone);
  }

  async function handleGenerate() {
    selectedTone = null;
    const text = (window.VibePromptAPI?.readComposerText?.() || "").trim();
    if (!text) {
      setBody(renderEmpty());
      return;
    }
    await requestAndRender(text, null);
  }

  function mount() {
    if (exited) {
      ensureRestore();
      return;
    }
    removeRestore();
    ensureShell();
    if (!getRoot()?.querySelector(".vp-body")?.hasChildNodes()) {
      setBody(renderIdle());
    }
    if (minimized) minimizePanel();
  }

  window.VibePromptModal = {
    open: handleGenerate,
    close: exitPanel,
    mount,
    minimize: minimizePanel,
    expand: expandPanel,
  };
})();
