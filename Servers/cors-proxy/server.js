require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

const openaiApiKey = process.env.OPENAI_API_KEY;

// Debug: Check if API key is loaded correctly
console.log('OpenAI API Key:', openaiApiKey);

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Welcome to the ChatGPT API Proxy!'); // Response for the root path
});

app.post('/chat', async (req, res) => {
  try {
    if (!openaiApiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Log the incoming request body
    console.log('Received request body:', req.body);

    // Forward the request to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    });

    // Send the OpenAI API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error from OpenAI API:', error.response ? error.response.data : error.message);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(port,  () => {
  console.log(`CORS proxy server running at http://localhost:${port}`);
});
