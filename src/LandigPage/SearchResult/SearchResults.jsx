import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../MockCourses/MockCourses';
import { ProductCard } from '../Carousel/Card/ProductCard';
import SearchBar from '../SearchBar/SearchBar';
import './SearchResults.css';

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      const filteredResults = courses.filter(course => {
        // Busca por título
        const normalizedTitle = course.title.toLowerCase();
        if (normalizedTitle.includes(normalizedSearchTerm)) {
          return true;
        }

        // Busca por topics
        const foundInTopics = course.topics.some(topic =>
          topic.toLowerCase().includes(normalizedSearchTerm)
        );
        if (foundInTopics) {
          return true;
        }

        return false;
      });

      setSearchResults(filteredResults);
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
            searchResults.map(course => (
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
