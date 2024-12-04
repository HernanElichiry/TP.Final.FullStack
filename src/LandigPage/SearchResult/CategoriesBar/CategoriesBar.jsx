import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoriesBar.css"; // Archivo CSS para estilos

const CategoriesBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories"); // Ajusta la URL según tu API
        if (!response.ok) throw new Error("Error al traer las categorías");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="categories-navbar">
     
      <div className="categories-container">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/search/${category.name}`}
            className="category-item"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesBar;