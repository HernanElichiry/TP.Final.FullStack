import { useEffect, useState } from "react";
import { HomePageText } from "../Background/Background";
import React from "react";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel";
//import { courses } from "../MockCourses/MockCourses";
import FooterApp from "../Footer/Footer";
import Testimonials from "../Components/Testimonials";
import Description from "../Components/Description";
import FAQ from "../Components/FAQ";
import InfoSection from "../Components/InfoSection";
import Jobs from "../Components/Jobs";
import SubscriptionSection from "../Components/SuscriptionSection";
import Banner from "../Components/Banner";
import TrustSection from "../Components/EnterpriseSection";

  //   // Copias ordenadas del arreglo courses
  // const bestRatedCourses = [...courses].sort((a, b) => b.rating - a.rating); // Ordenar por valoración
  // const promotionCourses = [...courses].sort((a, b) => a.price - b.price); // Ordenar por precio (ascendente)
  // const universityCourses = [...courses].sort((a, b) => a.platform.localeCompare(b.platform)); // Ordenar alfabéticamente por plataforma
    // Efecto para obtener los cursos de la API
     // Estado para almacenar los cursos

function HomePage() {
  // Estado para almacenar los cursos
  const [courses, setCourses] = useState([]);
  const [bestRatedCourses, setBestRatedCourses] = useState([]);
  const [promotionCourses, setPromotionCourses] = useState([]);
  const [universityCourses, setUniversityCourses] = useState([]);

   useEffect(() => {
     const fetchCourses = async () => {
       try {
         const response = await fetch("http://localhost:3000/courses"); // URL de la API
         const data = await response.json();
         setCourses(data);
 
 
         // Ordenar las copias de los cursos
        // setBestRatedCourses([...data].sort((a, b) => b.rating - a.rating));
         setPromotionCourses([...data].sort((a, b) => a.price - b.price));
         setUniversityCourses([...data].sort((a, b) => a.platform.localeCompare(b.platform)));
       } catch (error) {
         console.error("Error al obtener los cursos:", error);
       }
     };
 
     fetchCourses();
   }, []); // Se ejecuta una vez al montar el componente

  return (
    <>
      <HomePageText />
      {/*componente que integra: texto de presentacion, la imagen de einstein y la barra de navegacion*/}
      <div className="big-box">
        <Description></Description>
        <TrustSection></TrustSection>
        <InfoSection></InfoSection> 
        {/* <ResponsiveCarousel courses={bestRatedCourses} text=" Carreras mejor valorados" />
        */}
        <ResponsiveCarousel courses={promotionCourses} text=" Cursos en promocion" />
        {/* <ResponsiveCarousel
          courses={universityCourses}
          text="Las mejores universidades promocionan en EINSTEIN"
      
        />   */}
        <Jobs></Jobs>
        <SubscriptionSection></SubscriptionSection>
        <Testimonials></Testimonials>
      </div>
   
      <FAQ></FAQ>
      <FooterApp />
    </>
  );
}

export default HomePage;
