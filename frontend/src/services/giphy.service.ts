import type { Gif } from '../models/gif.model';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
interface GifsResponse {
  gifs: Gif[];
}

export async function fetchTrendingGifs(): Promise<Gif[]> {
  const response = await fetch(`${API_BASE_URL}/gifs/popular`);
  if (!response.ok) throw new Error('Failed to fetch trending GIFs');
  const data: GifsResponse = await response.json();
  return data.gifs;
}

export async function searchGifs(query: string): Promise<Gif[]> {
  const response = await fetch(`${API_BASE_URL}/gifs/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search GIFs');
  const data: GifsResponse = await response.json();
  return data.gifs;
}