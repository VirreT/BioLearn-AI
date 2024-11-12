require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Route to serve HTML content
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ChatGPT Proxy</title>
    </head>
    <body>
      <h1>Chat with ChatGPT</h1>
      
      <form id="chatForm">
        <label>
          Your Message:
          <input type="text" id="msg" placeholder="Type your message here" required>
        </label>
        <button type="submit">Send</button>
      </form>
      
      <h2>Response:</h2>
      <div id="output"></div> <!-- Div to display the response -->

      <script>
        // Event listener for form submission
        document.getElementById('chatForm').onsubmit = async function(event) {
          event.preventDefault();
          
          const message = document.getElementById('msg').value;
          const outputDiv = document.getElementById('output');
          
          // Display loading text while waiting for response
          outputDiv.textContent = 'Loading...';

          try {
            // Send POST request to /chat endpoint with user message
            const response = await fetch('/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }],
                max_tokens: 100
              })
            });

            if (!response.ok) {
              throw new Error('Failed to fetch response');
            }

            // Parse JSON response and display message content
            const data = await response.json();
            outputDiv.textContent = data.choices[0].message.content;

          } catch (error) {
            // Display error message if request fails
            outputDiv.textContent = 'Error: ' + error.message;
          }
        };
      </script>
    </body>
    </html>
  `);
});

// API endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  try {
    // Send request to OpenAI API with provided message
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Send OpenAI response back to the client
    res.json(response.data);

  } catch (error) {
    // Handle errors from OpenAI API
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
