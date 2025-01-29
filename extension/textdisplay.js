window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get('response');

    const responseContainer = document.getElementById('responseContainer');

    if (response) {
        const decodedResponse = decodeURIComponent(response);
        
        const splitResponse = decodedResponse.split('|').map(str => str.trim()).filter(str => str !== '');

        const ul = document.createElement('ul');

        ul.style.listStyleType = 'disc';

        const firstPart = splitResponse.shift();

        const firstPartText = document.createElement('p');

        firstPartText.textContent = firstPart;

        responseContainer.appendChild(firstPartText);

        splitResponse.forEach((text) => {
            const li = document.createElement('li');
            li.textContent = text; 
            ul.appendChild(li); 
        });

        responseContainer.appendChild(ul);
    } else {
        responseContainer.textContent = `No response available: "${console.error()}"`;
        ;
    }
});

document.getElementById("copybtn").addEventListener("click", function() {
    var copyText = document.getElementById("responseContainer").textContent;

    navigator.clipboard.writeText(copyText)
        .then(function() {
            alert("Copied To Clipboard!");
        })
        .catch(function(error) {
            alert("Failed to copy text: " + error);
        });
});

