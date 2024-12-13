import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FavoritesContext } from "../FavoritesContext";
import "./ProfessorFavCard.css";

export const FavCardProfessor = ({ course }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useContext(FavoritesContext);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchCourseImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/uploads/images/${course.media.filename}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (response.ok) {
          const imageBlob = await response.blob();
          setImageUrl(URL.createObjectURL(imageBlob));
        } else {
          console.error("Error al obtener la imagen");
        }
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };

    fetchCourseImage();
  }, [course.media.filename]);

  const handleCardClick = () => navigate(`/course/${course.id}`);

  const handleRemoveFavorite = (e) => {
    e.stopPropagation(); // Evitar activar el clic general de la tarjeta
    toggleFavorite(course);
  };

  return (
    <div className="card-course-container">
      <img
        className="img-fav"
        src={imageUrl}
        alt={`Imagen del curso ${course.title}`}
      />
      <div className="fav-card-content">
        <h3>{course.title}</h3>
        <div className="card-buttons">
          <button
            className="detail-button"
            onClick={handleCardClick}
            aria-label="Ver detalles del curso"
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Detalles
          </button>
          <button
            className="remove-button"
            onClick={handleRemoveFavorite}
            aria-label="Eliminar de favoritos"
          >
            <FontAwesomeIcon icon={faTimes} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
