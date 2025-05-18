import { useState, useEffect } from 'react';
import GifGrid from './components/GifGrid';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import { fetchTrendingGifs, searchGifs } from './services/giphy.service';
import './App.css';

import type { Gif } from './models/gif.model';

function App() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGifsData();
  }, []);

  const fetchGifsData = async (search = '') => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      let fetchedGifs: Gif[];
      
      if (search) {
        fetchedGifs = await searchGifs(search);
      } else {
        fetchedGifs = await fetchTrendingGifs();
      }
      
      setGifs(fetchedGifs);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
      setGifs([]);
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Network Error')) {
          setError('Cannot connect to server. Please check your internet connection.');
        } else if (error.message.includes('404')) {
          setError('The requested GIFs could not be found.');
        } else if (error.message.includes('403')) {
          setError('Access denied. API key may be invalid.');
        } else {
          setError(`Failed to load GIFs: ${error.message}`);
        }
      } else {
        setError('Failed to load GIFs. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    fetchGifsData(term);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GIF Browser</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main className="app-content">
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <Loader />
        ) : (
          <GifGrid gifs={gifs} />
        )}
      </main>
    </div>
  );
}

export default App;