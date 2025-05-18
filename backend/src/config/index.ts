import dotenv from 'dotenv';

dotenv.config();

export const config = {
  giphyApiKey: process.env.GIPHY_API_KEY || '',
  giphyBaseUrl: process.env.GIPHY_API_BASE_URL || 'https://api.giphy.com/v1/gifs'
};
