chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById('content').innerText = message.content;
});
