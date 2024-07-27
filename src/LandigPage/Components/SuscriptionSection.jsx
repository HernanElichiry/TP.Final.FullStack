import React from 'react';
import './Components.css';
import descuento from './descuento.jpg'

const SubscriptionSection = () => {
  return (
    <div className="subscription-container">
          <div className="subscription-image">
        <img src={descuento} alt="Descuentos" />
      </div>
      <div className="subscription-text">
        <h2>Suscribite y accede a descuentos en todas tus capacitaciones</h2>
        <button className="subscribe-button">Suscribirse</button>
      </div>
    
    </div>
  );
};

export default SubscriptionSection;
