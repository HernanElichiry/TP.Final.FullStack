import { useContext } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from './Card/ProductCard';
import './Card/ProductCard.css'; // Estilos para ProductCard y el carrusel
import { FavoritesContext } from '../User/FavoritesContext'; // Importar el contexto de favoritos
import { useUser } from '../User/UserContext/UserContext';

function ResponsiveCarousel({ courses, text = "inserte texto" }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const {user} = useUser();


  var settings = {
    dots: true,
    infinite: courses.length > 4, // Desactivar el carrusel infinito si hay menos de 4 elementos
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Eliminar las flechas de navegación
    autoplay: false, // Hacer que las diapositivas se deslicen automáticamente
    // Velocidad de la transición automática en milisegundos
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: courses.length > 1, // Aplica también aquí la condición
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: courses.length > 3, // Evitar repeticiones en caso de menos de 3 elementos
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: courses.length > 2, // Evitar repeticiones en caso de menos de 2 elementos
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: courses.length > 1, // Evitar repeticiones en caso de menos de 2 elementos
        },
      },
    ],
  };

  return (
    <div className="slider-align">
      <div className="slider-container">
        <h2 className="Slider-description">{text}</h2>
        <Slider {...settings}>
          {courses.map((course) => (
            
            <ProductCard
              key={course.id}
              product={course}
              onFavoriteToggle={user ? toggleFavorite : null}
              isFavorited={user ? favorites.some((fav) => fav.id === course.id) : false}
              user={user}
              // onFavoriteToggle={toggleFavorite}
              // isFavorited={favorites.some((fav) => fav.id === course.id)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ResponsiveCarousel;
