window.onload = function() {
    var loadingText = document.getElementById("loadingText");
    var dots = 0;
    setInterval(function() {
        dots = (dots + 1) % 4;
        loadingText.innerText = "Generating Response" + ".".repeat(dots);
    }, 500);
};