import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../Carousel/Card/ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import "./SearchResults.css";

const SearchResults = () => {
  const { searchTerm } = useParams(); // Obtiene el término de búsqueda desde la URL
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar la carga
  const [error, setError] = useState(null); // Estado para almacenar errores
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        console.log("Término de búsqueda:", searchTerm);
        setIsLoading(true); // Indica que la carga ha comenzado
        try {
          const response = await fetch(
            `http://localhost:3000/courses/search?term=${encodeURIComponent(
              searchTerm
            )}`
          );
          if (!response.ok) throw new Error("Error al buscar cursos");

          const data = await response.json(); // Convierte la respuesta a JSON
          setSearchResults(data); // Actualiza los resultados de búsqueda con los datos del backend
        } catch (error) {
          console.error("Error al obtener los resultados de búsqueda:", error);
          setError("No se pudieron cargar los resultados de búsqueda");
        } finally {
          setIsLoading(false); // Finaliza la carga
        }
      } else {
        setSearchResults([]); // Si no hay término de búsqueda, se limpia la lista de resultados
      }
    };

    fetchSearchResults(); // Llama a la función
  }, [searchTerm]);

  return (
    <>
      <SearchBar className="search-page" />
      <div className="search-results">
        <div className="product-list">
          {isLoading ? (
            <p>Cargando resultados...</p>
          ) : error ? (
            <p>{error}</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((course) => (
              <ProductCard key={course.id} product={course} />
            ))
          ) : (
            <p>No se encontraron resultados para "{searchTerm}".</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
