// When the user clicks the button in the popup
document.getElementById("extractText").addEventListener("click", () => {
    // Query the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Inject the content script into the active tab
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          // Extract text from the page
        return document.body.innerText;
        },
    }, (results) => {
        // Display the extracted text in the popup
        console.log(results[0].result);
    });
    });
});