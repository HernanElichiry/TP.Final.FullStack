import React from "react";
import { useParams } from "react-router-dom";

import { courses } from "../MockCourses/MockCourses"; 
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel";



function CategoriesPage() {
  const { categoryName } = useParams();

  const filteredCourses = courses.filter((course) => course.category === categoryName);

  return (
    <>
      <ResponsiveCarousel courses={filteredCourses} text={`Cursos de ${categoryName}`} />
    </>
  );
}

export default CategoriesPage;