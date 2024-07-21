import axios from 'axios';

const BASE_URL = 'https://api.openai.com/v1';
const API_KEY = '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';

const encodeImage = async (imageData) => {
  try {
    console.log('Fetching image data...');
    const response = await fetch(imageData);
    const blob = await response.blob();
    console.log('Image data fetched, converting to Base64...');
    const base64String = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
    });
    console.log('Image successfully encoded to Base64');
    return base64String;
  } catch (error) {
    console.error('Error encoding image:', error);
    throw error;
  }
};

const describeImage = async (imageData) => {
  try {
    console.log('Starting image description process...');
    const base64Image = await encodeImage(imageData);
    console.log('Encoded image:', base64Image);

    console.log('Sending API request to describe image...');
    const response = await axios.post(
      `${BASE_URL}/chat/completions`,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: 'Analyze this image: ',
          },
          {
            role: 'user',
            content: {
              type: 'image_url',
              image_url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    console.log('API request successful:', response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error describing image:', error);
    throw new Error(`Error: ${error}`);
  }
};

export default {
  describeImage,
};