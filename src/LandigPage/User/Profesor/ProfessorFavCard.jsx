import React from "react";
import "./ProfessorFavCard.css";
import foto from "./fotos/fisica.jpg";

import React from "react";
import "./ProfessorFavCard.css";
import foto from "./fotos/progra.jpg";

export const ProfessorFavCard = () => {
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
};
