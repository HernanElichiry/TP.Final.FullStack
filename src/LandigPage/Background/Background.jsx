import React from "react";
import "./Background.css";
import SearchBar from "../SearchBar/SearchBar";
import einsteinImage from "./einstein4.png";

export const HomePageText = () => {
  return (
    <div className="landingpage-container">
      <div className="landingpage-text">
        <h1>Einstein.</h1>
        <p>Descubre. Aprende. Avanza.</p>
        <p>
          En Einstein, creemos que el conocimiento es tan infinito como el
          universo, que hemos venido a este mundo para aprender y que todos
          tenemos algo para enseñar. Por eso, te ofrecemos una galaxia de cursos
          para que explores y amplíes tus horizontes.
        </p>
        <SearchBar></SearchBar>
      </div>
      <img
        src={einsteinImage}
        alt="Fondo de página"
        className="background-img"
      />
    </div>
  );
};
