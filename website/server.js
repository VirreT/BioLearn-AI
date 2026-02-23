require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 8080;

// Increase JSON body size to accept larger HTML payloads from the extension
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
// Allow CORS so extension popup can call the API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    return res.sendStatus(200);
  }
  next();
});
// Serve website files at root
app.use(express.static(__dirname));
// Serve top-level project assets at /assets
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
// Serve extension files at /extension (so /extension/textdisplay.html loads)
app.use('/extension', express.static(path.join(__dirname, '..', 'extension')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'mainPage.html'));
});

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      req.body,
      {
        timeout: 60000,
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    try {
      const truncated = JSON.stringify(response.data).slice(0, 2000);
      console.log('OpenAI response (truncated):', truncated);
    } catch (e) {}

    res.json(response.data);

  } catch (error) {
    console.error('OpenAI request error status:', error.response?.status);
    console.error('OpenAI response data:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: error.message };
    res.status(status).json(data);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
