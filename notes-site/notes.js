document.querySelector('button').addEventListener('click', function(){
    navigator.clipboard.writeText(document.getElementById("output").value);
    alert(document.getElementById("output").value);
});