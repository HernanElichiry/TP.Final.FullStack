
import './Components.css';
import foto from  "./foto.jpg";

const Banner = () => {
  return (
    <div className="banner-section">

      <div className="banner-links">
        <div className="banner-rectangle">
          <a href="/job-offers">Ver Ofertas de Trabajo</a>
        </div>
        <div className="banner-rectangle">
           <img src={foto} alt="foto" />
           <a href="/vocational-test"> Realizar Test Vocacional</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
