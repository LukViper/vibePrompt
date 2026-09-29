const DEFAULT_API_BASE = "http://localhost:8000";

const form = document.getElementById("settings-form");
const keyInput = document.getElementById("groqApiKey");
const baseInput = document.getElementById("apiBaseUrl");
const statusEl = document.getElementById("status");
const toggleBtn = document.getElementById("toggle-key");
const clearBtn = document.getElementById("clear-key");
const resetProfileBtn = document.getElementById("reset-profile");
const lcSubject = document.getElementById("lcSubject");
const lcResource = document.getElementById("lcResource");
const lcTopic = document.getElementById("lcTopic");
const lcLevel = document.getElementById("lcLevel");

function setStatus(message, kind) {
  statusEl.textContent = message || "";
  statusEl.classList.remove("is-ok", "is-error");
  if (kind) statusEl.classList.add(kind);
}

function loadSettings() {
  chrome.storage.local.get({ groqApiKey: "", learningContext: null }, (local) => {
    keyInput.value = local.groqApiKey || "";
    const lc = local.learningContext || {};
    lcSubject.value = lc.subject || "";
    lcResource.value = lc.resource || "";
    lcTopic.value = lc.current_topic || "";
    lcLevel.value = lc.level || "";
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
    // eslint-disable-next-line no-new
    new URL(apiBaseUrl);
  } catch {
    setStatus("Backend URL looks invalid.", "is-error");
    return;
  }

  const learningContext = {
    subject: lcSubject.value.trim(),
    resource: lcResource.value.trim(),
    current_topic: lcTopic.value.trim(),
    level: lcLevel.value.trim(),
  };
  const hasLearning = Object.values(learningContext).some(Boolean);

  chrome.storage.local.set(
    {
      groqApiKey,
      learningContext: hasLearning ? learningContext : null,
    },
    () => {
      chrome.storage.sync.set({ apiBaseUrl }, () => {
        if (chrome.runtime.lastError) {
          setStatus(chrome.runtime.lastError.message || "Save failed", "is-error");
          return;
        }
        setStatus("Saved. Refresh open ChatGPT tabs.", "is-ok");
      });
    }
  );
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

resetProfileBtn.addEventListener("click", () => {
  chrome.storage.local.set({ onboardingComplete: false, userProfile: null }, () => {
    setStatus("Profile reset. Re-open ChatGPT to redo onboarding.", "is-ok");
  });
});

loadSettings();
