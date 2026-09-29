/**
 * Local-first personal vocabulary (typos, abbreviations, domain terms).
 */
(() => {
  const DEFAULT_VOCAB = {
    personal_typos: {},
    abbreviations: {},
    domain_terms: [],
  };

  function storageGet(defaults) {
    return new Promise((resolve) => {
      chrome.storage.local.get(defaults, (result) => resolve(result || defaults));
    });
  }

  async function getPersonalVocabulary() {
    const data = await storageGet({ personalVocabulary: DEFAULT_VOCAB });
    return data.personalVocabulary || DEFAULT_VOCAB;
  }

  async function savePersonalVocabulary(vocab) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ personalVocabulary: vocab }, () => {
        resolve(!chrome.runtime.lastError);
      });
    });
  }

  /** Record accepted recovery mapping (confidence grows with count). */
  async function learnCorrection(from, to, kind = "typo") {
    const fromKey = (from || "").toLowerCase().trim();
    const toVal = (to || "").trim();
    if (!fromKey || !toVal || fromKey === toVal.toLowerCase()) return;

    const vocab = await getPersonalVocabulary();
    const bucket = kind === "abbrev" ? vocab.abbreviations : vocab.personal_typos;
    const prev = bucket[fromKey] || { correction: "", meaning: "", confidence: 0, count: 0 };
    const count = (prev.count || 0) + 1;
    const confidence = Math.min(0.98, 0.55 + count * 0.08);
    bucket[fromKey] = {
      correction: toVal,
      meaning: toVal,
      confidence,
      count,
    };
    if (kind === "abbrev") vocab.abbreviations = bucket;
    else vocab.personal_typos = bucket;
    await savePersonalVocabulary(vocab);
  }

  async function addDomainTerm(term) {
    const t = (term || "").trim();
    if (!t) return;
    const vocab = await getPersonalVocabulary();
    if (!vocab.domain_terms.includes(t)) {
      vocab.domain_terms = [...vocab.domain_terms, t].slice(-50);
      await savePersonalVocabulary(vocab);
    }
  }

  async function resetPersonalVocabulary() {
    await savePersonalVocabulary(DEFAULT_VOCAB);
  }

  /** Parse "a → b" recovery change notes into learnable pairs. */
  async function learnFromRecoveryChanges(changes) {
    if (!Array.isArray(changes)) return;
    for (const note of changes) {
      const m = String(note).match(/^(.+?)\s*→\s*(.+)$/);
      if (m) await learnCorrection(m[1].trim(), m[2].trim(), "typo");
    }
  }

  window.VibePromptPersonalModel = {
    getPersonalVocabulary,
    savePersonalVocabulary,
    learnCorrection,
    addDomainTerm,
    resetPersonalVocabulary,
    learnFromRecoveryChanges,
  };
})();
