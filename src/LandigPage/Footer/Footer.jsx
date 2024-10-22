import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function FooterApp() {
  return (
    <footer className="footer-app">
      <div className="footer-container">
        <div className="footer-left">
          <h3>Einstein Academy</h3>
          <p>Descubre. Aprende. Avanza.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-link-container">
            <Link to="/terms" className="footer-link">Términos y Condiciones</Link>
            <Link to="/privacy" className="footer-link">Política de Privacidad</Link>
            <Link to="/contact" className="footer-link">Contacto</Link>
          </div>
          <p className="footer-text">© 2024 Einstein Academy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterApp;