import React from 'react';
import './navbar.css';
import logoImage from './Logo.jpg'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/"> <img src={logoImage} width={30} alt="" />EINSTEIN</a>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">Home</a>
          </li>
          <li className="nav-item">
            <a href="/categories" className="nav-links">Categorias</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-links">Login</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links"></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;