// background.js

chrome.action.onClicked.addListener((tab) => {
    // Run content script when extension icon is clicked
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['extension/content.js']
    });
});
