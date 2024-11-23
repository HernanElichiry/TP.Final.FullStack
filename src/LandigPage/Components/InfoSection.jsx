
import './Components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import image from './Einstein inspired.png'
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
        <img src={image} alt="imagen aqui" />
      </div>
    </div>
  );
};

export default InfoSection;
