import React, { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ className = "search-bar" }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`); // Navega a la página de resultados
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="¿Qué te gustaría aprender?"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </div>
    </form>
  );
}

export default SearchBar;
