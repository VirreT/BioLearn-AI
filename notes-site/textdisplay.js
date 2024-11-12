const urlParams = new URLSearchParams(window.location.search);
        const extractedText = urlParams.get('text');
        document.getElementById("output").innerText = extractedText || "No text found.";

document.querySelector('button').addEventListener('click', function(){
    const textToCopy = document.getElementById("output").textContent;
    navigator.clipboard.writeText(textToCopy);
    alert("text copied");
});