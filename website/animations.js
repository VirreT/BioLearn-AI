window.addEventListener('load', function() {
    var loadingText = document.getElementById("loadingText");
    var dots = 0;
    setInterval(function() {
        dots = (dots + 1) % 4;
        loadingText.innerText = "Generating Response" + ".".repeat(dots);
    }, 500);
});


function typeWriter(element, text, delay = 70) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    type();
}

function addGlowingEffect(element) {
    element.style.position = 'relative';
    element.style.animation = 'glow 2s infinite';
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes glow {
    0% {
        text-shadow: 0 0 5px #086c34, 0 0 10px #086c34, 0 0 15px #086c34, 0 0 20px #086c34, 0 0 25px #086c34, 0 0 30px #086c34;
    }
    100% {
        text-shadow: 0 0 10px #086c34, 0 0 15px #086c34, 0 0 20px #086c34, 0 0 25px #086c34, 0 0 30px #086c34, 0 0 35px #086c34;
    }
}
`;
document.head.appendChild(style);