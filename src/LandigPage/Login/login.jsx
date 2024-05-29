import React, { useState } from 'react';
import './login.css'
import Navbar from '../navbar/navbar';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div>
    <Navbar></Navbar>
    <div className="app-container">
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Usuario :        </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Iniciar sesión
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;