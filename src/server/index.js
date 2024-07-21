const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const port = 8000;

const upload = multer();

app.use(express.json());

app.post('/analyze-image', upload.single('image'), async (req, res) => {
  // Mock call to ChatGPT-4.0 API for image analysis
  try {
    const response = await axios.post('https://chatgpt-api-url', { image: req.file.buffer });
    const analysis = response.data.analysis;
    const healthiness = response.data.healthiness;
    res.json({ analysis, healthiness });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
