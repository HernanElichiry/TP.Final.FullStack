/*import React from "react";
import "./AlumnoFavCard.css";
import foto from "./fotos/progra.jpg";

export const AlumnoFavCard = () => {
  return (
    <>
      <div className="card-course-container">
        <div className="card-course-image">
          <img src={foto} />
        </div>
        <h2>Fisica Básica</h2>
        <p>Rating: 5 </p>
        <p>Precio: $125.000 </p>
        <button className="button is-primary is-small">Buy It!</button>
      </div>
    </>
  );
};*/

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Importar el ícono de "X"
import { FavoritesContext } from '../FavoritesContext'; // Importar el contexto de favoritos
import './AlumnoFavCard.css'; // Asegúrate de importar el archivo CSS

export const AlumnoFavCard = ({ course }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useContext(FavoritesContext); // Obtener la función toggleFavorite del contexto

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation(); // Evitar que el clic en el botón también active la redirección
    toggleFavorite(course);
  };

  return (
    <div className="fav-card" onClick={handleCardClick} aria-label={`Ver detalles del curso ${course.title}`}>
      <img src={course.image} alt={`Imagen del curso ${course.title}`} />
      <div className="fav-card-content">
        <h3>{course.title}</h3>
        <p>Precio: {course.price} <button onClick={handleRemoveFavorite} className="remove-button">
          <FontAwesomeIcon icon={faTimes} />
        </button></p>
      </div>
    </div>
  );
};
