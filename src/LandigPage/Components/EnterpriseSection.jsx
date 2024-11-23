import "./Components.css";
import logo2 from "./logo2.png";
import coder from "./coder.png";
import udemy from "./udem.webp";
import henry from "./henry.png";
import cepit from "./cepit.png";
import muni from "./lamuni.png";
import unmdp from "./unmdpp.png";

const TrustSection = () => {
  return (
    <div className="trust-section">
      <h1>
        Universidades, Empresas y miles de estudiantes de todo el mundo confían
        en nosotros
      </h1>
      <div className="logos-row">
        <img src={coder} alt="Empresa 1" className="company-logo" />
        <img src={udemy} alt="Empresa 2" className="company-logo" />
        <img src={henry} alt="Empresa 3" className="company-logo" />
        <img src={cepit} alt="Empresa 4" className="company-logo" />
        <img src={muni} alt="Empresa 5" className="company-logo" />
        <img src={unmdp} alt="Empresa 6" className="company-logo" />
      </div>
    </div>
  );
};

export default TrustSection;
