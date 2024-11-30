import { useEffect, useState } from "react";
import { HomePageText } from "../Background/Background";
import ResponsiveCarousel from "../Carousel/ResponsiveCarousel";
import FooterApp from "../Footer/Footer";
import Testimonials from "../Components/Testimonials";
import Description from "../Components/Description";
import FAQ from "../Components/FAQ";
import Jobs from "../Components/Jobs";
import SubscriptionSection from "../Components/SuscriptionSection";
import TrustSection from "../Components/EnterpriseSection";
import InfoSection from "../Components/InfoSection";


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
  const [einsteinCourses, setEinsteinCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses"); // URL de la API
        const data = await response.json();
        setCourses(data);

        //Cursos solo de Einstein 
        setEinsteinCourses(data.filter(course => course.platform === "Einstein")
         .sort(() => Math.random() - 0.5));

        // Ordenar las copias de los cursos
        setBestRatedCourses([...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10)
        );
        setPromotionCourses(data.filter(course => course.price == 0));
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
     
      <ResponsiveCarousel courses={einsteinCourses} text=" Cursos de Einstein" />
      <InfoSection></InfoSection>
      <Description></Description>
      
      
      {/*componente que integra: texto de presentacion, la imagen de einstein y la barra de navegacion*/}
      <div className="big-box">
        <ResponsiveCarousel courses={bestRatedCourses} text=" Mejor valorados" />
        <ResponsiveCarousel courses={promotionCourses} text=" Gratis! Gratis! Gratis!" />
        
        <ResponsiveCarousel
          courses={universityCourses}
          text="Capacitaciones unicas de EINSTEIN"
        />
        
       
        {/*<TrustSection></TrustSection> */}
        {/*<Jobs></Jobs>*/}
        <SubscriptionSection></SubscriptionSection>
        <Testimonials></Testimonials>
      </div>

      <FAQ></FAQ>
      <FooterApp />
    </>
  );
}

export default HomePage;
