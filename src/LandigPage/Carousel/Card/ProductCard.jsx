import React from "react";
import './ProductCard.css';





export const ProductCard = ({ product }) => {
  return (
  <>
  
    <div className="card-product-container">
      <div className="card-product-image">
      <img src={product.image} alt={product.title} width={200} />
      </div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Rating: {product.rating} estrellas</p>
      <p>Precio: {product.price}</p>
      <button className="button is-primary is-small">Show More</button>

    </div>

    </>
  );
};
