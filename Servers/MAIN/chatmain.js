
document.getElementById('chatForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const message = document.getElementById('message').value;
    const responseOutput = document.getElementById('responseOutput');

    // Clear previous response
    responseOutput.textContent = 'Loading...';

    try {
        const response = await fetch('http://localhost:8080/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: message }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Output the response from the server to the user
        responseOutput.textContent = data.choices[0].message.content;

    } catch (error) {
        // Output the error message
        responseOutput.textContent = `Error: ${error.message}`;
    }
});