import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useUser } from "../../User/UserContext/UserContext"; 
import { message } from 'antd';
import "./ProductCard.css";

export const ProductCard = ({ product, onFavoriteToggle, isFavorited, user }) => {
  const navigate = useNavigate(); // me permite el direccionamiento
  const [imageUrl, setImageUrl] = useState(''); // Estado para almacenar la URL de la imagen


  const handleFavoriteClick = () => {

    if (user) {
      onFavoriteToggle(product); // Llama a la función para alternar favorito
    } else {
      message.warning("Inicia sesión para agregar a favoritos.", 3); // Mensaje para usuarios no logueados con duración de 3 segundos
    }
  };

  const handleCardClick = () => {   //funcion para manejar el redireccionamiento a la couseDetail al hacer click
    navigate(`/course/${product.id}`);
  };

  const renderStars = () => {
    const stars = [];
    const totalStars = 5; // Total de estrellas a mostrar
  
    for (let i = 1; i <= totalStars; i++) {
      // Si el número entero de la calificación es mayor o igual a i, pintamos una estrella completa
      if (i <= Math.floor(product.rating)) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={solidStar} // Estrella completa
            className="rating-star"
          />
        );
      }
      // Si el valor decimal de la calificación es mayor o igual a 0.5 y aún no hemos pintado esta estrella
      else if (i === Math.floor(product.rating) + 1 && product.rating % 1 >= 0.5) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={halfStar} // Media estrella
            className="rating-star"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={regularStar} // Estrella vacía
            className="rating-star"
          />
        );
      }
    }
    return stars;
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageResponse = await fetch(`http://localhost:3000/uploads/images/${product.media.filename}`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        });

        if (imageResponse.ok) {
          const imageBlob = await imageResponse.blob();
          setImageUrl(URL.createObjectURL(imageBlob));
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (product.media && product.media.filename) {
      fetchImage();
    }
  }, [product.media?.filename]); // Ejecuta solo si cambia `product.media.filename`



  return (
    <div className="card-product-container">
      <div className="card-product-image">
        <img src={imageUrl} alt={product.title} />
      </div>
      <h2>{product.title}</h2>
      <p className="rating-container">{renderStars()}</p> {/* en vez de mostrar la valoracion uso un metodo que muestra una estrella por cada punto*/ }
      <div className="price-favorite-container">
        <p>Precio: {product.price}</p>
      </div>
      <div className="buttons">
        <button className="show-more-button" onClick={handleCardClick} >Show More</button>
        <button className="transparent-button" onClick={handleFavoriteClick}>
          <FontAwesomeIcon
            icon={isFavorited ? solidHeart : regularHeart}
            className={isFavorited ? "" : "selected"}
          />
        </button>
      </div>
    </div>
  );
};
