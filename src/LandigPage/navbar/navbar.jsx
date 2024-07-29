// Navbar.js
import React from "react";
import "./navbar.css";
//import logoImage from "./logo2.png";
import { Link } from "react-router-dom";
import { useUser } from "../User/UserContext/UserContext";
import categories from "../Categorias/categoriesRow";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/* <img src={logoImage} width={40} alt="Logo" />*/}
          <strong className="navbar-title">EINSTEIN</strong>
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Test Vocacional
          </Link>
          <Link to="/" className="navbar-item">
            Bolsa de trabajo
          </Link>
          <Link to="/" className="navbar-item">
            Capacitaciones gratuitas
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Categorias</a>
            <div class="navbar-dropdown">
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`CategoriesPage/${category.name}`}
                  className="navbar-item"
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!user ? (
                <>
                  <Link to="/register" className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login" className="button is-light">
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  <div className="navbar-item">
                    <strong className="user-email">{user.email}</strong>
                  </div>
                  <Link
                    to={user.role === "user" ? "/usermenu" : "/professormenu"}
                    className="button is-light"
                  >
                    Menu
                  </Link>

                  <button onClick={logout} className="button is-primary">
                    Log out
                  </button>
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
