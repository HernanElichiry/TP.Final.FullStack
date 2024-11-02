import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../MockCourses/MockCourses";
import { ProductCard } from "../Carousel/Card/ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import "./SearchResults.css";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/courses/search?term=${searchTerm}`
        );

        console.log(searchTerm);

        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("error fetching search results", error);
        setSearchResults([]);
      }
    };
    if (searchTerm && searchTerm.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <SearchBar className="search-page" />
      <div className="search-results">
        <div className="product-list">
          {searchResults.length > 0 ? (
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
