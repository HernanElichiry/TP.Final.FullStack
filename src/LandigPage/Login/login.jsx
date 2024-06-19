import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // Si es exitoso:

    if (email === "user@gmail.com") {
      navigate("/usermenu");
    } else {
      if (email === "profesor@gmail.com") navigate("/professormenu/");
    }
  };

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Usuario : </label>
              <input
                // type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña :</label>
              <input
                /*type="password"*/
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin} type="submit" className="login-btn">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
