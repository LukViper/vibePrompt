/**
 * VibePrompt content script — multi-site composer capture + panel mount.
 */
(() => {
  const sites = window.VibePromptSites;
  const site = sites?.detectSite?.() || { id: "unknown", name: "this chat" };

  function getComposerElement() {
    return sites?.getComposerElement?.(site) || null;
  }

  function readComposerText() {
    return sites?.readFromElement?.(getComposerElement()) || "";
  }

  function writeComposerText(text) {
    return sites?.writeToElement?.(getComposerElement(), text) || false;
  }

  function extractConversationContext(limit = 6) {
    return sites?.extractConversation?.(site, limit) || [];
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
        `Extension was reloaded. Refresh this ${site.name} tab (Ctrl/Cmd+R), ` +
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
                `Extension was reloaded. Refresh this ${site.name} tab (Ctrl/Cmd+R), ` +
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
              conversation_context:
                extras.conversation_context || extractConversationContext(6),
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

  window.VibePromptAPI = {
    requestVibe,
    readComposerText,
    writeComposerText,
    extractConversationContext,
    getSiteName: () => site.name,
    getSiteId: () => site.id,
  };

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "SHOW_PANEL") return false;
    try {
      window.VibePromptModal?.restore?.();
      sendResponse({ ok: true });
    } catch (err) {
      sendResponse({ ok: false, error: err?.message || "Could not show panel" });
    }
    return false;
  });

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
