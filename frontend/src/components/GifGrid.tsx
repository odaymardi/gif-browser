import './GifGrid.css';
import GifCard from './GifCard';

import type { FC } from 'react';
import type { Gif } from '../models/gif.model';

interface GifGridProps {
  gifs: Gif[];
}

const GifGrid: FC<GifGridProps> = ({ gifs }) => {
  return (
    <div className="gif-grid">
      {gifs.length > 0 ? (
        gifs.map((gif) => (
          <GifCard
            key={gif.id}
            imageUrl={gif.image.preview || gif.image.original || 'placeholder.jpg'} 
            title={gif.title}
          />
        ))
      ) : (
        <p className="no-results">No GIFs found. Try another search term.</p>
      )}
    </div>
  );
};

export default GifGrid;