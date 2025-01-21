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
