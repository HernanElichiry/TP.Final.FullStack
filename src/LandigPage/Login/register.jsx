import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./login.css";
import { useUser } from "../User/UserContext/UserContext";
const RegisterForm = () => {
  const [completeName, setCompleteName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // Si es exitoso:

    navigate("/Login");
  };

  // Expresiones regulares para validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
   // e.preventDefault();

    // Validar que las contraseñas coincidan antes de enviar
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (completeName.trim() === "") {
      setErrorMessage("El campo 'Nombre y Apellido' no puede estar vacío.");
      return;
    }

    if (!birthdate) {
      setErrorMessage("El campo 'Fecha de Nacimiento' no puede estar vacío.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("El 'Correo Electrónico' no tiene un formato válido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "La 'Contraseña' debe tener al menos 8 caracteres, una mayúscula, un numero y un caracter especial."
      );
      return;
    }

    const role_id = isProfessor ? 2 : 3;

    const userData = {
      name: completeName, // Cambia esto
      birthdate: birthdate ? birthdate.toISOString().substring(0, 10) : null,
      email,
      password,
      role_id,
    };

    console.log("User Data to Send:", userData); // Agregar este log

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();

        login(data.accest_token);

        navigate("/")
      } else {
        const errorData = await res.json(); // Captura el error del servidor
        setErrorMessage(errorData.message || "Error al registrar un usuario");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor");
    }
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

  const togglePwVisibility = () => {
    setShowPw((prev) => !prev);
  };

  const toggleConfirmPwVisibility = () => {
    setShowConfirmPw((prev) => !prev);
  };

  return (
    <div>
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Regístrate</h2>
          {<p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                id="name"
                value={completeName}
                onChange={(e) => setCompleteName(e.target.value)}
                placeholder="Nombre y Apellido"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <DatePicker
                selected={birthdate}
                onChange={(date) => setBirthdate(date)}
                placeholderText="Fecha de nacimiento"
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
                type={showPw ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                className="styled-input"
              />
              <button
                type="button"
                className="pw-button"
                onClick={togglePwVisibility}
              >
                {showPw ? "Ocultar Contraseña" : "Mostrar Contraseña"}
              </button>
            </div>

            <div className="form-group">
              <input
                type={showConfirmPw ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Repetir contraseña"
                className="styled-input"
              />
              <button
                type="button"
                className="pw-button"
                onClick={toggleConfirmPwVisibility}
              >
                {showConfirmPw ? "Ocultar Contraseña" : "Mostrar Contraseña"}
              </button>
            </div>

            <div>
              <label htmlFor="isProfessor" className="checkbox-container">
                <span className="checkbox-label"> ¿Eres profesor? </span>
                <input
                  type="checkbox"
                  id="isProfessor"
                  className="large-checkbox"
                  checked={isProfessor}
                  onChange={(e) => setIsProfessor(e.target.checked)}
                />
              </label>
            </div>

            <button type="submit" className="login-btn">
              Regístrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
