// UserContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();


export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
    
  });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem('user');
    navigate('/');

  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
