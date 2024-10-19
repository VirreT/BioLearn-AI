// background.js

chrome.action.onClicked.addListener((tab) => {
    // Run content script when extension icon is clicked
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['extension/content.js']
    });
});


// Create a context menu option for highlighted text
chrome.contextMenus.create({
    id: "generateNotes",
    title: "Generate Notes from Highlighted Text",
    contexts: ["selection"]
});

  // Listen for when the user clicks the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "generateNotes" && info.selectionText) {
      // Send the highlighted text to content script
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: generateNotesFromSelection,
        args: [info.selectionText]
    });
    }
});

  // Function to be called in the content script
function generateNotesFromSelection(selectionText) {
    // Send selection to the popup or external API for note generation
    console.log("Selected text:", selectionText);
    // Call your AI API here with the selected text for notes generation
}
