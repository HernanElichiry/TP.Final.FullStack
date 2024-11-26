// Navbar.js
import "./navbar.css";
import { Link } from "react-router-dom";
import { useUser } from "../User/UserContext/UserContext";
import { useState, useEffect } from "react";

function Navbar() {
  const { user, logout } = useUser();
  const [isActive, setIsActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLinkClick = () => {
    setIsActive(false);
    setIsDropdownActive(false);
  };

  // Fetch de categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories"); // Ajusta la URL según tu API
        if (!response.ok) throw new Error("Error al traer las categorías");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Función para manejar el clic en el enlace de Categorías
  const handleCategoriesClick = (e) => {
    e.preventDefault(); // Prevenir la acción predeterminada del enlace
    setIsDropdownActive((prevState) => !prevState); // Alternar el estado del dropdown
  };

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <strong className="navbar-title">Einstein.</strong>
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
        </button>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        {/* Navbar izquierda: nombre y enlaces principales */}
        <div className="navbar-start">
          <Link to="/" className="navbar-item" onClick={handleLinkClick}>
            Crea tu capacitacion
          </Link>
          <Link
            to="/bolsa-de-trabajo"
            className="navbar-item"
            onClick={handleLinkClick}
          >
            En promocion
          </Link>
          <Link
            to="/capacitaciones"
            className="navbar-item"
            onClick={handleLinkClick}
          >
            Capacitaciones gratuitas
          </Link>
          {/* Categorías desplegable */}
          <div
            className={`navbar-item has-dropdown ${
              isDropdownActive ? "is-active" : ""
            }`}
            onMouseEnter={() => setIsDropdownActive(true)}
            onMouseLeave={() => setIsDropdownActive(false)}
          >
            <a className="navbar-link" onClick={handleCategoriesClick}>
              Categorías
            </a>
            <div
              className={`navbar-dropdown ${
                isDropdownActive ? "is-active" : ""
              }`}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/CategoriesPage/${category.name}`}
                  className="navbar-item"
                  onClick={handleLinkClick}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Navbar derecha: Login y Sign up */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="button is-primary"
                    onClick={handleLinkClick}
                  >
                    <strong>Sign up</strong>
                  </Link>
                  <Link
                    to="/login"
                    className="button is-light"
                    onClick={handleLinkClick}
                  >
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
                    className="button is-primary"
                    onClick={handleLinkClick}
                  >
                    Menu
                  </Link>
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
