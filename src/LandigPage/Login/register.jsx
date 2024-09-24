import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // Si es exitoso:

    navigate("/Login");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    //Verifico que las contraseñas sean iguales

    if (e.target.value !== password) {
      setErrorMessage("Las contraseñas no coinciden");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div>
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Regístrate</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                id="birthdate"
                value={
                  birthdate ? birthdate.toISOString().substring(0, 10) : "" //convertidor de string a Date
                }
                onChange={(e) => setBirthdate(new Date(e.target.value))}
                placeholder="Fecha de nacimiento"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                /*type="password"*/
                id="user"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nombre de usuario"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                /*type="password"*/
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                className="styled-input"
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-group">
              <input
                /*type="password"*/
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Repetir contraseña"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="isProfessor">Eres profesor?</label>
              <input
                type="checkbox"
                id="isProfessor"
                checked={isProfessor}
                onChange={(e) => setIsProfessor(e.target.checked)}
              />
            </div>

            <button onClick={handleLogin} type="submit" className="login-btn">
              Regístrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
