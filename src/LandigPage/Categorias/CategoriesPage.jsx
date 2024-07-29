import React from "react";
import { useParams } from "react-router-dom";
import { courses } from "../MockCourses/MockCourses";
import { ProductCard } from "../Carousel/Card/ProductCard"; 
import './categoriesRow.css'; // Asegúrate de importar el archivo CSS

function CategoriesPage() {
  const { categoryName } = useParams();
  const filteredCourses = courses.filter((course) => course.category === categoryName);

  return (
    <div className="search-results">
      <div className="product-list">
        {filteredCourses.map(course => (
          <ProductCard key={course.id} product={course} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
