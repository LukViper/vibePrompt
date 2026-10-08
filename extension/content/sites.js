/**
 * Per-site composer + conversation adapters for major GenAI chats.
 * Host DOMs change often — selectors are ordered fallbacks.
 */
(() => {
  const SITES = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      hosts: [/^(chatgpt\.com|chat\.openai\.com)$/i],
      composers: [
        '#prompt-textarea[contenteditable="true"]',
        "#prompt-textarea",
        '[data-testid="prompt-textarea"]',
        'div.ProseMirror[contenteditable="true"][role="textbox"]',
        'div.ProseMirror[contenteditable="true"]',
      ],
      conversation: "chatgpt",
    },
    {
      id: "claude",
      name: "Claude",
      hosts: [/^claude\.ai$/i],
      composers: [
        '[data-testid="chat-input"][contenteditable="true"]',
        '[aria-label="Message Claude"][contenteditable="true"]',
        'div.ProseMirror[contenteditable="true"]',
        'div[contenteditable="true"][role="textbox"]',
      ],
      conversation: "claude",
    },
    {
      id: "gemini",
      name: "Gemini",
      hosts: [/^gemini\.google\.com$/i],
      composers: [
        'div.ql-editor[contenteditable="true"][role="textbox"]',
        "rich-textarea [contenteditable='true']",
        '.ql-editor[contenteditable="true"]',
        '[contenteditable="true"][aria-label*="prompt" i]',
        'div[contenteditable="true"][role="textbox"]',
      ],
      conversation: "gemini",
    },
    {
      id: "grok",
      name: "Grok",
      hosts: [/^(grok\.x\.com|x\.ai)$/i, /^x\.com$/i],
      pathHint: /grok/i,
      composers: [
        'textarea[data-testid="grok-input"]',
        'textarea[placeholder*="Ask" i]',
        'textarea[placeholder*="Grok" i]',
        'div[contenteditable="true"][role="textbox"]',
        "textarea",
      ],
      conversation: "generic",
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      hosts: [/^chat\.deepseek\.com$/i],
      composers: [
        "#chat-input",
        'textarea[placeholder*="Send a message" i]',
        'textarea[placeholder*="Message" i]',
        'div[contenteditable="true"][role="textbox"]',
        "textarea",
      ],
      conversation: "generic",
    },
    {
      id: "perplexity",
      name: "Perplexity",
      hosts: [/^www\.perplexity\.ai$/i, /^perplexity\.ai$/i],
      composers: [
        '#ask-input',
        'textarea[placeholder*="Ask" i]',
        'div[contenteditable="true"][role="textbox"]',
        "textarea",
      ],
      conversation: "generic",
    },
    {
      id: "copilot",
      name: "Copilot",
      hosts: [/^copilot\.microsoft\.com$/i, /^www\.bing\.com$/i],
      composers: [
        "textarea#userInput",
        'textarea[data-testid="composer-input"]',
        'textarea[placeholder*="Message" i]',
        "#userInput",
        'div[contenteditable="true"][role="textbox"]',
      ],
      conversation: "generic",
    },
  ];

  function detectSite() {
    const host = location.hostname.replace(/^www\./, "");
    const path = location.pathname || "";
    for (const site of SITES) {
      const hostMatch = site.hosts.some((re) => re.test(host) || re.test(location.hostname));
      if (!hostMatch) continue;
      if (site.pathHint && site.id === "grok" && host.includes("x.com")) {
        if (!site.pathHint.test(path) && !site.pathHint.test(location.href)) continue;
      }
      return site;
    }
    return {
      id: "unknown",
      name: "this chat",
      hosts: [],
      composers: [
        'div[contenteditable="true"][role="textbox"]',
        'textarea[placeholder*="Message" i]',
        'textarea[placeholder*="Ask" i]',
        "textarea",
      ],
      conversation: "generic",
    };
  }

  function isVisible(el) {
    if (!(el instanceof Element)) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function queryFirst(selectors) {
    for (const selector of selectors) {
      let nodes;
      try {
        nodes = document.querySelectorAll(selector);
      } catch {
        continue;
      }
      for (const el of nodes) {
        if (isVisible(el)) return el;
      }
    }
    return null;
  }

  function getComposerElement(site) {
    const el = queryFirst(site.composers);
    if (el) return el;

    const editables = Array.from(
      document.querySelectorAll(
        'form [contenteditable="true"], main [contenteditable="true"], [role="textbox"][contenteditable="true"]'
      )
    ).filter(isVisible);
    return editables.length ? editables[editables.length - 1] : null;
  }

  function readFromElement(el) {
    if (!el) return "";
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
      return (el.value || "").trim();
    }
    return (el.innerText || el.textContent || "").trim();
  }

  function writeToElement(el, text) {
    if (!el) return false;
    el.focus();

    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
      el.value = text;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }

    try {
      document.execCommand("selectAll", false, null);
      document.execCommand("insertText", false, text);
    } catch {
      el.textContent = text;
    }
    el.dispatchEvent(
      new InputEvent("input", { bubbles: true, inputType: "insertText", data: text })
    );
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  function pushMessage(messages, role, content, limitChars = 1500) {
    const text = (content || "").trim();
    if (!text || text.length > 4000) return;
    messages.push({ role, content: text.slice(0, limitChars) });
  }

  function extractChatGPT(limit) {
    const messages = [];
    const nodes = document.querySelectorAll(
      'article[data-testid^="conversation-turn"], div[data-message-author-role]'
    );
    nodes.forEach((node) => {
      let role =
        node.getAttribute("data-message-author-role") ||
        node.querySelector("[data-message-author-role]")?.getAttribute("data-message-author-role");
      if (!role) {
        const testId = node.getAttribute("data-testid") || "";
        if (/user/i.test(testId)) role = "user";
        else if (/assistant|bot/i.test(testId)) role = "assistant";
      }
      if (role !== "user" && role !== "assistant") {
        role = messages.length % 2 === 0 ? "user" : "assistant";
      }
      const contentEl =
        node.querySelector(".markdown, .whitespace-pre-wrap, [class*='markdown']") || node;
      pushMessage(messages, role, contentEl.innerText || contentEl.textContent || "");
    });
    return messages.slice(-limit);
  }

  function extractClaude(limit) {
    const messages = [];
    const userNodes = document.querySelectorAll(
      '[data-testid="user-message"], .font-user-message, [class*="font-user"]'
    );
    const assistantNodes = document.querySelectorAll(
      '[data-testid="assistant-message"], .font-claude-response, [data-is-streaming]'
    );

    const combined = [];
    userNodes.forEach((n) => combined.push({ role: "user", node: n }));
    assistantNodes.forEach((n) => combined.push({ role: "assistant", node: n }));
    combined.sort((a, b) =>
      a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );

    if (combined.length) {
      combined.forEach(({ role, node }) => {
        pushMessage(messages, role, node.innerText || node.textContent || "");
      });
      return messages.slice(-limit);
    }

    return extractGeneric(limit);
  }

  function extractGemini(limit) {
    const messages = [];
    const turns = document.querySelectorAll(
      "user-query, model-response, .user-query, .model-response, [data-message-author-role]"
    );
    if (turns.length) {
      turns.forEach((node) => {
        const tag = (node.tagName || "").toLowerCase();
        let role = "assistant";
        if (tag.includes("user") || node.classList?.contains("user-query")) role = "user";
        const attr = node.getAttribute("data-message-author-role");
        if (attr === "user" || attr === "assistant") role = attr;
        pushMessage(messages, role, node.innerText || node.textContent || "");
      });
      return messages.slice(-limit);
    }
    return extractGeneric(limit);
  }

  function extractGeneric(limit) {
    const messages = [];
    const nodes = document.querySelectorAll(
      '[data-message-author-role], [data-role="user"], [data-role="assistant"], [class*="message"]'
    );
    nodes.forEach((node) => {
      let role =
        node.getAttribute("data-message-author-role") ||
        node.getAttribute("data-role") ||
        "";
      const cls = node.className?.toString?.() || "";
      if (!role) {
        if (/user|human/i.test(cls)) role = "user";
        else if (/assistant|bot|model|ai/i.test(cls)) role = "assistant";
      }
      if (role !== "user" && role !== "assistant") return;
      const text = (node.innerText || node.textContent || "").trim();
      if (text.length < 2 || text.length > 4000) return;
      // Skip composer itself
      if (node.getAttribute("contenteditable") === "true") return;
      pushMessage(messages, role, text);
    });
    return messages.slice(-limit);
  }

  function extractConversation(site, limit = 6) {
    switch (site.conversation) {
      case "chatgpt":
        return extractChatGPT(limit);
      case "claude":
        return extractClaude(limit);
      case "gemini":
        return extractGemini(limit);
      default:
        return extractGeneric(limit);
    }
  }

  window.VibePromptSites = {
    detectSite,
    getComposerElement,
    readFromElement,
    writeToElement,
    extractConversation,
    SITES,
  };
})();
