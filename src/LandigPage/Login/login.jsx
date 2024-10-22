
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../User/UserContext/UserContext";
import "./login.css";

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

        navigate("/")
        
      }catch (error) {
        console.error("Error en el login:", error);
        alert("Error al iniciar sesión, verifique sus credenciales.");
      }
    }
  

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
