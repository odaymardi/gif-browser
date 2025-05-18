import { Request, Response } from 'express';
import { fetchTrendingGifs, searchGifs } from '../services/giphy.service';
import logger from '../lib/logger';
import { searchSchema, paginationSchema } from '../validators/gif.validator';

export async function getTrendingGifs(req: Request, res: Response) {
  const parsed = paginationSchema.safeParse(req.query);

  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, 'Invalid pagination input');
    res.status(400).json({ error: 'Invalid query parameters', details: parsed.error.flatten() });
    return;
  }

  const { limit, offset } = parsed.data;

  logger.info({ limit, offset }, 'Fetching trending GIFs');

  try {
    const gifs = await fetchTrendingGifs(limit, offset);
    res.json({ gifs });
  } catch (err) {
    logger.error({ err }, 'Failed to fetch trending GIFs');
    res.status(500).json({ error: 'Failed to fetch trending GIFs' });
  }
}


export async function searchGifsHandler(req: Request, res: Response) {
  const parsed = searchSchema.safeParse(req.query);

  if (!parsed.success) {
    logger.warn({ errors: parsed.error.flatten() }, 'Invalid search input');
    res.status(400).json({ error: 'Invalid search query', details: parsed.error.flatten() });
    return;
  }

  const { q, limit, offset } = parsed.data;

  logger.info({ q, limit, offset }, 'Searching GIFs');

  try {
    const gifs = await searchGifs(q, limit, offset);
    res.json({ gifs });
  } catch (err) {
    logger.error({ err }, 'GIF search failed');
    res.status(500).json({ error: 'Search failed' });
  }
}

