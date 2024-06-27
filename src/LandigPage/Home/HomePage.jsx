import { HomePageText } from "../Background/Background";
import React from "react";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel";
import { courses } from "../MockCourses/MockCourses";
import FooterApp from "../Footer/Footer";

function HomePage() {
  return (
    <>
      <HomePageText />
      {/*componente que integra: texto de presentacion, la imagen de einstein y la barra de navegacion*/}
      <div className="big-box">
        <ResponsiveCarousel courses={courses} text="Mejor valorados!" />
        <ResponsiveCarousel courses={courses} text="En promocion!" />
        <ResponsiveCarousel
          courses={courses}
          text="Las mejores universidades promocionan en EINSTEIN"
        />
      </div>
      <FooterApp />
    </>
  );
}

export default HomePage;
