/**
 * VibePrompt content script — auto-mount top-right panel on ChatGPT.
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
        "then click Generate again."
      );
    }
    return raw || "Extension messaging failed";
  }

  function requestVibe(text, tone) {
    return new Promise((resolve) => {
      try {
        if (!chrome?.runtime?.id) {
          resolve({
            ok: false,
            error:
              "Extension was reloaded. Refresh this ChatGPT tab (Ctrl/Cmd+R), " +
              "then click Generate again.",
          });
          return;
        }
        chrome.runtime.sendMessage(
          { type: "VIBE_REQUEST", text, tone },
          (response) => {
            if (chrome.runtime.lastError) {
              resolve({
                ok: false,
                error: friendlyRuntimeError(chrome.runtime.lastError.message),
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
        });
      }
    });
  }

  window.VibePromptAPI = { requestVibe, readComposerText };

  function boot() {
    window.VibePromptModal?.mount?.();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  // ChatGPT is an SPA — remount panel if the DOM remounts
  const observer = new MutationObserver(() => {
    if (document.getElementById("vibeprompt-root")) return;
    if (document.getElementById("vibeprompt-restore")) return;
    window.VibePromptModal?.mount?.();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
