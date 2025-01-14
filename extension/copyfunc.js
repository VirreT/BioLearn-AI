function copyText() {
    // Get the content of the response container
    var textToCopy = document.getElementById("responseContainer").innerText;

    // Create a temporary text area to select the text
    var textArea = document.createElement("textarea");
    textArea.value = textToCopy; // Set the text area content to the text to copy
    document.body.appendChild(textArea); // Append the text area to the document
    textArea.select(); // Select the content inside the text area
    document.execCommand("copy"); // Copy the selected content to clipboard
    document.body.removeChild(textArea); // Remove the text area after copying

    // Optional: Alert the user or change button text to show that text has been copied
    alert("Copied to clipboard!");
}
