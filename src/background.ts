let isInitialized = false;

chrome.action.onClicked.addListener((tab) => {
  if (typeof tab.id !== 'number') return;

  // Only inject on the first click.
  if (!isInitialized) {
    isInitialized = true;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js'],
    });
  }
});
