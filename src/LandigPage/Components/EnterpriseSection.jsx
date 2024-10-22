
import './Components.css';
import logo2 from './logo2.png'



const TrustSection = () => {
  return (
    <div className="trust-section">
      <h1>Universidades, Empresas y miles de estudiantes de todo el mundo confían en nosotros</h1>
      <div className="logos-row">
        <img src={logo2} alt="Empresa 1" className="company-logo" />
        <img src={logo2} alt="Empresa 2" className="company-logo" />
        <img src={logo2} alt="Empresa 3" className="company-logo" />
        <img src={logo2} alt="Empresa 4" className="company-logo" />
        <img src={logo2} alt="Empresa 5" className="company-logo" />
        <img src={logo2} alt="Empresa 6" className="company-logo" />
      </div>
    </div>
  );
};

export default TrustSection;
