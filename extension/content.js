// content.js

// Function to extract all visible text from the webpage
function extractText() {
    return document.body.innerText;
}

// Send the extracted text to the background or popup for further use
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        sendResponse({ text: extractText() });
    }
});
