// Navbar.js
import "./navbar.css";
import { Link } from "react-router-dom";
import { useUser } from "../User/UserContext/UserContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useUser();
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLinkClick = () => {
    setIsActive(false);
  };

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <strong className="navbar-title">EINSTEIN</strong>
        </a>
        <button
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>

        </button>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item" onClick={handleLinkClick}>
            Test Vocacional
          </Link>
          <Link to="/bolsa-de-trabajo" className="navbar-item" onClick={handleLinkClick}>
            Bolsa de trabajo
          </Link>
          <Link to="/capacitaciones" className="navbar-item" onClick={handleLinkClick}>
            Capacitaciones gratuitas
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!user ? (
                <>
                  <Link to="/register" className="button is-primary" onClick={handleLinkClick}>
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login" className="button is-light" onClick={handleLinkClick}>
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  <div className="navbar-item">
                    <strong className="user-email">{user.email}</strong>
                  </div>
                  <Link
                    to={user.rol === 3 ? "/usermenu" : "/professormenu"}
                    className="button is-light"
                    onClick={handleLinkClick}
                  >
                    Menu
                  </Link>
                  <button onClick={logout} className="button is-primary">Log out</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
