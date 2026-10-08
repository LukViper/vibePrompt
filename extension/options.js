const DEFAULT_API_BASE = "https://vibeprompt.onrender.com";

const form = document.getElementById("settings-form");
const keyInput = document.getElementById("groqApiKey");
const baseInput = document.getElementById("apiBaseUrl");
const statusEl = document.getElementById("status");
const toggleBtn = document.getElementById("toggle-key");
const clearBtn = document.getElementById("clear-key");
const accessEl = document.getElementById("backend-access");

function setStatus(message, kind) {
  statusEl.textContent = message || "";
  statusEl.classList.remove("is-ok", "is-error");
  if (kind) statusEl.classList.add(kind);
}

function originPattern(apiBaseUrl) {
  try {
    const url = new URL(apiBaseUrl);
    return `${url.protocol}//${url.host}/*`;
  } catch {
    return null;
  }
}

function containsOrigin(pattern) {
  return new Promise((resolve) => {
    chrome.permissions.contains({ origins: [pattern] }, (ok) => resolve(Boolean(ok)));
  });
}

function requestOrigin(pattern) {
  return new Promise((resolve) => {
    chrome.permissions.request({ origins: [pattern] }, (granted) => resolve(Boolean(granted)));
  });
}

async function refreshAccessHint(apiBaseUrl) {
  if (!accessEl) return;
  const pattern = originPattern(apiBaseUrl);
  if (!pattern) {
    accessEl.textContent = "Enter a valid Backend URL (including http:// or https://).";
    accessEl.classList.add("is-warn");
    return;
  }
  const granted = await containsOrigin(pattern);
  if (granted) {
    accessEl.textContent = `Backend access granted for ${new URL(apiBaseUrl).origin}.`;
    accessEl.classList.remove("is-warn");
  } else {
    accessEl.textContent =
      "Backend access not granted yet — click Save and allow the Chrome permission prompt.";
    accessEl.classList.add("is-warn");
  }
}

function loadSettings() {
  chrome.storage.local.get({ groqApiKey: "" }, (local) => {
    keyInput.value = local.groqApiKey || "";
  });
  chrome.storage.sync.get({ apiBaseUrl: DEFAULT_API_BASE }, (sync) => {
    const url = sync.apiBaseUrl || DEFAULT_API_BASE;
    baseInput.value = url;
    refreshAccessHint(url);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const groqApiKey = keyInput.value.trim();
  let apiBaseUrl = (baseInput.value || "").trim() || DEFAULT_API_BASE;
  apiBaseUrl = apiBaseUrl.replace(/\/+$/, "");

  let parsed;
  try {
    parsed = new URL(apiBaseUrl);
  } catch {
    setStatus("Backend URL looks invalid.", "is-error");
    return;
  }

  if (!/^https?:$/.test(parsed.protocol)) {
    setStatus("Backend URL must start with http:// or https://.", "is-error");
    return;
  }

  const pattern = originPattern(apiBaseUrl);
  const already = await containsOrigin(pattern);
  if (!already) {
    const granted = await requestOrigin(pattern);
    if (!granted) {
      setStatus("Permission denied. Chrome needs host access to reach your backend.", "is-error");
      refreshAccessHint(apiBaseUrl);
      return;
    }
  }

  chrome.storage.local.set({ groqApiKey }, () => {
    chrome.storage.sync.set({ apiBaseUrl }, () => {
      if (chrome.runtime.lastError) {
        setStatus(chrome.runtime.lastError.message || "Save failed", "is-error");
        return;
      }
      setStatus("Saved. Refresh open chat tabs.", "is-ok");
      refreshAccessHint(apiBaseUrl);
    });
  });
});

toggleBtn.addEventListener("click", () => {
  const showing = keyInput.type === "text";
  keyInput.type = showing ? "password" : "text";
  toggleBtn.textContent = showing ? "Show" : "Hide";
  toggleBtn.setAttribute("aria-pressed", showing ? "false" : "true");
});

clearBtn.addEventListener("click", () => {
  keyInput.value = "";
  chrome.storage.local.remove("groqApiKey", () => {
    setStatus("API key cleared from this browser.", "is-ok");
  });
});

baseInput.addEventListener("change", () => {
  const url = (baseInput.value || "").trim() || DEFAULT_API_BASE;
  refreshAccessHint(url.replace(/\/+$/, ""));
});

loadSettings();
