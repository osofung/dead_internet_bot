if (window.__deadInternetBotLoaded) {
  console.log("[Dead Internet Bot] already loaded");
} else {
  window.__deadInternetBotLoaded = true;

  console.log("[Dead Internet Bot] content script loaded");

  let lastUrl = location.href;

  function isShortsPage() {
    return location.href.includes("youtube.com/shorts/");
  }

  function getShortInfo() {
    const title =
      document.title ||
      document.querySelector("h1")?.innerText ||
      "Unknown title";

    return {
      isShort: isShortsPage(),
      title,
      url: location.href
    };
  }

  function fetchPageData() {
    if (!isShortsPage()) return;
    const info = getShortInfo();
    console.log("[Dead Internet Bot] fetched page data:", info);
  }

  function handlePossiblePageChange() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      console.log("[Dead Internet Bot] URL changed:", lastUrl);
      fetchPageData();
    }
  }

  fetchPageData();

  const observer = new MutationObserver(() => {
    handlePossiblePageChange();
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "PING") {
      sendResponse({ ok: true });
      return;
    }

    if (message.type === "GET_SHORT_INFO") {
      sendResponse(getShortInfo());
    }
  });
}