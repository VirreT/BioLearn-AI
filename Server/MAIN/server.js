require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../website/mainPage.html/'));
});

app.post('/chat', async (req, res) => {
  try {
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

    res.json(response.data);

  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
