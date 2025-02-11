document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('chatForm').onsubmit = async function(event) {
        event.preventDefault();
        const globalButton = document.getElementById("generateButton");
        const loading = document.getElementById("loading");

        globalButton.disabled = true;
        globalButton.style.display = "none";
        loading.style.display = "flex";

        const message = document.getElementById('msg').value;

        try {
            const response = await fetch('http://localhost:8080/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an experienced biology teacher for advanced highschool biology students. Respond to user inputs with a summary and a few bullet points to focus on. If you get a question go through it in steps and dont give the complete answer, hint towards it instead. Get rid of all text formatting in your response. Dont ask if the user wants to discuss the topic further, instead, ask the user a question about the topic. Use | instead of - in the key points part. If the request is not related to biology do not answer and instead mention that the request is not biology related. make the question in its own |.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: 1000,
                })
            })
            
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch response from API');
                }
                return response.json();
            })
            .then((data) => {
                const responseText = encodeURIComponent(data.choices[0].message.content);
                window.open(`/extension/textDisplay.html?response=${responseText}`, '_blank');
            })
            .catch((error) => {
                console.error('Error:', error.message);
                alert('Error: ' + error.message);
            });

        } catch (error) {
            outputDiv.textContent = 'Error: ' + error.message;
        }
    };
});