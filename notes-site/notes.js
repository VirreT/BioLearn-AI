document.querySelector('button').addEventListener('click', function(){
    const textToCopy = document.getElementById("output").textContent;
    navigator.clipboard.writeText(textToCopy);
    alert("text copied");
});