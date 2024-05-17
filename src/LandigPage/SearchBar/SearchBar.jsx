import React, { useState } from 'react';
import './SearchBar.css'; 

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div>
       <input
        type="text"
        placeholder="Que te gustaria aprender?"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button> 
      </div>
      
      
    </form>
  );
}

export default SearchBar;