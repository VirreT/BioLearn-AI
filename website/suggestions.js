const SUGGESTIONS = [
    "Can you tell me about the cell organelles? 🧬",
    "What is the difference between plant and animal cells? 🌱🌿",
    "What is the difference between prokaryotic and eukaryotic cells? 🔬🦠",
    "Can you explain the process of photosynthesis? ☀️🌿",
    "What are the stages of mitosis? 🔄🧬",
    "How does DNA replication work? 🧬🔄",
    "What are the functions of different types of RNA? 🧬🔬",
    "Can you describe the structure of a cell membrane? 🧫🔬",
    "What is the role of enzymes in biological reactions? ⚗️🧬",
    "How do genetic mutations occur? 🧬🔬",
    "What is the function of the immune system? 🛡️🧬",
    "Can you explain the process of cellular respiration? 🔋🧬",
    "What are the principles of Mendelian genetics? 🧬🌱",
    "Can you describe the process of transcription and translation in protein synthesis? 🧬🔬",
    "Can you explain the mechanisms of evolution and natural selection? 🌍🧬",
    "What are the different types of cell signaling pathways? 🔬🧬",
    "How do viruses infect cells? 🦠🔬",
    "What is the function of the Golgi apparatus? 📦🧬",
    "Can you describe the process of meiosis? 🔄🧬",
    "What are the different types of symbiotic relationships? 🤝🌿",
    "How do plants adapt to their environment? 🌿🌱",
    "What is the role of chloroplasts in plant cells? 🌿☀️",
    "What are the different types of muscle tissues? 💪🧬",
    "How does the nervous system transmit signals? 🧠🔬",
    "What is the function of the endocrine system? 🩺🧬",
    "Can you describe the process of osmosis and diffusion? 💧🔬",
    "How do vaccines work? 💉🛡️",
    "What are the different types of blood cells and their functions? 🩸🧬",
    "Can you explain the process of gene expression? 🧬🔬",
    "What is the role of mitochondria in energy production? 🔋🧬",
    "How do antibiotics work? 💊🦠",
    "Can you describe the structure and function of antibodies? 🛡️🧬"
];

var randomSuggestion = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];

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

window.onload = function() {
    var msgElement = document.getElementById("msg");
    var headerElement = document.getElementById("topHeader");
    msgElement.value = randomSuggestion;
    headerElement.innerText = "";
    typeWriter(headerElement, randomSuggestion);
    addGlowingEffect(headerElement);
    setTimeout(function() {
        msgElement.style.color = 'white';
    }, 0);
};