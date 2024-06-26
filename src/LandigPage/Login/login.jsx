// LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../User/UserContext/UserContext";
import "./login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    // Si es exitoso:
    if (email === "user@gmail.com" && password === "1234") {
      login({ email, role: "user" });
      navigate("/usermenu");
    } else if (email === "profesor@gmail.com" && password === "1234") {
      login({ email, role: "profesor" });
      navigate("/professormenu");
    } else {
      // Manejo de errores aquí
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Usuario : </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña :</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
