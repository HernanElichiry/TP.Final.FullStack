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
    infinite: true, // Hacer que el carrusel sea infinito
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Eliminar las flechas de navegación
    autoplay: true, // Hacer que las diapositivas se deslicen automáticamente
    autoplaySpeed: 6000, // Velocidad de la transición automática en milisegundos
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
