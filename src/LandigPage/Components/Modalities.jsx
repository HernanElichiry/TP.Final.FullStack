import React from 'react';
import './Modalities.css';
import foto from './foto.jpg'

const Modalities = () => {
  return (
    <div className="modalities-section">
      <h1>Modalidades de Capacitación</h1>
      <p>
        Conoce las ventajas de nuestras modalidades de capacitación. Elige la que mejor se adapte a tus necesidades y estilo de aprendizaje.
      </p>
      <div className="modalities-links">
        <div className="modalities-rectangle">
          <div className="image-containers">
            <img src={foto} alt="Capacitación Online" />
          </div>
          <h2>Capacitación Online</h2>
          <p>
            Accede a los cursos desde cualquier lugar, en cualquier momento. Flexibilidad y comodidad para estudiar a tu ritmo.
          </p>
         
        </div>
        <div className="modalities-rectangle">
          <div className="image-containers">
            <img src={foto} alt="Capacitación Presencial" />
          </div>
          <h2>Capacitación Presencial</h2>
          <p>
            Interacción directa con instructores y compañeros. Ambiente estructurado y motivador para el aprendizaje.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Modalities;
