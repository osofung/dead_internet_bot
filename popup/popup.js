const button = document.getElementById("checkBtn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  result.textContent = "Checking current tab...";

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  if (!tab || !tab.id) {
    result.textContent = "No active tab found.";
    return;
  }

  if (!tab.url || !tab.url.includes("youtube.com/shorts/")) {
    result.textContent = "This is not a YouTube Shorts page.";
    return;
  }

  function requestShortInfo() {
    chrome.tabs.sendMessage(tab.id, { type: "GET_SHORT_INFO" }, (response) => {
      if (chrome.runtime.lastError) {
        result.textContent =
          "Could not connect to content script.\nTry refreshing the page.";
        return;
      }

      if (!response) {
        result.textContent = "No response from page.";
        return;
      }

      result.textContent =
        `Shorts detected: ${response.isShort ? "Yes" : "No"}\n\n` +
        `Title: ${response.title}\n\n` +
        `URL: ${response.url}`;
    });
  }

  chrome.tabs.sendMessage(tab.id, { type: "PING" }, async (response) => {
    if (chrome.runtime.lastError || !response?.ok) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });

        requestShortInfo();
      } catch (error) {
        result.textContent = `Failed to load content script: ${error.message}`;
      }

      return;
    }

    requestShortInfo();
  });
});