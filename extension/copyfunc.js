document.getElementById("copybtn").addEventListener("click", function(){
    var copyText = document.getElementById("responseContainer");

    copyText.select();

    navigator.clipboard.writeText(copyText.value);

    alert("Copied To Clipboard!")
});