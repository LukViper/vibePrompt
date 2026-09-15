const DEFAULT_API_BASE = "http://localhost:8000";

const form = document.getElementById("settings-form");
const keyInput = document.getElementById("groqApiKey");
const baseInput = document.getElementById("apiBaseUrl");
const statusEl = document.getElementById("status");
const toggleBtn = document.getElementById("toggle-key");
const clearBtn = document.getElementById("clear-key");

function setStatus(message, kind) {
  statusEl.textContent = message || "";
  statusEl.classList.remove("is-ok", "is-error");
  if (kind) statusEl.classList.add(kind);
}

function loadSettings() {
  chrome.storage.local.get({ groqApiKey: "" }, (local) => {
    keyInput.value = local.groqApiKey || "";
  });
  chrome.storage.sync.get({ apiBaseUrl: DEFAULT_API_BASE }, (sync) => {
    baseInput.value = sync.apiBaseUrl || DEFAULT_API_BASE;
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const groqApiKey = keyInput.value.trim();
  let apiBaseUrl = (baseInput.value || "").trim() || DEFAULT_API_BASE;
  apiBaseUrl = apiBaseUrl.replace(/\/+$/, "");

  try {
    // Validate URL shape without forcing a network call
    // eslint-disable-next-line no-new
    new URL(apiBaseUrl);
  } catch {
    setStatus("Backend URL looks invalid.", "is-error");
    return;
  }

  chrome.storage.local.set({ groqApiKey }, () => {
    chrome.storage.sync.set({ apiBaseUrl }, () => {
      if (chrome.runtime.lastError) {
        setStatus(chrome.runtime.lastError.message || "Save failed", "is-error");
        return;
      }
      setStatus(
        groqApiKey
          ? "Saved. Refresh any open ChatGPT tab, then Generate."
          : "Saved backend URL. API key is empty — set a Groq key or use backend/.env.",
        "is-ok"
      );
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

loadSettings();
