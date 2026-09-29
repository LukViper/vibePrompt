/**
 * VibePrompt content script — ChatGPT capture + context + panel mount.
 */
(() => {
  function readComposerText() {
    const selectors = [
      "#prompt-textarea",
      'div[contenteditable="true"]#prompt-textarea',
      'div.ProseMirror[contenteditable="true"]',
      'textarea[data-id="root"]',
      'textarea[placeholder*="Message"]',
      'div[contenteditable="true"][data-placeholder]',
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (!el) continue;

      if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        const value = el.value?.trim();
        if (value) return value;
        continue;
      }

      if (el.getAttribute("contenteditable") === "true") {
        const value = (el.innerText || el.textContent || "").trim();
        if (value) return value;
      }
    }

    const editables = Array.from(
      document.querySelectorAll('form div[contenteditable="true"], main div[contenteditable="true"]')
    );
    for (let i = editables.length - 1; i >= 0; i -= 1) {
      const value = (editables[i].innerText || editables[i].textContent || "").trim();
      if (value) return value;
    }

    return "";
  }

  function getComposerElement() {
    const selectors = [
      "#prompt-textarea",
      'div.ProseMirror[contenteditable="true"]',
      'div[contenteditable="true"]#prompt-textarea',
    ];
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) return el;
    }
    const editables = document.querySelectorAll(
      'form div[contenteditable="true"], main div[contenteditable="true"]'
    );
    return editables.length ? editables[editables.length - 1] : null;
  }

  function writeComposerText(text) {
    const el = getComposerElement();
    if (!el) return false;

    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
      el.focus();
      el.value = text;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    }

    el.focus();
    // Prefer execCommand for ProseMirror compatibility
    try {
      document.execCommand("selectAll", false, null);
      document.execCommand("insertText", false, text);
    } catch {
      el.textContent = text;
    }
    el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
    return true;
  }

  /**
   * Extract recent chat turns from ChatGPT DOM (best-effort).
   * Returns up to `limit` messages as {role, content}.
   */
  function extractConversationContext(limit = 6) {
    const messages = [];

    // Common ChatGPT article turns
    const articles = document.querySelectorAll(
      'article[data-testid^="conversation-turn"], div[data-message-author-role]'
    );

    if (articles.length) {
      articles.forEach((node) => {
        let role =
          node.getAttribute("data-message-author-role") ||
          node.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role");
        if (!role) {
          const testId = node.getAttribute("data-testid") || "";
          if (/user/i.test(testId)) role = "user";
          else if (/assistant|bot/i.test(testId)) role = "assistant";
        }
        if (role !== "user" && role !== "assistant") {
          // Heuristic: odd/even or presence of markdown
          role = messages.length % 2 === 0 ? "user" : "assistant";
        }
        const contentEl =
          node.querySelector(".markdown, .whitespace-pre-wrap, [class*='markdown']") || node;
        const content = (contentEl.innerText || contentEl.textContent || "").trim();
        if (content && content.length < 4000) {
          messages.push({ role, content: content.slice(0, 1500) });
        }
      });
    }

    return messages.slice(-limit);
  }

  function friendlyRuntimeError(message) {
    const raw = (message || "").trim();
    const lower = raw.toLowerCase();
    if (
      lower.includes("extension context invalidated") ||
      lower.includes("receiving end does not exist") ||
      lower.includes("message port closed")
    ) {
      return (
        "Extension was reloaded. Refresh this ChatGPT tab (Ctrl/Cmd+R), " +
        "then click Adapt again."
      );
    }
    return raw || "Extension messaging failed";
  }

  function requestVibe(text, tone, extras = {}) {
    return new Promise((resolve) => {
      (async () => {
      try {
        if (!chrome?.runtime?.id) {
          resolve({
            ok: false,
            error:
              "Extension was reloaded. Refresh this ChatGPT tab (Ctrl/Cmd+R), " +
              "then click Adapt again.",
            fallback: {
              decision: "pass",
              original: text,
              optimized_prompt: text,
              changes: ["Extension unavailable — using original"],
              estimated_token_change: 0,
            },
          });
          return;
        }
        const personalVocabulary =
          extras.personal_vocabulary ||
          (await window.VibePromptPersonalModel?.getPersonalVocabulary?.()) ||
          null;

        chrome.runtime.sendMessage(
          {
            type: "VIBE_REQUEST",
            text,
            tone,
            conversation_context: extras.conversation_context || extractConversationContext(6),
            user_profile: extras.user_profile || null,
            learning_context: extras.learning_context || null,
            personal_vocabulary: personalVocabulary,
          },
          (response) => {
            if (chrome.runtime.lastError) {
              resolve({
                ok: false,
                error: friendlyRuntimeError(chrome.runtime.lastError.message),
                fallback: {
                  decision: "pass",
                  original: text,
                  optimized_prompt: text,
                  changes: ["Messaging failed — using original"],
                  estimated_token_change: 0,
                },
              });
              return;
            }
            resolve(response || { ok: false, error: "Empty response from background" });
          }
        );
      } catch (err) {
        resolve({
          ok: false,
          error: friendlyRuntimeError(err?.message || "Failed to message extension background"),
          fallback: {
            decision: "pass",
            original: text,
            optimized_prompt: text,
            changes: ["Error — using original"],
            estimated_token_change: 0,
          },
        });
      }
      })();
    });
  }

  function storageMessage(type, payload = {}) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ type, ...payload }, (response) => {
          if (chrome.runtime.lastError) {
            resolve({ ok: false, error: chrome.runtime.lastError.message });
            return;
          }
          resolve(response || { ok: false });
        });
      } catch (err) {
        resolve({ ok: false, error: err?.message });
      }
    });
  }

  window.VibePromptAPI = {
    requestVibe,
    readComposerText,
    writeComposerText,
    extractConversationContext,
    getProfileState: () => storageMessage("GET_PROFILE_STATE"),
    saveProfile: (profile) => storageMessage("SAVE_PROFILE", { profile }),
    saveLearningContext: (learningContext) =>
      storageMessage("SAVE_LEARNING_CONTEXT", { learningContext }),
    resetOnboarding: () => storageMessage("RESET_ONBOARDING"),
  };

  let lastSeenComposer = null;
  let composerDebounce = null;

  /** Preview-only — must NOT trigger Groq /api/vibe. */
  function notifyComposerChange() {
    const text = readComposerText();
    if (text === lastSeenComposer) return;
    lastSeenComposer = text;
    window.VibePromptModal?.onComposerChange?.(text);
  }

  function scheduleComposerNotify() {
    clearTimeout(composerDebounce);
    composerDebounce = setTimeout(notifyComposerChange, 300);
  }

  function bindComposerWatch() {
    const el = getComposerElement();
    if (!el) return false;

    if (el.dataset.vpWatch === "1") return true;
    el.dataset.vpWatch = "1";

    el.addEventListener("input", scheduleComposerNotify);
    el.addEventListener("keyup", scheduleComposerNotify);
    el.addEventListener("paste", scheduleComposerNotify);
    return true;
  }

  function boot() {
    window.VibePromptModal?.mount?.();
    bindComposerWatch();
    // Rebind if ChatGPT remounts the composer — do NOT poll notify (that burned API quota)
    setInterval(() => {
      bindComposerWatch();
    }, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  let remountTimer = null;
  const observer = new MutationObserver(() => {
    if (remountTimer) return;
    remountTimer = setTimeout(() => {
      remountTimer = null;
      if (!document.getElementById("vibeprompt-root") && !document.getElementById("vibeprompt-restore")) {
        window.VibePromptModal?.mount?.();
      }
      bindComposerWatch();
    }, 500);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
