document.querySelector('button').addEventListener('click', function(){
    const textToCopy = document.getElementById("output").textContent;
    textToCopy.select();
    navigator.clipboard.writeText(textToCopy);
    alert("text copied");
});