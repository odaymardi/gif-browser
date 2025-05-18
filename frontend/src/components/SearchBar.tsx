import { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for GIFs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;