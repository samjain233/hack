chrome.tabs.onUpdated.addListener((tabId, tab) => {
  const data = localStorage.getItem("userHack");
  console.log(data);
  if (tab.url) {
    console.log(tab.url);
    chrome.tabs.sendMessage(tabId, {
      url: tab.url,
    });
  }
});
