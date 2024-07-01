import { HomePageText } from "../Background/Background";
import React from "react";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel";
import { courses } from "../MockCourses/MockCourses";
import FooterApp from "../Footer/Footer";

    // Copias ordenadas del arreglo courses
  const bestRatedCourses = [...courses].sort((a, b) => b.rating - a.rating); // Ordenar por valoración
  const promotionCourses = [...courses].sort((a, b) => a.price - b.price); // Ordenar por precio (ascendente)
  const universityCourses = [...courses].sort((a, b) => a.platform.localeCompare(b.platform)); // Ordenar alfabéticamente por plataforma

function HomePage() {
  return (
    <>


      <HomePageText />
      {/*componente que integra: texto de presentacion, la imagen de einstein y la barra de navegacion*/}
      <div className="big-box">
        <ResponsiveCarousel courses={bestRatedCourses} text="Mejor valorados!" />
        <ResponsiveCarousel courses={promotionCourses} text="En promocion!" />
        <ResponsiveCarousel
          courses={universityCourses}
          text="Las mejores universidades promocionan en EINSTEIN"
        />
      </div> 
      <FooterApp />
    </>
  );
}

export default HomePage;
