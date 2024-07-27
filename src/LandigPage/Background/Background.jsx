import React from "react";
import "./Background.css";
import SearchBar from "../SearchBar/SearchBar";
import einsteinImage from "./einstein4.png";

export const HomePageText = () => {
  return (
    <div className="landingpage-container">
      <div className="landingpage-text">
        <h1> <strong>Einstein.</strong></h1>
        
        <p className="landingpage-p">
         {/* <p>Descubre. Aprende. Avanza.</p>En Einstein, creemos que el conocimiento es tan infinito como el
          universo, que hemos venido a este mundo para aprender y que todos
          tenemos algo para enseñar. Por eso, te ofrecemos una galaxia de cursos
          para que explores y amplíes tus horizontes.*/}

          Todo el conocimiento en un solo lugar
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
