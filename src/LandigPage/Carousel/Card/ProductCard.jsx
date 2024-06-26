import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './ProductCard.css';

export const ProductCard = ({ product, onFavoriteToggle, isFavorited }) => {
  const handleFavoriteClick = () => {
    onFavoriteToggle(product);
  };

  const renderStars = () => {
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

  return (
    <div className="card-product-container">
      <div className="card-product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <h2>{product.title}</h2>
      <p>Description</p>
      <p className="rating-container">{renderStars()}</p>
      <div className="price-favorite-container">
        <p>Precio: {product.price}</p>
        <button className="favorite-button" onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={isFavorited ? solidHeart : regularHeart} className={isFavorited ? "" : "selected"} />
        </button>
      </div>
    </div>
  );
};
