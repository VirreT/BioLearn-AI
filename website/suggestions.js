const SUGGESTIONtext = [
    "Can you tell me about the cell organelles?",
    "What is the difference between plant and animal cells?",
    "What is the difference between prokaryotic and eukaryotic cells?",
    "Can you explain the process of photosynthesis?",
    "What are the stages of mitosis?",
    "How does DNA replication work?",
    "What are the functions of different types of RNA?",
    "Can you describe the structure of a cell membrane?",
    "What is the role of enzymes in biological reactions?",
    "How do genetic mutations occur?",
    "What is the function of the immune system?",
    "Can you explain the process of cellular respiration?",
    "What are the principles of Mendelian genetics?",
    "Can you describe the process of transcription and translation in protein synthesis?",
    "Can you explain the mechanisms of evolution and natural selection?",
    "What are the different types of cell signaling pathways?",
    "How do viruses infect cells?",
    "What is the function of the Golgi apparatus?",
    "Can you describe the process of meiosis?",
    "What are the different types of symbiotic relationships?",
    "How do plants adapt to their environment?",
    "What is the role of chloroplasts in plant cells?",
    "What are the different types of muscle tissues?",
    "How does the nervous system transmit signals?",
    "What is the function of the endocrine system?",
    "Can you describe the process of osmosis and diffusion?",
    "How do vaccines work?",
    "What are the different types of blood cells and their functions?",
    "Can you explain the process of gene expression?",
    "What is the role of mitochondria in energy production?",
    "How do antibiotics work?",
    "Can you describe the structure and function of antibodies?"
];

const SUGGESTIONheader = [
    "Tell me about the cell organelles 🧬",
    "What is the difference between plant and animal cells? 🌱🌿",
    "What is the difference between prokaryotic and eukaryotic cells? 🔬🦠",
    "Explain the process of photosynthesis ☀️🌿",
    "What are the stages of mitosis? 🔄🧬",
    "How does DNA replication work? 🧬🔄",
    "What are the functions of different types of RNA? 🧬🔬",
    "Describe the structure of a cell membrane 🧫🔬",
    "What is the role of enzymes in biological reactions? ⚗️🧬",
    "How do genetic mutations occur? 🧬🔬",
    "What is the function of the immune system? 🛡️🧬",
    "Explain the process of cellular respiration 🔋🧬",
    "What are the principles of Mendelian genetics? 🧬🌱",
    "Describe the process of transcription and translation in protein synthesis 🧬🔬",
    "Explain the mechanisms of evolution and natural selection 🌍🧬",
    "What are the different types of cell signaling pathways? 🔬🧬",
    "How do viruses infect cells? 🦠🔬",
    "What is the function of the Golgi apparatus? 📦🧬",
    "Describe the process of meiosis 🔄🧬",
    "What are the different types of symbiotic relationships? 🤝🌿",
    "How do plants adapt to their environment? 🌿🌱",
    "What is the role of chloroplasts in plant cells? 🌿☀️",
    "What are the different types of muscle tissues? 💪🧬",
    "How does the nervous system transmit signals? 🧠🔬",
    "What is the function of the endocrine system? 🩺🧬",
    "Describe the process of osmosis and diffusion 💧🔬",
    "How do vaccines work? 💉🛡️",
    "What are the different types of blood cells and their functions? 🩸🧬",
    "Explain the process of gene expression 🧬🔬",
    "What is the role of mitochondria in energy production? 🔋🧬",
    "How do antibiotics work? 💊🦠",
    "Describe the structure and function of antibodies 🛡️🧬"
];

var suggestionindex = Math.floor(Math.random() * SUGGESTIONtext.length)
var randomSuggestiontext = SUGGESTIONtext[suggestionindex];
var randomSuggestionheader = SUGGESTIONheader[suggestionindex];

window.onload = function() {
    var msgElement = document.getElementById("msg");
    var headerElement = document.getElementById("topHeader");
    msgElement.value = randomSuggestiontext;
    headerElement.innerText = "";
    typeWriter(headerElement, randomSuggestionheader);
    addGlowingEffect(headerElement);
    setTimeout(function() {
        msgElement.style.color = 'white';
    }, 0);
};