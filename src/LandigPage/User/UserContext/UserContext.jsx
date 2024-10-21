import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Asegúrate de tener este import para las cookies

const UserContext = createContext();

const parseJwt = (token) => {
  if (!token) return null;

  const base64Url = token.split('.')[1]; // Obtener la parte del cuerpo
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplazar caracteres especiales
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')); // Decodificar el payload en JSON

  return JSON.parse(jsonPayload); // Convertir a objeto JavaScript
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = Cookies.get('token');
    return parseJwt(token); // Usamos nuestra función para decodificar
  });
  
  const navigate = useNavigate();

  const login = (token) => {
    const userData = parseJwt(token); // Decodificamos el token al iniciar sesión
    setUser(userData);
    Cookies.set('token', token); // Guardamos el token en cookies
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token'); // Limpiamos las cookies
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);