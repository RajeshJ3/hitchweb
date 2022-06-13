chrome.action.onClicked.addListener(function (tab) {
  let url = chrome.runtime.getURL("build/index.html");
  chrome.tabs.create({ url });
});
