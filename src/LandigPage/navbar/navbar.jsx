// Navbar.js
import React from "react";
import "./navbar.css";
import logoImage from "./logo2.png";
import { Link } from "react-router-dom";

import { useUser } from "../User/UserContext/UserContext";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logoImage} width={40} alt="Logo" />
          EINSTEIN
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
            Home
          </Link>
          <Link to="/documentation" className="navbar-item">
            Documentation
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/jobs" className="navbar-item">
                Jobs
              </Link>
              <Link to="/contact" className="navbar-item">
                Contact
              </Link>
              <hr className="navbar-divider" />
              <Link to="/report" className="navbar-item">
                Report an issue
              </Link>
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
                <div className="navbar-item">
                  <strong className="user-email">{user.email}</strong>

                  <button onClick={logout} className="button is-primary">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
