import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../../User/UserContext/UserContext"; 
import "./ProductCard.css";

export const ProductCard = ({ product, onFavoriteToggle, isFavorited, user }) => {
  const navigate = useNavigate(); // me permite el direccionamiento
  const [imageUrl, setImageUrl] = useState(''); // Estado para almacenar la URL de la imagen

  //const { user } = useUser(); // Obtén el usuario logueado del contexto

  const handleFavoriteClick = () => {

    if (user) {
      onFavoriteToggle(product); // Llama a la función para alternar favorito
    } else {
      alert("Inicia sesión para agregar a favoritos."); // Mensaje para usuarios no logueados
    }
  };

  const handleCardClick = () => {   //funcion para manejar el redireccionamiento a la couseDetail al hacer click
    navigate(`/course/${product.id}`);
  };

  const renderStars = () => {   // Esta Función para renderizar las estrellas de acuerdo a la valoración del curso

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= product.rating ? solidStar : regularStar}
          className="rating-star"
        />
      );
    }
    return stars;
  };
  useEffect(() =>{
    const fetchImage = async() => {

    // Construir la URL de la imagen del curso
    const imageResponse = await fetch(`http://localhost:3000/uploads/images/${product.media.filename}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    // Convertir la imagen a Blob y luego a URL
        const imageBlob = await imageResponse.blob();
        setImageUrl(URL.createObjectURL(imageBlob)); // Guardar la URL de la imagen
  }

  fetchImage();
  },);



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
