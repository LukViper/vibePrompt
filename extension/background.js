const DEFAULT_API_BASE = "https://vibeprompt.onrender.com";

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

function originPattern(apiBaseUrl) {
  try {
    const url = new URL(apiBaseUrl);
    return `${url.protocol}//${url.host}/*`;
  } catch {
    return null;
  }
}

function hasOriginAccess(pattern) {
  return new Promise((resolve) => {
    chrome.permissions.contains({ origins: [pattern] }, (ok) => resolve(Boolean(ok)));
  });
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

function passFallback(text, changes) {
  return {
    decision: "pass",
    original: text,
    optimized_prompt: text,
    changes,
    estimated_token_change: 0,
  };
}

chrome.action.onClicked.addListener((tab) => {
  // On a supported chat tab: reopen the panel. Otherwise open Settings.
  if (tab?.id == null) {
    chrome.runtime.openOptionsPage();
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "SHOW_PANEL" }, (response) => {
    if (chrome.runtime.lastError || !response?.ok) {
      chrome.runtime.openOptionsPage();
    }
  });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "OPEN_OPTIONS") {
    chrome.runtime.openOptionsPage();
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type === "CHECK_BACKEND_ACCESS") {
    (async () => {
      const { apiBaseUrl } = await getSettings();
      const pattern = originPattern(apiBaseUrl);
      if (!pattern) {
        sendResponse({ ok: false, error: "Invalid backend URL", apiBaseUrl });
        return;
      }
      const granted = await hasOriginAccess(pattern);
      sendResponse({ ok: true, granted, apiBaseUrl, pattern });
    })();
    return true;
  }

  if (message?.type !== "VIBE_REQUEST") {
    return false;
  }

  (async () => {
    try {
      const { apiBaseUrl, groqApiKey } = await getSettings();
      const pattern = originPattern(apiBaseUrl);
      if (!pattern) {
        sendResponse({
          ok: false,
          error: "Backend URL is invalid. Open VibePrompt Settings and fix it.",
          needsKey: false,
          fallback: passFallback(message.text, ["Invalid backend URL — using original"]),
        });
        return;
      }

      const granted = await hasOriginAccess(pattern);
      if (!granted) {
        sendResponse({
          ok: false,
          error:
            "Backend access is not granted. Open VibePrompt Settings, save your Backend URL, and allow the permission prompt.",
          needsKey: false,
          fallback: passFallback(message.text, ["Backend permission missing — using original"]),
        });
        return;
      }

      const headers = { "Content-Type": "application/json" };
      if (groqApiKey) {
        headers["X-Groq-Api-Key"] = groqApiKey;
      }

      const body = {
        prompt: message.text,
        text: message.text,
        tone: message.tone || null,
        conversation_context: message.conversation_context || [],
        personal_vocabulary: message.personal_vocabulary || null,
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
          fallback: passFallback(message.text, ["VibePrompt unavailable — using original"]),
        });
        return;
      }

      sendResponse({ ok: true, data });
    } catch (err) {
      sendResponse({
        ok: false,
        error:
          err?.message ||
          "Could not reach the VibePrompt backend. Check Settings → Backend URL and that the API is running.",
        fallback: passFallback(message.text, ["Backend unreachable — using original"]),
      });
    }
  })();

  return true;
});
