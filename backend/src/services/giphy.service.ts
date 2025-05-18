import { cache } from '../utils/cache';
import { config } from '../config';
import axios from 'axios';
import { formatGifList } from '../utils/gifFormatter';
import logger from '../lib/logger';

export const axiosInstance = axios.create({
  baseURL: config.giphyBaseUrl,
  timeout: 5000,
});

export async function fetchTrendingGifs(limit = 12, offset = 0) {
  const cacheKey = `trending-${limit}-${offset}`;
  const cached = cache.get(cacheKey);

  if (cached) return cached;

  const { data } = await axiosInstance.get('/gifs/trending', {
    params: {
      api_key: config.giphyApiKey,
      limit,
      offset,
    },
  });
  logger.info({data}, 'Fetched trending GIFs from Giphy API');

  const formatted = formatGifList(data.data);
  cache.set(cacheKey, formatted);
  return formatted;
}

export async function searchGifs(query: string, limit = 12, offset = 0) {
  const cacheKey = `search-${query}-${limit}-${offset}`;
  const cached = cache.get(cacheKey);

  if (cached) return cached;

  const { data } = await axiosInstance.get('/gifs/search', {
    params: {
      api_key: config.giphyApiKey,
      q: query,
      limit,
      offset,
    },
  });
  logger.info({data}, 'Fetched trending GIFs from Giphy API');
  
  const formatted = formatGifList(data.data);
  cache.set(cacheKey, formatted);
  return formatted;
}
