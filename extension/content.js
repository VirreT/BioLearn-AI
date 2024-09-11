// content.js

// Extract the body content of the page
const bodyContent = document.body.innerText;

// Print the content to the console
console.log(bodyContent);

// Optionally send the body content to the popup or background script if needed
chrome.runtime.sendMessage({content: bodyContent});
