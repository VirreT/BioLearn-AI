// textDisplay.js
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get('response');

    const responseContainer = document.getElementById('responseContainer');

    if (response) {
        // Decode and split the response by the pipe (|) character
        const decodedResponse = decodeURIComponent(response);
        const splitResponse = decodedResponse.split('|').map(str => str.trim()).filter(str => str !== '');

        // Create a UL element
        const ul = document.createElement('ul');
        ul.style.listStyleType = 'disc'; // Set list style to bullet points

        // Append the first part as plain text (without a list item)
        const firstPart = splitResponse.shift(); // Get the first element and remove it from the array
        const firstPartText = document.createElement('p');
        firstPartText.textContent = firstPart; // Add the first part as a paragraph
        responseContainer.appendChild(firstPartText); // Append it to the container

        // Create LI elements for the remaining parts
        splitResponse.forEach((text) => {
            const li = document.createElement('li');
            li.textContent = text; // Set the content of the LI
            ul.appendChild(li); // Append the LI to the UL
        });

        // Append the UL to the response container
        responseContainer.appendChild(ul);
    } else {
        responseContainer.textContent = `No response available: "${console.error()}"`;
        ;
    }
});
