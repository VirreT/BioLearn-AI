function copyText(){
    var copyText = document.getElementById("responseContainer");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    alert("Text Copied!")

}