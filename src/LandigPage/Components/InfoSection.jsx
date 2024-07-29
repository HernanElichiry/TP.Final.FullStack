import React from 'react';
import './Components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

import video from "./video.mp4";

const InfoSection = () => {
  return (
    <div className="info-section">
      <div className="info-rectangle">
        <h2>TODOS SOMOS MAESTROS.</h2>
        <p>
          Nuestra plataforma permite que cualquier persona pueda ofrecer o vender sus conocimientos.
          Compite contra los más grandes y demuestra tu expertise en el área que dominas.
        </p>
        <button className='info-button'>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
          Crea tu capacitación
        </button>
      </div>
      <div className="info-rectangle2">
        <video src={video} autoPlay muted loop></video>
        <p>Más de 200 capacitaciones gratuitas.</p>
      </div>
    </div>
  );
};

export default InfoSection;
