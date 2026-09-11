const DEFAULT_API_BASE = "http://localhost:8000";

async function getApiBase() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ apiBaseUrl: DEFAULT_API_BASE }, (result) => {
      resolve(result.apiBaseUrl || DEFAULT_API_BASE);
    });
  });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "VIBE_REQUEST") {
    return false;
  }

  (async () => {
    try {
      const apiBase = await getApiBase();
      const response = await fetch(`${apiBase}/api/vibe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: message.text,
          tone: message.tone || null,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        sendResponse({
          ok: false,
          error: data.detail || data.error || `Request failed (${response.status})`,
        });
        return;
      }

      sendResponse({ ok: true, data });
    } catch (err) {
      sendResponse({
        ok: false,
        error:
          err?.message ||
          "Could not reach VibePrompt backend. Is it running on localhost:8000?",
      });
    }
  })();

  return true;
});
