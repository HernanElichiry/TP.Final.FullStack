import "./Components.css";
import logo2 from "./logo2.png";
import visalogo from "./visalogo1.png";
import masterlogo from "./masterlogo.png";
import paypallogo from "./paypallogo.png";
import amexlogo from "./amexlogo.png";

const PaymentMethods = () => {
  return (
    <div className="payment-methods">
      <h2>Medios de Pago</h2>
      <div className="payment-icons">
        <div className="payment-icon">
          <img src={visalogo} alt="Visa" />
          <span>Visa</span>
        </div>
        <div className="payment-icon">
          <img src={masterlogo} alt="MasterCard" />
          <span>MasterCard</span>
        </div>
        <div className="payment-icon">
          <img src={paypallogo} alt="PayPal" />
          <span>PayPal</span>
        </div>
        <div className="payment-icon">
          <img src={amexlogo} alt="American Express" />
          <span>Amex</span>
        </div>
      </div>
      <p>Aceptamos una variedad de métodos de pago para su conveniencia.</p>
    </div>
  );
};

export default PaymentMethods;
