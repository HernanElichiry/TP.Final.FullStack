import { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function SearchBar({ className = "search-bar" }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      message.warning("Por favor, ingresa un término de búsqueda."); // Muestra el mensaje de advertencia
      return;
    }
    navigate(`/search/${searchTerm}`); // Navega a la página de resultados
  };

  return (
    <form className={className}onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="¿Qué te gustaría aprender?"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
