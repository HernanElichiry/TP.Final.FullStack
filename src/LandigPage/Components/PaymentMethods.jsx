import React from 'react';
import './Components.css';
import logo2 from './logo2.png'

const PaymentMethods = () => {
  return (
    <div className="payment-methods">
      <h2>Medios de Pago</h2>
      <div className="payment-icons">
        <div className="payment-icon">
          <img src={logo2} alt="Visa" />
          <span>Visa</span>
        </div>
        <div className="payment-icon">
          <img src={logo2}  alt="MasterCard" />
          <span>MasterCard</span>
        </div>
        <div className="payment-icon">
          <img src={logo2}  alt="PayPal" />
          <span>PayPal</span>
        </div>
        <div className="payment-icon">
          <img src={logo2}  alt="American Express" />
          <span>Amex</span>
        </div>
      </div>
      <p>Aceptamos una variedad de métodos de pago para su conveniencia.</p>
    </div>
  );
};

export default PaymentMethods;
