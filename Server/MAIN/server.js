require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../website/mainPage.html'));
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
