import React, { useState } from 'react';
import './SearchBar.css'; 
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    navigate(`/search/${searchTerm}`); // Navega a la página de resultados
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