console.log("[Dead Internet Bot] content script loaded");

function getShortInfo() {
  const isShort = window.location.href.includes("youtube.com/shorts/");
  const title =
    document.title ||
    document.querySelector("h1")?.innerText ||
    "Unknown title";

  return {
    isShort,
    title,
    url: window.location.href
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SHORT_INFO") {
    sendResponse(getShortInfo());
  }
});