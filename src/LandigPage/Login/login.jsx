
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../User/UserContext/UserContext";
import "./login.css";
import { message } from "antd";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();
  


  const handleLogin = async (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
      try{
        const response = await fetch("http://localhost:3000/auth/login",{
          method: "POST",
          headers : {
              "content-Type":"application/json",
          },
          body: JSON.stringify({email,password})
        });

        if(!response.ok){
          throw new Error("Email o Contraseña Invalido");
        }

        const data = await response.json();

        login(data.accest_token);
        message.success("Inicio de sesión exitoso", 2); // Mensaje de éxito
        navigate("/")
        
      }catch (error) {
        console.error("Error en el login:", error);
        message.error("Error al iniciar sesión, verifique sus credenciales."); // Mensaje de error
      }
    }
  

    return (
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Usuario :</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña :</label>
              <input
                id="password"
                type="password" // Oculta el campo de la contraseña
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;