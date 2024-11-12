require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

const openaiApiKey = process.env.OPENAI_API_KEY;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve the HTML content on the root path
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ChatGPT API Proxy Example</title>
    </head>
    <body>
        <h1>Chat with ChatGPT</h1>

        <form id="chatForm">
            <label for="message">Your Message:</label>
            <input type="text" id="message" name="message" required>
            <button type="submit">Send</button>
        </form>

        <h2>Response:</h2>
        <div id="responseOutput"></div> <!-- Where the response will be displayed -->

        <script>
            document.getElementById('chatForm').addEventListener('submit', async function(event) {
                event.preventDefault();

                const message = document.getElementById('message').value;
                const responseOutput = document.getElementById('responseOutput');

                // Clear previous response
                responseOutput.textContent = 'Loading...';

                try {
                    const response = await fetch('/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            model: 'gpt-4',
                            messages: [{ role: 'user', content: message }],
                            max_tokens: 100
                        })
                    });

                    if (!response.ok) {
                        throw new Error(\`HTTP error! Status: \${response.status}\`);
                    }

                    const data = await response.json();

                    // Output the response from the server to the user
                    responseOutput.textContent = data.choices[0].message.content;

                } catch (error) {
                    // Output the error message
                    responseOutput.textContent = \`Error: \${error.message}\`;
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Endpoint for handling chat requests to the OpenAI API
app.post('/chat', async (req, res) => {
  try {
    if (!openaiApiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const { model, messages, max_tokens } = req.body;

    // Forward the request to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', { model, messages, max_tokens }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      }
    });

    // Send the OpenAI API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error from OpenAI API:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
