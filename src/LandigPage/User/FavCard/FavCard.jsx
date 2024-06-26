import React from 'react';
import './FavCard.css';

const FavCard = ({ course }) => {
  return (
    <div className="fav-card">
      <img src={course.image} alt={course.title} />
      <div className="fav-card-content">
        <h3>{course.title}</h3>
        <p>Precio: {course.price}</p>
      </div>
    </div>
  );
};

export default FavCard;