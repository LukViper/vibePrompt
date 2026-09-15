const DEFAULT_API_BASE = "http://localhost:8000";

function storageGet(area, defaults) {
  return new Promise((resolve) => {
    chrome.storage[area].get(defaults, (result) => resolve(result || defaults));
  });
}

async function getSettings() {
  const [local, sync] = await Promise.all([
    storageGet("local", { groqApiKey: "" }),
    storageGet("sync", { apiBaseUrl: DEFAULT_API_BASE }),
  ]);
  return {
    groqApiKey: (local.groqApiKey || "").trim(),
    apiBaseUrl: (sync.apiBaseUrl || DEFAULT_API_BASE).replace(/\/+$/, ""),
  };
}

function formatDetail(detail) {
  if (!detail) return null;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (typeof item === "string" ? item : item?.msg || JSON.stringify(item)))
      .join("; ");
  }
  if (typeof detail === "object" && detail.msg) return detail.msg;
  try {
    return JSON.stringify(detail);
  } catch {
    return String(detail);
  }
}

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "OPEN_OPTIONS") {
    chrome.runtime.openOptionsPage();
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type !== "VIBE_REQUEST") {
    return false;
  }

  (async () => {
    try {
      const { apiBaseUrl, groqApiKey } = await getSettings();
      const headers = { "Content-Type": "application/json" };
      if (groqApiKey) {
        headers["X-Groq-Api-Key"] = groqApiKey;
      }

      const body = {
        text: message.text,
        tone: message.tone || null,
      };
      if (groqApiKey) {
        body.api_key = groqApiKey;
      }

      const response = await fetch(`${apiBaseUrl}/api/vibe`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail = formatDetail(data.detail) || data.error || `Request failed (${response.status})`;
        const needsKey =
          response.status === 401 ||
          /api[_ ]?key|GROQ_API_KEY|not set/i.test(String(detail));
        sendResponse({
          ok: false,
          error: needsKey
            ? `${detail} Open VibePrompt Settings (extension icon) and paste your Groq API key.`
            : detail,
          needsKey: Boolean(needsKey),
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
