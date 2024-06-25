import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import einsteinImage from "../Background/einstein4.png";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // Si es exitoso:

    navigate("/Login");
  };

  return (
    <div>
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Register</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Name : </label>
              <input
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name : </label>
              <input
                id="lastname"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birth Date : </label>
              <input
                id="birthdate"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="user">User Name:</label>
              <input
                /*type="password"*/
                id="user"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password :</label>
              <input
                /*type="password"*/
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Repeat Password :</label>
              <input
                /*type="password"*/
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isProfessor">Is Professor?</label>
              <input
                type="checkbox"
                id="isProfessor"
                checked={isProfessor}
                onChange={(e) => setIsProfessor(e.target.checked)}
              />
            </div>

            <button onClick={handleLogin} type="submit" className="login-btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
