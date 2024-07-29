import React from 'react';
import './Components.css';

import foto from'../Background/wallpaper2.jpg'

const Jobs = () => {
  return (
    <div className="jobs-section">
      <h1>Bolsa de Empleo. Y ahora qué?</h1>
      <p>
        La importancia de elegir una carrera que tenga salida laboral es crucial. 
        Nuestra plataforma te ofrece herramientas para explorar ofertas de trabajo y realizar un test vocacional.
      </p>
      <div className="jobs-links">
        <div className="jobs-rectangle"> 
          <div className="image-container">
            <img src={foto} alt="Ofertas de Trabajo" />
          </div>
          <a href="/job-offers">Ver Ofertas de Trabajo</a>
        </div>
        <div className="jobs-rectangle">
          <a href="/vocational-test">Realizar Test Vocacional</a>
          <div className="image-container">
            <img src={foto} alt="Ofertas de Trabajo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;



